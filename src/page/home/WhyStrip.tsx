import { useReducedMotion } from "motion/react";

const WHY_ITEMS = [
  "GIA · IGI · AGS · GRS graded",
  "100% natural, earth-mined",
  "Full origin disclosure",
  "Unheated status stated plainly",
  "No synthetic or lab-grown material",
  "Free quotations available",
  "Prices open to negotiation",
  "Insured transit worldwide",
  "Escrow above $50,000",
  "Independent gemologist review",
];

export function WhyStrip() {
  const reducedMotion = useReducedMotion();
  const doubled = [...WHY_ITEMS, ...WHY_ITEMS];

  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: "1px solid oklch(1 0 0 / 0.05)",
        borderBottom: "1px solid oklch(1 0 0 / 0.05)",
        background: "oklch(0.125 0.013 305 / 0.50)",
      }}
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, var(--obsidian), transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, var(--obsidian), transparent)" }}
      />

      {/* Screen-reader copy: the animated track below is duplicated for a seamless
          loop, which would otherwise cause every trust signal to be announced twice.
          This single, static list is what assistive tech actually reads. */}
      <ul className="sr-only">
        {WHY_ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div
        className="marquee-track"
        aria-hidden="true"
        style={{ animationPlayState: reducedMotion ? "paused" : "running" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.20em] px-8"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item}
            </span>
            <span
              className="block w-px h-3 shrink-0"
              style={{ background: "oklch(0.68 0.076 76 / 0.22)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
