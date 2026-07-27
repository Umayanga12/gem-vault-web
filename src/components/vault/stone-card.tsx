import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { formatPrice, typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";
import { useState } from "react";

/* Gem-type ambient glow on hover */
const typeGlow: Record<string, string> = {
  Diamond:  "0 8px 40px oklch(0.85 0.02 240 / 0.28), 0 0 0 1px oklch(1 0 0 / 0.08)",
  Sapphire: "0 8px 40px var(--glow-sapphire), 0 0 0 1px oklch(1 0 0 / 0.08)",
  Ruby:     "0 8px 40px var(--glow-ruby), 0 0 0 1px oklch(1 0 0 / 0.08)",
  Emerald:  "0 8px 40px var(--glow-emerald), 0 0 0 1px oklch(1 0 0 / 0.08)",
  Amethyst: "0 8px 40px var(--glow-amethyst), 0 0 0 1px oklch(1 0 0 / 0.08)",
};

const typeBadgeBg: Record<string, string> = {
  Diamond:  "linear-gradient(135deg, oklch(0.75 0.015 240 / 0.25), oklch(0.85 0.02 240 / 0.15))",
  Sapphire: "linear-gradient(135deg, oklch(0.35 0.069 250 / 0.30), oklch(0.45 0.080 250 / 0.15))",
  Ruby:     "linear-gradient(135deg, oklch(0.42 0.155 15 / 0.30), oklch(0.52 0.155 15 / 0.15))",
  Emerald:  "linear-gradient(135deg, oklch(0.38 0.073 160 / 0.30), oklch(0.48 0.08 160 / 0.15))",
  Amethyst: "linear-gradient(135deg, oklch(0.35 0.088 313 / 0.30), oklch(0.45 0.09 313 / 0.15))",
};

export function StoneCard({ stone, index = 0 }: { stone: Stone; index?: number }) {
  const reduced = useReducedMotion();
  const { currency, wishlist, toggleWishlist } = useVault();
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const saved = wishlist.includes(stone.id);
  const [hovered, setHovered] = useState(false);
  const glow = typeGlow[stone.type] ?? typeGlow.Diamond;
  const badgeBg = typeBadgeBg[stone.type] ?? typeBadgeBg.Diamond;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
        setHovered(false);
      }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d" as const,
          boxShadow: hovered ? glow : "var(--shadow-card)",
          background: hovered
            ? "linear-gradient(160deg, oklch(0.20 0.020 305 / 0.85) 0%, oklch(0.16 0.016 300 / 0.90) 100%)"
            : "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.80) 0%, oklch(0.14 0.014 300 / 0.85) 100%)",
          border: "1px solid oklch(1 0 0 / 0.08)",
          transition: "box-shadow 400ms ease, background 400ms ease",
        }}
        whileHover={reduced ? undefined : { scale: 1.015 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="facet-sheen relative overflow-hidden rounded-xl"
      >
        <Link
          to="/stones/$stoneId"
          params={{ stoneId: stone.id }}
          className="block focus-visible:outline-none"
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={stone.images[0]}
              alt={stone.alt}
              loading="lazy"
              width={900}
              height={900}
              className="size-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />

            {/* Inner vignette on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, oklch(0.06 0.01 300 / 0.55) 100%)",
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Gem type badge */}
            <span
              className="absolute top-3 left-3 rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase"
              style={{
                background: badgeBg,
                border: "1px solid oklch(1 0 0 / 0.12)",
                color: "var(--pearl)",
                backdropFilter: "blur(8px)",
              }}
            >
              {stone.type}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            <div>
              <h3
                className="font-display leading-tight text-pearl"
                style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
              >
                {stone.name}
              </h3>
              <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                {stone.carat.toFixed(2)} ct · {stone.shape} · {stone.clarity} · {stone.country}
              </p>
            </div>

            <div
              className="flex items-end justify-between pt-3"
              style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}
            >
              <div>
                <p className="rule-label">{stone.lab} certified</p>
                <motion.p
                  className="font-display text-lg"
                  animate={{ color: hovered ? "var(--brass-hi)" : "var(--brass)" }}
                  transition={{ duration: 0.3 }}
                >
                  {formatPrice(stone.price, currency)}
                </motion.p>
              </div>
              <span className="rule-label">
                {stone.origin === "Lab-grown" ? "Lab-grown" : stone.treatment}
              </span>
            </div>
          </div>
        </Link>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(stone.id)}
          aria-label={saved ? `Remove ${stone.name} from saved stones` : `Save ${stone.name}`}
          aria-pressed={saved}
          className="absolute top-2.5 right-2.5 z-10 rounded-full p-2 transition-all duration-200"
          style={{
            background: "oklch(0.10 0.012 300 / 0.80)",
            border: "1px solid oklch(1 0 0 / 0.10)",
            backdropFilter: "blur(8px)",
            color: saved ? "var(--brass)" : "var(--muted-foreground)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={saved ? "saved" : "unsaved"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15, ease: "backOut" }}
            >
              <Heart
                className="size-3.5"
                style={{ fill: saved ? "var(--brass)" : "none", transition: "fill 200ms ease" }}
              />
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.div>
    </motion.div>
  );
}
