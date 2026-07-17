import { VERSE_OF_THE_DAY, THOUGHT_OF_THE_DAY } from "@/lib/content";

export default function VerseAndThought() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-8 sm:mt-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-maroon-700/10 bg-gradient-to-br from-cream-50 to-cream-100 p-7 shadow-soft sm:p-9">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
            Verse of the day
          </p>
          <p
            className="mt-5 font-deva text-3xl leading-snug text-maroon-700 sm:text-4xl"
          >
            {VERSE_OF_THE_DAY.sanskrit}
          </p>
          <p className="mt-3 font-serif italic text-ink-800/90">
            {VERSE_OF_THE_DAY.transliteration}
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink-800/90">
            {VERSE_OF_THE_DAY.meaning}
          </p>
          <p className="mt-4 text-xs uppercase tracking-wider text-maroon-700/70">
            — {VERSE_OF_THE_DAY.source}
          </p>
        </div>

        <div className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft sm:p-9">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
            Thought of the day
          </p>
          <p className="mt-5 font-serif text-2xl leading-snug text-ink-900 sm:text-3xl">
            “{THOUGHT_OF_THE_DAY.text}”
          </p>
          <p className="mt-5 text-xs uppercase tracking-wider text-maroon-700/70">
            — {THOUGHT_OF_THE_DAY.source}
          </p>
        </div>
      </div>
    </section>
  );
}
