import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { COURSES } from "@/lib/content";

export const metadata = {
  title: "Programs & Courses · IYF Sylhet",
  description:
    "Be SMART, Scripture Study, Kīrtan training, Discover Yourself (DYS), Stress Management through the Gītā, and Leadership & Personality Development — from the ISKCON Youth Forum, Sylhet.",
};

export default function ProgramsPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-12 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Programs & Courses
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Three small doors into a bigger life.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          Our courses are short, practical, and held in person at the mandir.
          Newcomers are warmly welcome — no prior study required.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-24">
        <div className="space-y-6">
          {COURSES.map((c) => (
            <section
              id={c.slug}
              key={c.slug}
              className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft sm:p-10"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="lg:max-w-xl">
                  <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                    Course
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-ink-900">
                    {c.title}
                  </h2>
                  <p className="mt-2 font-serif text-base italic text-maroon-700">
                    {c.tagline}
                  </p>
                </div>
                <div className="text-sm text-ink-800/80 lg:text-right">
                  <p className="font-medium text-ink-900">{c.duration}</p>
                  {c.nextBatch && <p className="mt-1">{c.nextBatch}</p>}
                  {c.registration && (
                    <Link
                      href={c.registration}
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-maroon-700 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-maroon-800"
                    >
                      Register interest →
                    </Link>
                  )}
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed text-ink-800/90">
                {c.description}
              </p>

              <div className="hairline my-7" />

              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                What we'll cover
              </p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                {c.modules.map((m, i) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 rounded-xl bg-cream-100/60 px-4 py-3 text-sm text-ink-800"
                  >
                    <span className="font-serif text-maroon-700">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <SectionHeading
          eyebrow="Curious but not yet ready?"
          title="Come to a satsanga first."
          description="All our courses are introduced at a public satsanga before each batch begins. You'll meet the teachers, see the material, and decide."
        />
        <div className="mt-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-maroon-700/30 px-5 py-2.5 text-sm font-medium text-maroon-700 hover:bg-maroon-700 hover:text-cream-50 transition-colors"
          >
            See upcoming orientations →
          </Link>
        </div>
      </div>
    </article>
  );
}
