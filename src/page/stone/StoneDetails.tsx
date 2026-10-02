import { type Stone } from "@/data/stones";
import { getGemInfo } from "@/data/gemDescriptions";
import { useMemo } from "react";
import { QuotationInlineForm, type QuotationFormData } from "@/components/vault/quotation-form";
import { MapPin, Palette, Tag, Layers, Gem } from "lucide-react";

interface StoneDetailsProps {
  stone: Stone;
  inQuotation?: boolean;
  onAddToQuotation?: (data: QuotationFormData) => void;
  onRemoveFromQuotation?: () => void;
}

export function StoneDetails({
  stone,
  inQuotation = false,
  onAddToQuotation,
  onRemoveFromQuotation,
}: StoneDetailsProps) {
  const gemInfo = useMemo(() => {
    return getGemInfo(stone.name) ?? getGemInfo(stone.type);
  }, [stone.name, stone.type]);

  const accent = gemInfo?.accent ?? "oklch(0.70 0.082 78)";
  const accentSoft = accent.replace(")", " / 0.12)");
  const accentBorder = accent.replace(")", " / 0.28)");

  // Prefer the stone's own description, fall back to gemInfo description
  const description = stone.description ?? gemInfo?.description;

  return (
    <div>
      {/* Type + subType badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase"
          style={{
            background: "oklch(0.70 0.082 78 / 0.12)",
            border: "1px solid oklch(0.70 0.082 78 / 0.30)",
            color: "var(--brass)",
          }}
        >
          {stone.type} · Natural
        </span>

        {stone.subType && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase"
            style={{
              background: accentSoft,
              border: `1px solid ${accentBorder}`,
              color: accent,
            }}
          >
            <Tag className="size-2.5" />
            {stone.subType}
          </span>
        )}
      </div>

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

      {/* Expert note */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground italic">{stone.note}</p>

      {/* Accent divider */}
      <div
        className="my-6 h-px w-16"
        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      {/* Gem properties grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Color */}
        {/* <div
          className="flex flex-col gap-1.5 rounded-xl p-4"
          style={{
            background: "oklch(1 0 0 / 0.03)",
            border: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Palette className="size-3" style={{ color: accent }} />
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
              Color
            </span>
          </div>
          <span className="text-sm font-medium text-pearl">{stone.color}</span>
        </div> */}

        {/* Origin */}
        <div
          className="flex flex-col gap-1.5 rounded-xl p-4"
          style={{
            background: "oklch(1 0 0 / 0.03)",
            border: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3" style={{ color: accent }} />
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
              Origin
            </span>
          </div>
          <span className="text-sm font-medium text-pearl">{stone.origin}</span>
        </div>

        {/* Country
        <div
          className="flex flex-col gap-1.5 rounded-xl p-4"
          style={{
            background: "oklch(1 0 0 / 0.03)",
            border: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <Gem className="size-3" style={{ color: accent }} />
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
              Country
            </span>
          </div>
          <span className="text-sm font-medium text-pearl">{stone.country}</span>
        </div> */}

        {/* Variety / subType */}
        {stone.subType && (
          <div
            className="flex flex-col gap-1.5 rounded-xl p-4"
            style={{
              background: "oklch(1 0 0 / 0.03)",
              border: "1px solid oklch(1 0 0 / 0.07)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <Layers className="size-3" style={{ color: accent }} />
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-muted-foreground">
                Variety
              </span>
            </div>
            <span className="text-sm font-medium text-pearl">{stone.subType}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="mt-6">
          <p className="text-sm leading-[1.85] text-pearl/80">{description}</p>
        </div>
      )}

      {/* Available Sub-types */}
      {stone.subTypes && stone.subTypes.length > 0 && (
        <div className="mt-6">
          <p
            className="mb-3 font-mono text-[9px] tracking-[0.14em] uppercase"
            style={{ color: accent }}
          >
            Fast moving Varieties
          </p>
          <div className="flex flex-wrap gap-2">
            {stone.subTypes.map((sub) => (
              <span
                key={sub}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background: accentSoft,
                  border: `1px solid ${accentBorder}`,
                  color: "var(--pearl)",
                }}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quotation form — rendered only when parent wires up the handlers */}
      {onAddToQuotation && onRemoveFromQuotation && (
        <QuotationInlineForm
          stone={stone}
          inQuotation={inQuotation}
          onSubmit={onAddToQuotation}
          onRemove={onRemoveFromQuotation}
          accent={accent}
        />
      )}
    </div>
  );
}
