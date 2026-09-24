import { createFileRoute } from "@tanstack/react-router";
import { TrustStrip } from "@/components/vault/trust-strip";
import { TrustHero } from "@/page/trust/TrustHero";
import { SourceSection } from "@/page/trust/SourceSection";
import { TrustSections } from "@/page/trust/TrustSections";
import { TrustCta } from "@/page/trust/TrustCta";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Sourcing, Grading and Certification — Gem Vault" },
      {
        name: "description",
        content:
          "How we source, grade and disclose every stone: direct from our own mines and trusted Sri Lankan gem markets, independently graded before listing — no exceptions.",
      },
      { property: "og:title", content: "Sourcing, Grading and Certification" },
      {
        property: "og:description",
        content:
          "Direct mine sourcing, trusted Sri Lankan market relationships, independent grading and treatment disclosure — explained in full.",
      },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <>
      <TrustHero />

      {/* Sourcing section — wider container */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SourceSection />
      </div>

      {/* Thin separator */}
      <div
        className="mx-auto max-w-5xl px-5 sm:px-8"
        aria-hidden="true"
      >
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.12), transparent)",
          }}
        />
      </div>

      {/* Certification sections — wider container */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 pb-20">
        <TrustSections />
        <TrustCta />
      </div>

      <TrustStrip />
    </>
  );
}
