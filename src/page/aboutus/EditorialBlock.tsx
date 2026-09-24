import { motion } from "motion/react";

export function EditorialBlock({
  eyebrow,
  headline,
  body,
  indented = false,
  image,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  indented?: boolean;
  image?: { src: string; alt: string };
}) {
  return (
    <div
      className="group relative py-14 sm:py-16"
      style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-14 w-px"
        initial={{ height: 0 }}
        whileInView={{ height: "5rem" }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.68 0.076 76 / 0.60), transparent)",
        }}
        aria-hidden="true"
      />

      <div className={`pl-7 sm:pl-10 ${indented ? "sm:pl-20" : ""} ${image ? "grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start" : ""}`}>
        <div>
          <p
            className="font-mono text-[9px] uppercase mb-5"
            style={{ color: "oklch(0.68 0.076 76 / 0.45)", letterSpacing: "0.26em" }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display text-pearl mb-6"
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
              lineHeight: 1.10,
              letterSpacing: "-0.026em",
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              color: "oklch(0.580 0.014 85 / 0.65)",
              lineHeight: 1.95,
              maxWidth: "54ch",
              fontSize: "0.9375rem",
            }}
          >
            {body}
          </p>
        </div>

        {image && (
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
