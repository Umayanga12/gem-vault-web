import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tag, X } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatDiscount } from "@/data/discounts";

export function PromoBanner() {
  const { discounts } = useVault();
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const now = new Date();
  const activePromos = discounts.filter(
    (d) =>
      d.active && (!d.expiresAt || new Date(d.expiresAt) >= now),
  );

  useEffect(() => {
    if (activePromos.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % activePromos.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activePromos.length]);

  if (dismissed || activePromos.length === 0) return null;

  const promo = activePromos[current];

  function describe() {
    if (!promo) return "";
    const val = formatDiscount(promo);
    if (promo.type === "bundle") return `${val} deal available!`;
    if (promo.type === "percent") return `Save ${val}`;
    return `Enjoy ${val} off`;
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(90deg, oklch(0.68 0.076 76 / 0.10) 0%, oklch(0.68 0.076 76 / 0.06) 50%, oklch(0.68 0.076 76 / 0.10) 100%)",
        borderBottom: "1px solid oklch(0.68 0.076 76 / 0.20)",
      }}
    >
      {/* Subtle shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, oklch(0.68 0.076 76 / 0.04) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-8 py-2">
        <Tag className="size-3.5 flex-none" style={{ color: "var(--brass)" }} />

        <div className="overflow-hidden" style={{ height: "1.25rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={promo.id}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              <span
                className="font-display"
                style={{ fontSize: "0.85rem", color: "var(--brass-hi, var(--brass))", letterSpacing: "-0.01em" }}
              >
                {promo.name}
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}
              >
                ·
              </span>
              <span className="text-sm" style={{ color: "var(--pearl)", fontSize: "0.82rem" }}>
                {describe()}
              </span>
              {promo.code && (
                <>
                  <span
                    className="font-mono"
                    style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}
                  >
                    · Use code:
                  </span>
                  <span
                    className="font-mono px-1.5 py-0.5"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "var(--brass)",
                      background: "oklch(0.68 0.076 76 / 0.12)",
                      border: "1px solid oklch(0.68 0.076 76 / 0.30)",
                      borderRadius: "3px",
                    }}
                  >
                    {promo.code}
                  </span>
                </>
              )}
              {promo.expiresAt && (
                <span
                  className="font-mono"
                  style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.10em" }}
                >
                  · Ends {new Date(promo.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots for multiple promos */}
        {activePromos.length > 1 && (
          <div className="flex items-center gap-1 ml-2">
            {activePromos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="size-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i === current ? "var(--brass)" : "oklch(0.68 0.076 76 / 0.30)",
                }}
                aria-label={`Go to promotion ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-5 flex size-6 items-center justify-center transition-colors hover:text-pearl"
          style={{ color: "var(--muted-foreground)" }}
          aria-label="Dismiss promotion banner"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
