import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { gemTypes, type Stone, type GemType } from "@/data/stones";

function generateId(type: string): string {
  const prefix = type.slice(0, 1).toLowerCase();
  const num = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}-${num}`;
}

const defaultForm: Omit<Stone, "images"> = {
  id: "",
  name: "",
  type: "Sapphire",
  origin: "Natural",
  shape: "",
  cut: "Very Good",
  carat: 1.0,
  color: "",
  clarity: "",
  country: "",
  treatment: "None",
  lab: "GIA",
  certificate: "",
  price: 0,
  alt: "",
  note: "",
};

interface Props {
  open: boolean;
  stone: Stone | null;
  onClose: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
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

export function StoneFormModal({ open, stone, onClose }: Props) {
  const { addStone, updateStone } = useVault();
  const isEdit = Boolean(stone);

  const [form, setForm] = useState<Omit<Stone, "images">>(defaultForm);

  useEffect(() => {
    if (stone) {
      const { images: _images, ...rest } = stone;
      setForm(rest);
    } else {
      setForm({ ...defaultForm, id: generateId("Sapphire") });
    }
  }, [stone, open]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTypeChange(type: GemType) {
    set("type", type);
    if (!isEdit) set("id", generateId(type));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const full: Stone = { ...form, images: stone?.images ?? [] };
    if (isEdit) {
      updateStone(full);
    } else {
      addStone(full);
    }
    onClose();
  }

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
              className="relative w-full max-w-2xl overflow-y-auto"
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
                  {isEdit ? `Edit — ${stone!.name}` : "Add New Stone"}
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
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-2">
                    <Field label="Stone name *">
                      <input
                        required
                        style={inputStyle}
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Burmese Ruby"
                      />
                    </Field>
                  </div>

                  {/* Type */}
                  <Field label="Gem type *">
                    <select
                      required
                      style={inputStyle}
                      value={form.type}
                      onChange={(e) => handleTypeChange(e.target.value as GemType)}
                    >
                      {gemTypes.map((t) => (
                        <option key={t} value={t} style={{ background: "oklch(0.14 0.012 305)" }}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  {/* Origin */}
                  <Field label="Origin *">
                    <select
                      required
                      style={inputStyle}
                      value={form.origin}
                      onChange={(e) => set("origin", e.target.value as Stone["origin"])}
                    >
                      <option value="Natural" style={{ background: "oklch(0.14 0.012 305)" }}>Natural</option>
                      <option value="Lab-grown" style={{ background: "oklch(0.14 0.012 305)" }}>Lab-grown</option>
                    </select>
                  </Field>

                  {/* Carat */}
                  <Field label="Carat weight *">
                    <input
                      required
                      type="number"
                      min={0.01}
                      step={0.01}
                      style={inputStyle}
                      value={form.carat}
                      onChange={(e) => set("carat", parseFloat(e.target.value) || 0)}
                    />
                  </Field>

                  {/* Price */}
                  <Field label="Price (USD) *">
                    <input
                      required
                      type="number"
                      min={0}
                      style={inputStyle}
                      value={form.price}
                      onChange={(e) => set("price", parseInt(e.target.value) || 0)}
                    />
                  </Field>

                  {/* Shape */}
                  <Field label="Shape">
                    <input
                      style={inputStyle}
                      value={form.shape}
                      onChange={(e) => set("shape", e.target.value)}
                      placeholder="e.g. Oval, Cushion…"
                    />
                  </Field>

                  {/* Cut */}
                  <Field label="Cut">
                    <select
                      style={inputStyle}
                      value={form.cut}
                      onChange={(e) => set("cut", e.target.value)}
                    >
                      {["Excellent", "Very Good", "Good", "Fair"].map((c) => (
                        <option key={c} value={c} style={{ background: "oklch(0.14 0.012 305)" }}>{c}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Color */}
                  <Field label="Color">
                    <input
                      style={inputStyle}
                      value={form.color}
                      onChange={(e) => set("color", e.target.value)}
                      placeholder="e.g. D, Vivid Blue…"
                    />
                  </Field>

                  {/* Clarity */}
                  <Field label="Clarity">
                    <input
                      style={inputStyle}
                      value={form.clarity}
                      onChange={(e) => set("clarity", e.target.value)}
                      placeholder="e.g. VVS1, Eye-clean…"
                    />
                  </Field>

                  {/* Country */}
                  <Field label="Country of origin">
                    <input
                      style={inputStyle}
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      placeholder="e.g. Sri Lanka"
                    />
                  </Field>

                  {/* Treatment */}
                  <Field label="Treatment">
                    <select
                      style={inputStyle}
                      value={form.treatment}
                      onChange={(e) => set("treatment", e.target.value as Stone["treatment"])}
                    >
                      {["None", "Unheated", "Heated", "Minor oil"].map((t) => (
                        <option key={t} value={t} style={{ background: "oklch(0.14 0.012 305)" }}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Lab */}
                  <Field label="Grading lab">
                    <select
                      style={inputStyle}
                      value={form.lab}
                      onChange={(e) => set("lab", e.target.value as Stone["lab"])}
                    >
                      {["GIA", "IGI", "AGS", "GRS"].map((l) => (
                        <option key={l} value={l} style={{ background: "oklch(0.14 0.012 305)" }}>{l}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Certificate */}
                  <Field label="Certificate number">
                    <input
                      style={inputStyle}
                      value={form.certificate}
                      onChange={(e) => set("certificate", e.target.value)}
                      placeholder="e.g. GIA 2214938471"
                    />
                  </Field>

                  {/* Stone ID */}
                  <Field label="Stone ID">
                    <input
                      style={inputStyle}
                      value={form.id}
                      onChange={(e) => set("id", e.target.value)}
                      placeholder="e.g. r-0244"
                    />
                  </Field>

                  {/* Alt text */}
                  <div className="col-span-2">
                    <Field label="Image alt text">
                      <input
                        style={inputStyle}
                        value={form.alt}
                        onChange={(e) => set("alt", e.target.value)}
                        placeholder="Accessible description of the stone image"
                      />
                    </Field>
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <Field label="Grading note">
                      <textarea
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                        value={form.note}
                        onChange={(e) => set("note", e.target.value)}
                        placeholder="Detailed grading notes visible on the stone page…"
                      />
                    </Field>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
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
                    {isEdit ? "Save changes" : "Add stone"}
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
