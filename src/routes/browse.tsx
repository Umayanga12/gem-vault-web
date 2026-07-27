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

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="rule-label">Marketplace</p>
          <h1 className="mt-2 font-display text-4xl text-pearl">Available stones</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <CountUp value={results.length} /> of {stones.length} stones
          </p>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-sm text-pearl lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters
          </button>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <AnimatePresence initial={false}>
          {open && (
            <motion.aside
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:!h-auto lg:!opacity-100"
            >
              <div className="space-y-7">
                <Group title="Gem type">
                  {gemTypes.map((t) => (
                    <Check
                      key={t}
                      label={t}
                      checked={types.includes(t)}
                      onChange={() => toggle(types, setTypes, t)}
                    />
                  ))}
                </Group>

                <Group title={`Carat — up to ${maxCarat.toFixed(2)} ct`}>
                  <input
                    type="range"
                    min={0.5}
                    max={8}
                    step={0.01}
                    value={maxCarat}
                    aria-label="Maximum carat weight"
                    onChange={(e) => setMaxCarat(Number(e.target.value))}
                    className="w-full accent-brass"
                  />
                </Group>

                <Group title={`Price — up to $${maxPrice.toLocaleString()}`}>
                  <input
                    type="range"
                    min={2000}
                    max={250000}
                    step={1000}
                    value={maxPrice}
                    aria-label="Maximum price"
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-brass"
                  />
                </Group>

                <Group title="Laboratory">
                  {labs.map((l) => (
                    <Check
                      key={l}
                      label={l}
                      checked={lab.includes(l)}
                      onChange={() => toggle(lab, setLab, l)}
                    />
                  ))}
                </Group>

                <Group title="Treatment">
                  {treatments.map((t) => (
                    <Check
                      key={t}
                      label={t}
                      checked={treatment.includes(t)}
                      onChange={() => toggle(treatment, setTreatment, t)}
                    />
                  ))}
                </Group>

                <button onClick={reset} className="rule-label hover:text-brass">
                  Clear all filters
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div>
          {results.length === 0 ? (
            <div className="rounded-sm border border-border bg-velvet p-10 text-center">
              <p className="font-display text-xl text-pearl">No stones match these filters</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the carat range or removing a laboratory restriction.
              </p>
              <button
                onClick={reset}
                className="mt-5 rounded-sm border border-brass/50 px-4 py-2 text-sm text-brass"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((s, i) => (
                <StoneCard key={s.id} stone={s} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="rule-label">{title}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-pearl">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 rounded-xs accent-brass"
      />
      {label}
    </label>
  );
}
