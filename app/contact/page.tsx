import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata = {
  title: "Contact & Volunteer · IYF Sylhet",
  description: "Reach the IYF team or sign up as a volunteer.",
};

export default function ContactPage() {
  return (
    <article className="paper">
      <div className="mx-auto max-w-4xl px-5 pt-20 pb-10 sm:pt-28">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-5xl sm:text-6xl text-ink-900 tracking-tightish">
          Write to us.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-800/80">
          For questions, course registrations, or to join the volunteer list,
          send us a note. We read every message.
        </p>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-24">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <aside className="lg:col-span-2">
            <div className="rounded-2xl border border-maroon-700/10 bg-cream-50 p-7 shadow-soft">
              <SectionHeading
                eyebrow="Direct"
                title="Other ways to reach us"
              />
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <span className="block text-xs uppercase tracking-wider text-maroon-700/70">
                    Phone
                  </span>
                  <a
                    href="tel:+8801714101688"
                    className="text-ink-900 hover:text-maroon-700"
                  >
                    +880 1714-101688
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-maroon-700/70">
                    Email
                  </span>
                  <a
                    href="mailto:iyfsylhet@gmail.com"
                    className="text-ink-900 hover:text-maroon-700"
                  >
                    iyfsylhet@gmail.com
                  </a>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wider text-maroon-700/70">
                    Facebook
                  </span>
                  <a
                    href="https://www.facebook.com/iyfsyl"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink-900 hover:text-maroon-700"
                  >
                    facebook.com/iyfsyl
                  </a>
                </li>
              </ul>
              <div className="hairline my-6" />
              <p className="font-deva text-2xl text-maroon-700">
                कृष्णं स्मर गच्छाम्यहम्
              </p>
              <p className="mt-1 text-xs text-ink-800/60">
                Remembering Krishna, I walk forward.
              </p>
            </div>
          </aside>
        </div>

        <div id="volunteer" className="hairline my-16" />

        <SectionHeading
          eyebrow="Volunteer"
          title="Lend a hand at the temple."
          description="We always need help with kīrtan setup, festival logistics, prasādam, and youth outreach. Tell us a little about yourself."
        />
        <div className="mt-8">
          <VolunteerForm />
        </div>
      </div>
    </article>
  );
}