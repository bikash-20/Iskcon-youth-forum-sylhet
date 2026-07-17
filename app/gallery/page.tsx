export const metadata = {
  title: "Gallery · IYF Sylhet",
  description: "Moments from kīrtans, festivals, and the temple life.",
};

const TILES = [
  { label: "Sandhyā Arati", caption: "Friday evening" },
  { label: "Sunday Kīrtan", caption: "Open courtyard" },
  { label: "Janmāṣṭamī Mela", caption: "Midnight abhishek" },
  { label: "Gītā Class", caption: "IYF Hall" },
  { label: "Be SMART", caption: "Batch of Spring 2026" },
  { label: "Ratha-yatrā", caption: "Procession" },
  { label: "Prasādam Hall", caption: "After arati" },
  { label: "Children's Class", caption: "Saturday morning" },
];

export default function GalleryPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-10 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Gallery
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Moments from the temple.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          A small selection of recent photos — kīrtans, festivals, classes,
          and the quiet moments between.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((t, i) => (
            <figure
              key={t.label}
              className={`group relative overflow-hidden rounded-2xl border border-maroon-700/10 bg-cream-50 shadow-soft ${
                i % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`aspect-square w-full bg-gradient-to-br ${
                  [
                    "from-saffron-200 via-cream-200 to-maroon-100",
                    "from-maroon-100 via-cream-100 to-saffron-100",
                    "from-cream-200 via-saffron-100 to-maroon-100",
                    "from-maroon-200 via-cream-100 to-cream-200",
                  ][i % 4]
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/80 to-transparent p-4 text-cream-50">
                <p className="font-serif text-lg">{t.label}</p>
                <p className="text-xs text-cream-50/80">{t.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-800/60">
          More on our{" "}
          <a
            href="https://www.facebook.com/iyfsyl"
            target="_blank"
            rel="noreferrer"
            className="text-maroon-700 underline"
          >
            Facebook page
          </a>
          .
        </p>
      </div>
    </article>
  );
}
