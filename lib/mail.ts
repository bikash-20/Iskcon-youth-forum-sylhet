import { Resend } from "resend";
import { env } from "./env";

/**
 * Thin wrapper over Resend. Two send paths:
 *
 *   - notifyAdmin({ ... })   → one email to ADMIN_EMAIL with the submission
 *   - confirmUser({ ... })   → one email to the user acknowledging receipt
 *
 * Any failure is logged but swallowed at the call site — we always persist
 * to Redis first so the dashboard reflects what users submit even when the
 * SMTP/Resend call fails.
 */

let client: Resend | null = null;
function resend(): Resend {
  if (!client) client = new Resend(env.RESEND_API_KEY);
  return client;
}

type MailResult = { id: string } | { error: string };

async function safeSend(payload: Parameters<Resend["emails"]["send"]>[0]): Promise<MailResult> {
  try {
    const { data, error } = await resend().emails.send(payload);
    if (error) return { error: error.message };
    return { id: data?.id ?? "unknown" };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "unknown" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px;color:#5b1414;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:.08em">${label}</td><td style="padding:6px 12px;color:#1a1410">${escapeHtml(value)}</td></tr>`;
}

export type AdminNotifyPayload = {
  type?: "contact" | "volunteer";
  name: string;
  email: string;
  phone?: string;
  message?: string;
  skills?: string[];
  availability?: string;
  note?: string;
};

export async function notifyAdmin(
  payload: AdminNotifyPayload,
): Promise<MailResult> {
  const subject =
    payload.type === "contact"
      ? `[Contact] ${payload.name}`
      : `[Volunteer] ${payload.name}`;

  const adminRows =
    payload.type === "contact"
      ? `${row("Name", payload.name)}${row("Email", payload.email)}${row("Phone", payload.phone ?? "")}${row("Message", payload.message ?? "")}`
      : `${row("Name", payload.name)}${row("Email", payload.email)}${row("Phone", payload.phone ?? "")}${row("Availability", payload.availability ?? "")}${row("Skills", payload.skills?.join(", ") ?? "")}${row("Note", payload.note ?? "")}`;

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:auto;background:#fdfaf3;padding:24px;border:1px solid #e9d4a3">
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;color:#5b1414;font-size:24px;margin:0 0 8px">
        New ${payload.type} submission
      </h1>
      <p style="color:#3a2d24;font-size:14px;margin:0 0 16px">
        Someone just submitted the ${payload.type} form on ${escapeHtml(env.PUBLIC_SITE_NAME)}.
      </p>
      <table style="border-collapse:collapse;width:100%;background:#fff;border:1px solid #e9d4a3">
        ${adminRows}
      </table>
      <p style="color:#3a2d24;font-size:12px;margin:16px 0 0">
        View all submissions in the
        <a href="${escapeHtml(env.PUBLIC_SITE_URL)}/admin" style="color:#7a1d1d">admin dashboard</a>.
      </p>
    </div>`;

  const text =
    payload.type === "contact"
      ? `New contact message from ${payload.name} <${payload.email}>\n${payload.phone ? `Phone: ${payload.phone}\n` : ""}\n${payload.message ?? ""}`
      : `New volunteer signup: ${payload.name} <${payload.email}>\nPhone: ${payload.phone ?? ""}\nAvailability: ${payload.availability ?? ""}\nSkills: ${payload.skills?.join(", ") ?? ""}\n${payload.note ? `\n${payload.note}` : ""}`;

  return safeSend({
    from: env.MAIL_FROM,
    to: env.ADMIN_EMAIL,
    replyTo: payload.email,
    subject,
    html,
    text,
  });
}

export async function confirmUser(args: {
  to: string;
  name: string;
  kind: "contact" | "volunteer";
}): Promise<MailResult> {
  const greeting =
    args.kind === "contact"
      ? "Thank you for writing to us. We've received your message and the IYF team will reply soon."
      : "Thank you for stepping up to volunteer with ISKCON Youth Forum, Sylhet. The coordinator will reach out shortly with the next steps.";

  const subject =
    args.kind === "contact"
      ? `We received your message — ${env.PUBLIC_SITE_NAME}`
      : `You're on the volunteer list — ${env.PUBLIC_SITE_NAME}`;

  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:auto;background:#fdfaf3;padding:24px;border:1px solid #e9d4a3">
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;color:#5b1414;font-size:26px;margin:0 0 12px">
        Hare Kṛṣṇa, ${escapeHtml(args.name)}.
      </h1>
      <p style="color:#3a2d24;font-size:15px;line-height:1.55;margin:0 0 16px">
        ${greeting}
      </p>
      <p style="color:#3a2d24;font-size:14px;line-height:1.5;margin:0 0 6px">
        With gratitude,<br/>${escapeHtml(env.PUBLIC_SITE_NAME)}
      </p>
      <hr style="border:none;border-top:1px solid #e9d4a3;margin:20px 0" />
      <p style="color:#5b1414;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin:0">
        Sri Sri Rādhā Mādhava Mandir · Jugaltila, Sylhet
      </p>
    </div>`;

  const text = `Hare Krishna, ${args.name}.\n\n${greeting}\n\nWith gratitude,\n${env.PUBLIC_SITE_NAME}`;

  return safeSend({
    from: env.MAIL_FROM,
    to: args.to,
    subject,
    html,
    text,
  });
}
