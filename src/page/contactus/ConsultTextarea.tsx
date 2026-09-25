export function ConsultTextarea({
  label,
  focused,
  onFocus,
  onBlur,
}: {
  label: string;
  focused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <div className="relative">
      <label
        className="absolute z-10 pointer-events-none transition-all duration-200"
        style={{
          top: "0.55rem",
          left: "0.875rem",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: focused ? "var(--brass)" : "var(--muted-foreground)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </label>
      <textarea
        rows={3}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-xl px-3 pb-2 pt-6 text-sm text-pearl outline-none transition-all duration-200"
        style={{
          background: "oklch(0.14 0.014 300 / 0.60)",
          border: `1px solid ${focused ? "oklch(0.70 0.082 78 / 0.55)" : "oklch(1 0 0 / 0.10)"}`,
          boxShadow: focused ? "0 0 0 3px oklch(0.70 0.082 78 / 0.10)" : "none",
          fontFamily: "var(--font-sans)",
          resize: "none",
        }}
      />
    </div>
  );
}
