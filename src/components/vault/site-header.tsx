import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatPrice } from "@/data/stones";

const nav = [
  { to: "/browse", label: "Browse" },
  { to: "/trust", label: "Certification" },
  { to: "/consultation", label: "Consultation" },
];

export function SiteHeader() {
  const { cart, cartStones, currency, setCurrency, removeFromCart } = useVault();
  const [drawer, setDrawer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const total = cartStones.reduce((sum, s) => sum + s.price, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-obsidian/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
        <Link to="/" className="font-display text-lg tracking-tight text-pearl">
          Cabochon<span className="text-brass">&thinsp;/</span>
          <span className="rule-label ml-2 hidden sm:inline">Gem Trading</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-pearl"
              activeProps={{ className: "text-brass" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <select
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "USD" | "EUR" | "GBP")}
            className="hidden rounded-sm border border-border bg-transparent px-2 py-1 font-mono text-xs text-muted-foreground sm:block"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>

          <button
            onClick={() => setDrawer(true)}
            className="facet-sheen relative flex items-center gap-2 rounded-sm border border-brass/40 px-3 py-1.5 text-sm text-brass transition-colors hover:bg-brass/10"
          >
            <ShoppingBag className="size-4" />
            <motion.span key={cart.length} className="font-mono text-xs">
              {cart.length}
            </motion.span>
          </button>

          <button
            className="text-muted-foreground md:hidden"
            aria-label="Menu"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-velvet md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobile(false)}
                  className="py-2 text-sm text-muted-foreground"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-40 bg-obsidian/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-border bg-velvet"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-display text-lg">Your parcel</h2>
                <button onClick={() => setDrawer(false)} aria-label="Close cart">
                  <X className="size-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-auto px-5 py-4">
                {cartStones.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No stones reserved yet. Browse the vault and add a stone to hold it for 48
                    hours.
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {cartStones.map((s) => (
                      <li key={s.id} className="flex gap-3">
                        <img
                          src={s.images[0]}
                          alt={s.alt}
                          loading="lazy"
                          className="size-16 rounded-sm object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-pearl">{s.name}</p>
                          <p className="font-mono text-xs text-muted-foreground">
                            {s.carat.toFixed(2)} ct · {s.certificate}
                          </p>
                          <p className="mt-1 font-mono text-sm text-brass">
                            {formatPrice(s.price, currency)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(s.id)}
                          className="rule-label self-start hover:text-pearl"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t border-border px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rule-label">Subtotal</span>
                  <span className="font-mono text-lg text-pearl">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setDrawer(false)}
                  className="facet-sheen block rounded-sm bg-brass px-4 py-3 text-center text-sm font-medium text-primary-foreground"
                >
                  Review and checkout
                </Link>
                <p className="mt-3 text-xs text-muted-foreground">
                  Fully insured shipping · 14-day return window · Lab report included
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
