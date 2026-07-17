import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // TODO: forward to Django backend at POST /api/contact-messages/
    // For now, just log so the frontend is end-to-end usable.
    // eslint-disable-next-line no-console
    console.log("[contact]", data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
