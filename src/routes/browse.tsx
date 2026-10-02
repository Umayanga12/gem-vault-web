import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { type GemType } from "@/data/stones";
import { StoneCard } from "@/components/vault/stone-card";
import { useVault } from "@/lib/vault-store";
import { BrowseHeader } from "@/page/Browse/BrowseHeader";
import { FilterSidebar } from "@/page/Browse/FilterSidebar";
import { EmptyState } from "@/page/Browse/EmptyState";
import { gemCategories, gemRowAccent } from "@/page/home/GemTypeCard";
import { labelToSlug } from "@/data/gemDescriptions";

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" ? (search.type as GemType) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse Sri Lankan Gemstones — Request a Quotation | Rhea Cylone" },
      {
        name: "description",
        content:
          "Browse our selection of fast-moving Sri Lankan gemstones. Filter by type, carat, clarity, treatment and laboratory. Request a quotation for any stone — no fixed prices.",
      },
      { property: "og:title", content: "Browse Sri Lankan Gemstones — Request a Quotation" },
      {
        property: "og:description",
        content: "A curated selection of fast-moving Sri Lankan gemstones. Request a quotation for sapphires, spinels, garnets, tourmalines and more.",
      },
    ],
  }),
  component: Browse,
});

/* ─── Hydration-safe mounted flag ─────────────────────────────────────────── */
function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

type Stones = ReturnType<typeof useVault>["stones"];
const NO_STONES: Stones = [];

/* ─── Sub-type pill chip ──────────────────────────────────────────────────── */
function SubTypePill({ label, accent }: { label: string; accent: string }) {
  return (
    <Link
      to="/gems/$gemSlug"
      params={{ gemSlug: labelToSlug(label) }}
      className="inline-block font-mono text-[9px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-sm transition-all duration-200 hover:opacity-80 hover:scale-105"
      style={{
        color: accent.replace(")", " / 0.85)"),
        background: accent.replace(")", " / 0.10)"),
        border: `1px solid ${accent.replace(")", " / 0.22)")}`,
        letterSpacing: "0.10em",
      }}
    >
      {label}
    </Link>
  );
}

