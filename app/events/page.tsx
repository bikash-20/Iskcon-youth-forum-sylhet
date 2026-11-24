import type { Metadata } from "next";
import Link from "next/link";
import MotionCard from "@/components/MotionCard";
import { UPCOMING_EVENTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events & Festivals | ISKCON Youth Forum Sylhet · ISKCON Mandir",
  description:
    "Upcoming festivals, youth seminars, Krishna Leela Mela (Janmashtami), Narasimha Jayanti, and Sunday kirtans at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir).",
  keywords: [
    "iskcon sylhet events",
    "janmashtami sylhet iskcon",
    "kirtan sylhet",
    "iskcon youth forum sylhet events",
    "sylhet iskcon festival dates",
    "jugaltila mandir celebrations",
  ],
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Festivals | ISKCON Youth Forum Sylhet",
    description:
      "Celebrate festivals, attend Sunday kirtans, and participate in youth retreats at Sri Sri Radha Madhava Mandir.",
    url: "/events",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function EventsPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-12 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          ISKCON Youth Forum Sylhet · Festivals & Gatherings
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Festivals, Kīrtans & Youth Retreats
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          Experience the spiritual calendar at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir) — Janmāṣṭamī Krishna Leela Mela,
          Nṛsiṁha Caturdaśī, Ratha-yātrā, Be SMART orientation, and Sunday youth kīrtans in Jugaltila.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-24">
        <ul className="grid gap-5">
          {UPCOMING_EVENTS.map((e, i) => (
            <MotionCard
              key={e.slug}
              as="li"
              delay={i * 0.07}
              id={e.slug}
              className="h-full"
            >
            <div
              className={`h-full rounded-2xl border bg-cream-50 p-7 shadow-soft sm:p-8 ${
                e.isFeatured
                  ? "border-maroon-700/40"
                  : "border-maroon-700/10"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                  {e.start.startsWith("Every")
                    ? e.start
                    : `${formatDate(e.start)} · ${formatTime(e.start)}`}
                </p>
                {e.isFeatured && (
                  <span className="rounded-full bg-saffron-200 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-maroon-800">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-serif text-3xl text-ink-900">
                <Link href={`/events/${e.slug}`} className="hover:text-maroon-700">
                  {e.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-ink-800/70">{e.location}</p>
              <p className="mt-4 text-base leading-relaxed text-ink-800/90">
                {e.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/events/${e.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-maroon-700 hover:underline"
                >
                  More details →
                </Link>
                {e.registration && (
                  <Link
                    href={e.registration}
                    className="inline-flex items-center gap-2 rounded-full bg-maroon-700 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-maroon-800"
                  >
                    Register
                  </Link>
                )}
              </div>
            </div>
            </MotionCard>
          ))}
        </ul>
      </div>
    </article>
  );
}
