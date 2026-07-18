/**
 * Redis-only persistence layer for form submissions.
 *
 * Storage model (one sorted set per kind + one for "all"):
 *   - sub:<uuid>      string : the submission JSON (TTL'd)
 *   - subs:contact     zset  : recent contacts, scored by epoch ms
 *   - subs:volunteer   zset  : recent volunteers, scored by epoch ms
 *   - subs:all         zset  : everything together, for the dashboard
 *
 * Submissions are kept for SUBMISSION_TTL_SECONDS (default 90 days), then
 * lazily GC'd on read.
 */

import { requireRedis } from "./redis";

export type SubmissionKind = "contact" | "volunteer";

export type SubmissionBase = {
  id: string;
  kind: SubmissionKind;
  createdAt: number; // epoch ms
  ip: string;
  userAgent: string;
};

export type ContactSubmission = SubmissionBase & {
  kind: "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export type VolunteerSubmission = SubmissionBase & {
  kind: "volunteer";
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  note?: string;
};

export type Submission = ContactSubmission | VolunteerSubmission;

const SUBMISSION_TTL_SECONDS = Number(
  process.env.SUBMISSION_TTL_SECONDS ?? 60 * 60 * 24 * 90, // 90 days
);

const idKey = (id: string) => `sub:${id}`;
const zsetKey = (kind: SubmissionKind) => `subs:${kind}`;
const allKey = () => `subs:all`;

/** Best-effort lazy GC: removes ids whose TTL string has expired. */
async function gc(): Promise<void> {
  try {
    const cutoff = Date.now() - SUBMISSION_TTL_SECONDS * 1000;
    const r = requireRedis();
    const stale = (await r.zrangebyscore(allKey(), 0, cutoff)) as string[];
    if (Array.isArray(stale) && stale.length > 0) {
      const keys = stale.map(idKey);
      const pipe = r.pipeline();
      pipe.del(...keys);
      pipe.zrem(zsetKey("contact"), ...stale);
      pipe.zrem(zsetKey("volunteer"), ...stale);
      pipe.zrem(allKey(), ...stale);
      await pipe.exec();
    }
  } catch (err) {
    // GC is best-effort; never fail a submission over it.
    // eslint-disable-next-line no-console
    console.warn("[store] gc failed", err);
  }
}

export async function saveSubmission(s: Submission): Promise<void> {
  const r = requireRedis();
  const id = s.id;
  const score = s.createdAt;
  const pipe = r.pipeline();
  pipe.set(idKey(id), JSON.stringify(s), "EX", SUBMISSION_TTL_SECONDS);
  pipe.zadd(zsetKey(s.kind), score, id);
  pipe.zadd(allKey(), score, id);
  const results = await pipe.exec();
  if (!results) throw new Error("redis pipeline returned no result");
  for (const [err] of results) {
    if (err) throw err;
  }
}

export async function getSubmission(id: string): Promise<Submission | null> {
  const r = requireRedis();
  const v = await r.get(idKey(id));
  if (!v) return null;
  try {
    return JSON.parse(v) as Submission;
  } catch {
    return null;
  }
}

export async function listSubmissions(
  opts: { kind?: SubmissionKind | "all"; limit?: number } = {},
): Promise<Submission[]> {
  await gc();
  const r = requireRedis();
  const limit = Math.min(opts.limit ?? 100, 500);
  const zset =
    opts.kind && opts.kind !== "all" ? zsetKey(opts.kind) : allKey();

  const ids = (await r.zrevrange(zset, 0, limit - 1)) as string[];
  if (ids.length === 0) return [];

  const values = await Promise.all(
    ids.map((id) => r.get(idKey(id))),
  );
  const out: Submission[] = [];
  for (const v of values) {
    if (!v) continue;
    try {
      out.push(JSON.parse(v) as Submission);
    } catch {
      // Skip malformed record rather than fail the whole list.
    }
  }
  return out;
}

export async function countSubmissions(): Promise<{
  contact: number;
  volunteer: number;
}> {
  const r = requireRedis();
  const [c, v] = await Promise.all([
    r.zcard(zsetKey("contact")),
    r.zcard(zsetKey("volunteer")),
  ]);
  return { contact: Number(c ?? 0), volunteer: Number(v ?? 0) };
}

export async function deleteSubmission(id: string): Promise<void> {
  const r = requireRedis();
  const s = await getSubmission(id);
  if (s) {
    await Promise.all([
      r.del(idKey(id)),
      r.zrem(zsetKey(s.kind), id),
      r.zrem(allKey(), id),
    ]);
  } else {
    await r.del(idKey(id));
  }
}
