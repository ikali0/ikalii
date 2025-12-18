import { supabase } from "@/integrations/supabase/client";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype); // Ensure correct inheritance
  }
}

type StreamChatArgs = {
  messages: ChatMessage[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
};

const CHAT_URL = (() => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  if (!url) {
    throw new Error("Environment variable `VITE_SUPABASE_URL` is not defined.");
  }
  return `${url}/functions/v1/chat`;
})();

export async function streamChat({ messages, onDelta, onDone, signal }: StreamChatArgs): Promise<void> {
  // Retrieve current session for auth token
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;

  if (!accessToken) {
    throw new HttpError(401, "Please sign in to use the chat feature");
  }

  const response = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!response.ok || !response.body) {
    const rawText = await response.text().catch(() => "");

    let errorMessage = `Failed to start stream (HTTP ${response.status})`;
    if (rawText) {
      try {
        const errorJson = JSON.parse(rawText) as { error?: string };
        errorMessage = errorJson.error ?? rawText;
      } catch {
        // Use raw text as fallback
        errorMessage = rawText;
      }
    }

    throw new HttpError(response.status, errorMessage);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  let isStreamDone = false;

  try {
    while (!isStreamDone) {
      const { done, value } = await reader.read();
      if (done) {break;}

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) {line = line.slice(0, -1);}
        if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) {
          continue; // Skip keep-alive comments, empty lines, or malformed lines
        }

        const jsonStr = line.slice(6).trim();

        if (jsonStr === "[DONE]") {
          isStreamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const deltaContent = parsed.choices?.[0]?.delta?.content;

          if (typeof deltaContent === "string" && deltaContent.length > 0) {
            onDelta(deltaContent);
          }
        } catch {
          buffer = `${line  }\n${  buffer}`; // Restore line in case of error
          break;
        }
      }
    }
  } finally {
    // Final flush for the buffer and trigger onDone
    if (!isStreamDone) {
      for (const line of buffer.split("\n")) {
        if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) {
          continue;
        }

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr) as {
            choices?: Array<{ delta?: { content?: string } }>;
          };
          const deltaContent = parsed.choices?.[0]?.delta?.content;

          if (typeof deltaContent === "string" && deltaContent.length > 0) {
            onDelta(deltaContent);
          }
        } catch {
          // Ignore leftover parsing errors
        }
      }
    }
    onDone();
  }
}
