import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FileQuestion, X, Menu, Mail, Trash2 } from "lucide-react";
import { useVault } from "@/lib/vault-store";
import { SendQuotationModal, type QuotationStoneEntry } from "@/components/vault/SendQuotationModel";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/trust", label: "Trust" },
  { to: "/browse", label: "Browse" },
  { to: "/contactus", label: "Contact Us" },
];

/**
 * Safely format a numeric value with `toFixed`.
 * Handles undefined / null / NaN / non-numeric strings.
 */
function formatNumber(value: unknown, digits = 2): string {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN;
  return Number.isFinite(n) ? n.toFixed(digits) : "—";
}

/**
 * Read a carat value from a stone object regardless of which
 * field name your data uses. Adjust / extend as needed.
 */
function getCarat(stone: any): number | undefined {
  const candidates = [
    stone?.carat,
    stone?.carats,
    stone?.ct,
    stone?.weight,
    stone?.caratWeight,
  ];
  for (const c of candidates) {
    const n = typeof c === "string" ? Number(c) : c;
    if (typeof n === "number" && Number.isFinite(n)) return n;
  }
  return undefined;
}

export function SiteHeader() {
  const {
    quotation,
    quotationIds,
    quotationStones,
    removeFromQuotation,
    clearQuotation,
  } = useVault();
  const [drawer, setDrawer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [pulseBasket, setPulseBasket] = useState(false);
  const [quotationModalOpen, setQuotationModalOpen] = useState(false);
  const prevCountRef = useRef(quotationIds.length);
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

  // Pulse (and bubble on first item) only when an item is ADDED.
  // Removing items or loading a saved basket does not trigger it.
  useEffect(() => {
    const prev = prevCountRef.current;
    const curr = quotationIds.length;
    prevCountRef.current = curr;

    if (curr <= prev) return;

    setPulseBasket(true);
    const pulseTimer = setTimeout(() => setPulseBasket(false), 700);

    let bubbleTimer: ReturnType<typeof setTimeout> | undefined;
    if (prev === 0 && curr === 1) {
      setShowBubble(true);
      bubbleTimer = setTimeout(() => setShowBubble(false), 4500);
    }

    return () => {
      clearTimeout(pulseTimer);
      if (bubbleTimer) clearTimeout(bubbleTimer);
    };
  }, [quotationIds.length]);

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
          boxShadow: scrolled ? "0 1px 32px oklch(0 0 0 / 0.40)" : "none",
        }}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-8 px-5 sm:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 focus-visible:outline-none shrink-0"
          >
            <motion.div
              animate={{ scale: scrolled ? 0.94 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <img
                src="/1212-removebg-preview.png"
                alt="Rhea Ceylon Logo"
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
                  : currentPath === n.to ||
                  currentPath.startsWith(n.to + "/");
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
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-400 ease-out"
                    style={{
                      background: "var(--gradient-gold)",
                      width: isActive ? "100%" : "0%",
                    }}
                  />
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
          </nav>

          {/* Actions row */}
          <div className="flex items-center gap-2 md:ml-0 ml-auto">
            {/* Quotation Basket button */}
            <div className="relative">
              {/* First-item message bubble */}
              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.94 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 mt-3 w-56 z-50 pointer-events-none"
                  >
                    <div
                      className="relative px-4 py-3 text-[11px] leading-relaxed"
                      style={{
                        background: "linear-gradient(135deg, oklch(0.20 0.020 305 / 0.98) 0%, oklch(0.16 0.016 305 / 0.98) 100%)",
                        border: "1px solid oklch(0.68 0.076 76 / 0.45)",
                        boxShadow: "0 8px 32px oklch(0 0 0 / 0.55), 0 0 0 1px oklch(0.68 0.076 76 / 0.10)",
                        color: "oklch(0.85 0.020 85)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {/* Gold accent bar */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: "var(--gradient-gold)" }}
                      />
                      <span style={{ color: "var(--brass)", fontWeight: 600 }}>✦ Stone added!</span>
                      <br />
                      Your quotation basket is ready. Open it to send your request.
                      {/* Tail pointing UP toward the button */}
                      <span
                        className="absolute -top-[7px] right-5"
                        style={{
                          display: "block",
                          width: 0,
                          height: 0,
                          borderLeft: "7px solid transparent",
                          borderRight: "7px solid transparent",
                          borderBottom: "7px solid oklch(0.68 0.076 76 / 0.45)",
                        }}
                      />
                      <span
                        className="absolute -top-[5px] right-[21px]"
                        style={{
                          display: "block",
                          width: 0,
                          height: 0,
                          borderLeft: "6px solid transparent",
                          borderRight: "6px solid transparent",
                          borderBottom: "6px solid oklch(0.20 0.020 305 / 0.98)",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse ring when item is added */}
              <AnimatePresence>
                {pulseBasket && (
                  <motion.span
                    key="pulse"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      border: "2px solid oklch(0.68 0.076 76 / 0.70)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </AnimatePresence>

              <button
                onClick={() => setDrawer(true)}
                className="relative flex items-center gap-2 px-3 py-2 transition-all duration-250"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.10em",
                  color:
                    quotationIds.length > 0
                      ? "var(--brass)"
                      : "var(--muted-foreground)",
                  background: pulseBasket
                    ? "oklch(0.20 0.022 76 / 0.55)"
                    : "oklch(0.16 0.015 305 / 0.50)",
                  border: `1px solid ${quotationIds.length > 0
                    ? "oklch(0.68 0.076 76 / 0.40)"
                    : "oklch(1 0 0 / 0.06)"
                    }`,
                  borderRadius: "0",
                  transition: "background 0.3s ease, border-color 0.3s ease",
                }}
                aria-label={`Open quotation basket, ${quotationIds.length} items`}
              >
                <FileQuestion className="size-3.5" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={quotationIds.length}
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 3 }}
                    className="font-mono text-[10px]"
                  >
                    {quotationIds.length > 0 ? `${quotationIds.length}` : "Quote"}
                  </motion.span>
                </AnimatePresence>
                {quotationIds.length > 0 && (
                  <motion.span
                    key={`badge-${quotationIds.length}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 flex size-[15px] items-center justify-center rounded-full text-[8px] font-mono"
                    style={{
                      background: "var(--gradient-gold)",
                      color: "oklch(0.10 0.010 300)",
                      fontWeight: 700,
                    }}
                  >
                    {quotationIds.length}
                  </motion.span>
                )}
              </button>
            </div>

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

              <div className="flex flex-col px-7 py-10 gap-0">
                {nav.map((n, i) => {
                  const isActive =
                    n.to === "/"
                      ? currentPath === "/"
                      : currentPath === n.to ||
                      currentPath.startsWith(n.to + "/");
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
                          color: isActive
                            ? "var(--pearl)"
                            : "oklch(0.640 0.014 85 / 0.70)",
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
                            style={{ background: "var(--gradient-gold)" }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
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
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}
              >
                <div>
                  <h2
                    className="font-display text-pearl"
                    style={{ fontSize: "1.25rem", letterSpacing: "-0.015em" }}
                  >
                    Quotation Basket
                  </h2>
                  <p
                    className="mt-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    {quotationIds.length}{" "}
                    {quotationIds.length === 1 ? "stone" : "stones"} selected
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
                {quotationStones.length === 0 ? (
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
                        stroke="url(#basket-empty-gold)"
                        strokeWidth="0.8"
                        className="mx-auto mb-6 opacity-20"
                      >
                        <polygon points="12 2 22 9 12 22 2 9" />
                        <defs>
                          <linearGradient
                            id="basket-empty-gold"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="oklch(0.55 0.060 76)"
                            />
                            <stop
                              offset="100%"
                              stopColor="oklch(0.78 0.085 80)"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                      <p
                        className="font-display text-pearl"
                        style={{
                          fontSize: "1.25rem",
                          letterSpacing: "-0.015em",
                          opacity: 0.7,
                        }}
                      >
                        Quotation basket is empty
                      </p>
                      <p
                        className="mt-3 text-xs text-muted-foreground leading-relaxed"
                        style={{ maxWidth: "24ch", margin: "0.75rem auto 0" }}
                      >
                        Browse our gemstones and add stones to request a
                        quotation together.
                      </p>
                      <Link
                        to="/browse"
                        onClick={() => setDrawer(false)}
                        className="mt-8 btn-outline-gold inline-block text-center"
                        search={undefined}
                      >
                        Browse gemstones
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-2.5">
                    {quotationStones.map((s, i) => {
                      const qItem = quotation.find((q) => q.stoneId === s.id);
                      const fd = qItem?.formData;

                      /* Build detail chips for this stone */
                      const chips: { label: string; value: string }[] = [];
                      if (fd?.weight) chips.push({ label: "Wt", value: fd.weight });
                      if (fd?.color) chips.push({ label: "Colour", value: fd.color });
                      if (fd?.clarity) chips.push({ label: "Clarity", value: fd.clarity.replace("-", " ") });
                      if (fd?.heatStatus) chips.push({ label: "Heat", value: fd.heatStatus });
                      if (fd?.treated) chips.push({ label: "Treat.", value: fd.treated });
                      if (fd?.quantity) chips.push({ label: "Qty", value: fd.quantity === "single" ? "Single" : "Lot" });
                      if (fd?.calibratedSize) chips.push({ label: "Size", value: fd.calibratedSize });

                      return (
                        <motion.li
                          key={s.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{
                            background: "oklch(0.16 0.015 305 / 0.45)",
                            border: "1px solid oklch(1 0 0 / 0.06)",
                          }}
                        >
                          {/* Stone row */}
                          <div className="flex gap-3 p-3">
                            {/* Thumbnail with index badge */}
                            <div className="relative shrink-0">
                              <img
                                src={s.images?.[0] ?? "/placeholder.png"}
                                alt={s.alt ?? s.name ?? "Gemstone"}
                                loading="lazy"
                                className="size-14 object-cover"
                              />
                              {/* Number badge */}
                              <span
                                className="absolute -top-1.5 -left-1.5 flex size-[18px] items-center justify-center rounded-full text-[8px] font-mono font-bold"
                                style={{
                                  background: "var(--gradient-gold)",
                                  color: "oklch(0.10 0.010 300)",
                                }}
                              >
                                {i + 1}
                              </span>
                            </div>

                            {/* Name + chips */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <p className="text-sm text-pearl font-light leading-tight truncate">{s.name}</p>

                              {/* Chips grid */}
                              {chips.length > 0 && (
                                <div
                                  className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1"
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {chips.map(({ label, value }) => (
                                    <span key={label} className="flex items-center gap-1">
                                      <span style={{ color: "oklch(0.58 0.050 78)" }}>{label}:</span>
                                      <span style={{ color: "oklch(0.72 0.020 85)" }}>{value}</span>
                                    </span>
                                  ))}
                                </div>
                              )}

                              {fd?.notes && (
                                <p
                                  className="mt-1 truncate max-w-[180px]"
                                  title={fd.notes}
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    letterSpacing: "0.04em",
                                    color: "var(--muted-foreground)",
                                  }}
                                >
                                  Note: {fd.notes}
                                </p>
                              )}

                              <p
                                className="font-mono text-[9px] mt-1.5 uppercase"
                                style={{ color: "var(--brass)", letterSpacing: "0.10em" }}
                              >
                                Quotation pending
                              </p>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromQuotation(s.id)}
                              aria-label={`Remove ${s.name} from basket`}
                              className="self-start shrink-0 mt-0.5 p-1 text-muted-foreground transition-colors hover:text-pearl"
                              style={{
                                background: "oklch(1 0 0 / 0.04)",
                                border: "1px solid oklch(1 0 0 / 0.07)",
                              }}
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Drawer footer */}
              {quotationStones.length > 0 && (
                <div
                  className="px-6 py-6"
                  style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
                >
                  <div className="hairline-gold mb-5" />
                  <p
                    className="text-xs text-muted-foreground mb-4"
                    style={{ lineHeight: 1.7 }}
                  >
                    Select your gemstones, then send us a quotation request. We
                    will review your requirements and get back to you with a
                    personalised quotation.
                  </p>

                  {/* Send Quotation label */}
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.18em] mb-3"
                    style={{ color: "var(--brass-dim)" }}
                  >
                    Send Quotation Via
                  </p>

                  {/* Email button */}
                  <button
                    className="facet-sheen btn-gold flex items-center justify-center gap-2 w-full mb-3"
                    onClick={() => {
                      setDrawer(false);
                      // Small delay so the drawer closes before the modal opens
                      setTimeout(() => setQuotationModalOpen(true), 320);
                    }}
                  >
                    <Mail className="size-4" />
                    Via Email
                  </button>

                  {/* WhatsApp button */}
                  <button
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 transition-all duration-250"
                    style={{
                      background: "oklch(0.38 0.14 145 / 0.18)",
                      border: "1px solid oklch(0.55 0.14 145 / 0.40)",
                      color: "oklch(0.78 0.13 145)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.38 0.14 145 / 0.30)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.65 0.14 145 / 0.60)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.38 0.14 145 / 0.18)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.55 0.14 145 / 0.40)";
                    }}
                    onClick={() => {
                      const stoneLines = quotationStones
                        .map((s, idx) => {
                          const fd = quotation.find((q) => q.stoneId === s.id)?.formData;
                          const lines: string[] = [`${idx + 1}. ${s.name}`];
                          if (fd?.weight) lines.push(`   Weight:     ${fd.weight} ct`);
                          if (fd?.color) lines.push(`   Colour:     ${fd.color}`);
                          if (fd?.clarity) lines.push(`   Clarity:    ${fd.clarity.replace("-", " ")}`);
                          if (fd?.heatStatus) lines.push(`   Heat:       ${fd.heatStatus}`);
                          if (fd?.treated) lines.push(`   Treatment:  ${fd.treated}`);
                          if (fd?.quantity) lines.push(`   Looking for: ${fd.quantity === "single" ? "Single stone" : "Lot"}`);
                          if (fd?.calibratedSize) lines.push(`   Size:       ${fd.calibratedSize}`);
                          if (fd?.notes) lines.push(`   Notes:      ${fd.notes}`);
                          return lines.join("\n");
                        })
                        .join("\n\n");
                      const msg = encodeURIComponent(
                        `Hello! I'd like to request a quotation for the following gemstone(s) from Rhea Ceylon:\n\n${stoneLines}\n\nCould you please share pricing and availability? Thank you!`
                      );
                      window.open(`https://wa.me/+94771770579?text=${msg}`, "_blank");
                      setDrawer(false);

                      setTimeout(() => {
                        localStorage.removeItem("vault_quotation_v1");
                        window.location.reload();
                      }, 10000);
                    }}
                  >
                    {/* WhatsApp icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Via WhatsApp
                  </button>

                  <p
                    className="mt-3 text-center rule-label"
                    style={{ lineHeight: 1.7 }}
                  >
                    Discuss &amp; negotiate before completing your purchase
                  </p>

                  {/* Saved-on-device note + clear basket */}
                  <div
                    className="mt-5 flex items-center justify-between gap-4 pt-4"
                    style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
                  >
                    <p
                      className="font-mono text-[9px] uppercase text-muted-foreground"
                      style={{ letterSpacing: "0.10em", lineHeight: 1.6 }}
                    >
                      Basket saved on this device for 30 days
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm("Remove all stones from your quotation basket?")) {
                          clearQuotation();
                        }
                      }}
                      className="shrink-0 font-mono text-[9px] uppercase text-muted-foreground transition-colors hover:text-pearl"
                      style={{ letterSpacing: "0.14em" }}
                    >
                      Clear basket
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Quotation email modal — rendered outside the drawer to avoid z-index issues */}
      <SendQuotationModal
        open={quotationModalOpen}
        onClose={() => setQuotationModalOpen(false)}
        stones={quotationStones.map((s): QuotationStoneEntry => {
          const fd = quotation.find((q) => q.stoneId === s.id)?.formData;
          const details: Record<string, string> = {};
          if (fd?.weight) details["Weight"] = fd.weight;
          if (fd?.color) details["Colour"] = fd.color;
          if (fd?.clarity) details["Clarity"] = fd.clarity.replace("-", " ");
          if (fd?.heatStatus) details["Heat"] = fd.heatStatus;
          if (fd?.treated) details["Treatment"] = fd.treated;
          if (fd?.quantity) details["Qty"] = fd.quantity === "single" ? "Single stone" : "Lot";
          if (fd?.calibratedSize) details["Size"] = fd.calibratedSize;
          if (fd?.notes) details["Notes"] = fd.notes;
          return { name: s.name ?? "Unknown Stone", details };
        })}
      />
    </>
  );
}