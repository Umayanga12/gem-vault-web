import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Check, Lock } from "lucide-react";
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
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <h1 className="font-display text-3xl text-pearl">No stones reserved</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Reservations hold a stone for 48 hours while you review its report.
        </p>
        <Link
          to="/browse"
          className="facet-sheen mt-6 inline-block rounded-sm bg-brass px-6 py-3 text-sm text-primary-foreground"
        >
          Browse the vault
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl text-pearl">Checkout</h1>

      <ol className="mt-6 flex gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className="relative h-0.5 overflow-hidden bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brass"
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <p className={`rule-label mt-2 ${i <= step ? "text-brass" : ""}`}>{s}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          {step === 0 && (
            <ul className="space-y-5">
              {cartStones.map((s) => (
                <li key={s.id} className="flex gap-4 border-b border-border pb-5">
                  <img
                    src={s.images[0]}
                    alt={s.alt}
                    loading="lazy"
                    className="size-24 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg text-pearl">{s.name}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {s.carat.toFixed(2)} ct · {s.clarity} · {s.treatment} · {s.certificate}
                    </p>
                    <button
                      onClick={() => removeFromCart(s.id)}
                      className="rule-label mt-3 hover:text-brass"
                    >
                      Release reservation
                    </button>
                  </div>
                  <p className="font-mono text-sm text-brass">{formatPrice(s.price, currency)}</p>
                </li>
              ))}
            </ul>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <label className="block">
                <span className="rule-label">Email for shipment confirmation</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="mt-2 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm text-pearl"
                />
              </label>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-destructive"
                >
                  {error}
                </motion.p>
              )}
              <label className="block">
                <span className="rule-label">Delivery address</span>
                <textarea
                  rows={3}
                  className="mt-2 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm text-pearl"
                />
              </label>
              <p className="text-sm text-muted-foreground">
                Shipments require an adult signature. We do not deliver to forwarding addresses.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-sm border border-border bg-velvet p-6">
              <p className="flex items-center gap-2 font-display text-xl text-pearl">
                <Lock className="size-5 text-brass" /> Settlement
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Orders above $50,000 settle through escrow: funds are released to us only after
                you have inspected the stone against its report.
              </p>
              <button className="facet-sheen mt-6 flex items-center gap-2 rounded-sm bg-brass px-6 py-3 text-sm text-primary-foreground">
                <Check className="size-4" /> Confirm purchase
              </button>
            </div>
          )}

          {step < 2 && (
            <button
              onClick={next}
              className="facet-sheen mt-8 rounded-sm bg-brass px-6 py-3 text-sm text-primary-foreground"
            >
              Continue
            </button>
          )}
        </div>

        <aside className="h-fit rounded-sm border border-border bg-velvet p-5">
          <p className="rule-label">Summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Stones" value={formatPrice(subtotal, currency)} />
            <Row label="Insured transit" value={formatPrice(insurance, currency)} />
            <Row label="Duty" value="Charged at destination" />
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="rule-label">Total</span>
            <span className="font-display text-2xl text-brass">
              {formatPrice(subtotal + insurance, currency)}
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            14-day return window from delivery · Laboratory report shipped with the stone
          </p>
        </aside>
      </div>
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
