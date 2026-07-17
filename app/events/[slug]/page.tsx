import Link from "next/link";
import { notFound } from "next/navigation";
import { UPCOMING_EVENTS } from "@/lib/content";

export function generateStaticParams() {
  return UPCOMING_EVENTS.map((e) => ({ slug: e.slug }));
}

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

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = UPCOMING_EVENTS.find((e) => e.slug === params.slug);
  if (!event) notFound();

  return (
    <article className="paper">
      <div className="mx-auto max-w-3xl px-5 pt-20 pb-10 sm:pt-28">
        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-sm text-maroon-700 hover:underline"
        >
          ← All events
        </Link>
        <p className="mt-6 font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          {event.start.startsWith("Every")
            ? event.start
            : `${formatDate(event.start)} · ${formatTime(event.start)}`}
          {event.end && !event.start.startsWith("Every")
            ? ` — ${formatTime(event.end)}`
            : ""}
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          {event.title}
        </h1>
        <p className="mt-3 text-sm text-ink-800/70">{event.location}</p>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-24 text-lg leading-relaxed text-ink-800/90">
        <p className="dropcap">{event.description}</p>

        {event.registration && (
          <Link
            href={event.registration}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-maroon-700 px-5 py-3 text-sm font-medium text-cream-50 hover:bg-maroon-800"
          >
            Register your attendance →
          </Link>
        )}

        <div className="hairline my-12" />

        <h2 className="font-serif text-2xl text-ink-900">A few things to know</h2>
        <ul className="mt-4 space-y-3 text-base">
          <li>
            · The temple is open to all — newcomers are warmly welcome.
          </li>
          <li>
            · Modest, comfortable clothing is appreciated; we sit on the floor
            for some kīrtans.
          </li>
          <li>
            · Prasādam is offered after sandhyā arati — please stay if you
            can.
          </li>
        </ul>
      </div>
    </article>
  );
}