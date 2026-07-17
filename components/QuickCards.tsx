import Link from "next/link";

const CARDS = [
  {
    title: "Daily Programs",
    desc: "Arati, kīrtan, classes — the rhythm of the temple.",
    href: "/schedule",
    icon: "🪔",
  },
  {
    title: "Be SMART Course",
    desc: "Six weeks on simplicity, modesty, awareness, regularity, truthfulness.",
    href: "/programs#be-smart",
    icon: "📖",
  },
  {
    title: "Discover Yourself",
    desc: "Six interactive sessions on the Bhagavad-gītā — for ages 15–35.",
    href: "/programs#discover-yourself",
    icon: "🪷",
  },
  {
    title: "Gauradesh TV",
    desc: "Live kīrtan, arati, and festival streams — on YouTube.",
    href: "https://www.youtube.com/results?search_query=gauradesh+tv",
    icon: "📺",
    external: true,
  },
  {
    title: "Krishna Leela Mela",
    desc: "Janmāṣṭamī at Sri Sri Radha Madhava Mandir.",
    href: "/events#janmashtami-2026",
    icon: "🪈",
  },
  {
    title: "Visit the Mandir",
    desc: "Open daily in Jugaltila, opposite Osmani Medical College.",
    href: "/visit",
    icon: "📍",
  },
];

export default function QuickCards() {
  return (
    <section className="relative -mt-16 sm:-mt-24 z-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer" : undefined}
              className="group relative overflow-hidden rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-ring"
            >
              <div className="absolute right-4 top-4 text-2xl opacity-70 transition-opacity group-hover:opacity-100">
                {c.icon}
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-maroon-700/70">
                {c.external ? "Watch live" : "Explore"}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-800/80">
                {c.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-maroon-700">
                {c.external ? "Open YouTube" : "Learn more"}
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
