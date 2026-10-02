import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Trash2, Search, X, Star } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatPrice, type Stone } from "@/data/stones";
import { StoneFormModal } from "./StoneFormModal";

const typeColors: Record<string, string> = {
  Sapphire: "oklch(0.60 0.055 250)",
  "Star Sapphire": "oklch(0.65 0.080 255)",
  Chrysoberyl: "oklch(0.68 0.095 95)",
  Spinel: "oklch(0.62 0.120 10)",
  Garnet: "oklch(0.60 0.140 25)",
  Zircon: "oklch(0.70 0.040 220)",
  Tourmaline: "oklch(0.62 0.120 350)",
  Beryl: "oklch(0.65 0.090 175)",
  Moonstone: "oklch(0.80 0.020 240)",
  Quartz: "oklch(0.72 0.030 310)",
  Topaz: "oklch(0.72 0.070 50)",
  "Rare Gems": "oklch(0.75 0.060 60)",
};

export function StonesPanel() {
  const { stones, deleteStone, updateStone } = useVault();
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStone, setEditingStone] = useState<Stone | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = stones.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.type.toLowerCase().includes(query.toLowerCase()) ||
      s.country.toLowerCase().includes(query.toLowerCase()),
  );

  function handleEdit(stone: Stone) {
    setEditingStone(stone);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditingStone(null);
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    setTimeout(() => {
      deleteStone(id);
      setDeletingId(null);
    }, 300);
  }

  function handleToggleFeatured(stone: Stone) {
    updateStone({ ...stone, isFeatured: !stone.isFeatured });
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2
            className="font-display text-pearl"
            style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
          >
            Stones Inventory
          </h2>
          <p className="mt-0.5 font-mono" style={{ fontSize: "9px", color: "var(--muted-foreground)", letterSpacing: "0.14em" }}>
            {stones.length} stones in the vault
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
          Add Stone
        </button>
      </div>

      {/* Search */}
      <div
        className="relative mb-4 flex items-center gap-2"
        style={{
          background: "oklch(0.130 0.014 305)",
          border: "1px solid oklch(1 0 0 / 0.08)",
          borderRadius: "6px",
        }}
      >
        <Search className="ml-3 size-4 flex-none" style={{ color: "var(--muted-foreground)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, type, or origin…"
          className="w-full bg-transparent py-2.5 pr-3 text-sm text-pearl placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="mr-2">
            <X className="size-3.5" style={{ color: "var(--muted-foreground)" }} />
          </button>
        )}
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
            gridTemplateColumns: "1fr 1fr 80px 90px 80px 100px 110px",
            borderBottom: "1px solid oklch(1 0 0 / 0.07)",
          }}
        >
          {["Name", "Type / Origin", "Carat", "Clarity", "Lab", "Price", ""].map((h) => (
            <span
              key={h}
              className="font-mono uppercase"
              style={{ fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              No stones match your search.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((stone, i) => (
              <motion.div
                key={stone.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: deletingId === stone.id ? 0 : 1,
                  y: 0,
                  x: deletingId === stone.id ? 16 : 0,
                }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="grid items-center px-4 py-3 transition-colors hover:bg-white/[0.025]"
                style={{
                  gridTemplateColumns: "1fr 1fr 80px 90px 80px 100px 110px",
                  borderBottom:
                    i < filtered.length - 1
                      ? "1px solid oklch(1 0 0 / 0.05)"
                      : "none",
                }}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-pearl">{stone.name}</p>
                  <p
                    className="mt-0.5 font-mono truncate"
                    style={{ fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.12em" }}
                  >
                    {stone.id}
                  </p>
                </div>

                <div>
                  {(() => {
                    const c = typeColors[stone.type] ?? "oklch(0.68 0.076 76)";
                    return (
                      <span
                        className="inline-block px-2 py-0.5 font-mono text-[8px] uppercase"
                        style={{
                          color: c,
                          background: `${c}18`,
                          border: `1px solid ${c}44`,
                          borderRadius: "4px",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {stone.type}
                      </span>
                    );
                  })()}
                  <p
                    className="mt-1 font-mono"
                    style={{ fontSize: "8px", color: "var(--muted-foreground)", letterSpacing: "0.10em" }}
                  >
                    {stone.origin}
                  </p>
                </div>

                <span className="text-sm text-pearl">{stone.carat.toFixed(2)} ct</span>
                <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {stone.clarity}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {stone.lab}
                </span>
                <span className="font-display text-sm" style={{ color: "var(--brass)" }}>
                  {formatPrice(stone.price)}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleFeatured(stone)}
                    aria-label={`Toggle Featured for ${stone.name}`}
                    className="flex size-7 items-center justify-center transition-colors hover:text-yellow-400"
                    style={{
                      color: stone.isFeatured ? "var(--brass)" : "var(--muted-foreground)",
                      background: "oklch(1 0 0 / 0.04)",
                      border: "1px solid oklch(1 0 0 / 0.08)",
                      borderRadius: "4px",
                    }}
                  >
                    <Star className="size-3" fill={stone.isFeatured ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => handleEdit(stone)}
                    aria-label={`Edit ${stone.name}`}
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
                    onClick={() => handleDelete(stone.id)}
                    aria-label={`Delete ${stone.name}`}
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

      {/* Stone Form Modal */}
      <StoneFormModal
        open={modalOpen}
        stone={editingStone}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
