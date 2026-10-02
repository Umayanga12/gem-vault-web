import { AnimatePresence, motion } from "motion/react";
import { X, FileQuestion, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect, useId } from "react";
import type { Stone } from "@/data/stones";

/* ── Types ─────────────────────────────────────────────────────────────────── */

export interface QuotationFormData {
  stoneId: string;
  stoneName: string;
  // Sapphire-only (color required for sapphires)
  color?: string;
  treated?: "treated" | "untreated";
  heatStatus?: "heated" | "unheated";
  // All stones (weight required)
  weight: string;
  clarity: "loop-clean" | "eye-clean";
  quantity: "single" | "lot";
  calibratedSize?: string;
  notes?: string;
}

/* ── Helpers ─────────────────────────────────────────────────────────────────*/

function isSapphireType(stone: Stone) {
  return stone.type === "Sapphire" || stone.type === "Star Sapphire";
}

function isSpinelType(stone: Stone) {
  return stone.type === "Spinel";
}

function requiresColor(stone: Stone) {
  return isSapphireType(stone) || stone.name === "Star Spinel";
}

/* ── Shared field styles ─────────────────────────────────────────────────── */

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "oklch(0.12 0.012 305 / 0.80)",
  color: "oklch(0.90 0.012 85)",
  fontSize: "0.8125rem",
  padding: "0.5rem 0.75rem",
  outline: "none",
  borderRadius: "4px",
  fontFamily: "var(--font-sans)",
  transition: "border-color 200ms ease, box-shadow 200ms ease",
  boxSizing: "border-box" as const,
};

function mkInputStyle(invalid = false): React.CSSProperties {
  return {
    ...inputBase,
    border: invalid
      ? "1px solid oklch(0.65 0.22 25 / 0.80)"
      : "1px solid oklch(1 0 0 / 0.10)",
    boxShadow: invalid ? "0 0 0 2px oklch(0.65 0.22 25 / 0.15)" : "none",
  };
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "0.625rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "oklch(0.68 0.076 76)",
  marginBottom: "0.375rem",
};

/* ── Segmented pill toggle ───────────────────────────────────────────────── */

