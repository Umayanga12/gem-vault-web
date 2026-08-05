import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
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

  const hasFilters =
    types.length > 0 || maxCarat < 8 || lab.length > 0 || treatment.length > 0 || maxPrice < 250000;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      {/* Page header */}
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
            Available stones
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-mono text-[10px] text-muted-foreground" style={{ letterSpacing: "0.14em" }}>
            <CountUp value={results.length} /> of {stones.length} stones
          </p>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={reset}
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
            onClick={() => setOpen((v) => !v)}
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
            {open ? "Hide" : "Filters"}
          </button>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
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
                      onClick={reset}
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
              <button onClick={reset} className="btn-outline-gold mt-8">
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
      <p
        className="rule-label mb-4"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)", paddingBottom: "0.5rem" }}
      >
        {title}
      </p>
      <div className="space-y-2.5">{children}</div>
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
    <label className="flex cursor-pointer items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-pearl">
      {/* Diamond checkbox */}
      <span
        className="relative flex size-3.5 shrink-0 items-center justify-center transition-all duration-200"
        style={{
          background: checked ? "oklch(0.68 0.076 76 / 0.15)" : "transparent",
          border: `1px solid ${checked ? "oklch(0.68 0.076 76 / 0.60)" : "oklch(1 0 0 / 0.16)"}`,
          transform: "rotate(45deg)",
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "backOut" }}
              className="size-1.5"
              style={{ background: "var(--brass)", transform: "rotate(-45deg)" }}
            />
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
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
        {label}
      </span>
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
      <div className="relative h-px rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
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
        style={{ height: "1rem", marginTop: "-0.5rem" }}
      />
      {/* Thumb */}
      <div
        className="pointer-events-none absolute top-0 size-3 -translate-x-1/2 -translate-y-[5px]"
        style={{
          left: `${pct}%`,
          background: "linear-gradient(135deg, var(--brass), var(--brass-hi))",
          border: "1.5px solid oklch(0.11 0.010 300)",
          boxShadow: "0 0 6px var(--glow-gold)",
        }}
      />
    </div>
  );
}
