import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SlidersHorizontal, LayoutGrid, Search } from "lucide-react";
import { gemTypes, stones, type GemType } from "@/data/stones";
import { StoneCard } from "@/components/vault/stone-card";
import { CountUp } from "@/components/vault/reveal";

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" ? (search.type as GemType) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse Certified Loose Gemstones — Cabochon" },
      {
        name: "description",
        content:
          "Filter certified loose gemstones by type, carat, clarity, origin, treatment and laboratory. Natural and lab-grown stones with full grading data.",
      },
      { property: "og:title", content: "Browse Certified Loose Gemstones" },
      {
        property: "og:description",
        content: "Filter by carat, clarity, origin, treatment and grading laboratory.",
      },
    ],
  }),
  component: Browse,
});

const labs = ["GIA", "IGI", "AGS", "GRS"] as const;
const treatments = ["Unheated", "Heated", "Minor oil", "None"] as const;

function Browse() {
  const { type } = Route.useSearch();
  const [types, setTypes] = useState<GemType[]>(type ? [type] : []);
  const [maxCarat, setMaxCarat] = useState(8);
  const [lab, setLab] = useState<string[]>([]);
  const [treatment, setTreatment] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [open, setOpen] = useState(true);

  const results = useMemo(
    () =>
      stones.filter(
        (s) =>
          (types.length === 0 || types.includes(s.type)) &&
          s.carat <= maxCarat &&
          s.price <= maxPrice &&
          (lab.length === 0 || lab.includes(s.lab)) &&
          (treatment.length === 0 || treatment.includes(s.treatment)),
      ),
    [types, maxCarat, maxPrice, lab, treatment],
  );

  function toggle<T>(list: T[], set: (v: T[]) => void, value: T) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function reset() {
    setTypes([]);
    setMaxCarat(8);
    setLab([]);
    setTreatment([]);
    setMaxPrice(250000);
  }

  const hasFilters = types.length > 0 || maxCarat < 8 || lab.length > 0 || treatment.length > 0 || maxPrice < 250000;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      {/* Page header */}
      <header className="flex flex-wrap items-end justify-between gap-4 pb-8" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}>
        <div>
          <p className="engraved-label flex items-center gap-3">
            <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }} />
            Marketplace
          </p>
          <h1
            className="mt-3 font-display text-pearl"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            Available stones
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-mono text-sm text-muted-foreground">
            <CountUp value={results.length} /> of {stones.length} stones
          </p>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={reset}
              className="rounded-full px-3 py-1 font-mono text-[10px] tracking-wider text-brass transition-colors hover:bg-brass/10"
              style={{ border: "1px solid oklch(0.70 0.082 78 / 0.35)" }}
            >
              Clear filters
            </motion.button>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-pearl transition-all lg:hidden"
            style={{
              background: "oklch(0.18 0.018 305 / 0.60)",
              border: "1px solid oklch(1 0 0 / 0.08)",
            }}
          >
            <SlidersHorizontal className="size-4" />
            {open ? "Hide" : "Filters"}
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filter sidebar */}
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
                className="space-y-6 rounded-xl p-5 lg:sticky lg:top-24"
                style={{
                  background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px oklch(0 0 0 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.06)",
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="engraved-label">Filters</p>
                  {hasFilters && (
                    <button onClick={reset} className="rule-label text-[9px] text-muted-foreground hover:text-brass transition-colors">
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
                      onChange={() => toggle(types, setTypes, t)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title={`Carat — up to ${maxCarat.toFixed(2)} ct`}>
                  <RangeSlider
                    min={0.5} max={8} step={0.01}
                    value={maxCarat}
                    onChange={setMaxCarat}
                    aria-label="Maximum carat weight"
                  />
                </FilterGroup>

                <FilterGroup title={`Price — up to $${maxPrice.toLocaleString()}`}>
                  <RangeSlider
                    min={2000} max={250000} step={1000}
                    value={maxPrice}
                    onChange={setMaxPrice}
                    aria-label="Maximum price"
                  />
                </FilterGroup>

                <FilterGroup title="Laboratory">
                  {labs.map((l) => (
                    <FilterCheck
                      key={l}
                      label={l}
                      checked={lab.includes(l)}
                      onChange={() => toggle(lab, setLab, l)}
                    />
                  ))}
                </FilterGroup>

                <FilterGroup title="Treatment">
                  {treatments.map((t) => (
                    <FilterCheck
                      key={t}
                      label={t}
                      checked={treatment.includes(t)}
                      onChange={() => toggle(treatment, setTreatment, t)}
                    />
                  ))}
                </FilterGroup>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Results */}
        <div>
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-xl py-20 text-center"
              style={{
                background: "oklch(0.155 0.016 305 / 0.50)",
                border: "1px solid oklch(1 0 0 / 0.07)",
              }}
            >
              {/* Animated gem icon */}
              <div className="mb-6 animate-float opacity-30">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#empty-gold)" strokeWidth="1">
                  <polygon points="12 2 22 9 12 22 2 9" />
                  <defs>
                    <linearGradient id="empty-gold" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.08 78)" />
                      <stop offset="100%" stopColor="oklch(0.80 0.09 82)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="font-display text-xl text-pearl" style={{ letterSpacing: "-0.01em" }}>
                No stones match these filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the carat range or removing a laboratory restriction.
              </p>
              <button
                onClick={reset}
                className="btn-outline-gold mt-6 text-sm"
              >
                Reset filters
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {results.map((s, i) => (
                  <StoneCard key={s.id} stone={s} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="rule-label mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-pearl">
      {/* Custom checkbox */}
      <span
        className="relative flex size-4 shrink-0 items-center justify-center rounded transition-all duration-200"
        style={{
          background: checked ? "oklch(0.70 0.082 78 / 0.20)" : "transparent",
          border: `1px solid ${checked ? "oklch(0.70 0.082 78 / 0.70)" : "oklch(1 0 0 / 0.18)"}`,
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "backOut" }}
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <polyline points="2,5 4,7.5 8,3" stroke="oklch(0.80 0.09 82)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-label={label}
        />
      </span>
      {label}
    </label>
  );
}

function RangeSlider({
  min, max, step, value, onChange, "aria-label": ariaLabel,
}: {
  min: number; max: number; step: number;
  value: number;
  onChange: (v: number) => void;
  "aria-label"?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative pt-1">
      <div className="relative h-1 rounded-full" style={{ background: "oklch(1 0 0 / 0.10)" }}>
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(to right, var(--brass-dim), var(--brass))",
          }}
        />
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
        style={{ height: "1rem", marginTop: "-0.375rem" }}
      />
      {/* Thumb */}
      <div
        className="pointer-events-none absolute top-0 size-4 -translate-x-1/2 -translate-y-1.5 rounded-full transition-transform"
        style={{
          left: `${pct}%`,
          background: "linear-gradient(135deg, var(--brass), var(--brass-hi))",
          boxShadow: "0 0 8px var(--glow-gold)",
          border: "2px solid oklch(0.12 0.012 300)",
        }}
      />
    </div>
  );
}
