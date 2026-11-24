import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FAQSchema } from "./JsonLd";

export const HOME_FAQS = [
  {
    question: "Where is ISKCON Sylhet (Sri Sri Radha Madhava Mandir) located?",
    answer:
      "ISKCON Sylhet — Sri Sri Radha Madhava Mandir — is located at Jugaltila, Kajalshah, Sylhet 3140, Bangladesh, right opposite MAG Osmani Medical College Hospital Gate No. 1. It is accessible within 10 minutes from Sylhet Railway Station by CNG.",
  },
  {
    question: "What is ISKCON Youth Forum Sylhet (IYF Sylhet)?",
    answer:
      "ISKCON Youth Forum Sylhet (IYF Sylhet) is the dedicated youth wing of ISKCON Sylhet. It provides students, graduates, and young professionals a welcoming space for Bhagavad-gita study, mantra meditation, kirtan sessions, stress management, and Vedic lifestyle training.",
  },
  {
    question:
      "What are the daily Darshan and Aarti timings at Sylhet ISKCON Mondir?",
    answer:
      "Daily temple schedule at Sri Sri Radha Madhava Mandir: Mangal Arati at 4:30 AM, Darshan Arati at 7:00 AM, Srimad Bhagavatam class at 7:30 AM, Raj Bhoga Arati at 12:00 PM, Sandhya (Gaura) Arati at 7:00 PM, and temple closing at 8:30 PM. Timings may adjust slightly during major festivals.",
  },
  {
    question:
      "What programs and courses does IYF Sylhet conduct for youth?",
    answer:
      "IYF Sylhet offers several practical, value-based programs including the flagship 'Be SMART' course, 'Discover Yourself (DYS)', 'Stress Management through Gita', weekly Bhagavad-gita youth study circles, and traditional Kirtan & Mridanga workshops.",
  },
  {
    question: "How can I join or volunteer with ISKCON Youth Forum Sylhet?",
    answer:
      "Any student or young seeker is welcome to participate! You can attend the weekly Sunday kirtan & satsanga at 5:00 PM, fill out the volunteer form on our website, or message us directly on WhatsApp or Facebook (@iyfsyl).",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto mt-24 max-w-5xl px-5 sm:px-8">
      <FAQSchema faqs={HOME_FAQS} />
      <Reveal>
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Frequently Asked Questions about ISKCON Sylhet & IYF"
          description="Everything you need to know about visiting Sri Sri Radha Madhava Mandir, darshan timings, and participating in ISKCON Youth Forum Sylhet."
        />
      </Reveal>

      <div className="mt-10 grid gap-4 sm:gap-6">
        {HOME_FAQS.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 60}>
            <div className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-6 sm:p-7 shadow-soft hover:border-maroon-700/30 transition-colors">
              <h3 className="font-serif text-xl sm:text-2xl text-ink-900 font-medium">
                {faq.question}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-800/85">
                {faq.answer}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
