import SectionHeading from "@/components/SectionHeading";
import { DEITIES } from "@/lib/content";

export const metadata = {
  title: "About IYF · ISKCON Youth Forum, Sylhet",
  description:
    "The youth wing of ISKCON Sylhet — who we are, what we do, and where we gather.",
};

export default function AboutPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-3xl px-5 pt-20 pb-12 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          About
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          A small community, kept on purpose.
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-24 text-lg leading-relaxed text-ink-800/90">
        <p className="dropcap">
          IYF Sylhet is the youth wing of ISKCON Sylhet. We are students,
          young professionals, and a few people who don't quite fit any
          category — connected by the thought that life can be simpler,
          slower, and more meaningful than the world suggests.
        </p>

        <p className="mt-6">
          We meet at Sri Sri Radha Madhava Mandir, Jugaltila — opposite
          Osmani Medical College, Gate No. 1. We come for kirtan, we stay for
          classes, and we leave a little softer than we arrived.
        </p>

        <h2 className="mt-12 font-serif text-3xl text-ink-900">What we do</h2>
        <ul className="mt-5 space-y-3">
          <li>
            <span className="font-medium text-ink-900">Satsanga & study.</span>{" "}
            Weekly walks through the Bhagavad-gītā and selected verses of
            the Śrīmad Bhāgavatam.
          </li>
          <li>
            <span className="font-medium text-ink-900">Kīrtan.</span>{" "}
            Sunday-evening and festival kīrtanas, often in the open courtyard
            with mṛdaṅga and karatalās.
          </li>
          <li>
            <span className="font-medium text-ink-900">Courses.</span>{" "}
            Short, practical courses for young adults — Be SMART being the
            most loved.
          </li>
          <li>
            <span className="font-medium text-ink-900">Service.</span>{" "}
            Festival setups, prasadam distribution, and quiet volunteering at
            the temple.
          </li>
        </ul>

        <h2 className="mt-12 font-serif text-3xl text-ink-900">
          Our lineage, in two paragraphs
        </h2>
        <p className="mt-4">
          ISKCON was founded by His Divine Grace A.C. Bhaktivedanta Swami
          Prabhupada in New York in July 1966 — a small storefront that grew
          into an international society with more than 300 centers.
          Prabhupada travelled widely, established projects, and translated
          over seventy volumes of Vedic literature; he is remembered as the
          founder-ācārya who carried Krishna consciousness to the West.
        </p>
        <p className="mt-4">
          We are part of that lineage, working in our small corner — Sylhet,
          3140 — to keep the practice warm, the scholarship honest, and the
          welcome wide.
        </p>

        <div className="hairline my-12" />

        <SectionHeading
          eyebrow="At the temple"
          title="The deities we serve"
        />
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {DEITIES.map((d) => (
            <li
              key={d.name}
              className="rounded-xl border border-maroon-700/10 bg-cream-50 p-4 shadow-soft"
            >
              <p className="font-deva text-lg text-ink-900">{d.name}</p>
              <p className="mt-1 text-sm text-ink-800/70">{d.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
