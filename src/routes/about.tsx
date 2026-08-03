import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/vault/reveal";
import { TrustStrip } from "@/components/vault/trust-strip";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Cabochon" },
      {
        name: "description",
        content:
          "Discover who we are, our vision for transparent gemstone trading, and our mission to connect collectors with independently graded, ethically sourced stones.",
      },
      { property: "og:title", content: "About Us — Cabochon" },
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
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by GIA, IGI, AGS or GRS. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
  },
  {
    title: "Treatment disclosed, every time",
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

function AboutPage() {
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
          <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="url(#about-gold)" strokeWidth="0.5">
            <polygon points="12 2 22 9 12 22 2 9" />
            <defs>
              <linearGradient id="about-gold" x1="0" y1="0" x2="1" y2="1">
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
              Our story
            </p>
            <h1
              className="mt-4 font-display text-pearl"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                maxWidth: "22ch",
              }}
            >
              Built for people who take gemstones seriously
            </h1>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              style={{ lineHeight: 1.8 }}
            >
              Cabochon was founded on a simple conviction: every stone deserves an honest record.
              We are a specialist vault — not a marketplace — where each gem is independently graded
              before it is ever shown to a buyer.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">

        {/* Vision */}
        <Reveal>
          <div
            className="rounded-2xl p-8 sm:p-10 mb-6"
            style={{
              background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.60) 0%, oklch(0.14 0.014 300 / 0.70) 100%)",
              border: "1px solid oklch(0.70 0.082 78 / 0.15)",
            }}
          >
            <div className="flex items-start gap-6">
              {/* Vision icon */}
              <div className="shrink-0 mt-1">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.70 0.082 78 / 0.20) 0%, oklch(0.50 0.060 78 / 0.10) 100%)",
                    border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#vision-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1C6.5 6 2 9 2 12c0 3 4.5 6 10 11 5.5-5 10-8 10-11 0-3-4.5-6-10-11Z" />
                    <defs>
                      <linearGradient id="vision-gold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                        <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.20em] mb-3"
                  style={{ color: "var(--brass-dim)" }}
                >
                  Our vision
                </p>
                <h2
                  className="font-display text-pearl mb-4"
                  style={{
                    fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  A world where every gemstone speaks for itself
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
                  We envision a gemstone market where price reflects quality, quality is independently
                  verified, and every buyer — from first-time collector to seasoned investor — has access
                  to the same unambiguous data that experts have always kept to themselves. Transparency
                  is not a feature. It is the foundation.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mission */}
        <Reveal delay={0.08}>
          <div
            className="rounded-2xl p-8 sm:p-10 mb-16"
            style={{
              background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.60) 0%, oklch(0.14 0.014 300 / 0.70) 100%)",
              border: "1px solid oklch(0.70 0.082 78 / 0.15)",
            }}
          >
            <div className="flex items-start gap-6">
              {/* Mission icon */}
              <div className="shrink-0 mt-1">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.70 0.082 78 / 0.20) 0%, oklch(0.50 0.060 78 / 0.10) 100%)",
                    border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#mission-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <defs>
                      <linearGradient id="mission-gold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                        <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.20em] mb-3"
                  style={{ color: "var(--brass-dim)" }}
                >
                  Our mission
                </p>
                <h2
                  className="font-display text-pearl mb-4"
                  style={{
                    fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  To list only what we can fully account for
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
                  Our mission is to operate the most rigorously documented gemstone vault available.
                  Every stone we list carries an independent laboratory report. Every treatment is
                  disclosed. Every origin claim is sourced from that report — not inferred from colour
                  or cut. We exist to eliminate the information asymmetry that has disadvantaged buyers
                  for too long.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Divider label */}
        <Reveal>
          <div className="flex items-center gap-4 mb-14">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, oklch(0.70 0.082 78 / 0.20))" }} />
            <p className="engraved-label shrink-0">How we do it</p>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, oklch(0.70 0.082 78 / 0.20))" }} />
          </div>
        </Reveal>

        {/* Pillars */}
        <div className="space-y-0">
          {pillars.map((s, i) => (
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
                  <h3
                    className="font-display text-pearl transition-colors group-hover:text-brass"
                    style={{
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                      transition: "color 300ms ease",
                    }}
                  >
                    {s.title}
                  </h3>
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
              Enter the vault
            </h3>
            <Link to="/browse" search={{ type: undefined }} className="facet-sheen btn-gold inline-flex">
              Browse certified stones
            </Link>
          </div>
        </Reveal>
      </div>

      <TrustStrip />
    </>
  );
}
