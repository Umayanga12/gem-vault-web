import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/vault/reveal";
import { TrustStrip } from "@/components/vault/trust-strip";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Rhea Cylone" },
      {
        name: "description",
        content:
          "Discover who we are, our vision for transparent gemstone trading, and our mission to connect collectors with independently graded, ethically sourced stones.",
      },
      { property: "og:title", content: "About Us — Rhea Cylone" },
      {
        property: "og:description",
        content:
          "Our vision and mission: a specialist vault built on transparency, independent grading and honest disclosure.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    index: "I",
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by GIA, IGI, AGS or GRS. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
  },
  {
    index: "II",
    title: "Treatment disclosed, every time",
    body: "Heat, oil, fracture filling and diffusion each change value materially. Where a laboratory records a treatment, we print it on the card, the detail page and the invoice. 'Unheated' appears only where the report says so.",
  },
  {
    index: "III",
    title: "Origin where it can be evidenced",
    body: "Country of origin is a laboratory opinion based on inclusion and trace-element analysis. We state the country the report names. Where origin is inconclusive, we say so rather than inferring it from the colour.",
  },
  {
    index: "IV",
    title: "Natural and lab-grown, clearly separated",
    body: "Lab-grown stones are labelled at every point in the interface and priced against lab-grown comparables. They are never presented alongside natural material without that distinction.",
  },
];

/* ── Animated line ──────────────────────────────────────────────────── */
function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`h-px ${className}`}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduced ? 0 : 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(to right, oklch(0.68 0.076 76 / 0.30), oklch(0.68 0.076 76 / 0.04))",
      }}
    />
  );
}

/* ── Roman numeral ──────────────────────────────────────────────────── */
function PillarNumber({ label, delay = 0 }: { label: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: reduced ? 0 : delay }}
      className="font-mono select-none block"
      style={{
        fontSize: "0.6rem",
        letterSpacing: "0.20em",
        color: "oklch(0.68 0.076 76 / 0.35)",
        paddingTop: "0.25rem",
      }}
      aria-hidden="true"
    >
      {label}
    </motion.span>
  );
}

/* ── About page ─────────────────────────────────────────────────────── */
function AboutPage() {
  return (
    <>
      <HeroSection />

      {/* Vision & Mission */}
      <section className="mx-auto max-w-3xl px-5 pt-28 pb-12 sm:px-8">
        <VisionMission />
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-6 mb-20">
            <DrawLine className="flex-1" />
            <p
              className="shrink-0 font-mono text-[9px] uppercase"
              style={{
                color: "oklch(0.68 0.076 76 / 0.40)",
                letterSpacing: "0.26em",
              }}
            >
              How we do it
            </p>
            <DrawLine className="flex-1" delay={0.08} />
          </div>
        </Reveal>

        {/* Pillars */}
        <div>
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <PillarRow pillar={p} isLast={i === pillars.length - 1} />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.12}>
          <ClosingCta />
        </Reveal>
      </div>

      <TrustStrip />
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const reduced = useReducedMotion();
  const _ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={_ref}
      className="relative overflow-hidden"
      style={{
        borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        paddingTop: "clamp(5.5rem, 14vw, 9rem)",
        paddingBottom: "clamp(4.5rem, 10vw, 7.5rem)",
      }}
    >
      {/* Ambient glow — very subtle */}
      <div
        className="pointer-events-none absolute -top-60 -left-60 w-[800px] h-[800px]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.68 0.076 76 / 0.035) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Story text */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-10"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div
                className="h-px w-10 flex-none"
                style={{
                  background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.60))",
                }}
              />
              <p
                className="font-mono text-[9px] uppercase"
                style={{ color: "oklch(0.68 0.076 76 / 0.55)", letterSpacing: "0.28em" }}
              >
                Our story
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-pearl"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.032em",
                maxWidth: "18ch",
              }}
            >
              Built for people who take gemstones{" "}
              <em
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(135deg, oklch(0.58 0.065 76) 0%, oklch(0.80 0.086 80) 55%, oklch(0.58 0.065 76) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                seriously.
              </em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.9, ease: "easeOut", delay: 0.52 }}
              style={{
                color: "oklch(0.580 0.014 85 / 0.70)",
                lineHeight: 1.95,
                maxWidth: "50ch",
              }}
            >
              Rhea Cylone was founded on a simple conviction: every stone deserves an
              honest record. We are a specialist vault — not a marketplace — where
              each gem is independently graded before it is ever shown to a buyer.
            </motion.p>
          </div>

          {/* Right Column: Staggered Photo Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4 lg:gap-6 mt-10 lg:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {/* Column 1 (Pushed down) */}
            <div className="flex flex-col gap-4 lg:gap-6 pt-12 lg:pt-16">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <img 
                  src="/media/lot-214-poster.jpg" 
                  alt="Workplace" 
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <div className="absolute inset-0 bg-[oklch(0.08_0.01_300)] flex items-center justify-center p-6 text-center border-t border-white/5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Independently Graded</p>
                </div>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                 <div className="absolute inset-0 bg-[oklch(0.12_0.02_305)] flex items-center justify-center p-6 text-center border-t border-white/5">
                  <p className="font-display text-xl text-white/80 italic">"Transparency is the foundation."</p>
                </div>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <img 
                  src="/media/lot-214-poster.jpg" 
                  alt="Inspection" 
                  className="h-full w-full object-cover object-right"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Vision & Mission ───────────────────────────────────────────────── */
