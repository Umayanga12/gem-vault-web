import { createFileRoute } from "@tanstack/react-router";
import { TrustStrip } from "@/components/vault/trust-strip";
import { Reveal } from "@/components/vault/reveal";
import { HeroSection } from "@/page/aboutus/HeroSection";
import { TrustBar } from "@/page/aboutus/TrustBar";
import { VisionMission } from "@/page/aboutus/VisionMission";
import { VaultFilm } from "@/page/aboutus/VaultFilm";
import { PillarsSection } from "@/page/aboutus/PillarsSection";
import { GlobalReach } from "@/page/aboutus/GlobalReach";
import { Testimonials } from "@/page/aboutus/Testimonials";
import { ClosingCta } from "@/page/aboutus/ClosingCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Rhea Ceylon" },
      {
        name: "description",
        content:
          "Learn who we are at Rhea Ceylon — our vision for transparent natural gemstone trading and our mission to connect collectors with 100% pure natural, independently graded, ethically sourced Ceylon (Sri Lankan) gems. No synthetics, no lab-grown.",
      },
      { property: "og:title", content: "About Us — Rhea Ceylon" },
      {
        property: "og:description",
        content:
          "Rhea Ceylon: a specialist vault built on transparency, independent grading and honest disclosure of 100% pure natural Ceylon gemstones.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <HeroSection />
      <TrustBar />

      {/* Vision & Mission */}
      <section className="mx-auto max-w-3xl px-5 pt-28 pb-12 sm:px-8">
        <VisionMission />
      </section>

      {/* <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <VaultFilm />
      </div> */}

      {/* Divider for Pillars */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-6 mb-16">
            <p
              className="shrink-0 font-mono text-[9px] uppercase"
              style={{
                color: "oklch(0.68 0.076 76 / 0.40)",
                letterSpacing: "0.26em",
              }}
            >
              How we do it
            </p>
            <div className="h-px flex-1" style={{ background: "oklch(1 0 0 / 0.06)" }} />
          </div>
        </Reveal>

        {/* Pillars */}
        <PillarsSection />
      </div>

      {/* <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <GlobalReach />
        <Testimonials />
      </div> */}

      {/* CTA */}
      <div className="mx-auto max-w-3xl px-5 sm:px-8 pb-20">
        <Reveal delay={0.12}>
          <ClosingCta />
        </Reveal>
      </div>

      <TrustStrip />
    </>
  );
}
