import { motion } from "motion/react";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      style={{
        background: "oklch(0.135 0.014 305 / 0.45)",
        border: "1px solid oklch(1 0 0 / 0.06)",
      }}
    >
      <div className="mb-8 animate-float opacity-20">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="url(#empty-gold)" strokeWidth="0.8">
          <polygon points="12 2 22 9 12 22 2 9" />
          <defs>
            <linearGradient id="empty-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.55 0.060 76)" />
              <stop offset="100%" stopColor="oklch(0.78 0.085 80)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p
        className="font-display text-pearl"
        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", opacity: 0.75 }}
      >
        No stones match
      </p>
      <p className="mt-3 text-xs text-muted-foreground" style={{ maxWidth: "28ch", lineHeight: 1.7 }}>
        Try widening the carat range or removing a laboratory filter.
      </p>
      <button onClick={onReset} className="btn-outline-gold mt-8">
        Reset filters
      </button>
    </motion.div>
  );
}
