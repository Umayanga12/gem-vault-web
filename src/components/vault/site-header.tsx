import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, Gem } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { formatPrice } from "@/data/stones";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/browse", label: "Browse" },
  { to: "/consultation", label: "Contact Us" },
];

const currencies = ["USD", "EUR", "GBP"] as const;

export function SiteHeader() {
  const { cart, cartStones, currency, setCurrency, removeFromCart } = useVault();
  const [drawer, setDrawer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const total = cartStones.reduce((sum, s) => sum + s.price, 0);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobile(false);
  }, [currentPath]);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.120 0.012 300 / 0.95)"
            : "oklch(0.120 0.012 300 / 0.70)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
          boxShadow: scrolled ? "0 4px 40px oklch(0 0 0 / 0.50)" : "none",
        }}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center gap-6 px-5 sm:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 focus-visible:outline-none">
            <motion.div
              animate={{ scale: scrolled ? 0.92 : 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              {/* Diamond glyph */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="shrink-0 transition-opacity duration-300 group-hover:opacity-80"
              >
                <polygon
                  points="9,1 17,7 9,17 1,7"
                  fill="none"
                  stroke="url(#gold-grad)"
                  strokeWidth="1.2"
                />
                <polygon
                  points="9,4 14,7 9,13 4,7"
                  fill="url(#gold-fill)"
                  opacity="0.35"
                />
                <defs>
                  <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.08 78)" />
                    <stop offset="50%" stopColor="oklch(0.80 0.09 82)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                  </linearGradient>
                  <linearGradient id="gold-fill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.80 0.09 82)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="font-display tracking-tight text-pearl"
                style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}
              >
                Cabochon
              </span>
            </motion.div>
            <span
              className="rule-label hidden sm:inline"
              style={{ color: "var(--brass-dim)", letterSpacing: "0.16em" }}
            >
              Gem Trading
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {nav.map((n) => {
              const isActive = n.to === "/" ? currentPath === "/" : currentPath === n.to || currentPath.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="group relative py-1 text-sm font-light transition-colors duration-200"
                  style={{ color: isActive ? "var(--brass)" : "var(--muted-foreground)" }}
                >
                  {n.label}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out"
                    style={{
                      background: "var(--gradient-gold)",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
                    style={{ background: "oklch(0.70 0.082 78 / 0.50)" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {/* Currency toggle */}
            <div className="hidden items-center rounded-md sm:flex" style={{
              background: "oklch(0.18 0.018 305 / 0.60)",
              border: "1px solid oklch(1 0 0 / 0.07)",
            }}>
              {currencies.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className="px-2.5 py-1 font-mono text-[10px] tracking-wider transition-colors duration-200"
                  style={{
                    color: currency === c ? "var(--brass)" : "var(--muted-foreground)",
                    background: currency === c ? "oklch(0.70 0.082 78 / 0.12)" : "transparent",
                    borderRadius: i === 0 ? "calc(var(--radius-md) - 1px) 0 0 calc(var(--radius-md) - 1px)" : i === currencies.length - 1 ? "0 calc(var(--radius-md) - 1px) calc(var(--radius-md) - 1px) 0" : "0",
                    borderRight: i < currencies.length - 1 ? "1px solid oklch(1 0 0 / 0.07)" : "none",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={() => setDrawer(true)}
              className="facet-sheen relative flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-300"
              style={{
                color: "var(--brass)",
                background: cart.length > 0 ? "oklch(0.70 0.082 78 / 0.10)" : "oklch(0.18 0.018 305 / 0.60)",
                border: `1px solid ${cart.length > 0 ? "oklch(0.70 0.082 78 / 0.40)" : "oklch(1 0 0 / 0.07)"}`,
                boxShadow: cart.length > 0 ? "0 0 16px 2px var(--glow-gold)" : "none",
                animation: cart.length > 0 ? "glow-pulse 2.5s ease-in-out infinite" : "none",
              }}
              aria-label={`Open cart, ${cart.length} items`}
            >
              <ShoppingBag className="size-4" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={cart.length}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="font-mono text-xs"
                >
                  {cart.length}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-pearl md:hidden"
              style={{ border: "1px solid oklch(1 0 0 / 0.07)" }}
              aria-label="Menu"
              onClick={() => setMobile((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobile ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="size-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen nav */}
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-40"
              style={{ background: "oklch(0.08 0.01 300 / 0.85)", backdropFilter: "blur(8px)" }}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-4/5 max-w-xs flex-col"
              style={{
                background: "linear-gradient(160deg, oklch(0.16 0.018 305) 0%, oklch(0.12 0.014 300) 100%)",
                borderLeft: "1px solid oklch(1 0 0 / 0.08)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}>
                <span className="font-display text-pearl" style={{ fontSize: "1rem" }}>Menu</span>
                <button onClick={() => setMobile(false)} className="text-muted-foreground hover:text-pearl">
                  <X className="size-5" />
                </button>
              </div>

              {/* Nav links — staggered */}
              <div className="flex flex-col px-6 py-8 gap-1">
                {nav.map((n, i) => (
                  <motion.div
                    key={n.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={n.to}
                      onClick={() => setMobile(false)}
                      className="block py-3 font-display text-2xl text-pearl transition-colors hover:text-brass"
                      style={{ letterSpacing: "-0.01em" }}
                      activeProps={{ style: { color: "var(--brass)" } }}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Currency bottom */}
              <div className="mt-auto px-6 pb-10">
                <p className="engraved-label mb-3">Currency</p>
                <div className="flex gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className="rounded-md px-3 py-1.5 font-mono text-xs transition-all"
                      style={{
                        color: currency === c ? "var(--brass)" : "var(--muted-foreground)",
                        background: currency === c ? "oklch(0.70 0.082 78 / 0.15)" : "oklch(0.20 0.018 305 / 0.60)",
                        border: `1px solid ${currency === c ? "oklch(0.70 0.082 78 / 0.40)" : "oklch(1 0 0 / 0.07)"}`,
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-40"
              style={{ background: "oklch(0.08 0.01 300 / 0.75)", backdropFilter: "blur(8px)" }}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col"
              style={{
                background: "linear-gradient(160deg, oklch(0.16 0.018 305) 0%, oklch(0.12 0.014 300) 100%)",
                borderLeft: "1px solid oklch(1 0 0 / 0.08)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
              >
                <div>
                  <h2 className="font-display text-lg text-pearl" style={{ letterSpacing: "-0.01em" }}>
                    Your parcel
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {cart.length} {cart.length === 1 ? "stone" : "stones"} reserved
                  </p>
                </div>
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="Close cart"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-pearl"
                  style={{ border: "1px solid oklch(1 0 0 / 0.06)" }}
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Stone list */}
              <div className="flex-1 overflow-auto px-5 py-5">
                {cartStones.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Gem className="size-10 text-muted-foreground mb-4 opacity-30" />
                    <p className="font-display text-lg text-pearl opacity-60">The parcel is empty</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Browse the vault and add a stone to hold it for 48 hours.
                    </p>
                    <button
                      onClick={() => setDrawer(false)}
                      className="mt-6 btn-outline-gold text-sm"
                    >
                      Browse the vault
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartStones.map((s, i) => (
                      <motion.li
                        key={s.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex gap-3 rounded-lg p-3"
                        style={{
                          background: "oklch(0.18 0.018 305 / 0.50)",
                          border: "1px solid oklch(1 0 0 / 0.06)",
                        }}
                      >
                        <img
                          src={s.images[0]}
                          alt={s.alt}
                          loading="lazy"
                          className="size-16 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-pearl truncate">{s.name}</p>
                          <p className="font-mono text-xs text-muted-foreground mt-0.5">
                            {s.carat.toFixed(2)} ct · {s.certificate}
                          </p>
                          <p className="font-mono text-sm text-brass mt-1">
                            {formatPrice(s.price, currency)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(s.id)}
                          className="rule-label self-start text-muted-foreground transition-colors hover:text-pearl text-[9px]"
                        >
                          Remove
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Drawer footer */}
              {cartStones.length > 0 && (
                <div
                  className="px-5 py-5"
                  style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
                >
                  <div className="mb-4 flex items-baseline justify-between">
                    <span className="rule-label">Subtotal</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-xl text-pearl"
                    >
                      {formatPrice(total, currency)}
                    </motion.span>
                  </div>
                  <Link
                    to="/cart"
                    onClick={() => setDrawer(false)}
                    className="facet-sheen btn-gold block w-full text-center"
                  >
                    Review and checkout
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Insured shipping · 14-day return · Lab report included
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
