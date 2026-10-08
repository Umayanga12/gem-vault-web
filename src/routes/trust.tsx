import { createFileRoute } from "@tanstack/react-router";
import { TrustStrip } from "@/components/vault/trust-strip";
import { TrustHero } from "@/page/trust/TrustHero";
import { SourceSection } from "@/page/trust/SourceSection";
import { TrustSections } from "@/page/trust/TrustSections";
import { TrustCta } from "@/page/trust/TrustCta";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Natural Gemstone Sourcing, Grading & Certification — Rhea Ceylon" },
      {
        name: "description",
        content:
          "How Rhea Ceylon sources, grades and discloses every 100% natural Ceylon stone: directly from Sri Lankan mines and trusted markets, independently graded before listing. No lab-grown, no synthetic gems — ever.",
      },
      { property: "og:title", content: "Natural Gemstone Sourcing, Grading & Certification — Rhea Ceylon" },
      {
        property: "og:description",
        content:
          "Direct mine sourcing, trusted Ceylon market relationships, independent grading and treatment disclosure — only 100% pure natural gemstones. No synthetics, no lab-grown.",
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
