import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatDiscount, type Discount } from "@/data/discounts";
import { DiscountFormModal } from "./DiscountFormModal";

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[8px] uppercase"
      style={{
        color: active ? "oklch(0.72 0.10 155)" : "var(--muted-foreground)",
        background: active ? "oklch(0.72 0.10 155 / 0.12)" : "oklch(1 0 0 / 0.05)",
        border: `1px solid ${active ? "oklch(0.72 0.10 155 / 0.35)" : "oklch(1 0 0 / 0.08)"}`,
        borderRadius: "4px",
        letterSpacing: "0.16em",
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: active ? "oklch(0.72 0.10 155)" : "var(--muted-foreground)" }}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function TypeBadge({ type }: { type: Discount["type"] }) {
  const colors: Record<string, string> = {
    percent: "oklch(0.68 0.076 76)",
    bundle: "oklch(0.62 0.120 15)",
    fixed: "oklch(0.60 0.055 250)",
  };
  const labels: Record<string, string> = {
    percent: "% Off",
    bundle: "Bundle",
    fixed: "Fixed $",
  };
  const color = colors[type];
  return (
    <span
      className="inline-block px-2 py-0.5 font-mono text-[8px] uppercase"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        borderRadius: "4px",
        letterSpacing: "0.12em",
      }}
    >
      {labels[type]}
    </span>
  );
}

export function DiscountsPanel() {
  const { discounts, updateDiscount, deleteDiscount } = useVault();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleEdit(d: Discount) {
    setEditingDiscount(d);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditingDiscount(null);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => {
      deleteDiscount(id);
      setDeletingId(null);
    }, 300);
  }

  function handleToggle(d: Discount) {
    updateDiscount({ ...d, active: !d.active });
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2
            className="font-display text-pearl"
            style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
          >
            Discounts & Promotions
          </h2>
          <p
            className="mt-0.5 font-mono"
            style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.14em" }}
          >
            {discounts.filter((d) => d.active).length} active ·{" "}
            {discounts.length} total promotions
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:opacity-90"
          style={{
            background: "var(--brass)",
            color: "oklch(0.10 0.010 300)",
            borderRadius: "6px",
          }}
        >
          <Plus className="size-4" />
          Add Promotion
        </button>
      </div>

      {/* Promo type explainer */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            type: "percent",
            title: "Percentage Off",
            desc: "e.g. 10% off all Sapphires",
            color: "oklch(0.68 0.076 76)",
          },
          {
            type: "bundle",
            title: "Bundle Deal",
            desc: "e.g. 2 stones for $100",
            color: "oklch(0.62 0.120 15)",
          },
          {
            type: "fixed",
            title: "Fixed Discount",
            desc: "e.g. $500 off any stone",
            color: "oklch(0.60 0.055 250)",
          },
        ].map(({ title, desc, color }) => (
          <div
            key={title}
            className="px-4 py-3"
            style={{
              background: "oklch(0.130 0.014 305)",
              border: "1px solid oklch(1 0 0 / 0.07)",
              borderRadius: "6px",
            }}
          >
            <p className="text-sm font-medium" style={{ color }}>
              {title}
            </p>
            <p
              className="mt-0.5 font-mono"
              style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.10em" }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="overflow-hidden"
        style={{
          background: "oklch(0.115 0.012 305)",
          border: "1px solid oklch(1 0 0 / 0.07)",
          borderRadius: "8px",
        }}
      >
        {/* Table header */}
        <div
          className="grid items-center px-4 py-3"
          style={{
            gridTemplateColumns: "1.5fr 1fr 100px 80px 80px 120px 80px",
            borderBottom: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          {["Name / Code", "Value", "Type", "Scope", "Expires", "Status", ""].map((h) => (
            <span
              key={h}
              className="font-mono uppercase"
              style={{ fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              {h}
            </span>
          ))}
        </div>

        {discounts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              No promotions yet. Add your first one!
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {discounts.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: deletingId === d.id ? 0 : 1,
                  y: 0,
                  x: deletingId === d.id ? 16 : 0,
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="grid items-center px-4 py-3 transition-colors hover:bg-white/[0.025]"
                style={{
                  gridTemplateColumns: "1.5fr 1fr 100px 80px 80px 120px 80px",
                  borderBottom:
                    i < discounts.length - 1
                      ? "1px solid oklch(1 0 0 / 0.05)"
                      : "none",
                  opacity: d.active ? 1 : 0.55,
                }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-pearl">{d.name}</p>
                  {d.code && (
                    <p
                      className="mt-0.5 font-mono"
                      style={{
                        fontSize: "8px",
                        color: "var(--brass-dim)",
                        letterSpacing: "0.16em",
                      }}
                    >
                      CODE: {d.code}
                    </p>
                  )}
                </div>

                <span
                  className="font-display"
                  style={{ color: "var(--brass)", fontSize: "0.95rem" }}
                >
                  {formatDiscount(d)}
                </span>

                <TypeBadge type={d.type} />

                <span
                  className="font-mono text-xs truncate"
                  style={{ color: "var(--muted-foreground)", fontSize: "8px" }}
                >
                  {d.applicableType ?? (d.applicableTo === "all" ? "All" : `${(d.applicableTo as string[]).length} stones`)}
                </span>

                <span
                  className="font-mono"
                  style={{ fontSize: "8px", color: "var(--muted-foreground)" }}
                >
                  {d.expiresAt
                    ? new Date(d.expiresAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      })
                    : "Never"}
                </span>

                <StatusBadge active={d.active} />

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggle(d)}
                    aria-label={`${d.active ? "Deactivate" : "Activate"} ${d.name}`}
                    className="flex size-7 items-center justify-center transition-colors"
                    style={{
                      color: d.active ? "oklch(0.72 0.10 155)" : "var(--muted-foreground)",
                      background: "oklch(1 0 0 / 0.04)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: "4px",
                    }}
                  >
                    {d.active ? <ToggleRight className="size-3.5" /> : <ToggleLeft className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(d)}
                    aria-label={`Edit ${d.name}`}
                    className="flex size-7 items-center justify-center transition-colors hover:text-brass"
                    style={{
                      color: "var(--muted-foreground)",
                      background: "oklch(1 0 0 / 0.04)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: "4px",
                    }}
                  >
                    <Pencil className="size-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    aria-label={`Delete ${d.name}`}
                    className="flex size-7 items-center justify-center transition-colors hover:text-ruby"
                    style={{
                      color: "var(--muted-foreground)",
                      background: "oklch(1 0 0 / 0.04)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: "4px",
                    }}
                  >
                    <Trash2 className="size-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <DiscountFormModal
        open={modalOpen}
        discount={editingDiscount}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
