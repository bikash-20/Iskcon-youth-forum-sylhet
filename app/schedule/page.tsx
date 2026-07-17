import LiveScheduleCard from "@/components/LiveScheduleCard";
import VerseAndThought from "@/components/VerseAndThought";
import FestivalCalendar from "@/components/FestivalCalendar";
import { DAILY_PROGRAMME } from "@/lib/content";

export const metadata = {
  title: "Every Day at the Mandir · IYF Sylhet",
  description:
    "Darshan, arati, classes, and festivals at Sri Sri Radha Madhava Mandir, Jugaltila.",
};

export default function SchedulePage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-10 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Every day at the mandir
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Darshan & Arati Schedule
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          Timings shift slightly with the seasons. Mangal Arati begins before
          sunrise — please arrive quietly.
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
        {DAILY_PROGRAMME.map((p) => {
          const isCloses = p.kind === "closes";
          const isOpens = p.kind === "opens";
          return (
            <li key={`${p.time}-${p.name}`} className="relative">
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
            </li>
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
