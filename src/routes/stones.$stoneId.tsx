import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check, ChevronRight, ExternalLink, FileText, Heart, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, getStone, stones, typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";
import { Reveal } from "@/components/vault/reveal";

export const Route = createFileRoute("/stones/$stoneId")({
  loader: ({ params }): { stone: Stone } => {
    const stone = getStone(params.stoneId);
    if (!stone) throw notFound();
    return { stone };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Stone unavailable — Rhea Cylone" }, { name: "robots", content: "noindex" }],
      };
    }
    const { stone } = loaderData;
    const title = `${stone.carat.toFixed(2)} ct ${stone.name} — ${stone.lab} certified`;
    const description = `${stone.carat.toFixed(2)} carat ${stone.color} ${stone.type.toLowerCase()} from ${stone.country}. ${stone.clarity} clarity, ${stone.treatment.toLowerCase()}, report ${stone.certificate}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: StoneDetail,
});

function StoneDetail() {
  const { stone } = Route.useLoaderData() as { stone: Stone };
  const { currency, unit, setUnit, addToCart, cart, wishlist, toggleWishlist } = useVault();
  const [angle, setAngle] = useState(0);
  const [cert, setCert] = useState(false);
  const inCart = cart.includes(stone.id);
  const saved = wishlist.includes(stone.id);
  const weight = unit === "ct" ? `${stone.carat.toFixed(2)} ct` : `${(stone.carat * 0.2).toFixed(3)} g`;

  const spec: [string, string][] = [
    ["Carat", weight],
    ["Shape", stone.shape],
    ["Cut grade", stone.cut],
    ["Colour", stone.color],
    ["Clarity", stone.clarity],
    ["Origin", stone.country],
    ["Formation", stone.origin],
    ["Treatment", stone.treatment],
    ["Laboratory", stone.lab],
    ["Report no.", stone.certificate],
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link to="/browse" search={{ type: undefined }} className="rule-label transition-colors hover:text-brass">
          Browse
        </Link>
        <ChevronRight className="size-3 text-muted-foreground opacity-50" />
        <span className="rule-label text-pearl">{stone.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — image gallery */}
        <div>
          {/* Main image */}
          <div
            className="facet-sheen vault-stage relative aspect-square overflow-hidden rounded-2xl transition-all duration-500"
            style={{
              border: "1px solid oklch(1 0 0 / 0.10)",
              boxShadow: "0 0 48px 8px var(--glow-gold), 0 20px 60px oklch(0 0 0 / 0.60)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={angle}
                src={stone.images[angle]}
                alt={`${stone.alt} — view ${angle + 1} of ${stone.images.length}`}
                width={900}
                height={900}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="size-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          {stone.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {stone.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setAngle(i)}
                  aria-label={`Show view ${i + 1}`}
                  className="facet-sheen relative aspect-square overflow-hidden rounded-xl transition-all duration-300"
                  style={{
                    border: `1px solid ${i === angle ? "oklch(0.70 0.082 78 / 0.70)" : "oklch(1 0 0 / 0.08)"}`,
                    boxShadow: i === angle ? "0 0 16px 2px var(--glow-gold)" : "none",
                    transform: i === angle ? "scale(0.96)" : "scale(1)",
                  }}
                >
                  <img src={img} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — details */}
        <div>
          {/* Type badge */}
          <span
            className="inline-block rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase"
            style={{
              background: "oklch(0.70 0.082 78 / 0.12)",
              border: "1px solid oklch(0.70 0.082 78 / 0.30)",
              color: "var(--brass)",
            }}
          >
            {stone.type} · {stone.origin}
          </span>

          {/* Name */}
          <h1
            className="mt-5 font-display text-pearl"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {stone.carat.toFixed(2)} ct {stone.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stone.note}</p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-4">
            <p
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 50%, var(--brass-hi) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatPrice(stone.price, currency)}
            </p>
            <button
              onClick={() => setUnit(unit === "ct" ? "g" : "ct")}
              className="rule-label transition-colors hover:text-brass"
            >
              Show {unit === "ct" ? "grams" : "carats"}
            </button>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              onClick={() => addToCart(stone.id)}
              whileTap={{ scale: 0.97 }}
              className="facet-sheen btn-gold"
              style={{
                animation: inCart ? "none" : "glow-pulse 2.5s ease-in-out infinite",
                filter: inCart ? "brightness(0.85)" : "brightness(1)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {inCart ? (
                  <motion.span
                    key="in"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-4" /> Reserved for 48 hours
                  </motion.span>
                ) : (
                  <motion.span
                    key="out"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    Reserve this stone
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => toggleWishlist(stone.id)}
              className="flex items-center gap-2 rounded-lg px-5 py-3 text-sm transition-all duration-200"
              style={{
                color: saved ? "var(--brass)" : "var(--pearl)",
                background: saved ? "oklch(0.70 0.082 78 / 0.10)" : "transparent",
                border: `1px solid ${saved ? "oklch(0.70 0.082 78 / 0.40)" : "oklch(1 0 0 / 0.12)"}`,
              }}
            >
              <Heart className="size-4" style={{ fill: saved ? "var(--brass)" : "none", transition: "fill 200ms ease" }} />
              {saved ? "Saved" : "Save with price alert"}
            </button>
          </div>

          {/* Trust icons */}
          <ul
            className="mt-6 grid gap-3 py-5 sm:grid-cols-3"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)", borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
          >
            {[
              [Truck, "Insured transit"],
              [ShieldCheck, `${stone.lab} report included`],
              [RotateCcw, "14-day return"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof Truck;
              return (
                <li key={label as string} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <I className="size-4 shrink-0" style={{ color: "var(--brass)" }} />
                  {label as string}
                </li>
              );
            })}
          </ul>

          {/* Spec table */}
          <Reveal>
            <p className="rule-label mt-6 mb-3">Grading data</p>
            <table className="w-full border-collapse text-left">
              <tbody>
                {spec.map(([k, v], i) => (
                  <motion.tr
                    key={k}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="group"
                    style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
                  >
                    <th
                      scope="row"
                      className="py-2.5 text-sm font-normal text-muted-foreground transition-colors group-hover:text-pearl/70"
                    >
                      {k}
                    </th>
                    <td className="py-2.5 text-right font-mono text-sm text-pearl">{v}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Grading report button */}
          <button
            onClick={() => setCert(true)}
            className="facet-sheen mt-5 flex w-full items-center justify-between rounded-xl px-4 py-4 transition-all duration-300"
            style={{
              background: "oklch(0.70 0.082 78 / 0.08)",
              border: "1px solid oklch(0.70 0.082 78 / 0.30)",
            }}
          >
            <span className="flex items-center gap-3 text-sm text-pearl">
              <span
                className="flex size-8 items-center justify-center rounded-lg"
                style={{ background: "oklch(0.70 0.082 78 / 0.15)", border: "1px solid oklch(0.70 0.082 78 / 0.25)" }}
              >
                <FileText className="size-4 text-brass" />
              </span>
              View grading report
            </span>
            <span className="font-mono text-xs text-muted-foreground">{stone.certificate}</span>
          </button>
        </div>
      </div>

      {/* Comparable stones */}
      <section className="mt-24">
        <Reveal>
          <p className="engraved-label flex items-center gap-3 mb-6">
            <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }} />
            Comparable stones
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stones
            .filter((s) => s.type === stone.type && s.id !== stone.id)
            .slice(0, 3)
            .map((s, i) => (
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
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {s.carat.toFixed(2)} ct · {s.clarity}
                    </p>
                    <p className="mt-2 font-mono text-sm text-brass">{formatPrice(s.price, currency)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Certificate modal */}
      <AnimatePresence>
        {cert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ background: "oklch(0.06 0.01 300 / 0.85)", backdropFilter: "blur(16px)" }}
            onClick={() => setCert(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl p-6"
              style={{
                background: "linear-gradient(160deg, oklch(0.19 0.020 305) 0%, oklch(0.14 0.015 300) 100%)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                boxShadow: "0 40px 120px oklch(0 0 0 / 0.70), inset 0 1px 0 oklch(1 0 0 / 0.08)",
              }}
              role="dialog"
              aria-label="Grading report"
            >
              {/* Modal header */}
              <div className="mb-5" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)", paddingBottom: "1rem" }}>
                <p className="engraved-label">{stone.lab} grading report</p>
                <p className="mt-2 font-display text-2xl text-pearl" style={{ letterSpacing: "-0.02em" }}>
                  {stone.certificate}
                </p>
              </div>

              {/* Spec list */}
              <dl className="space-y-2">
                {spec.slice(0, 8).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}>
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="font-mono text-sm text-pearl">{v}</dd>
                  </div>
                ))}
              </dl>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <a
                  href={`https://www.gia.edu/report-check?reportno=${encodeURIComponent(stone.certificate)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="facet-sheen btn-gold flex items-center gap-2"
                >
                  Verify with laboratory <ExternalLink className="size-3.5" />
                </a>
                <button
                  onClick={() => setCert(false)}
                  className="btn-outline-gold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
