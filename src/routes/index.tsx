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
      { title: "Rhea Cylone — Certified Loose Gemstones for Collectors" },
      {
        name: "description",
        content:
          "A specialist vault of certified loose sapphires, rubies, emeralds, and fine gemstones — graded by NGJA, sold with full origin and treatment disclosure.",
      },
      { property: "og:title", content: "Rhea Cylone — Certified Loose Gemstones" },
      {
        property: "og:description",
        content:
          "Certified natural and lab-grown stones with carat, cut, clarity, origin and treatment stated plainly.",
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