import { Link } from "@tanstack/react-router";

const primaryLinks = [
  { to: "/about", label: "About Us" },
  { to: "/browse", label: "Browse stones" },
  { to: "/consultation", label: "Speak to a gemologist" },
];

const secondaryLinks = [
  { to: "/cart", label: "Your parcel" },
  { to: "/about", label: "Our mission" },
  { to: "/consultation", label: "Book a call" },
];

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
      {/* Diamond divider */}
      <div className="flex items-center justify-center py-0">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.70 0.082 78 / 0.25))" }}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="mx-4 shrink-0"
          aria-hidden="true"
        >
          <polygon
            points="10,2 18,10 10,18 2,10"
            stroke="url(#footer-gold)"
            strokeWidth="1"
            fill="url(#footer-fill)"
          />
          <defs>
            <linearGradient id="footer-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.70 0.082 78 / 0.60)" />
              <stop offset="100%" stopColor="oklch(0.50 0.060 78 / 0.30)" />
            </linearGradient>
            <linearGradient id="footer-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.80 0.09 82 / 0.08)" />
              <stop offset="100%" stopColor="oklch(0.62 0.08 78 / 0.04)" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to left, transparent, oklch(0.70 0.082 78 / 0.25))" }}
        />
      </div>

      {/* Main footer content */}
      <div
        className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[2fr_1fr_1fr]"
        style={{ background: "linear-gradient(to bottom, oklch(0.14 0.016 305 / 0.40), transparent)" }}
      >
        {/* Brand column */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <polygon
                points="9,1 17,7 9,17 1,7"
                fill="none"
                stroke="url(#footer-logo-gold)"
                strokeWidth="1.2"
              />
              <polygon
                points="9,4 14,7 9,13 4,7"
                fill="url(#footer-logo-fill)"
                opacity="0.30"
              />
              <defs>
                <linearGradient id="footer-logo-gold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.08 78)" />
                  <stop offset="100%" stopColor="oklch(0.80 0.09 82)" />
                </linearGradient>
                <linearGradient id="footer-logo-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                </linearGradient>
              </defs>
            </svg>
            <p className="font-display text-pearl" style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
              Cabochon
            </p>
          </div>
          <p className="mt-2 font-mono text-xs" style={{ color: "var(--brass-dim)", letterSpacing: "0.10em" }}>
            Gem Trading · Est. 2024
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground" style={{ lineHeight: 1.7 }}>
            Loose natural and lab-grown gemstones, sold with the report that describes them.
            Every stone is independently graded before it is listed.
          </p>
        </div>

        {/* Navigation columns */}
        <div>
          <p className="engraved-label mb-5">Explore</p>
          <nav className="flex flex-col gap-3">
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-brass"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="engraved-label mb-5">Services</p>
          <nav className="flex flex-col gap-3">
            {secondaryLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-brass"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="px-5 py-4 sm:px-8"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <p className="rule-label">
            © {currentYear} Cabochon · All stones independently graded
          </p>
          <p className="rule-label">
            Prices per stone · Exclusive of duty
          </p>
        </div>
      </div>
    </footer>
  );
}
