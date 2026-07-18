# IYF Sylhet — Frontend

The public website for **ISKCON Youth Forum, Sylhet** — the youth wing of
ISKCON Sylhet, based at Sri Sri Radha Madhava Mandir, Jugaltila.

Built with **Next.js 14** (App Router, TypeScript) and **Tailwind CSS**.
Elegant, mobile-first, and warm — typography-led, with a real video
background in the hero.

## Stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS 3 (custom palette: saffron, maroon, cream, ink)
- `next/font` — Cormorant Garamond (serif), Inter (sans),
  Tiro Devanagari Sanskrit (Devanagari headings)
- **Upstash Redis** for persistence (submissions)
- **Resend** for transactional email
- **Zod** for server-side validation

## Run locally

```bash
cd "iyf-sylhet"
npm install
cp .env.example .env.local      # then fill in the values
npm run dev
```

Then open <http://localhost:3000>.

## Pages

| Path | Purpose |
| ---- | ------- |
| `/` | Home — hero video, quick cards, about teaser, upcoming events, live darshan |
| `/about` | About IYF, lineage, deities |
| `/programs` | Courses — Be SMART, Scripture Study, Kīrtan |
| `/schedule` | Daily temple schedule |
| `/events` | List of events + `/events/[slug]` detail |
| `/gallery` | Photo gallery (placeholder tiles) |
| `/visit` | Address, map, transport |
| `/contact` | Contact form + volunteer signup |
| `/admin` | Password-gated dashboard for submitted messages and volunteer signups |

## How the forms work

Both `/contact` and `/volunteer` POST to `/api/contact` and
`/api/volunteer` respectively. Each route:

1. Parses and validates the JSON body with **Zod** (`lib/schema.ts`).
2. Checks a hidden **honeypot** field — any non-empty value is treated as
   spam and silently 400'd.
3. Applies a **sliding-window rate limit** keyed by client IP
   (`lib/rateLimit.ts`): contact 5/10min, volunteer 3/hour.
4. Persists the submission to **Upstash Redis** under
   `sub:<uuid>` (with a 90-day TTL) and indexes into `subs:contact`,
   `subs:volunteer`, and `subs:all` sorted sets.
5. Fires two emails via **Resend** (`lib/mail.ts`) — one to the admin,
   one to the user — in parallel using `Promise.allSettled`. Email
   failures do **not** roll back the submission; the dashboard always
   shows what was submitted.

The admin dashboard at `/admin` reads from the same Redis store. Sign in
with the `ADMIN_PASSWORD` env var. Sessions are **HMAC-SHA256 signed
cookies** (custom, no external auth dep), 12-hour TTL by default.

## Environment variables

| Var | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | **yes** | Password for the `/admin` dashboard |
| `SESSION_SECRET` | **yes** | HMAC key for signing session cookies (≥32 chars) |
| `RESEND_API_KEY` | **yes** | API key from <https://resend.com/api-keys> |
| `MAIL_FROM` | **yes** | Verified sender (e.g. `IYF Sylhet <noreply@yourdomain.org>`) |
| `ADMIN_EMAIL` | **yes** | Where admin notifications are delivered |
| `REDIS_URL` | **yes** | Upstash **REST** URL — e.g. `https://…upstash.io`. The `redis://…` TCP form is rejected by the SDK. |
| `REDIS_TOKEN` | **yes** | Upstash REST token |
| `PUBLIC_SITE_NAME` | no | Display name in emails — default `ISKCON Youth Forum, Sylhet` |
| `PUBLIC_SITE_URL` | no | Absolute URL for links in admin emails — default `http://localhost:3000` |

> Upstash gives you **two URL forms**. The dashboard's *REST* URL with the
> accompanying token is what this app uses. Do **not** paste the
> `redis://…@…upstash.io:17876` TCP URL — the `@upstash/redis` client
> speaks REST, not TCP.

## Deploy on Vercel

1. Push to GitHub and import into Vercel.
2. In **Settings → Environment Variables**, add every required var above.
3. Deploy. The `/admin` route is at `https://your-domain/admin`.

## CI

A GitHub Actions workflow at `.github/workflows/ci.yml` runs
`typecheck`, `lint`, and `build` on every push and pull request to `main`.
Dependabot (`.github/dependabot.yml`) opens weekly dependency PRs.
