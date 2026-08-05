import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";

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
    <section className="relative">
      {/* Top rule */}
      <div className="hairline-gold" />

      <div
        style={{
          background: "oklch(0.135 0.014 305 / 0.60)",
          borderBottom: "1px solid oklch(1 0 0 / 0.05)",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 py-8 px-6"
              style={{
                borderRight:
                  i < items.length - 1
                    ? "1px solid oklch(1 0 0 / 0.05)"
                    : "none",
              }}
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                <div
                  className="flex size-8 items-center justify-center"
                  style={{
                    border: "1px solid oklch(0.68 0.076 76 / 0.18)",
                  }}
                >
                  <item.icon
                    className="size-3.5 transition-colors duration-300"
                    style={{ color: "var(--brass-dim)" }}
                  />
                </div>
              </div>

              <div>
                <p
                  className="text-xs font-medium text-pearl"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-1.5 text-xs leading-relaxed text-muted-foreground"
                  style={{ lineHeight: 1.6 }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="hairline-gold" />
    </section>
  );
}
