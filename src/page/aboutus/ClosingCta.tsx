import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const assurances = ["Insured worldwide shipping", "Secure escrow payment"];

export function ClosingCta() {
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

        <div className="shrink-0 flex flex-col items-start sm:items-end gap-4">
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

          {/* Remote path — the realistic first step for a buyer who can't visit in person */}
          <Link
            to="/consultation"
            className="text-sm underline-offset-4 hover:underline"
            style={{ color: "oklch(0.580 0.014 85 / 0.62)" }}
          >
            Or book a video call with a gemologist
          </Link>
        </div>
      </div>

      {/* Trust row */}
      <div
        className="mt-14 pt-8 flex flex-wrap gap-x-10 gap-y-3"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
      >
        {assurances.map((a) => (
          <p key={a} className="font-mono text-[10px] uppercase" style={{ color: "oklch(0.580 0.014 85 / 0.40)", letterSpacing: "0.16em" }}>
            {a}
          </p>
        ))}
      </div>
    </div>
  );
}
