import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, Clock, MessageSquare, BarChart3 } from "lucide-react";
import { Reveal } from "@/components/vault/reveal";

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

const highlights = [
  { icon: MessageSquare, text: "Report interpretation, inclusion by inclusion" },
  { icon: BarChart3,   text: "Side-by-side pricing against recent comparables" },
  { icon: Clock,       text: "Origin and treatment implications for resale" },
];

function ConsultationPage() {
  const [slot, setSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <>
      {/* Page hero */}
      <div
        className="relative py-20"
        style={{
          background: "linear-gradient(to bottom, oklch(0.14 0.016 305 / 0.55) 0%, transparent 100%)",
          borderBottom: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal>
            <p className="engraved-label flex items-center gap-3">
              <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }} />
              Consultation
            </p>
            <h1
              className="mt-4 font-display text-pearl"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em", maxWidth: "22ch" }}
            >
              Thirty minutes with a graduate gemologist
            </h1>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
        {/* Left — description */}
        <Reveal>
          <p className="text-base leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
            Bring the report numbers of the stones you are considering. We will walk the grading
            data, explain what the inclusions mean in practice, and give you a plain view of where
            each stone sits against current market comparables. No obligation to buy.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((h, i) => (
              <motion.li
                key={h.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4"
              >
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(0.70 0.082 78 / 0.10)",
                    border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                  }}
                >
                  <h.icon className="size-4 text-brass" />
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </motion.li>
            ))}
          </ul>

          {/* Decorative gem */}
          <div className="mt-16 hidden lg:block animate-float opacity-20">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="url(#consult-gold)" strokeWidth="0.6">
              <polygon points="12 2 22 9 12 22 2 9" />
              <polygon points="12 4 20 9.5 12 20 4 9.5" />
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="4" y1="9.5" x2="20" y2="9.5" />
              <defs>
                <linearGradient id="consult-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Reveal>

        {/* Right — booking form */}
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
                style={{
                  background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
                  border: "1px solid oklch(0.70 0.082 78 / 0.20)",
                  boxShadow: "0 0 40px var(--glow-gold)",
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: "backOut" }}
                  className="mb-6 flex size-16 items-center justify-center rounded-full"
                  style={{
                    background: "var(--gradient-gold)",
                    boxShadow: "0 0 24px var(--glow-gold)",
                  }}
                >
                  <Check className="size-8 text-primary-foreground" strokeWidth={2.5} />
                </motion.div>
                <p className="font-display text-2xl text-pearl" style={{ letterSpacing: "-0.02em" }}>
                  Request received
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  A gemologist will confirm{" "}
                  <span className="text-brass font-medium">{slot}</span>{" "}
                  by email within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06)",
                }}
              >
                {/* Time slots */}
                <p className="rule-label mb-4">Available times (GMT)</p>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((s) => {
                    const isSelected = slot === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(s)}
                        className="facet-sheen relative flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-mono text-xs transition-all duration-250"
                        style={{
                          background: isSelected
                            ? "oklch(0.70 0.082 78 / 0.15)"
                            : "oklch(0.16 0.016 305 / 0.50)",
                          border: `1px solid ${isSelected ? "oklch(0.70 0.082 78 / 0.55)" : "oklch(1 0 0 / 0.08)"}`,
                          color: isSelected ? "var(--brass)" : "var(--muted-foreground)",
                          boxShadow: isSelected ? "0 0 12px var(--glow-gold)" : "none",
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.15, ease: "backOut" }}
                              className="shrink-0"
                            >
                              <Check className="size-3" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Email */}
                <div className="mt-5">
                  <ConsultField
                    label="Email"
                    type="email"
                    required
                    focused={focused === "email"}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Notes */}
                <div className="mt-4">
                  <ConsultTextarea
                    label="Report numbers or stones of interest"
                    focused={focused === "notes"}
                    onFocus={() => setFocused("notes")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={!slot}
                  whileTap={{ scale: 0.97 }}
                  className="facet-sheen btn-gold mt-5 w-full"
                  style={{
                    opacity: slot ? 1 : 0.45,
                    cursor: slot ? "pointer" : "not-allowed",
                    animation: slot ? "glow-pulse 2.5s ease-in-out infinite" : "none",
                  }}
                >
                  {slot ? `Request ${slot}` : "Select a time slot"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </>
  );
}

function ConsultField({
  label,
  type = "text",
  required,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  type?: string;
  required?: boolean;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <div className="relative">
      <label
        className="absolute z-10 pointer-events-none transition-all duration-200"
        style={{
          top: "0.55rem",
          left: "0.875rem",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: focused ? "var(--brass)" : "var(--muted-foreground)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-xl px-3 pb-2 pt-6 text-sm text-pearl outline-none transition-all duration-200"
        style={{
          background: "oklch(0.14 0.014 300 / 0.60)",
          border: `1px solid ${focused ? "oklch(0.70 0.082 78 / 0.55)" : "oklch(1 0 0 / 0.10)"}`,
          boxShadow: focused ? "0 0 0 3px oklch(0.70 0.082 78 / 0.10)" : "none",
          fontFamily: "var(--font-sans)",
        }}
      />
    </div>
  );
}

function ConsultTextarea({
  label,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <div className="relative">
      <label
        className="absolute z-10 pointer-events-none transition-all duration-200"
        style={{
          top: "0.55rem",
          left: "0.875rem",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: focused ? "var(--brass)" : "var(--muted-foreground)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </label>
      <textarea
        rows={3}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-xl px-3 pb-2 pt-6 text-sm text-pearl outline-none transition-all duration-200"
        style={{
          background: "oklch(0.14 0.014 300 / 0.60)",
          border: `1px solid ${focused ? "oklch(0.70 0.082 78 / 0.55)" : "oklch(1 0 0 / 0.10)"}`,
          boxShadow: focused ? "0 0 0 3px oklch(0.70 0.082 78 / 0.10)" : "none",
          fontFamily: "var(--font-sans)",
          resize: "none",
        }}
      />
    </div>
  );
}
