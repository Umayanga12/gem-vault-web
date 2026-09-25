
export function ConsultationHero() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <p className="engraved-label flex items-center gap-3">
        <span
          className="block h-px w-8"
          style={{
            background: "linear-gradient(to right, transparent, var(--brass-dim))",
          }}
        />
        Get in touch
      </p>
      <h1
        className="mt-4 font-display text-pearl"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "20ch",
        }}
      >
        Contact Us
      </h1>
    </div>
  );
}
