import { Link } from "@tanstack/react-router";
import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}>
      {/* Gold hairline + diamond divider */}
      <div className="flex items-center">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.20))" }}
        />
        <div className="px-6 py-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0"
            aria-hidden="true"
          >
            <polygon
              points="10,1 19,10 10,19 1,10"
              stroke="url(#footer-diamond-stroke)"
              strokeWidth="0.8"
              fill="url(#footer-diamond-fill)"
            />
            <defs>
              <linearGradient id="footer-diamond-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.076 76 / 0.50)" />
                <stop offset="100%" stopColor="oklch(0.48 0.055 76 / 0.20)" />
              </linearGradient>
              <linearGradient id="footer-diamond-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.085 80 / 0.06)" />
                <stop offset="100%" stopColor="oklch(0.58 0.065 76 / 0.03)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to left, transparent, oklch(0.68 0.076 76 / 0.20))" }}
        />
      </div>

      {/* Main footer content */}
      <div
        className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[2fr_1fr_1fr_1.4fr]"
        style={{
          background: "linear-gradient(to bottom, oklch(0.130 0.014 305 / 0.35), transparent)",
        }}
      >
        {/* Brand column */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Rhea Cylone Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
          </div>
          <p
            className="mt-1.5 font-mono text-[9px] uppercase"
            style={{ color: "var(--brass-dim)", letterSpacing: "0.18em" }}
          >
            Gem Trading · Est. 2024
          </p>
          <p
            className="mt-5 text-sm text-muted-foreground"
            style={{ lineHeight: 1.80, maxWidth: "30ch" }}
          >
            Loose natural and lab-grown gemstones, sold with the report that
            describes them. Every stone is independently graded before listing.
          </p>
        </div>

        {/* Navigation columns */}
        <div>
          <p className="engraved-label mb-6">Explore</p>
          <nav className="flex flex-col gap-4">
            {primaryLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-muted-foreground transition-colors duration-200 hover:text-brass"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="engraved-label mb-6">Services</p>
          <nav className="flex flex-col gap-4">
            {secondaryLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-xs text-muted-foreground transition-colors duration-200 hover:text-brass"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <p className="engraved-label mb-6">Stay informed</p>
          <p
            className="text-xs text-muted-foreground mb-5"
            style={{ lineHeight: 1.7 }}
          >
            New certifications, rare finds, and market notes — delivered quietly.
          </p>
          {subscribed ? (
            <p
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--brass)", letterSpacing: "0.16em" }}
            >
              Noted. We'll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="vault-input w-full"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn-outline-gold w-full"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="px-5 py-4 sm:px-8"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.04)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <p className="rule-label">
            © {currentYear} Rhea Cylone · All stones independently graded
          </p>
          <p className="rule-label">Prices per stone · Exclusive of duty</p>
        </div>
      </div>
    </footer>
  );
}
