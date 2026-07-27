import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";

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
    <section className="border-y border-border bg-velvet/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex gap-3">
            <i.icon className="mt-0.5 size-5 shrink-0 text-brass" />
            <div>
              <p className="text-sm text-pearl">{i.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
