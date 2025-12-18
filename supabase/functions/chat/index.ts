import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type RateLimitRecord = {
  id: string;
  request_count: number;
  window_start: string;
};

const MAX_REQUESTS = 50;
const WINDOW_MS = 3600000; // 1 hour in milliseconds

async function checkRateLimit(
  supabase: SupabaseClient,
  userId: string,
  endpoint: string
): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_MS);

  // Try to get existing rate limit record
  const { data: existing, error: selectError } = await supabase
    .from("rate_limits")
    .select("id, request_count, window_start")
    .eq("user_id", userId)
    .eq("endpoint", endpoint)
    .maybeSingle();

  if (selectError) {
    console.error("Rate limit select error:", selectError);
    // Allow request on error to avoid blocking users due to DB issues
    return { allowed: true, remaining: MAX_REQUESTS };
  }

  const record = existing as RateLimitRecord | null;

  if (!record) {
    // No record exists, create one
    const { error: insertError } = await supabase.from("rate_limits").insert({
      user_id: userId,
      endpoint,
      request_count: 1,
      window_start: now.toISOString(),
    });

    if (insertError) {
      console.error("Rate limit insert error:", insertError);
    }
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  const existingWindowStart = new Date(record.window_start);

  // Check if window has expired
  if (existingWindowStart < windowStart) {
    // Reset the window
    const { error: updateError } = await supabase
      .from("rate_limits")
      .update({
        request_count: 1,
        window_start: now.toISOString(),
      })
      .eq("id", record.id);

    if (updateError) {
      console.error("Rate limit reset error:", updateError);
    }
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  // Window still active, check count
  if (record.request_count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  // Increment counter
  const { error: incrementError } = await supabase
    .from("rate_limits")
    .update({ request_count: record.request_count + 1 })
    .eq("id", record.id);

  if (incrementError) {
    console.error("Rate limit increment error:", incrementError);
  }

  return { allowed: true, remaining: MAX_REQUESTS - record.request_count - 1 };
}

async function verifyAuth(req: Request): Promise<{ valid: boolean; userId?: string; error?: string }> {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return { valid: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.slice(7);
  
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return { valid: false, error: "Server configuration error" };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      console.error("Auth verification failed:", error?.message);
      return { valid: false, error: "Invalid or expired token" };
    }

    return { valid: true, userId: data.user.id };
  } catch (e) {
    console.error("Auth verification error:", e);
    return { valid: false, error: "Authentication failed" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authResult = await verifyAuth(req);
    if (!authResult.valid || !authResult.userId) {
      console.warn("Unauthorized chat request:", authResult.error);
      return new Response(JSON.stringify({ error: authResult.error ?? "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check rate limit using database
    const rateLimitResult = await checkRateLimit(supabase, authResult.userId, "chat");
    if (!rateLimitResult.allowed) {
      console.warn("Rate limit exceeded for user:", authResult.userId);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Maximum 50 requests per hour." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    const messages = (body?.messages ?? []) as unknown;

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid payload: messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate and sanitize messages with length limits
    const safeMessages: ClientMessage[] = messages
      .filter((m): m is ClientMessage => {
        if (!m || typeof m !== "object") return false;
        const role = (m as { role?: unknown }).role;
        const content = (m as { content?: unknown }).content;
        return (
          (role === "user" || role === "assistant") &&
          typeof content === "string" &&
          content.length > 0 &&
          content.length <= 10000
        );
      })
      .slice(-30);

    if (safeMessages.length === 0) {
      return new Response(JSON.stringify({ error: "No valid messages provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt =
      "You are a helpful AI assistant. Be concise, accurate, and avoid requesting sensitive personal data.";

    console.log("Processing chat request for user:", authResult.userId, "messages:", safeMessages.length);

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [{ role: "system", content: systemPrompt }, ...safeMessages],
      }),
    });

    if (!upstream.ok) {
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (upstream.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits and try again." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const t = await upstream.text().catch(() => "");
      console.error("AI gateway error:", upstream.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-RateLimit-Limit": String(MAX_REQUESTS),
        "X-RateLimit-Remaining": String(rateLimitResult.remaining),
      },
    });
  } catch (e) {
    console.error("chat error:", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