function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="group"
      className="flex"
      style={{
        background: "oklch(0.12 0.012 305 / 0.80)",
        border: "1px solid oklch(1 0 0 / 0.10)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className="flex-1 py-2 font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
            style={{
              background: active ? "oklch(0.70 0.082 78 / 0.18)" : "transparent",
              color: active ? "var(--brass)" : "var(--muted-foreground)",
              border: "none",
              borderRight: i < options.length - 1 ? "1px solid oklch(1 0 0 / 0.08)" : "none",
              cursor: "pointer",
              letterSpacing: "0.10em",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Field wrapper ───────────────────────────────────────────────────────── */

function Field({
  label,
  optional,
  required,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label style={labelStyle} htmlFor={id}>
        {label}
        {required && (
          <span style={{ marginLeft: "4px", color: "oklch(0.65 0.22 25)" }}>*</span>
        )}
        {optional && (
          <span
            style={{
              marginLeft: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--muted-foreground)",
              textTransform: "none" as const,
              letterSpacing: "0.05em",
            }}
          >
            optional
          </span>
        )}
      </label>
      <div id={id}>{children}</div>
      {error && (
        <p
          className="flex items-center gap-1 mt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "oklch(0.65 0.22 25)",
          }}
        >
          <AlertCircle className="size-2.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Validation ──────────────────────────────────────────────────────────── */

interface FormErrors {
  color?: string;
  weight?: string;
}

function validate(data: Partial<QuotationFormData>, needsColor: boolean): FormErrors {
  const errors: FormErrors = {};
  if (needsColor && !data.color?.trim()) {
    errors.color = "Colour is required for this stone";
  }
  if (!data.weight?.trim()) {
    errors.weight = "Weight range is required";
  }
  return errors;
}

/* ── Shared form fields ──────────────────────────────────────────────────── */

function QuotationFields({
  stone,
  data,
  onChange,
  variant,
  errors,
}: {
  stone: Stone;
  data: Partial<QuotationFormData>;
  onChange: (patch: Partial<QuotationFormData>) => void;
  variant: "modal" | "inline";
  errors?: FormErrors;
}) {
  const isSapphire = isSapphireType(stone);
  const needsColor = requiresColor(stone);
  const gap = variant === "modal" ? "1rem" : "0.75rem";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {/* Colour — REQUIRED for Sapphires & Star Spinel */}
      {needsColor && (
        <Field label="Preferred Colour" required error={errors?.color}>
          <input
            type="text"
            required
            placeholder="e.g. fancy, royal, pigeon, pure, neon"
            value={data.color ?? ""}
            onChange={(e) => onChange({ color: e.target.value })}
            style={mkInputStyle(Boolean(errors?.color))}
          />
        </Field>
      )}

      {/* Weight — REQUIRED for all stones */}
      <Field label="Weight Range (carats)" required error={errors?.weight}>
        <input
          type="text"
          required
          placeholder="e.g. 1.00–2.00 ct"
          value={data.weight ?? ""}
          onChange={(e) => onChange({ weight: e.target.value })}
          style={mkInputStyle(Boolean(errors?.weight))}
        />
      </Field>

      {/* Clarity */}
      <Field label="Clarity" optional>
        <SegmentedToggle
          options={[
            { label: "Loupe Clean", value: "loop-clean" as const },
            { label: "Eye Clean", value: "eye-clean" as const },
          ]}
          value={data.clarity ?? "loop-clean"}
          onChange={(v) => onChange({ clarity: v })}
        />
      </Field>

      {/* Sapphire-only: Treatment */}
      {isSapphire && (
        <Field label="Treatment" optional>
          <SegmentedToggle
            options={[
              { label: "Untreated", value: "untreated" as const },
              { label: "Treated", value: "treated" as const },
            ]}
            value={data.treated ?? "untreated"}
            onChange={(v) => onChange({ treated: v })}
          />
        </Field>
      )}

      {/* Sapphire-only: Heat Status */}
      {isSapphire && (
        <Field label="Heat Status" optional>
          <SegmentedToggle
            options={[
              { label: "Unheated", value: "unheated" as const },
              { label: "Heated", value: "heated" as const },
            ]}
            value={data.heatStatus ?? "unheated"}
            onChange={(v) => onChange({ heatStatus: v })}
          />
        </Field>
      )}

      {/* Quantity */}
      <Field label="Looking For" optional>
        <SegmentedToggle
          options={[
            { label: "Single Stone", value: "single" as const },
            { label: "Lot", value: "lot" as const },
          ]}
          value={data.quantity ?? "single"}
          onChange={(v) => onChange({ quantity: v })}
        />
      </Field>

      {/* Calibrated size */}
      <Field label="Calibrated Size" optional>
        <input
          type="text"
          placeholder="e.g. 6×4 mm, 8×6 mm"
          value={data.calibratedSize ?? ""}
          onChange={(e) => onChange({ calibratedSize: e.target.value })}
          style={mkInputStyle()}
        />
      </Field>

      {/* Notes */}
      <Field label="Additional Notes" optional>
        <textarea
          placeholder="Any specific requirements, budget range, certification preferences…"
          value={data.notes ?? ""}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={3}
          style={{
            ...mkInputStyle(),
            resize: "vertical",
            minHeight: "72px",
            lineHeight: "1.6",
          }}
        />
      </Field>
    </div>
  );
}

function defaultFormData(): Partial<QuotationFormData> {
  return {
    clarity: "loop-clean",
    quantity: "single",
    treated: "untreated",
    heatStatus: "unheated",
    weight: "",
    notes: "",
  };
}

/* ── Modal variant ───────────────────────────────────────────────────────── */

interface QuotationModalProps {
  stone: Stone;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: QuotationFormData) => void;
  accent?: string;
}

export function QuotationModal({
  stone,
  open,
  onClose,
  onSubmit,
  accent = "oklch(0.70 0.082 78)",
}: QuotationModalProps) {
  const [formData, setFormData] = useState<Partial<QuotationFormData>>(defaultFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const needsColor = requiresColor(stone);

  // Reset when modal opens for a new stone
  useEffect(() => {
    if (open) {
      setFormData(defaultFormData());
      setErrors({});
      setSubmitted(false);
    }
  }, [open, stone.id]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  function handleChange(patch: Partial<QuotationFormData>) {
    const next = { ...formData, ...patch };
    setFormData(next);
    if (submitted) setErrors(validate(next, needsColor));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(formData, needsColor);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      stoneId: stone.id,
      stoneName: stone.name,
      clarity: formData.clarity ?? "loop-clean",
      quantity: formData.quantity ?? "single",
      treated: formData.treated,
      heatStatus: formData.heatStatus,
      color: formData.color,
      weight: formData.weight ?? "",
      calibratedSize: formData.calibratedSize,
      notes: formData.notes,
    });
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
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 z-[200]"
            style={{ background: "oklch(0 0 0 / 0.72)", backdropFilter: "blur(8px)" }}
          />

          {/*
            Centering wrapper: uses flex so the modal always sits dead-centre
            on the viewport. Framer Motion only animates opacity/scale — no
            transform conflict with the CSS centering.
          */}
          <div
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={`Quotation request for ${stone.name}`}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[460px] overflow-y-auto"
              style={{
                maxHeight: "90dvh",
                pointerEvents: "auto",
                background: "oklch(0.135 0.014 305 / 0.98)",
                border: `1px solid ${accent.replace(")", " / 0.30)")}`,
                borderRadius: "12px",
                boxShadow: `0 40px 100px oklch(0 0 0 / 0.75), 0 0 0 1px ${accent.replace(")", " / 0.12)")}`,
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: "2px",
                  width: "100%",
                  background: `linear-gradient(90deg, ${accent}, ${accent.replace(")", " / 0.18)")})`,
                  borderRadius: "12px 12px 0 0",
                }}
              />

              <form onSubmit={handleSubmit} noValidate>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
                  <div>
                    <p
                      className="font-mono text-[9px] uppercase tracking-[0.18em] mb-1"
                      style={{ color: accent }}
                    >
                      Request Quotation
                    </p>
                    <h2
                      className="font-display text-pearl"
                      style={{ fontSize: "1.2rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                    >
                      {stone.name}
                    </h2>
                    <p className="text-muted-foreground text-xs mt-1">
                      {stone.type} · {stone.origin}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 transition-opacity hover:opacity-60 mt-0.5 shrink-0"
                    aria-label="Close quotation form"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="mx-6 mb-5 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${accent.replace(")", " / 0.28)")}, transparent)`,
                  }}
                />

                {/* Fields */}
                <div className="px-6 pb-2">
                  <QuotationFields
                    stone={stone}
                    data={formData}
                    onChange={handleChange}
                    variant="modal"
                    errors={errors}
                  />
                </div>

                {/* Submit */}
                <div className="px-6 pt-4 pb-6">
                  <button
                    type="submit"
                    id={`quotation-modal-submit-${stone.id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
                    style={{
                      background: `linear-gradient(135deg, ${accent.replace(")", " / 0.24)")}, ${accent.replace(")", " / 0.14)")})`,
                      border: `1px solid ${accent.replace(")", " / 0.50)")}`,
                      color: accent,
                      borderRadius: "5px",
                    }}
                  >
                    <FileQuestion className="size-3.5" />
                    Add to Quotation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Inline variant (for stone detail page) ──────────────────────────────── */

interface QuotationInlineFormProps {
  stone: Stone;
  inQuotation: boolean;
  onSubmit: (data: QuotationFormData) => void;
  onRemove: () => void;
  accent?: string;
}

export function QuotationInlineForm({
  stone,
  inQuotation,
  onSubmit,
  onRemove,
  accent = "oklch(0.70 0.082 78)",
}: QuotationInlineFormProps) {
  const [formData, setFormData] = useState<Partial<QuotationFormData>>(defaultFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const needsColor = requiresColor(stone);

  function handleChange(patch: Partial<QuotationFormData>) {
    const next = { ...formData, ...patch };
    setFormData(next);
    if (submitted) setErrors(validate(next, needsColor));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(formData, needsColor);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      stoneId: stone.id,
      stoneName: stone.name,
      clarity: formData.clarity ?? "loop-clean",
      quantity: formData.quantity ?? "single",
      treated: formData.treated,
      heatStatus: formData.heatStatus,
      color: formData.color,
      weight: formData.weight ?? "",
      calibratedSize: formData.calibratedSize,
      notes: formData.notes,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8"
      style={{
        background: "oklch(0.135 0.014 305 / 0.70)",
        border: `1px solid ${accent.replace(")", " / 0.22)")}`,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: "2px",
          width: "100%",
          background: `linear-gradient(90deg, ${accent}, ${accent.replace(")", " / 0.15)")})`,
        }}
      />

      <div className="px-5 pt-4 pb-5">
        <p
          className="font-mono text-[9px] uppercase tracking-[0.18em] mb-4"
          style={{ color: accent }}
        >
          Request a Quotation
        </p>

        {inQuotation ? (
          /* Already in quotation state */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            className="flex flex-col items-center gap-4 py-4"
          >
            <CheckCircle className="size-8" style={{ color: accent }} />
            <div className="text-center">
              <p className="font-display text-pearl text-sm">Added to Quotation</p>
              <p className="text-muted-foreground text-xs mt-1">
                This stone is in your quotation basket
              </p>
            </div>
            <button
              type="button"
              onClick={onRemove}
              id={`remove-quotation-inline-${stone.id}`}
              className="flex items-center gap-2 px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all duration-200 hover:opacity-80"
              style={{
                border: "1px solid oklch(1 0 0 / 0.12)",
                color: "var(--muted-foreground)",
                borderRadius: "4px",
              }}
            >
              <X className="size-3" />
              Remove from Quotation
            </button>
          </motion.div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} noValidate>
            <QuotationFields
              stone={stone}
              data={formData}
              onChange={handleChange}
              variant="inline"
              errors={errors}
            />

            <button
              type="submit"
              id={`quotation-inline-submit-${stone.id}`}
              className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
              style={{
                background: `linear-gradient(135deg, ${accent.replace(")", " / 0.22)")}, ${accent.replace(")", " / 0.12)")})`,
                border: `1px solid ${accent.replace(")", " / 0.45)")}`,
                color: accent,
                borderRadius: "4px",
              }}
            >
              <FileQuestion className="size-3.5" />
              Add to Quotation
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
