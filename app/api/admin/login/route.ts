import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { AdminLoginSchema } from "@/lib/schema";
import { createSessionToken, safeEqual, SESSION_COOKIE } from "@/lib/session";
import { fail, methodNotAllowed, ok } from "@/lib/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (req.method !== "POST") return methodNotAllowed(["POST"]);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid JSON body", "bad_json");
  }

  const parsed = AdminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return fail(422, "Password is required", "validation");
  }

  if (!safeEqual(parsed.data.password, env.ADMIN_PASSWORD)) {
    // Constant delay to flatten timing signal a touch.
    await new Promise((r) => setTimeout(r, 250));
    return fail(401, "Wrong password", "bad_credentials");
  }

  const token = createSessionToken();
  cookies().set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: env.SESSION_TTL_SECONDS,
  });

  return ok({ ok: true });
}

export async function GET() {
  return methodNotAllowed(["POST"]);
}