/* ─── Category section header with sub-type chips ────────────────────────── */
function CategoryHeader({
  title,
  accent,
  count,
  subTypes = [],
}: {
  title: string;
  accent: string;
  count: number;
  subTypes?: string[];
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div
          className="h-[2px] w-8 flex-none"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent.replace(")", " / 0.20)")})`,
          }}
        />
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "oklch(0.94 0.012 85 / 0.95)",
          }}
        >
          {title}
        </h2>
        <span
          className="font-mono text-[9px] px-2 py-0.5"
          style={{
            color: "var(--muted-foreground)",
            background: "oklch(0.14 0.015 305 / 0.60)",
            border: "1px solid oklch(1 0 0 / 0.08)",
            letterSpacing: "0.12em",
          }}
        >
          {count} {count === 1 ? "stone" : "stones"}
        </span>
      </div>

      {subTypes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-12">
          {subTypes.map((s) => (
            <SubTypePill key={s} label={s} accent={accent} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── "Selected catalogue" info banner ───────────────────────────────────── */
function CatalogueBanner() {
  return (
    <div
      className="mb-10 rounded-xl px-6 py-5"
      style={{
        background: "linear-gradient(135deg, oklch(0.70 0.082 78 / 0.06) 0%, oklch(0.62 0.060 250 / 0.06) 100%)",
        border: "1px solid oklch(0.70 0.082 78 / 0.18)",
      }}
    >
      <p
        className="font-display text-pearl mb-2"
        style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
      >
        We currently showcase a selection of fast-moving Sri Lankan gemstones.
      </p>
      <p className="text-sm text-muted-foreground mb-4" style={{ lineHeight: 1.75 }}>
        If you are looking for a specific gemstone, color, size, cut, treatment status, or quantity that is not listed here, please contact us. We may be able to source it for you.
      </p>

      {/* Quotation process */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {["Select your gemstone", "Request a quotation", "Discuss and negotiate", "Complete your purchase"].map((step, i, arr) => (
          <span key={step} className="flex items-center gap-2">
            <span
              className="font-mono text-[9px] uppercase px-2 py-0.5"
              style={{
                background: "oklch(0.70 0.082 78 / 0.10)",
                border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                color: "var(--brass)",
                letterSpacing: "0.10em",
              }}
            >
              {step}
            </span>
            {i < arr.length - 1 && (
              <span className="text-muted-foreground font-mono text-xs">→</span>
            )}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://wa.me/message/GL6VCXPQEINGO1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 transition-all duration-200 hover:opacity-80"
          style={{
            background: "oklch(0.50 0.120 145 / 0.15)",
            border: "1px solid oklch(0.50 0.120 145 / 0.35)",
            color: "oklch(0.70 0.120 145)",
            letterSpacing: "0.12em",
          }}
        >
          <MessageCircle className="size-3" />
          WhatsApp
        </a>
        <Link
          to="/contactus"
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider px-3 py-1.5 transition-all duration-200 hover:opacity-80"
          style={{
            background: "oklch(0.70 0.082 78 / 0.10)",
            border: "1px solid oklch(0.70 0.082 78 / 0.30)",
            color: "var(--brass)",
            letterSpacing: "0.12em",
          }}
        >
          <Mail className="size-3" />
          Email Us
        </Link>
      </div>
    </div>
  );
}

/* ─── "You may also like" section ────────────────────────────────────────── */
function YouMayLike({
  activeType,
  stones,
}: {
  activeType: GemType;
  stones: Stones;
}) {
  const otherStones = useMemo(
    () => stones.filter((s) => s.type !== activeType).slice(0, 6),
    [stones, activeType],
  );

  if (otherStones.length === 0) return null;

  const otherFamilies = [...new Set(otherStones.map((s) => s.type))];

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, oklch(1 0 0 / 0.06), transparent)" }}
        />
        <p className="engraved-label flex items-center gap-3">
          <span
            className="block h-px w-8 flex-none"
            style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
          />
          Gems you may also like
        </p>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to left, oklch(1 0 0 / 0.06), transparent)" }}
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {otherFamilies.map((t) => {
          const cat = gemCategories.find((c) => c.routeType === t);
          const accent = (gemRowAccent as Record<string, string>)[t] ?? gemRowAccent["Rare Gems"];
          return (
            <Link
              key={t}
              to="/browse"
              search={{ type: t as GemType }}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:text-brass focus-visible:outline-none"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span
                className="block w-5 h-px transition-all duration-300 group-hover:w-8"
                style={{ background: accent }}
              />
              {cat?.title ?? t}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {otherStones.map((s, i) => (
            <StoneCard key={s.id} stone={s} index={i} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/browse"
          search={{ type: undefined }}
          className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brass focus-visible:text-brass focus-visible:outline-none"
        >
          View all gemstones
          <span
            className="block h-px transition-all duration-300 group-hover:w-10"
            style={{ width: "20px", background: "var(--brass-dim)" }}
          />
        </Link>
      </div>
    </div>
  );
}

/* ─── Main Browse component ───────────────────────────────────────────────── */
function Browse() {
  const { type } = Route.useSearch();
  const { stones: vaultStones } = useVault();

  // The vault store is only populated on the client, so the server renders
  // with no stones. Use the same empty list for the first client render, then
  // switch to the real data after mount so hydration matches.
  const mounted = useHasMounted();
  const stones = mounted ? vaultStones : NO_STONES;

  const [types, setTypes] = useState<GemType[]>(type ? [type] : []);
  const [open, setOpen] = useState(true);

  const results = useMemo(
    () =>
      stones.filter(
        (s) =>
          types.length === 0 || types.includes(s.type as GemType)
      ),
    [stones, types],
  );

  /* Group results by gem family, preserving gemCategories display order */
  const groupedResults = useMemo(() => {
    const groups: { category: (typeof gemCategories)[0]; stones: typeof results }[] = [];

    for (const cat of gemCategories) {
      const catStones = results.filter((s) => s.type === (cat.routeType as GemType));
      if (catStones.length > 0) {
        groups.push({ category: cat, stones: catStones });
      }
    }

    // Uncategorised fallback
    const coveredTypes = new Set(gemCategories.map((c) => c.routeType));
    const uncategorised = results.filter((s) => !coveredTypes.has(s.type));
    if (uncategorised.length > 0) {
      groups.push({
        category: {
          title: "Rare Gems",
          image: "",
          description: "",
          accent: gemRowAccent["Rare Gems"],
          routeType: "Rare Gems",
          subTypes: [],
        },
        stones: uncategorised,
      });
    }

    return groups;
  }, [results]);

  const isSingleCategory = types.length === 1;
  const singleType = isSingleCategory ? types[0] : undefined;

  function toggle<T>(list: T[], set: (v: T[]) => void, value: T) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function reset() {
    setTypes([]);
  }

  const hasFilters = types.length > 0;

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <BrowseHeader
          totalCount={stones.length}
          filteredCount={results.length}
          hasFilters={hasFilters}
          filtersOpen={open}
          onReset={reset}
          onToggleFilters={() => setOpen((v) => !v)}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            open={open}
            hasFilters={hasFilters}
            types={types}
            onToggleType={(t) => toggle(types, setTypes, t)}
            onReset={reset}
          />

          {/* Results */}
          <div>
            {/* Catalogue info banner */}
            <CatalogueBanner />

            {!mounted ? (
              // Same placeholder on server and first client render.
              // Avoids flashing the "no results" empty state before data loads.
              <div className="min-h-[50vh]" aria-busy="true" />
            ) : results.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <div className="space-y-14">
                {groupedResults.map(({ category, stones: catStones }) => (
                  <section key={category.title}>
                    <CategoryHeader
                      title={category.title}
                      accent={category.accent}
                      count={catStones.length}
                      subTypes={category.subTypes}
                    />
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      <AnimatePresence>
                        {catStones.map((s, i) => (
                          <StoneCard key={s.id} stone={s} index={i} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* "You may also like" — shown only when a single category is active */}
            {isSingleCategory && singleType && results.length > 0 && (
              <YouMayLike activeType={singleType} stones={stones} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
