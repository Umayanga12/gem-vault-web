import { Link } from "@tanstack/react-router";
import { stones, type Stone } from "@/data/stones";
import { Reveal } from "@/components/vault/reveal";

interface ComparableStonesProps {
  currentStone: Stone;
}

export function ComparableStones({ currentStone }: ComparableStonesProps) {
  const comparables = stones
    .filter((s) => s.type === currentStone.type && s.id !== currentStone.id)
    .slice(0, 3);

  if (comparables.length === 0) return null;

  return (
    <section className="mt-24">
      <Reveal>
        <p className="engraved-label flex items-center gap-3 mb-6">
          <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }} />
          Comparable stones
        </p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparables.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08}>
            <Link
              to="/stones/$stoneId"
              params={{ stoneId: s.id }}
              className="facet-sheen group flex gap-4 rounded-xl p-4 transition-all duration-300"
              style={{
                background: "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.60) 0%, oklch(0.14 0.014 300 / 0.70) 100%)",
                border: "1px solid oklch(1 0 0 / 0.08)",
              }}
            >
              <img
                src={s.images[0]}
                alt={s.alt}
                loading="lazy"
                className="size-20 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="min-w-0">
                <p className="text-sm text-pearl truncate">{s.name}</p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-brass">
                  Request Quotation
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
