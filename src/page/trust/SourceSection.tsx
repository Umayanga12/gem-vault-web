import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";
const miningImg = "/assets/mining/images_2.jpg";
const traderImg = "/assets/market/beruwala/WhatsApp Image 2026-09-21 at 17.22.50 (2).jpeg";

/* ─── Process steps for "how each gem is prepared" ──────────────── */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "We select the rough stone",
    body: "Our buyers hand-pick every rough stone under loupe — evaluating crystal clarity, colour saturation and freedom from problematic inclusions before anything else happens.",
  },
  {
    num: "02",
    title: "Our cutter cuts and polishes",
    body: "An in-house master cutter works each stone to maximise light return and minimise waste. No outsourced cutting, no batch processing — each gem is shaped individually.",
  },
];

/* ─── Source path cards ──────────────────────────────────────────── */
const SOURCES = [
  {
    tag: "Path A",
    title: "Our own mines",
    headline: "Directly from the earth",
    description:
      "We operate mining licences in Sri Lanka's gem-bearing regions. Every stone extracted here carries a fully traceable chain of custody from the pit to the polish wheel — owned and controlled at every stage.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12" />
        <path d="m17 7-5 5-5-5" />
        <path d="M2 17 12 7l10 10" />
        <circle cx="12" cy="5" r="3" />
      </svg>
    ),
    accentColor: "oklch(0.68 0.076 76)",       /* gold */
    glowColor: "oklch(0.68 0.076 76 / 0.12)",
    image: miningImg,
    alt: "Gem mine in Sri Lanka — our licenced pit",
  },
  {
    tag: "Path B",
    title: "Trusted traders",
    headline: "Decades-deep market relationships",
    description:
      "Where we don't mine directly, we purchase rough gem-stone parcels from dealers who have traded in Sri Lanka's established gem markets — Nivitigala, Rathnapura, Beruwala and others — for decades. We attend the markets ourselves and choose every parcel by hand.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    accentColor: "oklch(0.52 0.082 250)",       /* sapphire */
    glowColor: "oklch(0.35 0.069 250 / 0.14)",
    image: traderImg,
    alt: "Sri Lankan gem market trader selecting gems in Beruwala",
  },
];

