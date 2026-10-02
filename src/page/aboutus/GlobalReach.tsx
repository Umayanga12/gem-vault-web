import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";

const labs = ["GIA", "IGI", "AGS", "GRS"];
const carriers = ["DHL Express", "Brink's", "Malca-Amit", "FedEx Priority"];

const regions = [
  { name: "North America", stat: "Next-day customs clearance via bonded courier" },
  { name: "Europe & UK", stat: "DDP shipping — duties prepaid, no surprise invoice" },
  { name: "Middle East & Asia", stat: "Local currency invoicing in 9 markets" },
];

export function GlobalReach() {
  const reduced = useReducedMotion();
  return (
    <div className="py-20 sm:py-24">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <p
            className="font-mono text-[9px] uppercase mb-5"
            style={{ color: "oklch(0.68 0.076 76 / 0.45)", letterSpacing: "0.26em" }}
          >
            Buying from outside the country
          </p>
          <h2
            className="font-display text-pearl mb-5"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.026em" }}
          >
            The paperwork travels with the stone, not after it
          </h2>
          <p
            style={{
              color: "oklch(0.580 0.014 85 / 0.65)",
              lineHeight: 1.95,
              maxWidth: "54ch",
              fontSize: "0.9375rem",
            }}
          >
            Report, insurance certificate, and customs declaration are prepared
            before the parcel leaves the vault — not requested after a shipment
            gets held.
          </p>
        </div>
      </Reveal>

      {/* Region cards */}
      <div className="grid gap-px sm:grid-cols-3 mb-16" style={{ background: "oklch(1 0 0 / 0.06)" }}>
        {regions.map((r, i) => (
          <motion.div
            key={r.name}
            className="p-7"
            style={{ background: "oklch(0.16 0.01 85)" }}
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.08 }}
          >
            <h3 className="font-display text-pearl" style={{ fontSize: "1.05rem" }}>
              {r.name}
            </h3>
            <p className="mt-3" style={{ color: "oklch(0.580 0.014 85 / 0.62)", fontSize: "0.875rem", lineHeight: 1.7 }}>
              {r.stat}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Photo evidence strip */}
      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16">
          {[
            { src: "/assets/global/packing-insured.jpg", alt: "Insured shipping case being sealed for export" },
            { src: "/assets/global/customs-docs.jpg", alt: "Export and customs paperwork attached to a shipment" },
            { src: "/assets/global/lab-report-scan.jpg", alt: "Laboratory report being matched to its stone" },
            { src: "/assets/global/handoff-courier.jpg", alt: "Bonded courier receiving a sealed parcel" },
          ].map((img) => (
            <div key={img.src} className="relative aspect-square overflow-hidden rounded-lg border border-white/5 bg-white/5">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Reveal>

      {/* Credibility marks */}
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-16 pt-10" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
          <div>
            <p className="font-mono text-[9px] uppercase mb-4" style={{ color: "oklch(0.580 0.014 85 / 0.40)", letterSpacing: "0.22em" }}>
              Reports accepted from
            </p>
            <div className="flex gap-6">
              {labs.map((l) => (
                <span key={l} className="font-display text-pearl" style={{ fontSize: "1.1rem", opacity: 0.85 }}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase mb-4" style={{ color: "oklch(0.580 0.014 85 / 0.40)", letterSpacing: "0.22em" }}>
              Shipped via
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {carriers.map((c) => (
                <span key={c} style={{ color: "oklch(0.580 0.014 85 / 0.62)", fontSize: "0.9375rem" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
