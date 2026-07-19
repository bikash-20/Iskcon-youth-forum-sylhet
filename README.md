# IYF Sylhet — Frontend + Backend

The public website for **ISKCON Youth Forum, Sylhet** — the youth wing of
ISKCON Sylhet, based at Sri Sri Radha Madhava Mandir, Jugaltila.

Built with **Next.js 14** (App Router, TypeScript) and **Tailwind CSS**.
Elegant, mobile-first, and warm — typography-led, with a real video
background in the hero. Ships with a full **admin backend**: contact &
volunteer forms, rate limiting, HMAC-signed admin sessions, CSV export,
transactional email.

## Stack

- Next.js 14 (App Router, TypeScript strict + `noUnusedLocals`)
- Tailwind CSS 3 (custom palette: saffron, maroon, cream, ink)
- `next/font` — Cormorant Garamond (serif), Inter (sans),
  Tiro Devanagari Sanskrit (Devanagari headings)
- **Upstash Redis** (TCP/TLS via `ioredis`) for persistence
- **Resend** for transactional email
- **Zod** for server-side validation
- **HMAC-SHA256** stateless session cookies — no external auth dep

## Run locally

```bash
npm install
cp .env.example .env.local      # then fill in the values
npm run dev
```

Then open <http://localhost:3000>.

Useful scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
npm run format      # prettier --write .
```

## Pages

| Path | Purpose |
| ---- | ------- |
| `/` | Home — hero video, quick cards, about teaser, upcoming events, live darshan |
| `/about` | About IYF, lineage, deities |
| `/programs` | Courses — Be SMART, Scripture Study, Kīrtan |
| `/schedule` | Daily temple schedule |
| `/events` | List of events + `/events/[slug]` detail |
| `/gallery` | Photo gallery |
| `/visit` | Address, map, transport |
| `/contact` | Contact form + volunteer signup |
| `/admin` | Password-gated dashboard for messages + volunteer signups |

## How the backend works

Both `/contact` and `/volunteer` POST to `/api/contact` and
`/api/volunteer` respectively. Each route runs the
`withSubmission({ schema, kind, toSubmission, subject })` orchestrator
in `lib/forms.ts`, which:

1. Parses and validates the JSON body with **Zod** (`lib/schema.ts`)
   — trims, lowercases, length-caps, and rejects a hidden honeypot
   field.
2. Applies a **sliding-window rate limit** keyed by client IP
   (`lib/rateLimit.ts`) — contact 5/10 min, volunteer 3/hour, with an
   in-memory fallback if Redis is unreachable.
3. Persists the submission to **Redis** under `sub:<uuid>` (with a
   90-day TTL) and indexes into `subs:contact`, `subs:volunteer`, and
   `subs:all` sorted sets (`lib/store.ts`).
4. Fires two emails via **Resend** (`lib/mail.ts`) — one to the admin,
   one to the user — in parallel using `Promise.allSettled`. Email
   failures do **not** roll back the submission; the dashboard always
   shows what was submitted.

The admin dashboard at `/admin` reads from the same Redis store. Sign
in with the `ADMIN_PASSWORD` env var. Sessions are **HMAC-SHA256
signed cookies** (`lib/session.ts`), 12-hour TTL by default, with a
constant-time password comparison.

## Environment variables

All env access flows through the typed env object in lib/env.ts.

| Var | Required | Purpose |
| --- | --- | --- |
| ADMIN_PASSWORD | yes | Password for the admin dashboard |
| SESSION_SECRET | yes | HMAC key for signing cookies |
| RESEND_API_KEY | yes | API key for Resend |
| MAIL_FROM | yes | Verified sender on Resend |
| ADMIN_EMAIL | yes | Inbox for admin notifications |
| REDIS_URL | yes | Upstash connection string |
| PUBLIC_SITE_NAME | no | Display name in emails |
| PUBLIC_SITE_URL | no | Absolute URL for emails |
| SESSION_COOKIE_NAME | no | Cookie name |
| SESSION_TTL_SECONDS | no | Session lifetime |
| SUBMISSION_TTL_SECONDS | no | Submission retention |


## Deploy on Render (free)

This repo ships with a render.yaml blueprint, so deploying is one click:

1. In the Render dashboard, click New then Blueprint.
2. Connect this repo. Render auto-detects render.yaml and creates the service.
3. Render prompts for the secret env vars (marked sync: false): ADMIN_PASSWORD, SESSION_SECRET, RESEND_API_KEY, ADMIN_EMAIL, REDIS_URL, PUBLIC_SITE_URL.
4. Click Apply. Render builds and deploys to your free onrender.com hostname.

Free-tier caveat: instances sleep after 15 min of inactivity (~30s cold start). Sign up for free at UptimeRobot and ping your URL every 5 minutes to keep it warm.

## Deploy on Vercel (also free)

1. Push to GitHub and import into Vercel.
2. In Settings then Environment Variables, add every required var.
3. Deploy.

## Free-tier cost summary

| Service | Free tier | Enough for |
| --- | --- | --- |
| Render Web Service | 750 hrs/mo, sleeps after 15 min idle | Hobby / community site |
| Vercel | 100 GB bandwidth/mo | Hobby / community site |
| Upstash Redis | 256 MB, 10K cmds/day | about 5,000 submissions stored |
| Resend | 100 emails/day, 3,000/mo | Small to moderate traffic |
| Total | $0/mo | works for free |

## CI

A GitHub Actions workflow at .github/workflows/ci.yml runs typecheck, lint, and build on every push and pull request to main.

## Security notes

- All env access flows through lib/env.ts (single source of truth)
- Admin session is an HMAC-signed cookie - stateless, no DB lookup
- Password compare uses crypto.timingSafeEqual (constant-time)
- All form routes rate-limited per IP
- Forms validate, trim, lowercase, and length-cap via Zod
- Honeypot field rejects bots
- /admin is noindex,nofollow
