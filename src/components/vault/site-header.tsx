import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ShoppingBag, X, Menu, Gem } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobile(false);
  }, [currentPath]);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.110 0.010 300 / 0.96)"
            : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(1.3)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(1.3)" : "none",
          borderBottom: scrolled
            ? "1px solid oklch(0.68 0.076 76 / 0.12)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 32px oklch(0 0 0 / 0.40)"
            : "none",
        }}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-8 px-5 sm:px-8">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 focus-visible:outline-none shrink-0">
            <motion.div
              animate={{ scale: scrolled ? 0.94 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              {/* Logo Image */}
              <img
                src="/logo.png"
                alt="Rhea Cylone Logo"
                className="h-10 w-auto shrink-0 object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-auto hidden items-center gap-10 md:flex">
            {nav.map((n) => {
              const isActive =
                n.to === "/"
                  ? currentPath === "/"
                  : currentPath === n.to || currentPath.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className="group relative py-1.5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--pearl)" : "var(--muted-foreground)",
                    transition: "color 200ms ease",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {n.label}
                  {/* Active indicator — thin gold line */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-400 ease-out"
                    style={{
                      background: "var(--gradient-gold)",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                  {/* Hover indicator */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 ease-out group-hover:w-full"
                    style={{
                      background: "oklch(0.68 0.076 76 / 0.35)",
                      display: isActive ? "none" : "block",
                    }}
                  />
                </Link>
              );
            })}

            {/* Dashboard admin link */}
            <a
              href="/dashboard"
              className="flex items-center gap-1.5 px-2.5 py-1 transition-all duration-200 hover:opacity-90"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.10 0.010 300)",
                background: currentPath === "/dashboard"
                  ? "var(--brass)"
                  : "oklch(0.68 0.076 76 / 0.15)",
                border: "1px solid oklch(0.68 0.076 76 / 0.30)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" opacity="0.8">
                <rect x="0" y="0" width="4" height="4" rx="1" />
                <rect x="6" y="0" width="4" height="4" rx="1" />
                <rect x="0" y="6" width="4" height="4" rx="1" />
                <rect x="6" y="6" width="4" height="4" rx="1" />
              </svg>
              <span style={{ color: currentPath === "/dashboard" ? "oklch(0.10 0.010 300)" : "var(--brass)" }}>
                Dashboard
              </span>
            </a>
          </nav>

          {/* Actions row */}
          <div className="flex items-center gap-2 md:ml-0 ml-auto">
            {/* Currency toggle — refined pill */}
            <div
              className="hidden items-center sm:flex"
              style={{
                background: "oklch(0.16 0.015 305 / 0.50)",
                border: "1px solid oklch(1 0 0 / 0.06)",
                borderRadius: "0",
              }}
            >
              {currencies.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className="px-2.5 py-1.5 font-mono text-[9px] tracking-widest transition-all duration-200"
                  style={{
                    color: currency === c ? "var(--brass)" : "var(--muted-foreground)",
                    background: currency === c ? "oklch(0.68 0.076 76 / 0.10)" : "transparent",
                    letterSpacing: "0.14em",
                    borderRight:
                      i < currencies.length - 1
                        ? "1px solid oklch(1 0 0 / 0.06)"
                        : "none",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Cart — refined, no glow-pulse */}
            <button
              onClick={() => setDrawer(true)}
              className="relative flex items-center gap-2 px-3 py-2 transition-all duration-250"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.10em",
                color: cart.length > 0 ? "var(--brass)" : "var(--muted-foreground)",
                background: "oklch(0.16 0.015 305 / 0.50)",
                border: `1px solid ${
                  cart.length > 0
                    ? "oklch(0.68 0.076 76 / 0.30)"
                    : "oklch(1 0 0 / 0.06)"
                }`,
                borderRadius: "0",
              }}
              aria-label={`Open cart, ${cart.length} items`}
            >
              <ShoppingBag className="size-3.5" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={cart.length}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  className="font-mono text-[10px]"
                >
                  {cart.length}
                </motion.span>
              </AnimatePresence>
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex size-[14px] items-center justify-center rounded-full text-[8px] font-mono"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "oklch(0.10 0.010 300)",
                    fontWeight: 600,
                  }}
                >
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-pearl md:hidden"
              style={{
                background: "oklch(0.16 0.015 305 / 0.50)",
                border: "1px solid oklch(1 0 0 / 0.06)",
                borderRadius: "0",
              }}
              aria-label="Menu"
              onClick={() => setMobile((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobile ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="size-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
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
              transition={{ duration: 0.25 }}
              onClick={() => setMobile(false)}
              className="fixed inset-0 z-40"
              style={{
                background: "oklch(0.06 0.008 300 / 0.90)",
                backdropFilter: "blur(12px)",
              }}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-4/5 max-w-xs flex-col"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.150 0.016 305) 0%, oklch(0.110 0.012 300) 100%)",
                borderLeft: "1px solid oklch(1 0 0 / 0.07)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-7 py-6"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.24em]"
                  style={{ color: "var(--brass-dim)" }}
                >
                  Navigation
                </span>
                <button
                  onClick={() => setMobile(false)}
                  className="p-1 text-muted-foreground transition-colors hover:text-pearl"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-7 py-10 gap-0">
                {nav.map((n, i) => {
                  const isActive =
                    n.to === "/"
                      ? currentPath === "/"
                      : currentPath === n.to || currentPath.startsWith(n.to + "/");
                  return (
                    <motion.div
                      key={n.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.07 + 0.08,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        to={n.to}
                        onClick={() => setMobile(false)}
                        className="group block py-5 relative"
                        style={{
                          borderBottom: "1px solid oklch(1 0 0 / 0.05)",
                          color: isActive ? "var(--pearl)" : "oklch(0.640 0.014 85 / 0.70)",
                        }}
                      >
                        <span
                          className="font-display block transition-colors duration-200 group-hover:text-pearl"
                          style={{
                            fontSize: "clamp(1.5rem, 5vw, 2rem)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                          }}
                        >
                          {n.label}
                        </span>
                        {isActive && (
                          <span
                            className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-5"
                            style={{
                              background: "var(--gradient-gold)",
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Currency */}
              <div className="mt-auto px-7 pb-12">
                <p className="engraved-label mb-4">Currency</p>
                <div className="flex gap-0">
                  {currencies.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className="flex-1 py-2 font-mono text-[10px] tracking-wider transition-all"
                      style={{
                        color: currency === c ? "var(--brass)" : "var(--muted-foreground)",
                        background:
                          currency === c
                            ? "oklch(0.68 0.076 76 / 0.12)"
                            : "oklch(0.18 0.016 305 / 0.50)",
                        border: `1px solid ${
                          currency === c ? "oklch(0.68 0.076 76 / 0.35)" : "oklch(1 0 0 / 0.07)"
                        }`,
                        borderRight:
                          i < currencies.length - 1 ? "none" : undefined,
                        letterSpacing: "0.14em",
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
              style={{
                background: "oklch(0.06 0.008 300 / 0.80)",
                backdropFilter: "blur(10px)",
              }}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.150 0.016 305) 0%, oklch(0.110 0.012 300) 100%)",
                borderLeft: "1px solid oklch(1 0 0 / 0.07)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
              >
                <div>
                  <h2
                    className="font-display text-pearl"
                    style={{ fontSize: "1.25rem", letterSpacing: "-0.015em" }}
                  >
                    Your parcel
                  </h2>
                  <p className="mt-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase" style={{ letterSpacing: "0.16em" }}>
                    {cart.length} {cart.length === 1 ? "stone" : "stones"} reserved
                  </p>
                </div>
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="Close cart"
                  className="p-2 text-muted-foreground transition-colors hover:text-pearl"
                  style={{ border: "1px solid oklch(1 0 0 / 0.07)" }}
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Stone list */}
              <div className="flex-1 overflow-auto px-6 py-6">
                {cartStones.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="url(#cart-empty-gold)"
                        strokeWidth="0.8"
                        className="mx-auto mb-6 opacity-20"
                      >
                        <polygon points="12 2 22 9 12 22 2 9" />
                        <defs>
                          <linearGradient id="cart-empty-gold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="oklch(0.55 0.060 76)" />
                            <stop offset="100%" stopColor="oklch(0.78 0.085 80)" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p
                        className="font-display text-pearl"
                        style={{ fontSize: "1.25rem", letterSpacing: "-0.015em", opacity: 0.7 }}
                      >
                        The parcel is empty
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed" style={{ maxWidth: "22ch", margin: "0.75rem auto 0" }}>
                        Browse the vault and add a stone to hold it for 48 hours.
                      </p>
                      <button
                        onClick={() => setDrawer(false)}
                        className="mt-8 btn-outline-gold"
                      >
                        Browse the vault
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {cartStones.map((s, i) => (
                      <motion.li
                        key={s.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-4 p-4"
                        style={{
                          background: "oklch(0.16 0.015 305 / 0.45)",
                          border: "1px solid oklch(1 0 0 / 0.06)",
                        }}
                      >
                        <img
                          src={s.images[0]}
                          alt={s.alt}
                          loading="lazy"
                          className="size-16 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-pearl font-light truncate">{s.name}</p>
                          <p className="font-mono text-[10px] text-muted-foreground mt-1 tracking-wider uppercase" style={{ letterSpacing: "0.10em" }}>
                            {s.carat.toFixed(2)} ct · {s.certificate}
                          </p>
                          <p className="font-display text-sm mt-1.5" style={{ color: "var(--brass)" }}>
                            {formatPrice(s.price, currency)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(s.id)}
                          className="self-start font-mono text-[9px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-pearl"
                          style={{ letterSpacing: "0.14em" }}
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
                  className="px-6 py-6"
                  style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
                >
                  {/* Gold rule */}
                  <div className="hairline-gold mb-5" />
                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="rule-label">Subtotal</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-pearl"
                      style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}
                    >
                      {formatPrice(total, currency)}
                    </motion.span>
                  </div>
                  <Link
                    to="/cart"
                    onClick={() => setDrawer(false)}
                    className="facet-sheen btn-gold block w-full text-center"
                  >
                    Review & checkout
                  </Link>
                  <p className="mt-4 text-center rule-label" style={{ lineHeight: 1.7 }}>
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
