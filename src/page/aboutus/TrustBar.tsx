import { motion, useReducedMotion } from "motion/react";

const items = [
  { label: "Shipped & insured to 42 countries", detail: "Door-to-door, fully tracked" },
  { label: "Customs & export paperwork handled", detail: "CITES and duty documents included" },
  { label: "Independent grading on every stone", detail: "GIA · IGI · AGS · GRS" },
  { label: "Escrow-backed payment", detail: "Funds released only on confirmed delivery" },
];

export function TrustBar() {
  const reduced = useReducedMotion();
  return (
    <div
      className="relative"
      style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 py-10">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: reduced ? 0 : i * 0.06, ease: "easeOut" }}
            >
              <p
                className="font-display text-pearl"
                style={{ fontSize: "0.95rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}
              >
                {item.label}
              </p>
              <p
                className="mt-1.5"
                style={{ color: "oklch(0.580 0.014 85 / 0.50)", fontSize: "0.8125rem" }}
              >
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
