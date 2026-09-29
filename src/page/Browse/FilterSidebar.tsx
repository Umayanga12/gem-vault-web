import { AnimatePresence, motion } from "motion/react";
import { gemTypes, type GemType } from "@/data/stones";
import { FilterGroup } from "./FilterGroup";
import { FilterCheck } from "./FilterCheck";
import { RangeSlider } from "./RangeSlider";

const labs = ["GIA", "IGI", "AGS", "GRS"] as const;
const treatments = ["Unheated", "Heated", "Minor oil", "None"] as const;

interface FilterSidebarProps {
  open: boolean;
  hasFilters: boolean;
  types: GemType[];
  maxCarat: number;
  maxPrice: number;
  lab: string[];
  treatment: string[];
  onToggleType: (t: GemType) => void;
  onMaxCaratChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  onToggleLab: (l: string) => void;
  onToggleTreatment: (t: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  open,
  hasFilters,
  types,
  maxCarat,
  maxPrice,
  lab,
  treatment,
  onToggleType,
  onMaxCaratChange,
  onMaxPriceChange,
  onToggleLab,
  onToggleTreatment,
  onReset,
}: FilterSidebarProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.aside
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden lg:!h-auto lg:!opacity-100"
        >
          <div
            className="space-y-7 p-6 lg:sticky lg:top-24"
            style={{
              background: "oklch(0.145 0.015 305 / 0.60)",
              border: "1px solid oklch(1 0 0 / 0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="engraved-label">Filters</p>
              {hasFilters && (
                <button
                  onClick={onReset}
                  className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground hover:text-brass transition-colors"
                  style={{ letterSpacing: "0.16em" }}
                >
                  Reset all
                </button>
              )}
            </div>

            <FilterGroup title="Gem type">
              {gemTypes.map((t) => (
                <FilterCheck
                  key={t}
                  label={t}
                  checked={types.includes(t)}
                  onChange={() => onToggleType(t)}
                />
              ))}
            </FilterGroup>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
