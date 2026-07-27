import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import heroDiamond from "@/assets/hero-diamond.jpg";
import { gemTypes, stones, typeAccent } from "@/data/stones";
import { StoneCard } from "@/components/vault/stone-card";
import { TrustStrip } from "@/components/vault/trust-strip";
import { Reveal } from "@/components/vault/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cabochon — Certified Loose Gemstones for Collectors" },
      {
        name: "description",
        content:
          "A specialist vault of certified loose diamonds, sapphires, rubies and emeralds — graded by GIA, IGI, AGS and GRS, sold with full origin and treatment disclosure.",
      },
      { property: "og:title", content: "Cabochon — Certified Loose Gemstones" },
      {
        property: "og:description",
        content:
          "Certified natural and lab-grown stones with carat, cut, clarity, origin and treatment stated plainly.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const reduced = useReducedMotion();
  const featured = stones.slice(0, 6);

  return (
    <>
      <section className="vault-stage relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-14 pb-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <p className="rule-label">Lot 214 · Now on the stage</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-pearl sm:text-6xl lg:text-7xl">
              A 3.02 ct D&nbsp;/&nbsp;VVS1 round brilliant,
              <span className="text-brass"> lit and measured.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              We list loose stones only — natural and lab-grown — each one graded by an
              independent laboratory before it reaches this page. Carat, origin and treatment are
              stated plainly, never softened.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/browse"
                className="facet-sheen rounded-sm bg-brass px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                Enter the vault
              </Link>
              <Link
                to="/stones/$stoneId"
                params={{ stoneId: "d-3021" }}
                className="rounded-sm border border-border px-6 py-3 text-sm text-pearl transition-colors hover:border-brass hover:text-brass"
              >
                View this stone
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["Carat", "3.02 ct"],
                ["Report", "GIA 2214938471"],
                ["Origin", "Botswana"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="rule-label">{k}</dt>
                  <dd className="mt-1 font-mono text-sm text-pearl">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="facet-sheen-loop order-1 aspect-square overflow-hidden rounded-sm border border-border lg:order-2"
          >
            <img
              src={heroDiamond}
              alt="3.02 carat D colour VVS1 round brilliant diamond spotlit against a dark background"
              width={1408}
              height={1408}
              className="size-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <TrustStrip />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="rule-label">Shop by gem</p>
            <h2 className="mt-2 font-display text-3xl text-pearl">Five families, one standard</h2>
          </div>
          <Link to="/browse" className="text-sm text-brass hover:underline">
            See all {stones.length} stones
          </Link>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {gemTypes.map((t, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <Link
                to="/browse"
                search={{ type: t }}
                className={`facet-sheen block rounded-sm border px-4 py-8 text-center transition-transform hover:-translate-y-0.5 ${typeAccent[t]}`}
              >
                <span className="font-display text-lg">{t}</span>
                <span className="mt-1 block font-mono text-[11px] opacity-80">
                  {stones.filter((s) => s.type === t).length} listed
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Reveal>
          <p className="rule-label">The display case</p>
          <h2 className="mt-2 font-display text-3xl text-pearl">Featured stones</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <StoneCard key={s.id} stone={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
