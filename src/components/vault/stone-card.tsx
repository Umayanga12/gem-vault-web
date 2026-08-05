import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { formatPrice, typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";
import { useState } from "react";

/* Gem-type hover glow — only on hover */
const typeGlow: Record<string, string> = {
  Diamond:  "0 16px 48px oklch(0.85 0.02 240 / 0.18), 0 0 0 1px oklch(1 0 0 / 0.07)",
  Sapphire: "0 16px 48px var(--glow-sapphire), 0 0 0 1px oklch(1 0 0 / 0.07)",
  Ruby:     "0 16px 48px var(--glow-ruby), 0 0 0 1px oklch(1 0 0 / 0.07)",
  Emerald:  "0 16px 48px var(--glow-emerald), 0 0 0 1px oklch(1 0 0 / 0.07)",
  Amethyst: "0 16px 48px var(--glow-amethyst), 0 0 0 1px oklch(1 0 0 / 0.07)",
};

/* Gem-type badge colors — minimal */
const typeBadgeColor: Record<string, string> = {
  Diamond:  "oklch(0.82 0.015 240 / 0.80)",
  Sapphire: "oklch(0.65 0.060 250 / 0.80)",
  Ruby:     "oklch(0.62 0.120 15 / 0.80)",
  Emerald:  "oklch(0.60 0.065 160 / 0.80)",
  Amethyst: "oklch(0.62 0.075 313 / 0.80)",
};

export function StoneCard({ stone, index = 0 }: { stone: Stone; index?: number }) {
  const reduced = useReducedMotion();
  const { currency, wishlist, toggleWishlist } = useVault();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 24 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 24 });
  const saved = wishlist.includes(stone.id);
  const [hovered, setHovered] = useState(false);
  const glow = typeGlow[stone.type] ?? typeGlow.Diamond;
  const badgeColor = typeBadgeColor[stone.type] ?? typeBadgeColor.Diamond;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 8) * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
            ? "oklch(0.175 0.017 305 / 0.92)"
            : "oklch(0.155 0.015 305 / 0.80)",
          border: "1px solid oklch(1 0 0 / 0.07)",
          transition: "box-shadow 450ms ease, background 350ms ease",
        }}
        whileHover={reduced ? undefined : { scale: 1.012 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
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
              className="size-full object-cover"
              style={{
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Gradient overlay — appears on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.08 0.010 300 / 0.75) 0%, transparent 50%)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 400ms ease",
              }}
            />

            {/* Gem type badge — minimal text label */}
            <span
              className="absolute top-3 left-3 font-mono text-[8px] uppercase tracking-[0.20em]"
              style={{
                color: badgeColor,
                letterSpacing: "0.18em",
              }}
            >
              {stone.type}
            </span>

            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(stone.id);
              }}
              aria-label={saved ? `Remove ${stone.name} from saved` : `Save ${stone.name}`}
              aria-pressed={saved}
              className="absolute top-2.5 right-2.5 z-10 p-2 transition-all duration-200"
              style={{
                background: "oklch(0.08 0.010 300 / 0.75)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                backdropFilter: "blur(8px)",
                color: saved ? "var(--brass)" : "var(--muted-foreground)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={saved ? "saved" : "unsaved"}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15, ease: "backOut" }}
                >
                  <Heart
                    className="size-3"
                    style={{
                      fill: saved ? "var(--brass)" : "none",
                      transition: "fill 200ms ease",
                    }}
                  />
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Content — editorial layout */}
          <div className="p-4 pt-3.5">
            {/* Top divider */}
            <div className="hairline mb-3.5" />

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3
                  className="font-display leading-tight text-pearl truncate"
                  style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                >
                  {stone.name}
                </h3>
                <p className="mt-1 font-mono text-[9px] text-muted-foreground uppercase tracking-wider" style={{ letterSpacing: "0.12em" }}>
                  {stone.carat.toFixed(2)} ct · {stone.shape} · {stone.clarity}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="rule-label mb-0.5">{stone.lab}</p>
                <motion.p
                  className="font-display"
                  animate={{ color: hovered ? "var(--brass-hi)" : "var(--brass)" }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {formatPrice(stone.price, currency)}
                </motion.p>
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}>
              <span className="rule-label">
                {stone.country}
              </span>
              <span className="rule-label">
                {stone.origin === "Lab-grown" ? "Lab-grown" : stone.treatment}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
