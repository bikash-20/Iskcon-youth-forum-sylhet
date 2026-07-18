import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { UPCOMING_EVENTS } from "@/lib/content";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UpcomingEvents() {
  return (
    <section className="paper mt-24 sm:mt-28 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What's on"
            title="Upcoming events"
            description="Kirtans, festivals, orientations, and community gatherings."
          />
          <Link
            href="/events"
            className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-medium text-maroon-700 hover:underline"
          >
            All events →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {UPCOMING_EVENTS.map((e, i) => {
            const isRecurring = e.start.startsWith("Every");
            return (
              <Reveal key={e.slug} delay={i * 100} y={18}>
                <Link
                  href={`/events/${e.slug}`}
                  className={`card-elevate accent-ribbon group relative block h-full overflow-hidden rounded-2xl border bg-cream-50 p-7 shadow-soft ${
                    e.isFeatured
                      ? "border-maroon-700/40 ring-1 ring-maroon-700/20"
                      : "border-maroon-700/10"
                  }`}
                >
                  {e.isFeatured && (
                    <span className="absolute right-5 top-5 rounded-full bg-saffron-200 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-maroon-800">
                      Featured
                    </span>
                  )}
                  <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                    {isRecurring ? e.start : `${formatDate(e.start)} · ${formatTime(e.start)}`}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-ink-900">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-800/80">{e.location}</p>
                  <p className="mt-4 text-base leading-relaxed text-ink-800/90">
                    {e.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-maroon-700">
                    Details
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
