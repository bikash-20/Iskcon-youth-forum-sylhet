import Link from "next/link";

export default function LiveDarshanCard() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 sm:mt-24">
      <div className="accent-ribbon grid gap-6 rounded-3xl border border-maroon-700/10 bg-gradient-to-br from-maroon-700 to-maroon-800 p-8 sm:p-12 lg:grid-cols-2 lg:gap-10 lg:p-16 shadow-soft">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.22em] text-saffron-200 eyebrow-line">
            Sandhyā Arati · Kīrtan
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-cream-50 tracking-tightish display-tight">
            Live darshan from the mandir
          </h2>
          <p className="mt-4 max-w-md text-cream-50/80 leading-relaxed">
            We stream the evening arati and kīrtan most days. Join from
            wherever you are, or catch the latest recording.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/iyfsyl"
              target="_blank"
              rel="noreferrer"
              className="focus-saffron inline-flex items-center gap-2 rounded-full bg-cream-50 px-5 py-2.5 text-sm font-medium text-maroon-800 hover:bg-cream-100 transition-colors"
            >
              Watch on Facebook
              <span>→</span>
            </a>
            <a
              href="https://www.youtube.com/results?search_query=gauradesh+tv"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream-50/30 px-5 py-2.5 text-sm font-medium text-cream-50 hover:bg-cream-50/10"
            >
              Gauradesh TV on YouTube
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-cream-50/20 bg-black shadow-soft">
            {/* Lightweight placeholder player — real embeds will be wired once the IYF channel is confirmed */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-cream-50/10 backdrop-blur-sm">
                <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-cream-50" />
              </div>
              <p className="font-serif text-cream-50">Live darshan</p>
              <p className="px-4 text-xs text-cream-50/60">
                Streams open on Facebook during arati hours
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-cream-50/60">
            Tip: darshan is best on the temple&rsquo;s{" "}
            <Link
              href="https://www.facebook.com/iyfsyl"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-cream-50"
            >
              Facebook page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
