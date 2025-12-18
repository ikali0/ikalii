/**
 * Environment variable validation and initialization
 */

const requiredEnv = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const;

export function validateEnvironment(): void {
  const missing = requiredEnv.filter((key) => {
    const env = import.meta.env as Record<string, unknown>;
    return !env[key];
  });

  if (missing.length > 0) {
    const msg = `Missing environment variables: ${missing.join(', ')}`;
    throw new Error(msg);
  }
}

export function getEnv(key: (typeof requiredEnv)[number]): string {
  const env = import.meta.env as Record<string, unknown>;
  const value = env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return String(value);
}
