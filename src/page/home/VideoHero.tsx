import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    label: "Certified gemstones · Est. 2024",
    headingStart: "Rare gems,\u00a0",
    headingEm: "honestly graded.",
    body: "100% natural loose gemstones — independently certified, origin disclosed, sold with the laboratory report that describes them.",
  },
  {
    label: "Free quotations · No obligation",
    headingStart: "Your price,\u00a0",
    headingEm: "openly discussed.",
    body: "Request a free quotation on any stone. We'll reply within 24 hours with a detailed offer — no commitment required.",
  },
  {
    label: "Negotiable pricing · Direct access",
    headingStart: "Fair offers,\u00a0",
    headingEm: "always considered.",
    body: "Prices are negotiable. Reach our gemologists directly and agree on a price that works for both sides — transparently, without middlemen.",
  },
] as const;

const GOLD_EM_STYLE: React.CSSProperties = {
  fontStyle: "italic",
  background:
    "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 45%, var(--brass-hi) 70%, var(--brass) 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

export function VideoHero() {
  const [active, setActive] = useState(0);

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(
      () => setActive((prev) => (prev + 1) % SLIDES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.07 0.009 300 / 0.35) 0%, oklch(0.07 0.009 300 / 0.30) 40%, oklch(0.07 0.009 300 / 0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Gold halo accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 48%, oklch(0.68 0.076 76 / 0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Hero copy — left center */}
      <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-12">

        {/* Label — crossfades with each slide */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${active}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "oklch(0.68 0.076 76 / 0.65)",
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="block h-px w-8"
                style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.65))" }}
              />
              {slide.label}
            </span>
          </motion.p>
        </AnimatePresence>

        {/* Headline — crossfades with each slide */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${active}`}
            className="font-display mt-4 text-pearl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
              lineHeight: 1.00,
              maxWidth: "16ch",
              letterSpacing: "-0.03em",
              textShadow: "0 4px 40px oklch(0 0 0 / 0.55)",
            }}
          >
            {slide.headingStart}
            <em style={GOLD_EM_STYLE}>{slide.headingEm}</em>
          </motion.h1>
        </AnimatePresence>

        {/* Body copy — crossfades with each slide */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`body-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-sm max-w-md"
            style={{ color: "oklch(1 0 0 / 0.45)", lineHeight: 1.75 }}
          >
            {slide.body}
          </motion.p>
        </AnimatePresence>

        {/* CTA buttons — static, always visible */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4 pt-5"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.09)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <Link to="/browse" search={{ type: undefined }} className="facet-sheen btn-gold">
            Browse the vault
          </Link>
          <Link to="/contactus" className="btn-ghost flex items-center gap-2">
            Contact Us
          </Link>
        </motion.div>

        {/* Slide indicator dots */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          role="tablist"
          aria-label="Hero slides"
        >
          {SLIDES.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={s.label}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === active ? "var(--brass)" : "oklch(1 0 0 / 0.25)",
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Enter the vault link — top right */}
      <motion.a
        href="#vault"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-5 top-6 z-20 sm:right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-pearl/50 transition-colors duration-300 hover:text-brass focus-visible:text-brass focus-visible:outline-none"
      >
        Enter the vault
        <span
          className="block h-px"
          style={{ width: "20px", background: "linear-gradient(to right, var(--brass-dim), var(--brass))" }}
        />
      </motion.a>
    </section>
  );
}
