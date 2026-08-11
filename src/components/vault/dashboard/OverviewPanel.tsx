import { motion } from "motion/react";
import {
  Gem,
  Tag,
  TrendingUp,
  DollarSign,
  Diamond,
  Layers,
} from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatPrice } from "@/data/stones";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  index,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden p-6"
      style={{
        background: "oklch(0.130 0.014 305 / 0.90)",
        border: "1px solid oklch(1 0 0 / 0.07)",
        borderRadius: "8px",
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 size-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10 blur-2xl"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "var(--muted-foreground)",
            }}
          >
            {label}
          </p>
          <p
            className="mt-2 font-display text-pearl"
            style={{ fontSize: "2rem", letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {value}
          </p>
          {sub && (
            <p
              className="mt-1.5 font-mono"
              style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}
            >
              {sub}
            </p>
          )}
        </div>
        <div
          className="flex size-10 flex-none items-center justify-center"
          style={{
            background: `${accent}22`,
            border: `1px solid ${accent}44`,
            borderRadius: "6px",
          }}
        >
          <Icon className="size-5" style={{ color: accent }} />
        </div>
      </div>
    </motion.div>
  );
}

function GemTypeBreakdown() {
  const { stones } = useVault();
  const types = ["Diamond", "Sapphire", "Ruby", "Emerald", "Other"] as const;
  const typeColors: Record<string, string> = {
    Diamond: "oklch(0.82 0.015 240)",
    Sapphire: "oklch(0.60 0.055 250)",
    Ruby: "oklch(0.62 0.120 15)",
    Emerald: "oklch(0.56 0.060 160)",
    Other: "oklch(0.62 0.075 313)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="p-6"
      style={{
        background: "oklch(0.130 0.014 305 / 0.90)",
        border: "1px solid oklch(1 0 0 / 0.07)",
        borderRadius: "8px",
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Layers className="size-4" style={{ color: "var(--brass)" }} />
        <p
          className="font-mono uppercase"
          style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
        >
          Gem type breakdown
        </p>
      </div>
      <div className="space-y-3">
        {types.map((type) => {
          const count = stones.filter((s) => s.type === type).length;
          const pct = stones.length > 0 ? Math.round((count / stones.length) * 100) : 0;
          return (
            <div key={type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-pearl" style={{ fontSize: "0.8rem" }}>
                  {type}
                </span>
                <span
                  className="font-mono"
                  style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.1em" }}
                >
                  {count} stones · {pct}%
                </span>
              </div>
              <div
                className="h-1 overflow-hidden"
                style={{ background: "oklch(1 0 0 / 0.06)", borderRadius: "99px" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{ background: typeColors[type], borderRadius: "99px" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function OverviewPanel({ onNavigate }: { onNavigate: (tab: "stones" | "discounts") => void }) {
  const { stones, discounts } = useVault();
  const activeDiscounts = discounts.filter((d) => d.active).length;
  const totalValue = stones.reduce((sum, s) => sum + s.price, 0);
  const avgPrice = stones.length > 0 ? Math.round(totalValue / stones.length) : 0;

  return (
    <div>
      <div className="mb-8">
        <h2
          className="font-display text-pearl"
          style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
        >
          Welcome back, Admin
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Here's a summary of your rhea cylone.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 lg:grid-cols-4">
        <StatCard
          index={0}
          icon={Gem}
          label="Total Stones"
          value={stones.length}
          sub="in the vault"
          accent="oklch(0.68 0.076 76)"
        />
        <StatCard
          index={1}
          icon={Tag}
          label="Active Promotions"
          value={activeDiscounts}
          sub={`of ${discounts.length} total`}
          accent="oklch(0.62 0.120 15)"
        />
        <StatCard
          index={2}
          icon={DollarSign}
          label="Catalog Value"
          value={formatPrice(totalValue)}
          sub="total asking price"
          accent="oklch(0.60 0.055 250)"
        />
        <StatCard
          index={3}
          icon={TrendingUp}
          label="Avg. Price"
          value={formatPrice(avgPrice)}
          sub="per stone"
          accent="oklch(0.56 0.060 160)"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GemTypeBreakdown />

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-6"
          style={{
            background: "oklch(0.130 0.014 305 / 0.90)",
            border: "1px solid oklch(1 0 0 / 0.07)",
            borderRadius: "8px",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Diamond className="size-4" style={{ color: "var(--brass)" }} />
            <p
              className="font-mono uppercase"
              style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              Quick actions
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("stones")}
              className="w-full text-left px-4 py-3 transition-all duration-200 hover:border-brass/40"
              style={{
                background: "oklch(0.14 0.012 305)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderRadius: "6px",
              }}
            >
              <p className="text-sm text-pearl">Add a new stone</p>
              <p className="mt-0.5 font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
                Go to Stones panel
              </p>
            </button>
            <button
              onClick={() => onNavigate("discounts")}
              className="w-full text-left px-4 py-3 transition-all duration-200 hover:border-brass/40"
              style={{
                background: "oklch(0.14 0.012 305)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderRadius: "6px",
              }}
            >
              <p className="text-sm text-pearl">Create a promotion</p>
              <p className="mt-0.5 font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
                Go to Discounts panel
              </p>
            </button>
            <a
              href="/browse"
              className="block px-4 py-3 transition-all duration-200 hover:border-brass/40"
              style={{
                background: "oklch(0.14 0.012 305)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                borderRadius: "6px",
              }}
            >
              <p className="text-sm text-pearl">View public storefront</p>
              <p className="mt-0.5 font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}>
                Opens /browse in same tab
              </p>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
