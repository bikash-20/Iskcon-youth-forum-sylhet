import crypto from "node:crypto";
import { ContactSchema, type ContactInput } from "@/lib/schema";
import { methodNotAllowed } from "@/lib/http";
import { withSubmission } from "@/lib/forms";
import type { ContactSubmission } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 5 contact messages per hour per IP.
const RATE = { key: "contact", limit: 5, windowSec: 60 * 60 };

const build = (
  data: ContactInput,
  meta: { ip: string; userAgent: string },
): ContactSubmission => ({
  id: crypto.randomUUID(),
  kind: "contact",
  createdAt: Date.now(),
  ip: meta.ip,
  userAgent: meta.userAgent,
  name: data.name,
  email: data.email,
  phone: data.phone,
  message: data.message,
});

export const POST = withSubmission({
  schema: ContactSchema,
  rateLimit: RATE,
  kind: "contact",
  build,
});

export function GET() {
  return methodNotAllowed(["POST"]);
}
