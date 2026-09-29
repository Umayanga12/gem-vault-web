import { Link } from "@tanstack/react-router";
import { useVault } from "@/lib/vault-store";
import { StoneCard } from "@/components/vault/stone-card";
import { Reveal } from "@/components/vault/reveal";
import { motion } from "motion/react";

/* Featured categories shown on homepage — exactly 3 */
const FEATURED_TYPES = [
  { type: "Sapphire", subType: "Padparadscha", label: "Padparadscha Sapphire" },
  { type: "Sapphire", subType: "Blue", label: "Blue Sapphire" },
  { type: "Tourmaline", label: "Tourmaline" },
] as const;

export function FeaturedSection() {
  const { stones } = useVault();

  /* Pick one representative stone per featured category */
  const featured = FEATURED_TYPES.map((ft) => {
    if ("subType" in ft) {
      // Try to find isFeatured first, else first match
      return (
        stones.find((s) => s.type === ft.type && s.subType === ft.subType && s.isFeatured) ??
        stones.find((s) => s.type === ft.type && s.subType === ft.subType) ??
        stones.find((s) => s.type === ft.type && s.isFeatured) ??
        stones.find((s) => s.type === ft.type)
      );
    }
    return (
      stones.find((s) => s.type === ft.type && s.isFeatured) ??
      stones.find((s) => s.type === ft.type)
    );
  }).filter(Boolean) as ReturnType<typeof useVault>["stones"];

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div>
          <p className="engraved-label flex items-center gap-3">
            <span
              className="block h-px w-8 flex-none"
              style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
            />
            The display case
          </p>
          <h2
            className="mt-4 font-display text-pearl"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            Featured stones
          </h2>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--muted-foreground)", maxWidth: "50ch", lineHeight: 1.75 }}
          >
            A selection of fast-moving Sri Lankan gemstones — request a quotation for any stone that interests you.
          </p>
        </div>
        <Link
          to="/browse"
          search={{ type: undefined }}
          className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brass focus-visible:text-brass focus-visible:outline-none"
        >
          Browse all
          <span
            className="block h-px transition-all duration-300 group-hover:w-8 group-focus-visible:w-8"
            style={{ width: "20px", background: "var(--brass-dim)" }}
          />
        </Link>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((s, i) => (
          <StoneCard key={s.id} stone={s} index={i} />
        ))}
      </div>

      {/* See More button */}
      <Reveal className="mt-12 text-center">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground" style={{ maxWidth: "50ch", lineHeight: 1.75 }}>
            Browsing our fast-moving selection. Looking for something specific? We may be able to source it for you.
          </p>
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              to="/browse"
              search={{ type: undefined }}
              className="facet-sheen btn-gold inline-flex items-center gap-2"
            >
              See More Gemstones
              <span className="font-mono text-sm">→</span>
            </Link>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