function VisionMission() {
  return (
    <div>
      <Reveal>
        <EditorialBlock
          eyebrow="Our vision"
          headline="A world where every gemstone speaks for itself"
          body="We envision a gemstone market where price reflects quality, quality is independently verified, and every buyer — from first-time collector to seasoned investor — has access to the same unambiguous data that experts have always kept to themselves. Transparency is not a feature. It is the foundation."
        />
      </Reveal>
      <Reveal delay={0.07}>
        <EditorialBlock
          eyebrow="Our mission"
          headline="To list only what we can fully account for"
          body="Our mission is to operate the most rigorously documented gemstone vault available. Every stone we list carries an independent laboratory report. Every treatment is disclosed. Every origin claim is sourced from that report — not inferred from colour or cut. We exist to eliminate the information asymmetry that has disadvantaged buyers for too long."
          indented
        />
      </Reveal>
    </div>
  );
}

function EditorialBlock({
  eyebrow,
  headline,
  body,
  indented = false,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  indented?: boolean;
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

      <div className={`pl-7 sm:pl-10 ${indented ? "sm:pl-20" : ""}`}>
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
    </div>
  );
}

/* ── Pillar row ─────────────────────────────────────────────────────── */
function PillarRow({
  pillar,
  isLast,
}: {
  pillar: (typeof pillars)[number];
  isLast: boolean;
}) {
  return (
    <div
      className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-6 sm:gap-x-10 py-12 relative"
      style={{
        borderBottom: isLast ? "none" : "1px solid oklch(1 0 0 / 0.06)",
      }}
    >
      {/* Hover accent bar */}
      <div
        className="absolute left-0 top-0 w-px h-0 transition-all duration-500 ease-out group-hover:h-full"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.68 0.076 76 / 0.45), oklch(0.68 0.076 76 / 0.08), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Roman numeral */}
      <div className="flex flex-col items-center pt-0.5">
        <PillarNumber label={pillar.index} delay={0.05} />
        <motion.div
          className="mt-3 w-[2px] h-[2px] rounded-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.25 }}
          style={{ background: "oklch(0.68 0.076 76 / 0.28)" }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div>
        <h3
          className="font-display text-pearl transition-colors duration-300 group-hover:text-brass"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
          }}
        >
          {pillar.title}
        </h3>
        <p
          className="mt-4"
          style={{
            color: "oklch(0.580 0.014 85 / 0.62)",
            lineHeight: 1.95,
            maxWidth: "56ch",
            fontSize: "0.9375rem",
          }}
        >
          {pillar.body}
        </p>
      </div>
    </div>
  );
}

/* ── Closing CTA ────────────────────────────────────────────────────── */
function ClosingCta() {
  return (
    <div className="mt-24 mb-28 relative">
      {/* Diamond rule */}
      <div className="flex items-center mb-16">
        <div
          className="h-px flex-1"
          style={{
            background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.22))",
          }}
        />
        {/* Diamond glyph */}
        <div
          className="mx-5 size-2 flex-none"
          style={{
            background: "var(--gradient-gold)",
            transform: "rotate(45deg)",
            boxShadow: "0 0 8px 2px oklch(0.68 0.076 76 / 0.25)",
          }}
        />
        <div
          className="h-px flex-1"
          style={{
            background: "linear-gradient(to left, transparent, oklch(0.68 0.076 76 / 0.22))",
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
        <div>
          <p
            className="font-mono text-[9px] uppercase mb-5"
            style={{ color: "oklch(0.68 0.076 76 / 0.45)", letterSpacing: "0.28em" }}
          >
            Ready to explore?
          </p>
          <h3
            className="font-display text-pearl"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            Enter{" "}
            <em
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, oklch(0.58 0.065 76) 0%, oklch(0.81 0.087 80) 55%, oklch(0.58 0.065 76) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              the vault.
            </em>
          </h3>
          <p
            className="mt-4 text-sm"
            style={{
              color: "oklch(0.580 0.014 85 / 0.48)",
              maxWidth: "36ch",
              lineHeight: 1.80,
            }}
          >
            Browse certified stones with full origin disclosure and independent laboratory reports.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="facet-sheen btn-gold inline-flex items-center gap-3"
          >
            Browse certified stones
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.5,
              }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );
}
