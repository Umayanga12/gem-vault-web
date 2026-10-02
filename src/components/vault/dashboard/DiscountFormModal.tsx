import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { type Discount, type DiscountType } from "@/data/discounts";
import { gemTypes } from "@/data/stones";

function generateDiscountId(): string {
  return `promo-${Date.now().toString(36)}`;
}

const defaultForm: Discount = {
  id: "",
  name: "",
  code: "",
  type: "percent",
  value: 10,
  bundleQty: 2,
  bundlePrice: 100,
  applicableTo: "all",
  applicableType: "",
  active: true,
  expiresAt: "",
  createdAt: new Date().toISOString(),
};

interface Props {
  open: boolean;
  discount: Discount | null;
  onClose: () => void;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block font-mono uppercase mb-1.5"
        style={{ fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)", fontSize: "10px" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "oklch(0.14 0.012 305)",
  border: "1px solid oklch(1 0 0 / 0.10)",
  borderRadius: "5px",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  color: "var(--pearl)",
  outline: "none",
};

export function DiscountFormModal({ open, discount, onClose }: Props) {
  const { addDiscount, updateDiscount, stones } = useVault();
  const isEdit = Boolean(discount);

  const [form, setForm] = useState<Discount>(defaultForm);

  useEffect(() => {
    if (discount) {
      setForm(discount);
    } else {
      setForm({ ...defaultForm, id: generateDiscountId(), createdAt: new Date().toISOString() });
    }
  }, [discount, open]);

  function set<K extends keyof Discount>(key: K, value: Discount[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEdit) {
      updateDiscount(form);
    } else {
      addDiscount(form);
    }
    onClose();
  }

  const typeDescriptions: Record<DiscountType, string> = {
    percent: "Apply a % discount to the stone price",
    bundle: "Buy N stones and pay a fixed total",
    fixed: "Deduct a fixed dollar amount from the price",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: "oklch(0 0 0 / 0.65)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-xl overflow-y-auto"
              style={{
                background: "oklch(0.130 0.014 305)",
                border: "1px solid oklch(1 0 0 / 0.10)",
                borderRadius: "10px",
                maxHeight: "90vh",
                pointerEvents: "all",
              }}
            >
              {/* Header */}
              <div
                className="sticky top-0 flex items-center justify-between px-6 py-4 z-10"
                style={{
                  background: "oklch(0.130 0.014 305)",
                  borderBottom: "1px solid oklch(1 0 0 / 0.08)",
                }}
              >
                <p
                  className="font-display text-pearl"
                  style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}
                >
                  {isEdit ? `Edit — ${discount!.name}` : "New Promotion"}
                </p>
                <button
                  onClick={onClose}
                  className="flex size-8 items-center justify-center transition-colors hover:text-pearl"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name & Code */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Promotion name *">
                    <input
                      required
                      style={inputStyle}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Summer Sale"
                    />
                  </Field>
                  <Field
                    label="Promo code"
                    hint="Optional — customers can enter this at checkout"
                  >
                    <input
                      style={inputStyle}
                      value={form.code}
                      onChange={(e) => set("code", e.target.value.toUpperCase())}
                      placeholder="e.g. GEMS10"
                    />
                  </Field>
                </div>

                {/* Discount type */}
                <Field label="Promotion type *">
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {(["percent", "bundle", "fixed"] as DiscountType[]).map((t) => {
                      const labels: Record<DiscountType, string> = {
                        percent: "% Off",
                        bundle: "Bundle",
                        fixed: "Fixed $",
                      };
                      const active = form.type === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set("type", t)}
                          className="px-3 py-2.5 text-sm transition-all duration-200"
                          style={{
                            background: active
                              ? "oklch(0.68 0.076 76 / 0.15)"
                              : "oklch(0.14 0.012 305)",
                            border: active
                              ? "1px solid oklch(0.68 0.076 76 / 0.45)"
                              : "1px solid oklch(1 0 0 / 0.10)",
                            borderRadius: "6px",
                            color: active ? "var(--brass)" : "var(--muted-foreground)",
                          }}
                        >
                          {labels[t]}
                        </button>
                      );
                    })}
                  </div>
                  <p
                    className="mt-1.5 text-xs"
                    style={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                  >
                    {typeDescriptions[form.type]}
                  </p>
                </Field>

                {/* Conditional value fields */}
                <AnimatePresence mode="wait">
                  {form.type === "percent" && (
                    <motion.div
                      key="percent"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Field label="Discount percentage (%) *" hint="Enter a value between 1 and 100">
                        <input
                          required
                          type="number"
                          min={1}
                          max={100}
                          style={inputStyle}
                          value={form.value}
                          onChange={(e) => set("value", parseFloat(e.target.value) || 0)}
                        />
                      </Field>
                    </motion.div>
                  )}

                  {form.type === "fixed" && (
                    <motion.div
                      key="fixed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Field label="Discount amount (USD) *" hint="Fixed dollar amount to deduct">
                        <input
                          required
                          type="number"
                          min={1}
                          style={inputStyle}
                          value={form.value}
                          onChange={(e) => set("value", parseInt(e.target.value) || 0)}
                        />
                      </Field>
                    </motion.div>
                  )}

                  {form.type === "bundle" && (
                    <motion.div
                      key="bundle"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Field label="Number of items *" hint="e.g. 2 (for '2 for $100')">
                        <input
                          required
                          type="number"
                          min={2}
                          style={inputStyle}
                          value={form.bundleQty ?? 2}
                          onChange={(e) =>
                            set("bundleQty", parseInt(e.target.value) || 2)
                          }
                        />
                      </Field>
                      <Field label="Bundle total price (USD) *" hint="e.g. 100 (for '2 for $100')">
                        <input
                          required
                          type="number"
                          min={1}
                          style={inputStyle}
                          value={form.bundlePrice ?? 100}
                          onChange={(e) =>
                            set("bundlePrice", parseInt(e.target.value) || 100)
                          }
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Applicable gem type */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Applicable gem type" hint="Leave blank to apply to all types">
                    <select
                      style={inputStyle}
                      value={form.applicableType ?? ""}
                      onChange={(e) =>
                        set("applicableType", e.target.value || undefined)
                      }
                    >
                      <option value="" style={{ background: "oklch(0.14 0.012 305)" }}>
                        All gem types
                      </option>
                      {gemTypes.map((t) => (
                        <option key={t} value={t} style={{ background: "oklch(0.14 0.012 305)" }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Expiry date" hint="Leave blank for no expiry">
                    <input
                      type="date"
                      style={inputStyle}
                      value={form.expiresAt ?? ""}
                      onChange={(e) => set("expiresAt", e.target.value || undefined)}
                    />
                  </Field>
                </div>

                {/* Specific stones */}
                <Field
                  label="Apply to specific stones"
                  hint="Select individual stones, or leave all unchecked to apply to all"
                >
                  <div
                    className="mt-1 max-h-40 overflow-y-auto rounded-md p-2 space-y-1"
                    style={{
                      background: "oklch(0.14 0.012 305)",
                      border: "1px solid oklch(1 0 0 / 0.10)",
                    }}
                  >
                    <label className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-white/5 rounded">
                      <input
                        type="checkbox"
                        checked={form.applicableTo === "all"}
                        onChange={() => set("applicableTo", "all")}
                        className="accent-brass"
                      />
                      <span className="text-sm" style={{ color: "var(--pearl)" }}>
                        All stones
                      </span>
                    </label>
                    {stones.map((s) => {
                      const isSelected =
                        Array.isArray(form.applicableTo) &&
                        form.applicableTo.includes(s.id);
                      return (
                        <label
                          key={s.id}
                          className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-white/5 rounded"
                        >
                          <input
                            type="checkbox"
                            className="accent-brass"
                            checked={isSelected}
                            onChange={(e) => {
                              const prev = Array.isArray(form.applicableTo)
                                ? form.applicableTo
                                : [];
                              if (e.target.checked) {
                                set("applicableTo", [...prev, s.id]);
                              } else {
                                const next = prev.filter((x) => x !== s.id);
                                set("applicableTo", next.length === 0 ? "all" : next);
                              }
                            }}
                          />
                          <span className="text-sm" style={{ color: "var(--pearl)" }}>
                            {s.name}
                          </span>
                          <span
                            className="ml-auto font-mono"
                            style={{ fontSize: "8px", color: "var(--muted-foreground)" }}
                          >
                            {s.id}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Field>

                {/* Active toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => set("active", !form.active)}
                    className="relative h-5 w-9 flex-none rounded-full transition-colors duration-200"
                    style={{
                      background: form.active
                        ? "oklch(0.72 0.10 155)"
                        : "oklch(1 0 0 / 0.12)",
                    }}
                    aria-checked={form.active}
                    role="switch"
                    aria-label="Toggle promotion active"
                  >
                    <span
                      className="absolute top-0.5 h-4 w-4 rounded-full transition-transform duration-200"
                      style={{
                        background: "var(--pearl)",
                        left: form.active ? "calc(100% - 18px)" : "2px",
                      }}
                    />
                  </button>
                  <span className="text-sm" style={{ color: "var(--pearl)" }}>
                    {form.active ? "Promotion is active" : "Promotion is inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-sm transition-colors hover:text-pearl"
                    style={{
                      color: "var(--muted-foreground)",
                      border: "1px solid oklch(1 0 0 / 0.10)",
                      borderRadius: "6px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium transition-all hover:opacity-90"
                    style={{
                      background: "var(--brass)",
                      color: "oklch(0.10 0.010 300)",
                      borderRadius: "6px",
                    }}
                  >
                    {isEdit ? "Save changes" : "Create promotion"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
