import { Reveal } from "@/components/vault/reveal";
import { EditorialBlock } from "./EditorialBlock";

export function VisionMission() {
  return (
    <div>
      <Reveal>
        <EditorialBlock
          eyebrow="Our vision"
          headline="A world where every gemstone speaks for itself"
          body="We envision a gemstone market where price reflects quality, quality is independently verified, and every buyer — from first-time collector to seasoned investor — has access to the same unambiguous data that experts have always kept to themselves. Transparency is not a feature. It is the foundation."
          image={{
            src: "src/assets/gem/gem_img_1.png",
            alt: "A gem holding with twiser",
          }}
        />
      </Reveal>
      <Reveal delay={0.07}>
        <EditorialBlock
          eyebrow="Our mission"
          headline="To list only what we can fully account for"
          body="Our mission is to operate the most rigorously documented gemstone vault available. Every stone we list carries an independent laboratory report. Every treatment is disclosed. Every origin claim is sourced from that report — not inferred from colour or cut. We exist to eliminate the information asymmetry that has disadvantaged buyers for too long."
          indented
          image={{
            src: "src/assets/gem/Screenshot 2026-09-23 165637.png",
            alt: "Sealed and catalogued stones on the vault shelving",
          }}
        />
      </Reveal>
    </div>
  );
}
