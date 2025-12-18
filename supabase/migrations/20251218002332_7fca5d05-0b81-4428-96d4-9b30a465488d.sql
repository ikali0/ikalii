-- Fix article_summaries RLS: Require authentication for reading summaries
-- This prevents unauthorized scraping of AI-generated content

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Public can read article summaries" ON public.article_summaries;

-- Create new policy requiring authentication for reading
CREATE POLICY "Authenticated users can read article summaries"
ON public.article_summaries
FOR SELECT
TO authenticated
USING (true);

-- Also allow service role to insert (for edge functions)
DROP POLICY IF EXISTS "Service role only can insert summaries" ON public.article_summaries;
CREATE POLICY "Service role can insert summaries"
ON public.article_summaries
FOR INSERT
TO service_role
WITH CHECK (true);

-- Allow service role to update
DROP POLICY IF EXISTS "Service role only can update summaries" ON public.article_summaries;
CREATE POLICY "Service role can update summaries"
ON public.article_summaries
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Allow service role to delete
DROP POLICY IF EXISTS "Service role only can delete summaries" ON public.article_summaries;
CREATE POLICY "Service role can delete summaries"
ON public.article_summaries
FOR DELETE
TO service_role
USING (true);