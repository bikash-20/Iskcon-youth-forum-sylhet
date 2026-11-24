// Single source of truth for environment configuration.
// Safe build-time fallbacks are provided so automated Vercel/CI builds
// succeed even before production environment variables are configured.

function required(name: string, fallback = ""): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    if (fallback) return fallback;
    return `placeholder_${name.toLowerCase()}`;
  }
  return v;
}

function optional(name: string, fallback = ""): string {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

export const env = {
  // Admin auth
  ADMIN_PASSWORD: required("ADMIN_PASSWORD", "changeme_admin_password"),
  SESSION_SECRET: required(
    "SESSION_SECRET",
    "iyf_sylhet_default_session_secret_at_least_32_characters_long",
  ),

  // Email (Resend)
  RESEND_API_KEY: required("RESEND_API_KEY", "re_placeholder_api_key"),
  MAIL_FROM: optional(
    "MAIL_FROM",
    "ISKCON Youth Forum Sylhet <onboarding@resend.dev>",
  ),
  ADMIN_EMAIL: required("ADMIN_EMAIL", "iyfsylhet@gmail.com"),

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
