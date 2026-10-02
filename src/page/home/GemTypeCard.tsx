import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useVault } from "@/lib/vault-store";
import starSapphireImg from "@/assets/gem/star_sapphire/image.png";
import rareGemImg from "@/assets/gem/gem_img_1.png";

/* Gem type icon paths (SVG outlines) */
export const gemIcons: Record<string, string> = {
  Sapphire: "M12 3 19 8.5 19 15.5 12 21 5 15.5 5 8.5Z",
  "Star Sapphire": "M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z",
  Ruby: "M12 3 20 10 12 21 4 10Z",
  Emerald: "M8 3 16 3 20 9 12 21 4 9Z",
  Amethyst: "M12 2 20 8 17 20 7 20 4 8Z",
  "Rare Gems": "M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z",
  "Star Spinel": "M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26Z",
};

/* Per-type stroke accent colors */
export const gemRowAccent: Record<string, string> = {
  Sapphire: "oklch(0.62 0.060 250)",
  "Star Sapphire": "oklch(0.65 0.080 255)",
  Ruby: "oklch(0.64 0.135 15)",
  Emerald: "oklch(0.62 0.085 160)",
  Amethyst: "oklch(0.64 0.095 313)",
  Tourmaline: "oklch(0.62 0.120 350)",
  Alexandrite: "oklch(0.60 0.100 160)",
  Zircon: "oklch(0.70 0.040 220)",
  Quartz: "oklch(0.72 0.030 310)",
  Beryl: "oklch(0.65 0.090 175)",
  Moonstone: "oklch(0.80 0.020 240)",
  Chrysoberyl: "oklch(0.68 0.095 95)",
  Spinel: "oklch(0.62 0.120 10)",
  "Star Spinel": "oklch(0.60 0.110 10)",
  Garnet: "oklch(0.60 0.140 25)",
  Topaz: "oklch(0.72 0.070 50)",
  "Rare Gems": "oklch(0.75 0.060 60)",
};

/* Per-type SVG fill on hover */
export const gemFillAccent: Record<string, string> = {
  Sapphire: "oklch(0.62 0.060 250 / 0.22)",
  "Star Sapphire": "oklch(0.65 0.080 255 / 0.22)",
  Ruby: "oklch(0.64 0.135 15  / 0.22)",
  Emerald: "oklch(0.62 0.085 160 / 0.22)",
  Amethyst: "oklch(0.64 0.095 313 / 0.22)",
  "Rare Gems": "oklch(0.75 0.060 60 / 0.22)",
  "Star Spinel": "oklch(0.60 0.110 10 / 0.22)",
};

/*
 * Full gem category data — used by the horizontal scroll strip in GemTypeSection
 * and by the Browse page for grouped category navigation.
 */
export interface GemCategory {
  /** Display title shown on the card */
  title: string;
  /** Path to the representative photo — falls back to SVG icon if 404 */
  image: string;
  /** Short description revealed on hover */
  description: string;
  /** Accent color (oklch) driving border / glow / icon */
  accent: string;
  /** Browse route search param — matches stone.type in the vault store */
  routeType?: string;
  /** Sub-variety labels shown beneath the category on the Browse page */
  subTypes?: string[];
}

