import Link from "next/link";

const SOCIAL = {
  facebook: "https://www.facebook.com/iyfsyl",
  site: "https://www.iskconsylhet.com",
  youtube: "https://www.youtube.com/results?search_query=gauradesh+tv",
};

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-maroon-700/10 bg-cream-100/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full bg-maroon-700 text-cream-50 font-serif text-xl leading-none"
              >
                ॐ
              </span>
              <span className="font-serif text-xl text-ink-900">
                IYF Sylhet
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-800/80">
              The youth wing of ISKCON Sylhet. We gather to study scripture,
              sing kirtan, and live a simpler, kinder, more conscious life.
            </p>
            <p className="mt-3 font-deva text-2xl text-maroon-700">
              हरे कृष्ण हरे कृष्ण
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-ink-900">Visit</h4>
            <address className="not-italic mt-3 text-sm leading-relaxed text-ink-800/80">
              Sri Sri Radha Madhava Mandir
              <br />
              Jugaltila, Kajalshah
              <br />
              Opposite Osmani Medical College, Gate No. 1
              <br />
              Sylhet 3140
            </address>
            <a
              href="tel:+8801714101688"
              className="mt-3 inline-block text-sm text-maroon-700 hover:underline"
            >
              +880 1714-101688
            </a>
            <span className="px-2 text-ink-800/40">·</span>
            <a
              href="tel:+8801718781144"
              className="inline-block text-sm text-maroon-700 hover:underline"
            >
              +880 1718-781144
            </a>
          </div>

          <div>
            <h4 className="font-serif text-lg text-ink-900">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["/about", "About IYF"],
                ["/programs", "Programs & Courses"],
                ["/schedule", "Daily Schedule"],
                ["/events", "Events & Festivals"],
                ["/gallery", "Gallery"],
                ["/contact", "Contact / Volunteer"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-ink-800/80 hover:text-maroon-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-ink-900">Follow</h4>
            <p className="mt-3 text-sm text-ink-800/80">
              Live kirtan, arati, and festival updates.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-maroon-700/20 px-3 py-1.5 text-xs font-medium text-maroon-700 hover:bg-maroon-700 hover:text-cream-50 transition-colors"
              >
                Facebook
              </a>
              <a
                href={SOCIAL.site}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-maroon-700/20 px-3 py-1.5 text-xs font-medium text-maroon-700 hover:bg-maroon-700 hover:text-cream-50 transition-colors"
              >
                iskconsylhet.com
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-maroon-700/20 px-3 py-1.5 text-xs font-medium text-maroon-700 hover:bg-maroon-700 hover:text-cream-50 transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-ink-800/60 sm:flex-row sm:items-center">
          <div>
            <p>
              © {new Date().getFullYear()} ISKCON Youth Forum, Sylhet. Part of
              ISKCON, founded by A.C. Bhaktivedanta Swami Prabhupada.
            </p>
            <p className="mt-2">
              Designed and developed with care by{" "}
              <a
                href="https://github.com/bikash-20"
                target="_blank"
                rel="noreferrer"
                className="font-serif text-base text-maroon-700 underline-offset-4 transition-colors hover:text-maroon-800 hover:underline"
              >
                Bikash Talukder
              </a>
              <span className="mx-2 text-ink-800/40">·</span>
              <a
                href="https://github.com/bikash-20/Iskcon-youth-forum-sylhet"
                target="_blank"
                rel="noreferrer"
                className="text-maroon-700 underline-offset-4 transition-colors hover:text-maroon-800 hover:underline"
              >
                view source on GitHub →
              </a>
            </p>
          </div>
          <p className="font-deva text-base text-maroon-700/80">
            सत्यं शिवं सुन्दरम्
          </p>
        </div>
      </div>
    </footer>
  );
}
