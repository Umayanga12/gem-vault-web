import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/vault/reveal";
import { TrustStrip } from "@/components/vault/trust-strip";
import { motion } from "motion/react";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Sourcing, Grading and Certification — Rhea Cylone" },
      {
        name: "description",
        content:
          "How we source, grade and disclose every stone: independent laboratory reports, treatment disclosure, origin documentation and escrow settlement.",
      },
      { property: "og:title", content: "Sourcing, Grading and Certification" },
      {
        property: "og:description",
        content: "Independent grading, treatment disclosure and origin documentation explained.",
      },
    ],
  }),
  component: TrustPage,
});

const sections = [
  {
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by GIA, IGI, AGS or GRS. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
  },
  {
    title: "Treatment is stated, not implied",
    body: "Heat, oil, fracture filling and diffusion each change value materially. Where a laboratory records a treatment, we print it on the card, the detail page and the invoice. 'Unheated' appears only where the report says so.",
  },
  {
    title: "Origin where it can be evidenced",
    body: "Country of origin is a laboratory opinion based on inclusion and trace-element analysis. We state the country the report names. Where origin is inconclusive, we say so rather than inferring it from the colour.",
  },
  {
    title: "Natural and lab-grown, clearly separated",
    body: "Lab-grown stones are labelled at every point in the interface and priced against lab-grown comparables. They are never presented alongside natural material without that distinction.",
  },
];

function TrustPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="relative overflow-hidden py-24"
        style={{
          background: "linear-gradient(to bottom, oklch(0.14 0.016 305 / 0.60) 0%, transparent 100%)",
          borderBottom: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        {/* Decorative gem */}
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 animate-float opacity-10 hidden lg:block"
          aria-hidden="true"
        >
          <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="url(#trust-gold)" strokeWidth="0.5">
            <polygon points="12 2 22 9 12 22 2 9" />
            <defs>
              <linearGradient id="trust-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="engraved-label flex items-center gap-3">
              <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }} />
              Trust &amp; certification
            </p>
            <h1
              className="mt-4 font-display text-pearl"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                maxWidth: "20ch",
              }}
            >
              What we verify before a stone reaches this site
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <div className="space-y-0">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                className="group flex gap-8 py-12"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
              >
                {/* Number marker */}
                <div className="shrink-0 pt-1">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    className="font-display"
                    style={{
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      background: "linear-gradient(180deg, oklch(0.70 0.082 78 / 0.60) 0%, oklch(0.50 0.060 78 / 0.25) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      display: "block",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Content */}
                <div>
                  <h2
                    className="font-display text-pearl transition-colors group-hover:text-brass"
                    style={{
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      transition: "color 300ms ease",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal delay={0.2}>
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.60) 0%, oklch(0.14 0.014 300 / 0.70) 100%)",
              border: "1px solid oklch(0.70 0.082 78 / 0.15)",
            }}
          >
            <p className="engraved-label mb-4">Ready to explore?</p>
            <h3
              className="font-display text-pearl mb-6"
              style={{ fontSize: "1.6rem", letterSpacing: "-0.02em" }}
            >
              Browse certified stones
            </h3>
            <Link to="/browse" search={{ type: undefined }} className="facet-sheen btn-gold inline-flex">
              Enter the vault
            </Link>
          </div>
        </Reveal>
      </div>

      <TrustStrip />
    </>
  );
}
