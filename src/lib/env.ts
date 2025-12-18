/**
 * Environment variable validation and initialization
 * 
 * Validates that all required Supabase environment variables are configured:
 * - VITE_SUPABASE_URL: Your Supabase project URL (https://your-project.supabase.co)
 * - VITE_SUPABASE_ANON_KEY: Your public anonymous key for client-side operations
 * 
 * These variables are required for the application to connect to Supabase.
 */

const requiredEnv = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const;

/**
 * Validates that all required environment variables are defined at startup
 * Throws an error if any required variables are missing
 */
export function validateEnvironment(): void {
  const missing = requiredEnv.filter((key) => {
    const env = import.meta.env as Record<string, unknown>;
    return !env[key];
  });

  if (missing.length > 0) {
    const msg = `Missing required environment variables: ${missing.join(', ')}\n\nPlease configure these in your .env file.`;
    throw new Error(msg);
  }
}

/**
 * Safely retrieve an environment variable with type checking
 * @param key - The environment variable name
 * @returns The environment variable value
 * @throws Error if the variable is not defined
 */
export function getEnv(key: (typeof requiredEnv)[number]): string {
  const env = import.meta.env as Record<string, unknown>;
  const value = env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return String(value);
}
