import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { CountUp } from "@/components/vault/reveal";

interface BrowseHeaderProps {
  totalCount: number;
  filteredCount: number;
  hasFilters: boolean;
  filtersOpen: boolean;
  onReset: () => void;
  onToggleFilters: () => void;
}

export function BrowseHeader({
  totalCount,
  filteredCount,
  hasFilters,
  filtersOpen,
  onReset,
  onToggleFilters,
}: BrowseHeaderProps) {
  return (
    <header
      className="flex flex-wrap items-end justify-between gap-4 pb-10"
      style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
    >
      <div>
        <p className="engraved-label flex items-center gap-3">
          <span
            className="block h-px w-8"
            style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
          />
          The vault
        </p>
        <h1
          className="mt-4 font-display text-pearl"
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
            lineHeight: 1.03,
            letterSpacing: "-0.03em",
          }}
        >
          Most popular & Fast moving Gems
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-mono text-[10px] text-muted-foreground" style={{ letterSpacing: "0.14em" }}>
          <CountUp value={filteredCount} /> of {totalCount} stones
        </p>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            className="font-mono text-[9px] uppercase tracking-wider transition-colors hover:text-brass"
            style={{
              color: "var(--brass-dim)",
              border: "1px solid oklch(0.68 0.076 76 / 0.25)",
              padding: "0.375rem 0.75rem",
              letterSpacing: "0.16em",
            }}
          >
            Clear filters
          </motion.button>
        )}
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-pearl lg:hidden"
          style={{
            fontFamily: "var(--font-mono)",
            background: "oklch(0.16 0.015 305 / 0.50)",
            border: "1px solid oklch(1 0 0 / 0.07)",
            padding: "0.5rem 0.875rem",
            letterSpacing: "0.10em",
          }}
        >
          <SlidersHorizontal className="size-3.5" />
          {filtersOpen ? "Hide" : "Filters"}
        </button>
      </div>
    </header>
  );
}
