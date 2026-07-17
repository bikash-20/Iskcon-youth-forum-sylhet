export const metadata = {
  title: "Visit Us · IYF Sylhet",
  description: "How to find Sri Sri Radha Madhava Mandir in Jugaltila, Sylhet.",
};

const MAP_EMBED =
  "https://www.google.com/maps?q=Sri+Sri+Radha+Madhava+Mandir+Jugaltila+Sylhet&output=embed";

export default function VisitPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-10 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Visit Us
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Come and see.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          Sri Sri Radha Madhava Mandir is in Jugaltila, Kajalshah — opposite
          Osmani Medical College, Gate No. 1. Open daily.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-24">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-maroon-700/10 bg-cream-50 shadow-soft">
              <iframe
                title="Sri Sri Radha Madhava Mandir, Jugaltila, Sylhet"
                src={MAP_EMBED}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft">
              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                Address
              </p>
              <address className="not-italic mt-3 text-base leading-relaxed text-ink-800">
                Sri Sri Radha Madhava Mandir
                <br />
                Jugaltila, Kajalshah
                <br />
                Opposite Osmani Medical College, Gate No. 1
                <br />
                Sylhet 3140
              </address>

              <div className="hairline my-6" />

              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                Contact
              </p>
              <p className="mt-3 text-base">
                <a
                  href="tel:+8801714101688"
                  className="text-maroon-700 hover:underline"
                >
                  +880 1714-101688
                </a>
                <br />
                <a
                  href="tel:+8801718781144"
                  className="text-maroon-700 hover:underline"
                >
                  +880 1718-781144
                </a>
              </p>

              <div className="hairline my-6" />

              <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
                Getting here
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-800/90">
                <li>· From Sylhet Railway Station — 10 minutes by CNG.</li>
                <li>· From Osmani International Airport — 20 minutes.</li>
                <li>· Bus: any Kajalshah-bound service, alight at the college gate.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
