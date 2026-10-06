import { SocialDock } from "@/page/contactus/SocialDock";
import { Link } from "@tanstack/react-router";
const footerImage = "/assets/footer.jpeg";

const primaryLinks = [
  { to: "/about", label: "About Us" },
  { to: "/browse", label: "Browse stones" },
  { to: "/contactus", label: "Speak to a gemologist" },
];

const secondaryLinks = [
  { to: "/cart", label: "Your parcel" },
  { to: "/about", label: "Our mission" },
  { to: "/contactus", label: "Book a call" },
];

const currentYear = new Date().getFullYear();

const linkClass =
  "group inline-flex items-center gap-2 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-brass focus-visible:text-brass focus-visible:outline-none";

export function SiteFooter() {
  return (
    <footer
      className="relative isolate overflow-hidden"
      style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)", background: "oklch(0.130 0.014 305)" }}
    >
      {/* Background image with dark overlay so text stays readable */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={footerImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-[40%_25%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.130 0.014 305 / 0.55) 0%, oklch(0.130 0.014 305 / 0.82) 45%, oklch(0.130 0.014 305 / 0.96) 100%)",
          }}
        />
      </div>

      {/* Gold hairline + center accent divider */}
      <div className="flex items-center" aria-hidden="true">
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.35))" }}
        />
        <div className="px-6 py-4">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <polygon
              points="10,1 19,10 10,19 1,10"
              stroke="url(#footer-accent-stroke)"
              strokeWidth="0.8"
              fill="url(#footer-accent-fill)"
            />
            <defs>
              <linearGradient id="footer-accent-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.68 0.076 76 / 0.70)" />
                <stop offset="100%" stopColor="oklch(0.48 0.055 76 / 0.30)" />
              </linearGradient>
              <linearGradient id="footer-accent-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.085 80 / 0.10)" />
                <stop offset="100%" stopColor="oklch(0.58 0.065 76 / 0.05)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(to left, transparent, oklch(0.68 0.076 76 / 0.35))" }}
        />
      </div>

      {/* Main footer content */}
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-12 px-5 pb-16 pt-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
        {/* Brand column */}
        <div className="md:col-span-2 lg:col-span-1">
          <img
            src="/1212-removebg-preview.png"
            alt="Rhea Ceylon Logo"
            className="h-9 w-auto shrink-0 object-contain"
          />
          <p
            className="mt-2 font-mono text-[10px] uppercase"
            style={{ color: "var(--brass)", letterSpacing: "0.18em" }}
          >
            Gem Trading · Est. 2024
          </p>
          <p className="mt-5 max-w-[34ch] text-sm leading-7 text-foreground/75">
            Loose natural and lab-grown gemstones, sold with the report that
            describes them. Every stone is independently graded before listing.
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Explore">
          <p className="engraved-label mb-5">Explore</p>
          <ul className="flex flex-col">
            {primaryLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkClass}>
                  <span
                    className="h-px w-0 bg-current transition-all duration-200 group-hover:w-3"
                    aria-hidden="true"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <p className="engraved-label mb-5">Services</p>
          <ul className="flex flex-col">
            {secondaryLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className={linkClass}>
                  <span
                    className="h-px w-0 bg-current transition-all duration-200 group-hover:w-3"
                    aria-hidden="true"
                  />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Find us */}
        <div className="text-muted-foreground">
          <p className="engraved-label mb-5">Find us</p>
          <SocialDock />
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="px-5 py-4 sm:px-8"
        style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)", background: "oklch(0.130 0.014 305 / 0.6)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="rule-label">
            © {currentYear} Rhea Ceylon · All stones independently graded
          </p>
          <p className="rule-label">Prices per stone · Exclusive of duty</p>
        </div>
      </div>
    </footer>
  );
}