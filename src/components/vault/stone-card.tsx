import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import { Heart, FileQuestion } from "lucide-react";
import { typeAccent, type Stone } from "@/data/stones";
import { useVault } from "@/lib/vault-store";
import { useState } from "react";
import { QuotationModal, type QuotationFormData } from "@/components/vault/quotation-form";
import { gemCategories } from "@/page/home/GemTypeCard";

/* Gem-type hover glow — only on hover */
const typeGlow: Record<string, string> = {
  Sapphire: "0 16px 48px var(--glow-sapphire), 0 0 0 1px oklch(1 0 0 / 0.07)",
  "Star Sapphire": "0 16px 48px var(--glow-sapphire), 0 0 0 1px oklch(1 0 0 / 0.07)",
  Ruby:     "0 16px 48px var(--glow-ruby), 0 0 0 1px oklch(1 0 0 / 0.07)",
  "Rare Gems": "0 16px 48px var(--glow-brass), 0 0 0 1px oklch(1 0 0 / 0.07)",
  "Star Spinel": "0 16px 48px var(--glow-ruby), 0 0 0 1px oklch(1 0 0 / 0.07)",
};

/* Gem-type badge colors — minimal */
const typeBadgeColor: Record<string, string> = {
  Sapphire: "oklch(0.65 0.060 250 / 0.80)",
  "Star Sapphire": "oklch(0.65 0.080 255 / 0.80)",
  Ruby:     "oklch(0.62 0.120 15 / 0.80)",
  "Rare Gems": "oklch(0.75 0.060 60 / 0.80)",
  "Star Spinel": "oklch(0.62 0.110 10 / 0.80)",
};

export function StoneCard({ stone, index = 0 }: { stone: Stone; index?: number }) {
  const reduced = useReducedMotion();
  const { wishlist, toggleWishlist, addToQuotation, removeFromQuotation, quotationIds } = useVault();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 24 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 24 });
  const saved = wishlist.includes(stone.id);
  const inQuotation = quotationIds.includes(stone.id);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const glow = typeGlow[stone.type] ?? "0 16px 48px oklch(0.70 0.082 78 / 0.15), 0 0 0 1px oklch(1 0 0 / 0.07)";
  const badgeColor = typeBadgeColor[stone.type] ?? "oklch(0.65 0.060 250 / 0.80)";

  // Accent colour from gem categories for the modal
  const catAccent = gemCategories.find((c) => c.routeType === stone.type)?.accent ?? "oklch(0.70 0.082 78)";

  function handleQuotationClick(e: React.MouseEvent) {
    e.preventDefault();
    if (inQuotation) {
      removeFromQuotation(stone.id);
    } else {
      setModalOpen(true);
    }
  }

  function handleFormSubmit(data: QuotationFormData) {
    addToQuotation(data);
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  }

  return (
    <>
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
              </div>

              <div className="shrink-0 text-right">
                <span
                  className="font-mono text-[9px] uppercase"
                  style={{
                    color: "var(--brass)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Ask for Quote
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Add to Quotation button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleQuotationClick}
            id={`add-quotation-${stone.id}`}
            className="w-full flex items-center justify-center gap-2 py-2 font-mono text-[9px] uppercase tracking-wider transition-all duration-200"
            style={{
              background: inQuotation
                ? "oklch(0.70 0.082 78 / 0.15)"
                : "oklch(0.14 0.015 305 / 0.80)",
              border: `1px solid ${inQuotation ? "oklch(0.70 0.082 78 / 0.40)" : "oklch(1 0 0 / 0.10)"}`,
              color: inQuotation ? "var(--brass)" : "var(--muted-foreground)",
              letterSpacing: "0.14em",
            }}
          >
            <FileQuestion className="size-3" />
            {inQuotation ? "In Quotation" : "Add to Quotation"}
          </button>
        </div>
      </motion.div>
    </motion.div>

    {/* Quotation modal — rendered outside card so it's not clipped */}
    <QuotationModal
      stone={stone}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSubmit={handleFormSubmit}
      accent={catAccent}
    />
  </>
  );
}