export const gemCategories: GemCategory[] = [
  // Sapphire
  {
    title: "Sapphire",
    image: "/gems/0.89ctbluesapphire.webp",
    description:
      "Blue Sapphire is particularly renowned as a classic Ceylon gemstone — from lighter and fancy blues to prized cornflower and royal blue shades. We also carry ruby, padparadscha, yellow, pink, purple, white, green and bi-colour varieties.",
    accent: gemRowAccent.Sapphire,
    routeType: "Sapphire",
    subTypes: [
      "Blue", "Ruby / Red", "Padparadscha",
      "Yellow", "Pink", "Purple", "White", "Green", "Bi-Colour (Wedding Stone)",
    ],
  },
  // Star Sapphire
  {
    title: "Star Sapphire",
    image: starSapphireImg,
    description:
      "Star Sapphire displays a distinctive star-shaped optical effect (asterism) when viewed under suitable lighting. Available in blue, pink, yellow, purple, green, white and black varieties.",
    accent: gemRowAccent["Star Sapphire"],
    routeType: "Star Sapphire",
    subTypes: [
      "Blue Star", "Pink Star", "Yellow Star", "Purple Star",
      "Green Star", "White Star", "Black Star", "Bi-Colour Star",
    ],
  },
  // Chrysoberyl
  {
    title: "Chrysoberyl",
    image: "/gems/Chrysoberyl/chrysoberyl.jpg",
    description:
      "Chrysoberyl is a durable and naturally brilliant gemstone known for its attractive honey and apple-green varieties. Includes Chrysoberyl Cat's Eye — famous for its sharp chatoyancy — plus the remarkable colour-changing Alexandrite.",
    accent: gemRowAccent.Chrysoberyl,
    routeType: "Chrysoberyl",
    subTypes: ["Chrysoberyl", "Chrysoberyl Cat's Eye", "Alexandrite", "Alexandrite Cat's Eye"],
  },
  // Spinel
  {
    title: "Spinel",
    image: "/gems/Spinel/spinel.jpg",
    description:
      "Spinel is a naturally occurring gemstone known for its excellent brilliance and wide range of colours — red, pink, blue, purple, white and green. Sri Lankan Spinel offers outstanding quality.",
    accent: gemRowAccent.Spinel,
    routeType: "Spinel",
    subTypes: ["Blue", "Purple", "Red", "Pink", "White", "Green"],
  },
  // Star Spinel
  {
    title: "Star Spinel",
    image: "/gems/Spinel/star.jpg",
    description:
      "Star Spinel is a phenomenal variety of spinel displaying a rare star-like optical effect across the surface. The asterism phenomenon is relatively uncommon, adding significant visual character.",
    accent: gemRowAccent["Star Spinel"],
    routeType: "Star Spinel",
    subTypes: [],
  },
  // Garnet
  {
    title: "Garnet",
    image: "/gems/Garnet/garnet.jpg",
    description:
      "Garnet is a gemstone family occurring in a wide variety of colours and compositions. Sri Lankan Garnets are known for their attractive natural colours, brilliance and durability.",
    accent: gemRowAccent.Garnet,
    routeType: "Garnet",
    subTypes: ["Pyrope Garnet", "Almandine Garnet", "Hessonite Garnet",],
  },
  // Zircon
  {
    title: "Zircon",
    image: "/gems/Zircon/dscn0704.jpg",
    description:
      "Zircon is a natural gemstone known for its exceptional brilliance, strong dispersion and wide range of natural colours. Sri Lankan Zircon is particularly well known and highly regarded.",
    accent: gemRowAccent.Zircon,
    routeType: "Zircon",
    subTypes: ["Green", "Brown", "Yellow"],
  },
  // Tourmaline
  {
    title: "Tourmaline",
    image: "/gems/Tourmaline/tourmaline.jpg",
    description:
      "Tourmaline is one of the most colour-diverse gemstone families. Sri Lankan stones display attractive brown, honey and green tones, with each crystal offering its own distinctive character.",
    accent: gemRowAccent.Tourmaline,
    routeType: "Tourmaline",
    subTypes: ["Brown", "Honey", "Green"],
  },
  // Beryl
  {
    title: "Beryl",
    image: "/gems/Beryl/aqamerine.jpg",
    description:
      "Beryl includes Aquamarine and White / Colorless Beryl varieties. Appreciated for their clarity, transparency and attractive natural colours.",
    accent: gemRowAccent.Beryl,
    routeType: "Beryl",
    subTypes: ["Aquamarine", "White / Colorless Beryl"],
  },
  // Moonstone
  {
    title: "Moonstone",
    image: "/gems/Moonstone/moonstone.jpg",
    description:
      "Moonstone is a feldspar gemstone recognized for its distinctive floating glow (adularescence). Sri Lankan Moonstone is associated with soft white and bluish appearances.",
    accent: gemRowAccent.Moonstone,
    routeType: "Moonstone",
    subTypes: ["Bluish Moonstone", "Whitish Moonstone"],
  },
  // Quartz
  {
    title: "Quartz",
    image: "/gems/Quartz/amatrine.jpg",
    description:
      "Quartz occurs in many colours and varieties — colorless, yellow, purple/amethyst, ametrine, lemon, pink, brown, and rutilated quartz. Each variety has its own distinctive character.",
    accent: gemRowAccent.Quartz,
    routeType: "Quartz",
    subTypes: [
      "Colorless", "Yellow", "Purple / Amethyst",
      "Ametrine", "Lemon", "Pink", "Brown", "Rutilated Quartz",
    ],
  },
  // Topaz
  {
    title: "Topaz",
    image: "/gems/Topaz/topaz.jpg",
    description:
      "Topaz is a transparent gemstone known for its excellent clarity, brilliance and range of colours — colorless, yellow, brown and more. Imperial topaz hues are particularly prized.",
    accent: gemRowAccent.Topaz,
    routeType: "Topaz",
    subTypes: ["Colorless", "Green", "Yellow", "Brown"],
  },
  // Rare Gems
  {
    title: "Rare Gems",
    image: "/gems/Rare/sinhalite.webp",
    description:
      "Extraordinary collector minerals native to Ceylon — Cobalt Spinel, Singhalite, Kornerupine, Serendibite, Taaffeite, Alexandrite and Alexandrite Cat's Eye. Some of the rarest gems on Earth.",
    accent: gemRowAccent["Rare Gems"],
    routeType: "Rare Gems",
    subTypes: ["Cobalt Spinel", "Singhalite", "Kornerupine", "Serendibite", "Taaffeite", "Alexandrite", "Alexandrite Cat's Eye"],
  },
];


