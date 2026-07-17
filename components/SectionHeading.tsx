export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-maroon-700/80">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-ink-900 tracking-tightish">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-800/80">
          {description}
        </p>
      )}
    </div>
  );
}
