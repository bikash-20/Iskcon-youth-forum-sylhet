/**
 * Sliding-window-ish rate limiter backed by Redis.
 *
 * Algorithm: fixed-window. One counter per key, INCR + EXPIRE NX.
 * Adequate for low-volume contact/volunteer forms; not for high RPS.
 *
 * Falls back to a tiny in-memory limiter if Redis is unavailable, so
 * the form still works in dev and stays open under partial outage.
 */

import { getRedis } from "./redis";

type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfter: number };

const memBuckets = new Map<string, { count: number; expiresAt: number }>();

function memRateLimit(
  key: string,
  limit: number,
  windowSec: number,
): RateLimitResult {
  const now = Date.now();
  const existing = memBuckets.get(key);
  if (!existing || existing.expiresAt <= now) {
    memBuckets.set(key, { count: 1, expiresAt: now + windowSec * 1000 });
    return { ok: true, remaining: limit - 1 };
  }
  existing.count += 1;
  if (existing.count > limit) {
    return { ok: false, retryAfter: Math.ceil((existing.expiresAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - existing.count };
}

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number,
): Promise<RateLimitResult> {
  const r = getRedis();
  if (!r.ok) {
    // Redis unavailable — degrade to per-instance limiter so the form
    // doesn't break entirely. Reasonable for low-volume contact forms.
    return memRateLimit(key, limit, windowSec);
  }

  const redisKey = `rl:${key}`;
  try {
    const pipe = r.client.pipeline();
    pipe.incr(redisKey);
    pipe.ttl(redisKey);
    const res = (await pipe.exec()) ?? [];
    const incrRes = res[0]?.[1];
    const ttlRes = res[1]?.[1];
    const count = Number(incrRes ?? 0);
    if (count === 1 || ttlRes === -1) {
      await r.client.expire(redisKey, windowSec);
    }
    if (count > limit) {
      const ttl = Number(ttlRes ?? windowSec);
      return { ok: false, retryAfter: Math.max(1, ttl) };
    }
    return { ok: true, remaining: Math.max(0, limit - count) };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[ratelimit] redis error, falling back:", err);
    return memRateLimit(key, limit, windowSec);
  }
}

export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const xri = headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "0.0.0.0";
}
