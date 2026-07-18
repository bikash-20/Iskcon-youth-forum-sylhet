import { getRedis } from "./redis";

/**
 * Sliding-window-ish rate limiter backed by Upstash Redis.
 *
 * Strategy: INCR a key whose TTL is the window. The first request in a
 * window sets `count=1`; subsequent requests just INCR. If `count > limit`
 * after the increment we treat as limited.
 *
 * When Redis is unavailable (dev, or Upstash outage) we fall back to a
 * per-instance Map so the dev server still works. That fallback is **not**
 * shared across instances — on Vercel each lambda has its own.
 */

type Verdict =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

const FALLBACK = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<Verdict> {
  const r = getRedis();
  if (r.ok) {
    try {
      const fullKey = `rl:${key}`;
      const pipe = r.client.pipeline();
      pipe.incr(fullKey);
      pipe.expire(fullKey, windowSec, "NX" as never);
      const res = (await pipe.exec()) as unknown as Array<
        number | { result: number }
      >;
      const count = Number(res[0] ?? 0);
      if (count > limit) {
        return { ok: false, retryAfter: windowSec };
      }
      return { ok: true, remaining: Math.max(0, limit - count) };
    } catch (err) {
      // Redis unreachable — degrade gracefully. Better to serve than 500.
      // eslint-disable-next-line no-console
      console.warn("[rateLimit] redis failure, allowing request", err);
    }
  }

  // In-memory fallback
  const now = Date.now();
  const entry = FALLBACK.get(key);
  if (!entry || entry.resetAt < now) {
    FALLBACK.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    return { ok: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}