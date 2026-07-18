import Redis, { type RedisOptions } from "ioredis";

/**
 * Single ioredis client, lazily created.
 *
 * Why a singleton? `ioredis` opens a real TCP connection and the server's
 * runtime (Vercel serverless, OpenNext, dev server) recycles between calls.
 * Re-opening on every request would be expensive and would force dozens of
 * TIME_WAIT sockets.
 *
 * Why ioredis, not @upstash/redis? The project uses Redis Cloud which
 * speaks plain RESP over `rediss://…` (TLS). ioredis is the canonical
 * Node client and supports TLS, auth, and the full command surface we use.
 *
 * Node runtime only — does NOT work in Edge. The `runtime` is configured
 * at the route level via `export const runtime = "nodejs"`.
 */

type ClientStatus = { ok: true; client: Redis } | { ok: false; reason: string };

let client: Redis | null = null;

export function getRedis(): ClientStatus {
  if (client) return { ok: true, client };
  const url = process.env.REDIS_URL;
  if (!url) return { ok: false, reason: "REDIS_URL is not set" };

  try {
    const opts: RedisOptions = {
      // ioredis infers `tls` from `rediss://`; we set it explicitly so a
      // future URL change can't silently downgrade.
      tls: url.startsWith("rediss://") ? {} : undefined,
      maxRetriesPerRequest: 3,
      enableOfflineQueue: true,
      retryStrategy: (times) => Math.min(times * 200, 2000),
    };
    client = new Redis(url, opts);
    client.on("error", (e) => {
      // eslint-disable-next-line no-console
      console.warn("[redis] error:", e.message);
    });
    return { ok: true, client };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "redis init failed",
    };
  }
}

export function requireRedis(): Redis {
  const r = getRedis();
  if (!r.ok) throw new Error(`Redis unavailable: ${r.reason}`);
  return r.client;
}