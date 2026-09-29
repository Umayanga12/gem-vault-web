import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useVault } from "@/lib/vault-store";
import { Reveal } from "@/components/vault/reveal";
import { gemCategories, GemCategoryCard } from "./GemTypeCard";

export function GemTypeSection() {
  const { stones } = useVault();
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Drag-to-scroll state */
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDist = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    dragDist.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const delta = startX.current - e.clientX;
    dragDist.current = Math.abs(delta);
    scrollRef.current.scrollLeft = scrollLeft.current + delta;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragDist.current > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  /* Wheel → horizontal scroll (native listener so we can preventDefault) */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  /* Arrow scroll helpers */
  const scrollBy = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 260 : -260, behavior: "smooth" });
  };

  return (
    <section id="vault" className="py-20 overflow-hidden">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="engraved-label flex items-center gap-3">
              <span
                className="block h-px w-8 flex-none"
                style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
              />
              Shop by gem type
            </p>
            <h2
              className="mt-4 font-display text-pearl"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Twelve families,<br />one standard.
            </h2>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--muted-foreground)", maxWidth: "46ch", lineHeight: 1.75 }}
            >
              From sapphire to rare collector pieces —<br /> every stone is 100 % natural
              and graded to the same exacting standard regardless of family or price.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Scroll arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => scrollBy("left")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll left"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none"
                style={{
                  background: "oklch(0.13 0.015 300 / 0.70)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  color: "var(--muted-foreground)",
                }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={() => scrollBy("right")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll right"
                className="flex items-center justify-center w-9 h-9 rounded-full transition-colors focus-visible:outline-none"
                style={{
                  background: "oklch(0.13 0.015 300 / 0.70)",
                  border: "1px solid oklch(1 0 0 / 0.10)",
                  color: "var(--muted-foreground)",
                }}
              >
                →
              </motion.button>
            </div>

            <Link
              to="/browse"
              search={{ type: undefined }}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brass focus-visible:text-brass focus-visible:outline-none"
            >
              View all {stones.length} stones
              <span
                className="block h-px transition-all duration-300 group-hover:w-8 group-focus-visible:w-8"
                style={{ width: "20px", background: "var(--brass-dim)" }}
              />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ── Horizontal scroll strip ── */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, var(--background, oklch(0.08 0.01 300)), transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, var(--background, oklch(0.08 0.01 300)), transparent)",
          }}
        />

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          id="vault-gem-scroll"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          className="flex gap-5 overflow-x-auto select-none"
          style={{
            paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingBottom: "1.25rem",
            scrollbarWidth: "none",          /* Firefox */
            msOverflowStyle: "none",         /* IE/Edge */
            cursor: "grab",
          }}
        >
          {gemCategories.map((cat, i) => (
            <GemCategoryCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </div>

      {/* Hide webkit scrollbar via inline style tag */}
      <style>{`
        #vault-gem-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
