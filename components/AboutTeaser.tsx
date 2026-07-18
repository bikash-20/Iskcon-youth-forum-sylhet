import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { DEITIES } from "@/lib/content";

export default function AboutTeaser() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8 sm:mt-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About"
            title="Where scripture meets the rhythm of a young life."
          />
          <p className="mt-6 dropcap text-lg leading-relaxed text-ink-800/90">
            IYF Sylhet is the youth wing of ISKCON Sylhet — a circle that grew
            out of the everyday life of Sri Sri Radha Madhava Mandir. Most of
            us are students or early in our careers; a few are teachers,
            artists, and parents. We meet for kirtan, for classes, and for the
            quieter work of becoming better people.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-800/90 text-wrap: pretty">
            Our roots are in the Brahma-Madhva-Gaudiya tradition, and our
            teacher is the lineage of Srila Prabhupada. The practice is
            simple: hear about Krishna, chant His names, eat together, and
            carry that warmth into ordinary days.
          </p>

          <div className="mt-7">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-medium text-maroon-700 hover:underline"
            >
              More about IYF →
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="accent-ribbon rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft">
            <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-maroon-700/80">
              The deities
            </p>
            <ul className="mt-4 divide-y divide-maroon-700/10">
              {DEITIES.map((d) => (
                <li
                  key={d.name}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span className="font-deva text-lg text-ink-900">{d.name}</span>
                  <span className="text-xs uppercase tracking-wider text-maroon-700/70">
                    {d.note}
                  </span>
                </li>
              ))}
            </ul>
            <div className="hairline my-6" />
            <p className="font-deva text-2xl text-maroon-700">
              सत्‍यं शिवं सुन्दरम्
            </p>
            <p className="mt-1 text-xs text-ink-800/60">
              Truth, goodness, beauty — our threefold offering.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}