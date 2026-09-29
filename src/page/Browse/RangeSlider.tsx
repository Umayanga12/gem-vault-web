export function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  "aria-label": ariaLabel,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  "aria-label"?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative pt-1">
      <div className="relative h-px rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }}>
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(to right, var(--brass-dim), var(--brass))",
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
        style={{ height: "1rem", marginTop: "-0.5rem" }}
      />
      {/* Thumb */}
      <div
        className="pointer-events-none absolute top-0 size-3 -translate-x-1/2 -translate-y-[5px]"
        style={{
          left: `${pct}%`,
          background: "linear-gradient(135deg, var(--brass), var(--brass-hi))",
          border: "1.5px solid oklch(0.11 0.010 300)",
          boxShadow: "0 0 6px var(--glow-gold)",
        }}
      />
    </div>
  );
}
