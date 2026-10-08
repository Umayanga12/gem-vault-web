import { createFileRoute } from "@tanstack/react-router";
import { TrustStrip } from "@/components/vault/trust-strip";
import { PromoBanner } from "@/components/vault/PromoBanner";
import { VideoHero } from "@/page/home/VideoHero";
import { WhyStrip } from "@/page/home/WhyStrip";
import { GemTypeSection } from "@/page/home/GemTypeSection";
import { FeaturedSection } from "@/page/home/FeaturedSection";
import { ContactCta } from "@/page/home/ContactCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rhea Ceylon — 100% Pure Natural Certified Gemstones from Sri Lanka" },
      {
        name: "description",
        content:
          "Rhea Ceylon — a specialist vault of certified loose natural sapphires, rubies, emeralds and rare Ceylon gems. Every stone is 100% naturally mined, graded by NGJA, with full origin and treatment disclosure. No synthetics, no lab-grown.",
      },
      { property: "og:title", content: "Rhea Ceylon — Pure Natural Ceylon Gemstones" },
      {
        property: "og:description",
        content:
          "100% natural loose Ceylon gems with carat, cut, clarity, origin and treatment stated plainly. Sapphires, rubies, emeralds and rare Sri Lankan stones.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <a
        href="#vault"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        style={{ background: "var(--obsidian)", color: "var(--pearl)", border: "1px solid var(--brass)" }}
      >
        Skip to vault
      </a>

      <VideoHero />
      <TrustStrip />
      <WhyStrip />
      <GemTypeSection />
      <FeaturedSection />
      <ContactCta />
    </>
  );
}