/* ─── Horizontal scroll card ─────────────────────────────────────────────── */

export function GemCategoryCard({
  category,
  index,
}: {
  category: GemCategory;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { accent, title, image, description, routeType } = category;
  const hasImage = Boolean(image) && !imageFailed;

  /* Derive a simple icon key for fallback SVG */
  const iconKey =
    (Object.keys(gemIcons).find((k) => k === title) ?? "Amethyst") as string;
  const iconPath = gemIcons[iconKey] ?? gemIcons.Amethyst;
  const fillColor = `${accent.replace(")", " / 0.22)")}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-none"
      style={{ width: "220px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Link
        to="/browse"
        search={{ type: routeType as any }}
        className="block relative overflow-hidden focus-visible:outline-none"
        style={{
          borderRadius: "10px",
          height: "300px",
          border: hovered
            ? `1px solid ${accent.replace(")", " / 0.45)")}`
            : "1px solid oklch(1 0 0 / 0.07)",
          boxShadow: hovered
            ? `0 18px 40px -12px oklch(0 0 0 / 0.75), 0 0 0 2px ${accent.replace(")", " / 0.30)")}`
            : "0 4px 20px -8px oklch(0 0 0 / 0.45)",
          transition: "border 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent.replace(")", " / 0.25)")})`,
            opacity: hovered ? 1 : 0.35,
          }}
        />

        {/* Background image or fallback */}
        {hasImage ? (
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            animate={prefersReducedMotion ? undefined : { scale: hovered ? 1.09 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: hovered ? "brightness(0.45)" : "brightness(0.72)" }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${accent.replace(")", " / 0.12)")}, transparent 70%)`,
            }}
          >
            <motion.svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill={hovered ? fillColor : "none"}
              stroke={accent}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={prefersReducedMotion ? undefined : { rotate: hovered ? 12 : 0, scale: hovered ? 1.12 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <path d={iconPath} />
            </motion.svg>
          </div>
        )}

        {/* Dark scrim — always present, deepens on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.06 0.01 300 / 0.10) 0%, oklch(0.06 0.01 300 / 0.65) 55%, oklch(0.08 0.01 300 / 0.97) 100%)",
            opacity: hovered ? 1 : 0.8,
          }}
        />

        {/* Card footer — title + arrow always visible */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-display block transition-colors duration-300"
              style={{
                fontSize: "1.1rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: hovered ? "white" : "oklch(0.94 0.012 85 / 0.90)",
              }}
            >
              {title}
            </span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { x: hovered ? 3 : -2, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-sm leading-none flex-none"
              style={{ color: accent }}
            >
              →
            </motion.span>
          </div>

          {/* Description — slides up on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.p
                key="desc"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 text-[11px] font-sans leading-relaxed"
                style={{ color: "oklch(0.82 0.010 85 / 0.90)" }}
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Gem icon badge (top-left) when image is present */}
        {hasImage && (
          <div
            className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full z-10"
            style={{
              background: "oklch(0.08 0.01 300 / 0.60)",
              backdropFilter: "blur(6px)",
              border: `1px solid ${accent.replace(")", " / 0.30)")}`,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accent}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={iconPath} />
            </svg>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

/* ─── Legacy GemTypeCard (kept for backward compat if referenced elsewhere) ─ */

/* One-line descriptor per gem family */
export const gemDescriptor: Record<string, string> = {
  Sapphire: "Royal blue to padparadscha — corundum in every hue",
  Ruby: "Pigeon blood to vivid red — rarest of the corundum family",
  "Rare Gems": "Rare collector pieces outside the primary families",
  Other: "Rare collector pieces outside the primary families",
};

export const gemImageUrl: Record<string, string> = {
  Sapphire: "/images/gems/sapphire.jpg",
  Ruby: "/images/gems/ruby.jpg",
  Amethyst: "/images/gems/amethyst.jpg",
};

export function GemTypeCard({ type, index }: { type: string; index: number }) {
  const { stones } = useVault();
  const [hovered, setHovered] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const count = stones.filter((s) => s.type === type).length;
  const displayType = type === "Other" || type === "Rare Gems" ? "Rare Gems" : type;
  const iconKey = type === "Other" || type === "Rare Gems" ? "Amethyst" : type;
  const iconPath = gemIcons[iconKey] ?? gemIcons.Sapphire;
  const accentColor = gemRowAccent[iconKey] ?? gemRowAccent.Sapphire;
  const fillColor = gemFillAccent[iconKey] ?? gemFillAccent.Sapphire;
  const descriptor = gemDescriptor[type] ?? "";
  const imageUrl = gemImageUrl[iconKey];
  const hasImage = Boolean(imageUrl) && !imageFailed;

  const activate = () => setHovered(true);
  const deactivate = () => setHovered(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="h-full"
    >
      <Link
        to="/browse"
        search={{ type: type as any }}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onFocus={activate}
        onBlur={deactivate}
        className="relative flex flex-col h-full min-h-[300px] overflow-hidden transition-all duration-300 focus-visible:outline-none"
        style={{
          background: "linear-gradient(160deg, oklch(0.135 0.015 305 / 0.55) 0%, oklch(0.100 0.010 300 / 0.60) 100%)",
          border: hovered ? `1px solid ${accentColor.replace(")", " / 0.30)")}` : "1px solid oklch(1 0 0 / 0.06)",
          boxShadow: hovered
            ? `0 12px 30px -10px oklch(0 0 0 / 0.8), 0 0 20px -2px ${accentColor.replace(")", " / 0.12)")}, 0 0 0 2px ${accentColor.replace(")", " / 0.45)")}`
            : "0 4px 20px -10px oklch(0 0 0 / 0.5)",
        }}
      >
        {/* Top colored accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor.replace(")", " / 0.35)")})`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Image panel */}
        <div className="relative w-full h-40 shrink-0 overflow-hidden">
          {hasImage ? (
            <>
              <motion.img
                src={imageUrl}
                alt={`${displayType} gemstones`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                animate={prefersReducedMotion ? undefined : { scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: hovered ? "brightness(1.05)" : "brightness(0.92)" }}
              />
              {/* Scrim */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.08 0.01 300 / 0.05) 0%, oklch(0.10 0.01 300 / 0.55) 65%, oklch(0.115 0.014 302 / 0.95) 100%)",
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${accentColor.replace(")", " / 0.10)")}, transparent 70%)`,
              }}
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill={hovered ? fillColor : "none"}
                stroke={accentColor}
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={prefersReducedMotion ? undefined : { rotate: hovered ? 15 : 0, scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <path d={iconPath} />
              </motion.svg>
            </div>
          )}

          {/* Icon badge */}
          {hasImage && (
            <div
              className="absolute top-3 left-3 flex items-center justify-center w-9 h-9 rounded-full z-10"
              style={{
                background: "oklch(0.10 0.01 300 / 0.55)",
                backdropFilter: "blur(6px)",
                border: `1px solid ${accentColor.replace(")", " / 0.35)")}`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={iconPath} />
              </svg>
            </div>
          )}

          {/* Stone count pill */}
          <span
            className="absolute top-3 right-3 font-mono text-[10px] px-2 py-1 z-10"
            style={{
              color: "var(--pearl)",
              background: "oklch(0.10 0.01 300 / 0.55)",
              backdropFilter: "blur(6px)",
              border: "1px solid oklch(1 0 0 / 0.12)",
              borderRadius: "2px",
            }}
          >
            {count} {count === 1 ? "stone" : "stones"}
          </span>
        </div>

        {/* Card body */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 py-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-display block transition-colors duration-300"
              style={{
                fontSize: "1.35rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: hovered ? "var(--pearl)" : "oklch(0.945 0.012 85 / 0.85)",
              }}
            >
              {displayType}
            </span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { x: hovered ? 2 : -2, opacity: hovered ? 1 : 0.35 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-sm leading-none"
              style={{ color: accentColor, opacity: prefersReducedMotion ? (hovered ? 1 : 0.35) : undefined }}
            >
              →
            </motion.span>
          </div>
          <span
            className="block text-[11px] mt-2 font-sans"
            style={{
              color: "var(--muted-foreground)",
              lineHeight: 1.5,
              opacity: hovered ? 1 : 0.8,
              transition: "opacity 0.3s ease",
            }}
          >
            {descriptor}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}