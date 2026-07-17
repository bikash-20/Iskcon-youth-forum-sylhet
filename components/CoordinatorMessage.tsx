import Image from "next/image";

export default function CoordinatorMessage() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
      <div className="grid items-stretch gap-10 lg:grid-cols-12">
        {/* Portrait — sticky on large screens so it stays in view while reading */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-3xl border border-maroon-700/15 bg-cream-50 shadow-soft">
              <div className="aspect-[3/4] w-full">
                <Image
                  src="/co-ordinator.jpg"
                  alt="Devarshi Srivas Dasa, Coordinator of ISKCON Youth Forum, Sylhet"
                  width={1536}
                  height={2048}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-maroon-700/10 bg-cream-50/80 p-5 shadow-soft">
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-maroon-700/80">
                A personal letter
              </p>
              <p className="mt-2 font-serif text-2xl leading-snug text-ink-900">
                Devarshi Srivas Dasa
              </p>
              <p className="mt-1 text-sm font-medium text-maroon-700">
                Coordinator
              </p>
              <p className="mt-1 text-xs text-ink-800/70">
                ISKCON Youth Forum, Sylhet
              </p>
            </div>
          </div>
        </aside>

        {/* Letter */}
        <article className="lg:col-span-8">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
            From the Coordinator
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-ink-900 sm:text-5xl tracking-tightish">
            Connecting with your own heart.
          </h2>
          <p className="mt-3 font-serif text-lg italic text-maroon-700">
            A short letter, in person.
          </p>

          <div className="mt-7 space-y-5 text-base sm:text-lg leading-relaxed text-ink-800/90">
            <p className="first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-none first-letter:text-maroon-700">
              In today's world, we have learned how to connect with everyone
              through technology, yet many of us struggle to connect with our
              own hearts. The Bhagavad-gītā reminds us that lasting peace is
              not found by chasing temporary achievements, but by awakening our
              eternal relationship with Śrī Kṛṣṇa.
            </p>

            <p>
              Through sincere chanting of the Holy Name, hearing transcendental
              wisdom, serving others with humility, and keeping the company of
              devotees, the heart gradually becomes peaceful, joyful, and
              filled with purpose.
            </p>

            <p>
              ISKCON Youth Forum Sylhet is more than a gathering — it is a
              spiritual family where young people grow together in devotion,
              character, and compassion. Whether you are taking your very first
              step on the spiritual path or have been practicing for many
              years, you are always welcome here. Come with an open heart, ask
              questions, chant with us, study the timeless wisdom of the
              Bhagavad-gītā, and experience the happiness that comes from
              serving the Supreme Lord with love.
            </p>

            <p>
              May Lord Śrī Kṛṣṇa bless you with wisdom to choose the right
              path, strength to walk it with determination, and devotion to
              remember Him in every moment of life. We look forward to
              welcoming you to ISKCON Youth Forum Sylhet.
            </p>
          </div>

          <div className="mt-10 hairline" />

          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-serif text-2xl text-ink-900">
                With warm regards,
              </p>
              <p className="mt-2 font-serif text-3xl text-maroon-700">
                Devarshi Srivas Dasa
              </p>
              <p className="mt-1 text-sm text-ink-800/70">
                Coordinator · ISKCON Youth Forum, Sylhet
              </p>
            </div>
            <p className="font-deva text-2xl text-maroon-700/80">
              हरे कृष्ण हरे कृष्ण
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}