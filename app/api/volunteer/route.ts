import crypto from "node:crypto";
import { VolunteerSchema, type VolunteerInput } from "@/lib/schema";
import { methodNotAllowed } from "@/lib/http";
import { withSubmission } from "@/lib/forms";
import type { VolunteerSubmission } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 3 volunteer signups per hour per IP (lower because the form is longer
// and the workload of follow-up is non-trivial).
const RATE = { key: "volunteer", limit: 3, windowSec: 60 * 60 };

const build = (
  data: VolunteerInput,
  meta: { ip: string; userAgent: string },
): VolunteerSubmission => ({
  id: crypto.randomUUID(),
  kind: "volunteer",
  createdAt: Date.now(),
  ip: meta.ip,
  userAgent: meta.userAgent,
  name: data.name,
  email: data.email,
  phone: data.phone,
  skills: data.skills,
  availability: data.availability,
  note: data.note,
});

export const POST = withSubmission({
  schema: VolunteerSchema,
  rateLimit: RATE,
  kind: "volunteer",
  build,
});

export function GET() {
  return methodNotAllowed(["POST"]);
}
