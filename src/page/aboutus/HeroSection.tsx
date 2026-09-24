import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

export function HeroSection() {
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

            {/* Worldwide line — the detail an overseas buyer is scanning for */}
            <motion.p
              className="mt-6 font-mono text-[11px] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.9, ease: "easeOut", delay: 0.66 }}
              style={{ color: "oklch(0.68 0.076 76 / 0.55)", letterSpacing: "0.18em" }}
            >
              Insured shipping to 42 countries
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
                  src="src\assets\gem\Screenshot 2026-09-23 152353.png"
                  alt="Gemologist at work in the grading vault"
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <img
                  src="src\assets\mining\Screenshot 2026-09-23 153148.png"
                  alt="Sourcing site where stones are mined"
                  className="h-full w-full object-cover object-left"
                />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Muted looping video tile — motion catches the eye where a static photo of "inspection" reads generic */}
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <video
                  src="src\assets\video\hero-inspection-loop.mp4"
                  poster="src\assets\market\beruwala\WhatsApp Image 2026-09-21 at 17.22.43 (1).jpeg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover object-right"
                />
                <span
                  className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] uppercase px-2 py-1 rounded"
                  style={{ background: "oklch(0 0 0 / 0.45)", color: "oklch(0.95 0 0 / 0.85)", letterSpacing: "0.14em" }}
                >
                  Live inspection
                </span>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
                <img
                  src="src\assets\gem\image.png"
                  alt="Graded stone ready for listing"
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
