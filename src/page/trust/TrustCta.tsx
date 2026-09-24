import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/vault/reveal";

export function TrustCta() {
  return (
    <Reveal delay={0.1}>
      <div
        className="mt-16 rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
          border: "1px solid oklch(0.70 0.082 78 / 0.14)",
        }}
      >
        {/* Gradient top accent line */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.40), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="px-8 py-10 sm:py-12 text-center">
          <p className="engraved-label mb-4">Ready to explore?</p>
          <h3
            className="font-display text-pearl mb-3"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              letterSpacing: "-0.022em",
              lineHeight: 1.1,
            }}
          >
            Browse certified Sri Lankan gems
          </h3>
          <p
            className="mb-8 mx-auto"
            style={{
              color: "oklch(0.580 0.014 85 / 0.52)",
              lineHeight: 1.75,
              fontSize: "0.9375rem",
              maxWidth: "38ch",
            }}
          >
            Every stone comes with an independent laboratory report, full
            treatment disclosure, and a clear origin statement.
          </p>
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="facet-sheen btn-gold inline-flex"
          >
            Enter the vault
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
