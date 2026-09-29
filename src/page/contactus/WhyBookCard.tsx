import { Reveal } from "@/components/vault/reveal";
import { MessageSquare, BarChart3, Clock } from "lucide-react";
import { SocialDock } from "./SocialDock";

const highlights = [
  { icon: MessageSquare, text: "Report interpretation, inclusion by inclusion" },
  { icon: BarChart3, text: "Side-by-side pricing against recent comparables" },
  { icon: Clock, text: "Origin and treatment implications for resale" },
];

export function WhyBookCard() {
  return (
    <Reveal delay={0.1}>
      <div
        className="rounded-2xl p-8 relative overflow-hidden group"
        style={{ background: "oklch(0.12 0.012 305 / 0.5)", border: "1px solid oklch(1 0 0 / 0.05)" }}
      >
        {/* Decorative gem in background */}
        <div className="absolute -right-8 -bottom-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 group-hover:rotate-12 pointer-events-none">
          <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="url(#consult-gold)" strokeWidth="0.8">
            <polygon points="12 2 22 9 12 22 2 9" />
            <polygon points="12 4 20 9.5 12 20 4 9.5" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="9.5" x2="20" y2="9.5" />
            <defs>
              <linearGradient id="consult-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h3 className="font-display text-xl text-pearl mb-3 relative z-10">Why book a call?</h3>
        <p className="text-sm leading-relaxed text-muted-foreground mb-6 relative z-10">
          Bring the report numbers of the stones you are considering. We will walk the grading
          data, explain what the inclusions mean in practice, and give you a plain view of where
          each stone sits against current market comparables. No obligation to buy.
        </p>
        <ul className="space-y-4 relative z-10">
          {highlights.map((h) => (
            <li key={h.text} className="flex items-start gap-4">
              <span
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "oklch(0.70 0.082 78 / 0.10)",
                  border: "1px solid oklch(0.70 0.082 78 / 0.25)",
                }}
              >
                <h.icon className="size-4 text-brass" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{h.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Social links */}
      <div className="mt-10 pt-8 border-t border-white/5">
        <span className="font-mono text-xs uppercase tracking-widest text-pearl/50 block mb-2">
          Follow our journey
        </span>
        <SocialDock />
      </div>
    </Reveal>
  );
}

