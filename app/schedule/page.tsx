import type { Metadata } from "next";
import LiveScheduleCard from "@/components/LiveScheduleCard";
import VerseAndThought from "@/components/VerseAndThought";
import FestivalCalendar from "@/components/FestivalCalendar";
import MotionCard from "@/components/MotionCard";
import { DAILY_PROGRAMME } from "@/lib/content";

export const metadata: Metadata = {
  title: "Darshan & Arati Timings | Sylhet ISKCON Mondir Schedule · IYF Sylhet",
  description:
    "Official daily Darshan and Arati schedule at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila. Mangal Arati 4:30 AM, Sandhya Arati 7:00 PM, and Bhagavatam classes.",
  keywords: [
    "iskcon sylhet darshan time",
    "sylhet iskcon mondir aarti schedule",
    "iskcon sylhet schedule",
    "jugaltila iskcon mandir opening time",
    "sri sri radha madhava mandir darshan",
    "mangal arati iskcon sylhet",
    "sandhya arati iskcon sylhet",
    "সিলেট ইস্কন দর্শন সময়",
  ],
  alternates: {
    canonical: "/schedule",
  },
  openGraph: {
    title: "Darshan & Arati Timings | Sylhet ISKCON Mondir Schedule",
    description:
      "Daily temple schedule, darshan hours, and festival timings at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila.",
    url: "/schedule",
  },
};

export default function SchedulePage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-10 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Sri Sri Radha Madhava Mandir · Sylhet ISKCON Mondir
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Darshan & Arati Schedule
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          Daily temple darshan and prayer timings at Sri Sri Radha Madhava Mandir (Sylhet ISKCON Mondir), Jugaltila. Mangal Arati begins at 4:30 AM before sunrise — please arrive quietly.
        </p>
      </div>

      <FullDayTimeline />
      <LiveScheduleCard />
      <VerseAndThought />
      <FestivalCalendar />
    </article>
  );
}

function FullDayTimeline() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-8">
      <ol className="relative space-y-6 border-l border-maroon-700/15 pl-7">
        {DAILY_PROGRAMME.map((p, i) => {
          const isCloses = p.kind === "closes";
          const isOpens = p.kind === "opens";
          return (
            <MotionCard
              key={`${p.time}-${p.name}`}
              as="li"
              delay={i * 0.06}
              className="relative"
            >
              <span
                aria-hidden
                className={`absolute -left-[33px] top-1.5 grid h-4 w-4 place-items-center rounded-full ring-4 ring-cream-50 ${
                  isCloses
                    ? "bg-ink-800/50"
                    : isOpens
                      ? "bg-saffron-500"
                      : "bg-maroon-700"
                }`}
              />
              <p
                className={`font-sans text-xs uppercase tracking-[0.22em] ${
                  isCloses ? "text-ink-800/70" : "text-maroon-700/80"
                }`}
              >
                {format12(p.time)}
              </p>
              <h3 className="mt-1 font-serif text-2xl text-ink-900">
                {p.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-800/85">
                {p.description}
              </p>
            </MotionCard>
          );
        })}
      </ol>
    </section>
  );
}

function format12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}
