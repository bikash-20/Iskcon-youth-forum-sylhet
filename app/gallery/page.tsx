import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Gallery · IYF Sylhet",
  description:
    "Moments from kīrtans, festivals, classes, and the quiet in between at Sri Sri Radha Madhava Mandir, Jugaltila.",
};

export default function GalleryPage() {
  return (
    <article className="paper">
      {/* ----- Hero band ----- */}
      <section className="relative overflow-hidden">
        {/* Warm halo behind the title */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_420px_at_50%_-10%,rgba(245,165,36,0.18),transparent_65%)]"
        />
        <div className="mx-auto max-w-5xl px-5 pt-20 pb-12 sm:pt-28 sm:pb-16">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-maroon-700/80">
              <span aria-hidden className="h-px w-8 bg-maroon-700/40" />
              Gallery · Plates from the temple
            </p>
          </Reveal>

          <Reveal delay={80} y={20}>
            <h1 className="mt-5 font-serif text-6xl sm:text-7xl leading-[1.02] text-ink-900 tracking-tightish">
              Moments from <span className="italic text-maroon-700">the temple.</span>
            </h1>
          </Reveal>

          <Reveal delay={160} y={16}>
            <p className="mt-4 font-deva text-2xl text-maroon-700/90">
              क्षणत्रयं चिन्तय लोचनाभ्यां
            </p>
          </Reveal>

          <Reveal delay={220} y={14}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-800/80">
              A small, growing set of plates — kīrtans, festivals, classes, and
              the quiet in between. Each one is a memory of the year; together
              they're a devotional sketchbook.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex items-center gap-4">
              <span className="font-serif text-sm italic text-ink-800/60">
                Eight plates, hand-drawn in the brand palette.
              </span>
              <span aria-hidden className="hairline w-32" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----- Filter rail + mosaic (client) ----- */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Gallery />
      </section>

      {/* ----- Closing band ----- */}
      <section className="border-t border-maroon-700/10 bg-maroon-700/[0.03]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <Reveal>
            <p className="font-serif text-3xl sm:text-4xl leading-snug text-ink-900 tracking-tightish">
              “Dwell, for a moment, in each frame — then carry it with you.”
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800/75">
              New plates arrive after every festival and class. For the
              full, rolling collection — including video from kīrtan nights —
              follow the Forum's{" "}
              <a
                href="https://www.facebook.com/iyfsyl"
                target="_blank"
                rel="noreferrer"
                className="text-maroon-700 underline-offset-4 hover:underline"
              >
                Facebook page
              </a>{" "}
              and{" "}
              <a
                href="https://www.youtube.com/results?search_query=gauradesh+tv"
                target="_blank"
                rel="noreferrer"
                className="text-maroon-700 underline-offset-4 hover:underline"
              >
                live temple stream
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/iyfsyl"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-maroon-700 px-5 py-2.5 text-sm font-medium text-cream-50 shadow-soft transition-all hover:-translate-y-0.5"
              >
                Follow on Facebook
                <span aria-hidden>→</span>
              </a>
              <a
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-maroon-700/30 px-5 py-2.5 text-sm font-medium text-maroon-800 transition-all hover:-translate-y-0.5 hover:bg-maroon-700/5"
              >
                See upcoming events
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
