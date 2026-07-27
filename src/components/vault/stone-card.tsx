import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { formatPrice, typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";

export function StoneCard({ stone, index = 0 }: { stone: Stone; index?: number }) {
  const reduced = useReducedMotion();
  const { currency, wishlist, toggleWishlist } = useVault();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const saved = wishlist.includes(stone.id);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.07 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="facet-sheen relative rounded-sm border border-border bg-velvet"
      >
        <Link
          to="/stones/$stoneId"
          params={{ stoneId: stone.id }}
          className="block focus-visible:outline-none"
        >
          <div className="vault-stage relative aspect-square overflow-hidden">
            <motion.img
              layoutId={`stone-image-${stone.id}`}
              src={stone.images[0]}
              alt={stone.alt}
              loading="lazy"
              width={900}
              height={900}
              className="size-full object-cover"
            />
            <span
              className={`absolute top-3 left-3 rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase ${typeAccent[stone.type]}`}
            >
              {stone.type}
            </span>
          </div>

          <div className="space-y-3 p-4">
            <div>
              <h3 className="font-display text-base leading-tight text-pearl">{stone.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {stone.carat.toFixed(2)} ct · {stone.shape} · {stone.clarity} · {stone.country}
              </p>
            </div>
            <div className="flex items-end justify-between border-t border-border/70 pt-3">
              <div>
                <p className="rule-label">{stone.lab} certified</p>
                <p className="font-display text-lg text-brass">
                  {formatPrice(stone.price, currency)}
                </p>
              </div>
              <span className="rule-label">
                {stone.origin === "Lab-grown" ? "Lab-grown" : stone.treatment}
              </span>
            </div>
          </div>
        </Link>

        <button
          onClick={() => toggleWishlist(stone.id)}
          aria-label={saved ? `Remove ${stone.name} from saved stones` : `Save ${stone.name}`}
          aria-pressed={saved}
          className="absolute top-2.5 right-2.5 z-10 rounded-sm border border-border bg-obsidian/70 p-1.5 text-muted-foreground transition-colors hover:text-brass"
        >
          <Heart className={`size-4 ${saved ? "fill-brass text-brass" : ""}`} />
        </button>
      </motion.div>
    </motion.div>
  );
}
