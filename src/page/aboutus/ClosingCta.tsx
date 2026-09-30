import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const assurances = [
  { icon: "✦", label: "100% natural gemstones" },
  { icon: "✦", label: "Insured worldwide shipping" },
  { icon: "✦", label: "Secure escrow payment" },
  { icon: "✦", label: "Independent lab reports" },
];

export function ClosingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mt-28 mb-28 relative">

      {/* Section divider */}
      <div className="flex items-center mb-20">
        <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.18))" }} />
        <div
          className="mx-4 size-1.5 flex-none"
          style={{ background: "var(--gradient-gold)", transform: "rotate(45deg)", boxShadow: "0 0 8px 3px oklch(0.68 0.076 76 / 0.3)" }}
        />
        <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, oklch(0.68 0.076 76 / 0.18))" }} />
      </div>

      {/* Main CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.10 0.010 280 / 0.95) 0%, oklch(0.08 0.008 280 / 0.98) 100%)",
          border: "1px solid oklch(0.68 0.076 76 / 0.14)",
          boxShadow: "0 0 60px -10px oklch(0.68 0.076 76 / 0.12), 0 32px 64px -16px oklch(0 0 0 / 0.5)",
        }}
      >
        {/* Ambient glow top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 45% at 50% 0%, oklch(0.68 0.076 76 / 0.07) 0%, transparent 70%)",
          }}
        />

        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, oklch(0.68 0.076 76 / 0.4), transparent)" }} />
          <div className="absolute top-0 left-0 w-px h-full" style={{ background: "linear-gradient(to bottom, oklch(0.68 0.076 76 / 0.4), transparent)" }} />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: "linear-gradient(to left, oklch(0.68 0.076 76 / 0.4), transparent)" }} />
          <div className="absolute bottom-0 right-0 w-px h-full" style={{ background: "linear-gradient(to top, oklch(0.68 0.076 76 / 0.4), transparent)" }} />
        </div>

        <div className="relative px-8 py-14 sm:px-14 sm:py-16 flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[9px] uppercase mb-6 flex items-center gap-3"
            style={{ color: "oklch(0.68 0.076 76 / 0.55)", letterSpacing: "0.28em" }}
          >
            <span className="block h-px w-6" style={{ background: "oklch(0.68 0.076 76 / 0.35)" }} />
            Ready to explore?
            <span className="block h-px w-6" style={{ background: "oklch(0.68 0.076 76 / 0.35)" }} />
          </motion.p>

          {/* Headline */}
          <motion.h3
            className="font-display text-pearl"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              textShadow: "0 4px 32px oklch(0 0 0 / 0.5)",
            }}
          >
            Enter{" "}
            <em
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, oklch(0.58 0.065 76) 0%, oklch(0.84 0.092 80) 50%, oklch(0.58 0.065 76) 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gold-shimmer 5s linear infinite",
              }}
            >
              the vault.
            </em>
          </motion.h3>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 text-sm"
            style={{
              color: "oklch(0.75 0.010 85 / 0.45)",
              maxWidth: "44ch",
              lineHeight: 1.85,
            }}
          >
            Browse 100% natural, certified stones with full origin disclosure
            and independent laboratory reports — no guesswork, ever.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/browse"
              search={{ type: undefined }}
              className="facet-sheen btn-gold inline-flex items-center gap-3 px-8"
            >
              Browse stones
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
              >
                →
              </motion.span>
            </Link>

            {/* Divider */}
            <span
              className="hidden sm:block h-5 w-px"
              style={{ background: "oklch(1 0 0 / 0.10)" }}
            />

            <Link
              to="/contactus"
              className="btn-ghost inline-flex items-center gap-2 text-sm"
              style={{ color: "oklch(0.75 0.010 85 / 0.60)" }}
            >
              Contact Us
              <span style={{ color: "oklch(0.68 0.076 76 / 0.7)" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.85 }}
        className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3"
      >
        {assurances.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.08 }}
            className="flex items-center gap-2"
          >
            <span
              className="text-[7px]"
              style={{ color: "oklch(0.68 0.076 76 / 0.55)" }}
            >
              {a.icon}
            </span>
            <p
              className="font-mono text-[10px] uppercase"
              style={{ color: "oklch(0.68 0.014 85 / 0.38)", letterSpacing: "0.16em" }}
            >
              {a.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
