import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-velvet/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-lg text-pearl">Cabochon</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Loose natural and lab-grown gemstones, sold with the report that describes them.
            Every stone is independently graded before it is listed.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-brass">
            Browse stones
          </Link>
          <Link to="/trust" className="text-sm text-muted-foreground hover:text-brass">
            Certification
          </Link>
          <Link to="/consultation" className="text-sm text-muted-foreground hover:text-brass">
            Speak to a gemologist
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60 px-5 py-4 sm:px-8">
        <p className="rule-label mx-auto max-w-7xl">
          Prices shown are per stone, exclusive of duty.
        </p>
      </div>
    </footer>
  );
}
