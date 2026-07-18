// Single source of truth for environment configuration.
// Throwing early at module-load is intentional: bad config should fail loudly
// in `next build`, not silently at request time.

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(
      `Missing required env var: ${name}. See README "Environment variables".`,
    );
  }
  return v;
}

function optional(name: string, fallback = ""): string {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

export const env = {
  // Admin auth
  ADMIN_PASSWORD: required("ADMIN_PASSWORD"),
  SESSION_SECRET: required("SESSION_SECRET"),

  // Email (Resend)
  RESEND_API_KEY: required("RESEND_API_KEY"),
  MAIL_FROM: optional(
    "MAIL_FROM",
    "ISKCON Youth Forum Sylhet <onboarding@resend.dev>",
  ),
  ADMIN_EMAIL: required("ADMIN_EMAIL"),

  // Redis (ioredis / Redis Cloud). Required at runtime for persistence +
  // rate limiting. Use the TCP `redis://` or TLS `rediss://` URL from the
  // Redis Cloud dashboard; credentials can be embedded in the URL or
  // supplied via `REDIS_USERNAME` / `REDIS_PASSWORD`.
  REDIS_URL: optional("REDIS_URL", ""),
  SUBMISSION_TTL_SECONDS: Number(optional("SUBMISSION_TTL_SECONDS", String(60 * 60 * 24 * 90))), // 90 days
  // Cookie / session
  SESSION_COOKIE_NAME: optional("SESSION_COOKIE_NAME", "iyf_session"),
  SESSION_TTL_SECONDS: Number(optional("SESSION_TTL_SECONDS", "43200")), // 12h

  // Public site
  PUBLIC_SITE_NAME: optional("PUBLIC_SITE_NAME", "ISKCON Youth Forum, Sylhet"),
  PUBLIC_SITE_URL: optional("PUBLIC_SITE_URL", "http://localhost:3000"),
};

export type Env = typeof env;