/* ─── Small source card ──────────────────────────────────────────── */
function SourceCard({ source, index }: { source: typeof SOURCES[number]; index: number }) {
  const reduced = useReducedMotion();
  return (
    <Reveal delay={index * 0.07}>
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl h-full"
        style={{
          background: "linear-gradient(160deg, oklch(0.165 0.017 305 / 0.80) 0%, oklch(0.130 0.013 300 / 0.88) 100%)",
          border: "1px solid oklch(1 0 0 / 0.07)",
          boxShadow: "0 2px 20px -4px oklch(0 0 0 / 0.55)",
        }}
      >
        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${source.glowColor}, transparent 70%)` }}
          aria-hidden="true"
        />

        {/* ── Image area ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          {source.image ? (
            <>
              <img
                src={source.image}
                alt={source.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "",
                  borderBottom: "1px solid oklch(1 0 0 / 0.06)",
                }}
                aria-hidden="true"
              />
            </>
          ) : (
            <div
              className="h-full w-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, oklch(0.18 0.018 305 / 0.9) 0%, oklch(0.14 0.014 300 / 0.95) 100%)`,
                borderBottom: "1px solid oklch(1 0 0 / 0.06)",
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke={source.accentColor}
                strokeWidth="0.5"
                opacity={0.25}
                aria-hidden="true"
              >
                <polygon points="12 2 22 9 12 22 2 9" />
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="9" x2="22" y2="9" />
              </svg>
            </div>
          )}
        </div>

        {/* ── Card body ── */}
        <div className="flex flex-col flex-1 p-7 pt-6 gap-4">
          {/* Tag + Icon row */}
          <div className="flex items-start justify-between">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 font-mono"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.14em",
                background: `${source.accentColor.replace(")", " / 0.12)")}`,
                border: `1px solid ${source.accentColor.replace(")", " / 0.22)")}`,
                color: source.accentColor,
              }}
            >
              {source.tag}
            </span>
            <span
              style={{
                color: source.accentColor,
                opacity: 0.55,
                transition: "opacity 300ms",
              }}
              className="group-hover:opacity-90"
            >
              {source.icon}
            </span>
          </div>

          {/* Title */}
          <div>
            <p
              className="font-mono mb-1"
              style={{ fontSize: "0.6875rem", color: "oklch(0.58 0.014 85 / 0.40)", letterSpacing: "0.12em" }}
            >
              {source.headline}
            </p>
            <h3
              className="font-display text-pearl transition-colors duration-300 group-hover:text-brass"
              style={{
                fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
              }}
            >
              {source.title}
            </h3>
          </div>

          {/* Body */}
          <p
            style={{
              color: "oklch(0.580 0.014 85 / 0.60)",
              lineHeight: 1.85,
              fontSize: "0.9375rem",
            }}
          >
            {source.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Process step row ───────────────────────────────────────────── */
function ProcessStep({ step, isLast }: { step: typeof PROCESS_STEPS[number]; isLast: boolean }) {
  return (
    <Reveal>
      <div
        className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr] gap-x-6 py-8 relative"
        style={{ borderBottom: isLast ? "none" : "1px solid oklch(1 0 0 / 0.06)" }}
      >
        {/* Animated left accent bar on hover */}
        <div
          className="absolute left-0 top-0 w-px h-0 transition-all duration-500 ease-out group-hover:h-full"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.68 0.076 76 / 0.45), oklch(0.68 0.076 76 / 0.08), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Step number */}
        <div className="pt-0.5 flex justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display block select-none"
            style={{
              fontSize: "2.25rem",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              background:
                "linear-gradient(180deg, oklch(0.70 0.082 78 / 0.55) 0%, oklch(0.50 0.060 78 / 0.20) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {step.num}
          </motion.span>
        </div>

        {/* Content */}
        <div>
          <h4
            className="font-display text-pearl transition-colors duration-300 group-hover:text-brass"
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.35rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            {step.title}
          </h4>
          <p
            className="mt-3"
            style={{
              color: "oklch(0.580 0.014 85 / 0.58)",
              lineHeight: 1.9,
              fontSize: "0.9375rem",
              maxWidth: "52ch",
            }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */
export function SourceSection() {
  return (
    <section aria-labelledby="source-heading" className="py-16 sm:py-20">
      {/* Section label */}
      <Reveal>
        <p className="engraved-label flex items-center gap-3 mb-6">
          <span
            className="block h-px w-8"
            style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
          />
          How we get our gems
        </p>
      </Reveal>

      <Reveal delay={0.04}>
        <h2
          id="source-heading"
          className="font-display text-pearl mb-4"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.022em",
            maxWidth: "22ch",
          }}
        >
          Two paths to the vault — both begin in Sri Lanka
        </h2>
      </Reveal>

      <Reveal delay={0.07}>
        <p
          className="mb-12"
          style={{
            color: "oklch(0.580 0.014 85 / 0.55)",
            lineHeight: 1.85,
            fontSize: "1rem",
            maxWidth: "56ch",
          }}
        >
          Whether the stone comes from our own mining licence or from a trusted parcel
          dealer, it goes through the same preparation — hand-selected, in-house cut,
          and independently graded before it ever appears on the site.
        </p>
      </Reveal>

      {/* Source cards */}
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {SOURCES.map((s, i) => (
          <SourceCard key={s.tag} source={s} index={i} />
        ))}
      </div>

      {/* Divider with label */}
      <Reveal>
        <div className="flex items-center gap-4 mb-2">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, oklch(0.68 0.076 76 / 0.15), transparent)",
            }}
            aria-hidden="true"
          />
          <p
            className="engraved-label whitespace-nowrap"
            style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
          >
            Then, regardless of source
          </p>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to left, oklch(0.68 0.076 76 / 0.15), transparent)",
            }}
            aria-hidden="true"
          />
        </div>
      </Reveal>

      {/* Process steps */}
      <div
        className="rounded-2xl overflow-hidden mt-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.165 0.017 305 / 0.55) 0%, oklch(0.130 0.013 300 / 0.65) 100%)",
          border: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        {/* Optional top image area for process photo */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "21/7", minHeight: "140px" }}
        >

          <img
            src="/assets/Storyboard_for_gem_market_docume…_2K_20260924150956.jpeg"
            alt="Master gem cutter polishing a sapphire at the wheel"
            className="h-full w-full object-cover"
          />

          <div
            className="h-full w-full flex items-center justify-center gap-8"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.16 0.018 305 / 0.92) 0%, oklch(0.13 0.013 300 / 0.96) 100%)",
              borderBottom: "1px solid oklch(1 0 0 / 0.06)",
            }}
          >


          </div>
        </div>

        {/* Steps */}
        <div className="px-7 pb-4">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep key={step.num} step={step} isLast={i === PROCESS_STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
