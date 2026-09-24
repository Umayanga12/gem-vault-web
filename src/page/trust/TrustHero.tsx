import { Reveal } from "@/components/vault/reveal";
import { motion } from "motion/react";

const MARKETS = ["Nivitigala", "Rathnapura", "Beruwala", "Elahera", "Balangoda"];

export function TrustHero() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, oklch(0.16 0.020 305 / 0.75) 0%, oklch(0.11 0.010 300 / 0.0) 65%)",
        borderBottom: "1px solid oklch(1 0 0 / 0.07)",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.68 0.076 76 / 0.06), transparent 70%)",
        }}
      />

      {/* Decorative large gem — right side */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] top-1/2 hidden lg:block"
        style={{ translateY: "-50%" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="340"
          height="340"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#hero-gold-grad)"
          strokeWidth="0.35"
          opacity={0.12}
        >
          <polygon points="12 2 22 9 12 22 2 9" />
          <polygon points="12 2 22 9 17 5.5 12 2 7 5.5 2 9" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <defs>
            <linearGradient id="hero-gold-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.10 82)" />
              <stop offset="100%" stopColor="oklch(0.58 0.07 76)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Decorative small gem — left */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-6 bottom-8 hidden xl:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#hero-gold-sm)" strokeWidth="0.6" opacity={0.18}>
          <polygon points="12 2 22 9 12 22 2 9" />
          <defs>
            <linearGradient id="hero-gold-sm" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
              <stop offset="100%" stopColor="oklch(0.60 0.07 78)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          {/* Left — headline block */}
          <div>
            <Reveal>
              <p className="engraved-label flex items-center gap-3 mb-5">
                <span
                  className="block h-px w-8"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--brass-dim))",
                  }}
                />
                Sourcing · Grading · Certification
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1
                className="font-display text-pearl"
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.028em",
                  maxWidth: "18ch",
                }}
              >
                What we verify before a stone reaches this site
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className="mt-6"
                style={{
                  color: "oklch(0.580 0.014 85 / 0.60)",
                  lineHeight: 1.85,
                  maxWidth: "52ch",
                  fontSize: "1.0625rem",
                }}
              >
                Every gem in Gem Vault is sourced from Sri Lanka's finest producing
                regions and graded by an independent laboratory before it is ever
                listed. No exceptions. No in-house reports. No ambiguity.
              </p>
            </Reveal>
          </div>

          {/* Right — market ticker */}
          <Reveal delay={0.15}>
            <div
              className="hidden lg:flex flex-col gap-2 pb-1"
              style={{ minWidth: "14rem" }}
            >
              <p
                className="engraved-label mb-2"
                style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
              >
                Sri Lankan gem markets
              </p>
              {MARKETS.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="block h-px flex-1"
                    style={{
                      background:
                        "linear-gradient(to right, oklch(0.68 0.076 76 / 0.30), transparent)",
                    }}
                  />
                  <span
                    className="font-display"
                    style={{
                      fontSize: "0.9375rem",
                      color: "oklch(0.68 0.076 76 / 0.70)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {m}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Horizontal rule */}
        <div
          className="mt-14 h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.18), transparent)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
