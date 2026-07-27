import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Gemologist Consultation — Cabochon" },
      {
        name: "description",
        content:
          "Book a 30-minute call with a graduate gemologist to review reports, compare stones and discuss origin, treatment and pricing before you buy.",
      },
      { property: "og:title", content: "Book a Gemologist Consultation" },
      {
        property: "og:description",
        content: "Thirty minutes with a graduate gemologist, on the stones you are considering.",
      },
    ],
  }),
  component: ConsultationPage,
});

const slots = ["Tue 10:00", "Tue 14:30", "Wed 09:00", "Wed 16:00", "Thu 11:30", "Fri 13:00"];

function ConsultationPage() {
  const [slot, setSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
      <div>
        <p className="rule-label">Consultation</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-pearl">
          Thirty minutes with a graduate gemologist
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Bring the report numbers of the stones you are considering. We will walk the grading
          data, explain what the inclusions mean in practice, and give you a plain view of where
          each stone sits against current market comparables. No obligation to buy.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
          {[
            "Report interpretation, inclusion by inclusion",
            "Origin and treatment implications for resale",
            "Side-by-side pricing against recent comparables",
          ].map((t) => (
            <li key={t} className="border-l-2 border-brass/50 pl-3">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="h-fit rounded-sm border border-border bg-velvet p-6"
      >
        <p className="rule-label">Available times (GMT)</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {slots.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              className={`facet-sheen rounded-sm border px-3 py-2 font-mono text-xs ${
                slot === s ? "border-brass text-brass" : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="rule-label">Email</span>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm text-pearl"
          />
        </label>
        <label className="mt-4 block">
          <span className="rule-label">Report numbers or stones of interest</span>
          <textarea
            rows={3}
            className="mt-2 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm text-pearl"
          />
        </label>
        <button
          type="submit"
          disabled={!slot}
          className="facet-sheen mt-5 w-full rounded-sm bg-brass px-4 py-3 text-sm text-primary-foreground disabled:opacity-40"
        >
          {slot ? `Request ${slot}` : "Select a time"}
        </button>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-brass"
          >
            Request received. A gemologist will confirm {slot} by email within one business day.
          </motion.p>
        )}
      </form>
    </div>
  );
}
