import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/data/stones";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Parcel — Cabochon" },
      {
        name: "description",
        content:
          "Review reserved stones, confirm insured delivery details and settle securely. Reservations hold each stone for 48 hours.",
      },
      { property: "og:title", content: "Your Parcel — Cabochon" },
      {
        property: "og:description",
        content: "Review reserved stones and complete an insured, escrow-backed purchase.",
      },
    ],
  }),
  component: CartPage,
});

const steps = ["Parcel", "Delivery", "Settlement"];

function CartPage() {
  const { cartStones, currency, removeFromCart } = useVault();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const subtotal = cartStones.reduce((s, x) => s + x.price, 0);
  const insurance = Math.round(subtotal * 0.008);

  function next() {
    if (step === 1 && !email.includes("@")) {
      setError("Enter the email address the insured shipment should be confirmed to.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  if (cartStones.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-8">
        {/* Vault seal illustration */}
        <div className="mx-auto mb-8 flex size-20 animate-float items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(0.18 0.018 305) 0%, oklch(0.14 0.014 300) 100%)",
            border: "1px solid oklch(0.70 0.082 78 / 0.20)",
            boxShadow: "0 0 32px var(--glow-gold)",
          }}
        >
          <ShieldCheck className="size-9" style={{ color: "var(--brass-dim)" }} />
        </div>
        <p className="engraved-label mb-3">Your parcel</p>
        <h1 className="font-display text-3xl text-pearl" style={{ letterSpacing: "-0.02em" }}>
          No stones reserved
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Reservations hold a stone for 48 hours while you review its report.
        </p>
        <Link
          to="/browse"
          search={{ type: undefined }}
          className="facet-sheen btn-gold mt-8 inline-flex"
        >
          Browse the vault
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <p className="engraved-label mb-3">Checkout</p>
      <h1 className="font-display text-4xl text-pearl" style={{ letterSpacing: "-0.02em" }}>
        Your parcel
      </h1>

      {/* Step timeline */}
      <ol className="mt-8 flex gap-0">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center">
            {/* Node */}
            <div className="flex flex-col items-center">
              <div
                className="flex size-7 items-center justify-center rounded-full transition-all duration-400"
                style={{
                  background: i <= step ? "var(--gradient-gold)" : "oklch(0.20 0.018 305)",
                  border: `1px solid ${i <= step ? "transparent" : "oklch(1 0 0 / 0.10)"}`,
                  boxShadow: i <= step ? "0 0 12px var(--glow-gold)" : "none",
                }}
              >
                {i < step ? (
                  <Check className="size-3.5 text-primary-foreground" strokeWidth={2.5} />
                ) : (
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: i === step ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <p
                className="mt-2 rule-label text-[9px]"
                style={{ color: i <= step ? "var(--brass)" : "var(--muted-foreground)" }}
              >
                {s}
              </p>
            </div>
            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="relative mx-2 flex-1 h-px mb-5" style={{ background: "oklch(1 0 0 / 0.08)" }}>
                <motion.div
                  className="absolute inset-y-0 left-0 h-full"
                  animate={{ width: i < step ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "linear-gradient(to right, var(--brass-dim), var(--brass))",
                    boxShadow: "0 0 6px var(--glow-gold)",
                  }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        {/* Main content */}
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.ul
                key="step0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {cartStones.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-4 rounded-xl p-4"
                    style={{
                      background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.70) 0%, oklch(0.14 0.014 300 / 0.80) 100%)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                    }}
                  >
                    <img
                      src={s.images[0]}
                      alt={s.alt}
                      loading="lazy"
                      className="size-24 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg text-pearl" style={{ letterSpacing: "-0.01em" }}>
                        {s.name}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {s.carat.toFixed(2)} ct · {s.clarity} · {s.treatment} · {s.certificate}
                      </p>
                      <button
                        onClick={() => removeFromCart(s.id)}
                        className="rule-label mt-3 transition-colors hover:text-brass"
                      >
                        Release reservation
                      </button>
                    </div>
                    <p className="font-mono text-sm text-brass shrink-0">
                      {formatPrice(s.price, currency)}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <FloatingInput
                  label="Email for shipment confirmation"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-destructive"
                  >
                    {error}
                  </motion.p>
                )}
                <FloatingInput
                  label="Delivery address"
                  type="textarea"
                />
                <p className="text-sm text-muted-foreground">
                  Shipments require an adult signature. We do not deliver to forwarding addresses.
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.70) 0%, oklch(0.14 0.014 300 / 0.80) 100%)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                }}
              >
                {/* Vault seal */}
                <div className="mx-auto mb-6 relative flex size-20 items-center justify-center">
                  <svg
                    className="absolute inset-0 animate-rotate-slow"
                    width="80" height="80" viewBox="0 0 80 80"
                  >
                    <circle
                      cx="40" cy="40" r="36"
                      fill="none"
                      stroke="url(#seal-grad)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                    <defs>
                      <linearGradient id="seal-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.62 0.08 78 / 0.40)" />
                        <stop offset="100%" stopColor="oklch(0.80 0.09 82 / 0.20)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div
                    className="flex size-14 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.22 0.022 305) 0%, oklch(0.18 0.018 300) 100%)",
                      border: "1px solid oklch(0.70 0.082 78 / 0.30)",
                      boxShadow: "0 0 24px var(--glow-gold)",
                    }}
                  >
                    <Lock className="size-6 text-brass" />
                  </div>
                </div>

                <p className="font-display text-xl text-pearl mb-3" style={{ letterSpacing: "-0.01em" }}>
                  Settlement
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Orders above $50,000 settle through escrow: funds are released to us only after
                  you have inspected the stone against its report.
                </p>
                <button className="facet-sheen btn-gold mx-auto flex items-center gap-2">
                  <Check className="size-4" /> Confirm purchase
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 2 && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={next}
              className="facet-sheen btn-gold mt-8"
            >
              Continue
            </motion.button>
          )}
        </div>

        {/* Order summary */}
        <motion.aside
          layout
          className="h-fit rounded-2xl p-5"
          style={{
            background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.70) 0%, oklch(0.14 0.014 300 / 0.80) 100%)",
            border: "1px solid oklch(0.70 0.082 78 / 0.15)",
            boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06)",
          }}
        >
          <p className="engraved-label mb-5">Summary</p>
          <dl className="space-y-3 text-sm">
            <Row label="Stones" value={formatPrice(subtotal, currency)} />
            <Row label="Insured transit" value={formatPrice(insurance, currency)} />
            <Row label="Duty" value="At destination" />
          </dl>
          <div
            className="mt-5 flex items-baseline justify-between pt-5"
            style={{ borderTop: "1px solid oklch(0.70 0.082 78 / 0.15)" }}
          >
            <span className="rule-label">Total</span>
            <motion.span
              key={subtotal}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-2xl"
              style={{
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, var(--brass-dim), var(--brass-hi))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatPrice(subtotal + insurance, currency)}
            </motion.span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            14-day return window from delivery · Laboratory report shipped with the stone
          </p>
        </motion.aside>
      </div>
    </div>
  );
}

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: "text" | "email" | "textarea";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || (value && value.length > 0);

  const baseStyle: React.CSSProperties = {
    width: "100%",
    background: "oklch(0.16 0.016 305 / 0.60)",
    border: `1px solid ${focused ? "oklch(0.70 0.082 78 / 0.55)" : "oklch(1 0 0 / 0.10)"}`,
    borderRadius: "var(--radius-lg)",
    padding: "1.25rem 0.875rem 0.5rem",
    color: "var(--pearl)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    boxShadow: focused ? "0 0 0 3px oklch(0.70 0.082 78 / 0.12)" : "none",
    resize: type === "textarea" ? "none" : undefined,
  };

  return (
    <div className="relative">
      <label
        className="absolute z-10 transition-all duration-200 pointer-events-none"
        style={{
          top: raised ? "0.45rem" : "0.875rem",
          left: "0.875rem",
          fontSize: raised ? "0.625rem" : "0.8rem",
          letterSpacing: raised ? "0.16em" : "normal",
          textTransform: raised ? "uppercase" : "none",
          color: focused ? "var(--brass)" : "var(--muted-foreground)",
          fontFamily: raised ? "var(--font-mono)" : "var(--font-sans)",
        }}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-pearl">{value}</dd>
    </div>
  );
}
