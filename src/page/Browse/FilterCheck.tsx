import { AnimatePresence, motion } from "motion/react";

export function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xs text-muted-foreground transition-colors hover:text-pearl">
      {/* Angled checkbox */}
      <span
        className="relative flex size-3.5 shrink-0 items-center justify-center transition-all duration-200"
        style={{
          background: checked ? "oklch(0.68 0.076 76 / 0.15)" : "transparent",
          border: `1px solid ${checked ? "oklch(0.68 0.076 76 / 0.60)" : "oklch(1 0 0 / 0.16)"}`,
          transform: "rotate(45deg)",
        }}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "backOut" }}
              className="size-1.5"
              style={{ background: "var(--brass)", transform: "rotate(-45deg)" }}
            />
          )}
        </AnimatePresence>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-label={label}
        />
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
        {label}
      </span>
    </label>
  );
}
