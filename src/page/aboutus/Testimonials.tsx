import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";

const quotes = [
  {
    quote:
      "I was buying a stone I'd never see in person, from a country I'd never visited. The report and the insurance certificate arrived before the parcel did — that ordering mattered more than I expected.",
    name: "R. Aoki",
    place: "Tokyo, Japan",
  },
  {
    quote:
      "Customs held a gem shipment from another dealer for three weeks last year. This one cleared in a day because the paperwork was already correct.",
    name: "M. Al-Farsi",
    place: "Dubai, UAE",
  },
  {
    quote:
      "The video call with the gemologist before I paid is the reason I trusted a five-figure purchase to a company I'd only found online.",
    name: "C. Dubois",
    place: "Lyon, France",
  },
];

export function Testimonials() {
  const reduced = useReducedMotion();
  return (
    <div className="py-20 sm:py-24" style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
      <Reveal>
        <p
          className="font-mono text-[9px] uppercase mb-10"
          style={{ color: "oklch(0.68 0.076 76 / 0.45)", letterSpacing: "0.26em" }}
        >
          Buyers, elsewhere
        </p>
      </Reveal>

      <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
        {quotes.map((q, i) => (
          <motion.div
            key={q.name}
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.1, ease: "easeOut" }}
          >
            <p
              className="font-display"
              style={{
                color: "oklch(0.88 0.006 85)",
                fontSize: "1rem",
                lineHeight: 1.7,
                letterSpacing: "-0.006em",
              }}
            >
              "{q.quote}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px w-6" style={{ background: "oklch(0.68 0.076 76 / 0.45)" }} />
              <p style={{ color: "oklch(0.580 0.014 85 / 0.55)", fontSize: "0.8125rem" }}>
                {q.name} · {q.place}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
