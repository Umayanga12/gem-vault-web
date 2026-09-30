import { type Stone } from "@/data/stones";
import { getGemInfo, labelToSlug } from "@/data/gemDescriptions";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

interface StoneDetailsProps {
  stone: Stone;
}

export function StoneDetails({ stone }: StoneDetailsProps) {
  // Try to match by stone name directly, then by type
  const gemInfo = useMemo(() => {
    return getGemInfo(stone.name) ?? getGemInfo(stone.type);
  }, [stone.name, stone.type]);

  const accent = gemInfo?.accent ?? "oklch(0.70 0.082 78)";

  return (
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
        {stone.type} · Natural
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
        {stone.name}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stone.note}</p>

      {/* Description */}
      {gemInfo?.description && (
        <div className="mt-6">
          {/* Accent divider */}
          <div
            className="mb-4 h-px w-12"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />
          <p className="text-sm leading-[1.85] text-pearl/90">{gemInfo.description}</p>
        </div>
      )}
    </div>
  );
}
