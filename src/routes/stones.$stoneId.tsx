import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Check, ExternalLink, FileText, Heart, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, getStone, stones, typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";

export const Route = createFileRoute("/stones/$stoneId")({
  loader: ({ params }): { stone: Stone } => {
    const stone = getStone(params.stoneId);
    if (!stone) throw notFound();
    return { stone };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Stone unavailable — Cabochon" }, { name: "robots", content: "noindex" }],
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
      <nav className="rule-label mb-6 flex gap-2">
        <Link to="/browse" className="hover:text-brass">
          Browse
        </Link>
        <span>/</span>
        <span className="text-pearl">{stone.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="facet-sheen vault-stage aspect-square overflow-hidden rounded-sm border border-border">
            <motion.img
              layoutId={`stone-image-${stone.id}`}
              key={angle}
              src={stone.images[angle]}
              alt={`${stone.alt} — view ${angle + 1} of ${stone.images.length}`}
              width={900}
              height={900}
              className="size-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {stone.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setAngle(i)}
                aria-label={`Show view ${i + 1}`}
                className={`facet-sheen aspect-square overflow-hidden rounded-sm border ${
                  i === angle ? "border-brass" : "border-border"
                }`}
              >
                <img src={img} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span
            className={`inline-block rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${typeAccent[stone.type]}`}
          >
            {stone.type} · {stone.origin}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-pearl">
            {stone.carat.toFixed(2)} ct {stone.name}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{stone.note}</p>

          <div className="mt-6 flex items-end gap-4">
            <p className="font-display text-4xl text-brass">
              {formatPrice(stone.price, currency)}
            </p>
            <button
              onClick={() => setUnit(unit === "ct" ? "g" : "ct")}
              className="rule-label mb-2 hover:text-brass"
            >
              Show {unit === "ct" ? "grams" : "carats"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              onClick={() => addToCart(stone.id)}
              whileTap={{ scale: 0.97 }}
              className="facet-sheen flex items-center gap-2 rounded-sm bg-brass px-6 py-3 text-sm font-medium text-primary-foreground"
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
              className="flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm text-pearl hover:border-brass hover:text-brass"
            >
              <Heart className={`size-4 ${saved ? "fill-brass text-brass" : ""}`} />
              {saved ? "Saved" : "Save with price alert"}
            </button>
          </div>

          <ul className="mt-6 grid gap-3 border-y border-border py-5 sm:grid-cols-3">
            {[
              [Truck, "Insured transit"],
              [ShieldCheck, `${stone.lab} report included`],
              [RotateCcw, "14-day return"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof Truck;
              return (
                <li key={label as string} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <I className="size-4 text-brass" /> {label as string}
                </li>
              );
            })}
          </ul>

          <table className="mt-6 w-full border-collapse text-left">
            <caption className="rule-label mb-3 text-left">Grading data</caption>
            <tbody>
              {spec.map(([k, v]) => (
                <tr key={k} className="border-b border-border/60">
                  <th scope="row" className="py-2 text-sm font-normal text-muted-foreground">
                    {k}
                  </th>
                  <td className="py-2 text-right font-mono text-sm text-pearl">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => setCert(true)}
            className="facet-sheen mt-5 flex w-full items-center justify-between rounded-sm border border-brass/40 px-4 py-3 text-sm text-brass"
          >
            <span className="flex items-center gap-2">
              <FileText className="size-4" /> View grading report
            </span>
            <span className="font-mono text-xs">{stone.certificate}</span>
          </button>
        </div>
      </div>

      <section className="mt-20">
        <p className="rule-label">Comparable stones</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stones
            .filter((s) => s.type === stone.type && s.id !== stone.id)
            .slice(0, 3)
            .map((s) => (
              <Link
                key={s.id}
                to="/stones/$stoneId"
                params={{ stoneId: s.id }}
                className="facet-sheen flex gap-4 rounded-sm border border-border bg-velvet p-4"
              >
                <img
                  src={s.images[0]}
                  alt={s.alt}
                  loading="lazy"
                  className="size-20 rounded-sm object-cover"
                />
                <div>
                  <p className="text-sm text-pearl">{s.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {s.carat.toFixed(2)} ct · {s.clarity}
                  </p>
                  <p className="mt-2 font-mono text-sm text-brass">
                    {formatPrice(s.price, currency)}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <AnimatePresence>
        {cert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 p-5 backdrop-blur-sm"
            onClick={() => setCert(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-sm border border-border bg-velvet p-6"
              role="dialog"
              aria-label="Grading report"
            >
              <p className="rule-label">{stone.lab} grading report</p>
              <p className="mt-2 font-display text-2xl text-pearl">{stone.certificate}</p>
              <dl className="mt-5 space-y-2">
                {spec.slice(0, 8).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border/60 pb-2">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="font-mono text-sm text-pearl">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3">
                <a
                  href={`https://www.gia.edu/report-check?reportno=${encodeURIComponent(stone.certificate)}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="facet-sheen flex items-center gap-2 rounded-sm bg-brass px-4 py-2 text-sm text-primary-foreground"
                >
                  Verify with laboratory <ExternalLink className="size-3.5" />
                </a>
                <button
                  onClick={() => setCert(false)}
                  className="rounded-sm border border-border px-4 py-2 text-sm text-pearl"
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
