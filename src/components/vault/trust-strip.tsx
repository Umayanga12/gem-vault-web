import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { Reveal } from "@/components/vault/reveal";

const items = [
  {
    icon: BadgeCheck,
    title: "Independently graded",
    body: "Every stone ships with its GIA, IGI, AGS or GRS report.",
  },
  {
    icon: Truck,
    title: "Insured to the door",
    body: "Fully insured, signature-required transit worldwide.",
  },
  {
    icon: RotateCcw,
    title: "14-day return",
    body: "Return in the sealed parcel for a full refund.",
  },
  {
    icon: ShieldCheck,
    title: "Escrow above $50,000",
    body: "High-value settlements held until you accept the stone.",
  },
];

export function TrustStrip() {
  return (
    <section className="relative py-1">
      {/* Top gold rule */}
      <div
        className="mx-auto max-w-7xl px-5 sm:px-8"
        style={{ marginBottom: "-1px" }}
      >
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.70 0.082 78 / 0.30), transparent)" }}
        />
      </div>

      <div
        className="glass-vault"
        style={{ background: "linear-gradient(to bottom, oklch(0.16 0.018 305 / 0.60), oklch(0.13 0.014 300 / 0.70))" }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group flex gap-4">
                {/* Icon with glow ring */}
                <div className="relative shrink-0 mt-0.5">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "var(--glow-gold)",
                      filter: "blur(8px)",
                      transform: "scale(1.8)",
                    }}
                  />
                  <div
                    className="relative flex size-9 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.22 0.022 305) 0%, oklch(0.18 0.018 300) 100%)",
                      border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                    }}
                  >
                    <item.icon
                      className="size-4 transition-colors duration-300"
                      style={{ color: "var(--brass)" }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-pearl">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className="h-px"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.70 0.082 78 / 0.20), transparent)" }}
        />
      </div>
    </section>
  );
}
