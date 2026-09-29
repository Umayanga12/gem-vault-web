export function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p
        className="rule-label mb-4"
        style={{ borderBottom: "1px solid oklch(1 0 0 / 0.05)", paddingBottom: "0.5rem" }}
      >
        {title}
      </p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}
