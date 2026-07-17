# IYF Sylhet — Frontend

The public website for **ISKCON Youth Forum, Sylhet** — the youth wing of
ISKCON Sylhet, based at Sri Sri Radha Madhava Mandir, Jugaltila.

Built with **Next.js 14** (App Router, TypeScript) and **Tailwind CSS**.
Elegant, mobile-first, and warm — typography-led, with a real video
background in the hero.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3 (custom palette: saffron, maroon, cream, ink)
- `next/font` — Cormorant Garamond (serif), Inter (sans),
  Tiro Devanagari Sanskrit (Devanagari headings)

## Run locally

```bash
cd "iyf-sylhet"
npm install
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

## Backend integration (planned)

The two API routes (`/api/contact`, `/api/volunteer`) currently log and
succeed. Replace them with calls to the Django backend (PostgreSQL) when
the API is up:

```ts
// app/api/contact/route.ts
await fetch(`${process.env.DJANGO_API}/api/contact-messages/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

## Notes on the hero video

The source `temple.mp4` is shipped in `public/media/` at its original
resolution. If a higher-quality render is later supplied, drop it in as
`temple-1080.mp4` and add a `<source>` element to `components/HeroVideo.tsx`.

## Deploy on Vercel

This project is Vercel-ready out of the box.

1. Push the repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "IYF Sylhet site"
   git branch -M main
   git remote add origin https://github.com/bikash-20/Iskcon-youth-forum-sylhet.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new> and import `bikash-20/Iskcon-youth-forum-sylhet`.
3. Vercel auto-detects **Next.js**. Leave the default Build Command (`npm run build`)
   and Output Directory (`.next`) — they're also pinned in `vercel.json`.
4. Click **Deploy**. Every subsequent push to `main` triggers a fresh
   production deploy. Pull requests get preview URLs automatically.

Environment variables (optional, set in the Vercel dashboard under
**Settings → Environment Variables**):

| Variable | Purpose |
| -------- | ------- |
| `DJANGO_API` | Base URL of the Django backend when `/api/contact` and `/api/volunteer` are wired up |

## CI

A GitHub Actions workflow at `.github/workflows/ci.yml` runs `typecheck`,
`lint`, and `build` on every push and pull request to `main`. Dependabot
(`.github/dependabot.yml`) opens weekly dependency PRs.
