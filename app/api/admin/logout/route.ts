import { cookies } from "next/headers";
import { ok, methodNotAllowed } from "@/lib/http";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  cookies().set({
    name: SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return ok({ ok: true });
}

export async function GET() {
  return methodNotAllowed(["POST"]);
}