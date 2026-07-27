import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";

import { gemTypes, stones, typeAccent } from "@/data/stones";
import { StoneCard } from "@/components/vault/stone-card";
import { TrustStrip } from "@/components/vault/trust-strip";
import { Reveal } from "@/components/vault/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cabochon — Certified Loose Gemstones for Collectors" },
      {
        name: "description",
        content:
          "A specialist vault of certified loose diamonds, sapphires, rubies and emeralds — graded by GIA, IGI, AGS and GRS, sold with full origin and treatment disclosure.",
      },
      { property: "og:title", content: "Cabochon — Certified Loose Gemstones" },
      {
        property: "og:description",
        content:
          "Certified natural and lab-grown stones with carat, cut, clarity, origin and treatment stated plainly.",
      },
    ],
  }),
  component: Home,
});

const HERO_VIDEO_SRC = "/media/lot-214-reveal.mp4";
const HERO_VIDEO_POSTER = "/media/lot-214-poster.jpg";

/* Gem type icon paths (SVG outlines) */
const gemIcons: Record<string, string> = {
  Diamond:   "M12 2 22 9 12 22 2 9Z",
  Sapphire:  "M12 3 19 8.5 19 15.5 12 21 5 15.5 5 8.5Z",
  Ruby:      "M12 3 20 10 12 21 4 10Z",
  Emerald:   "M8 3 16 3 20 9 12 21 4 9Z",
  Amethyst:  "M12 2 20 8 17 20 7 20 4 8Z",
};

/* Gem type glow colors */
const gemGlow: Record<string, string> = {
  Diamond:  "0 0 24px 4px oklch(0.85 0.02 240 / 0.30)",
  Sapphire: "0 0 24px 4px var(--glow-sapphire)",
  Ruby:     "0 0 24px 4px var(--glow-ruby)",
  Emerald:  "0 0 24px 4px var(--glow-emerald)",
  Amethyst: "0 0 24px 4px var(--glow-amethyst)",
};

function Home() {
  const featured = stones.slice(0, 6);

  return (
    <>
      <ScrollScrubHero />
      <TrustStrip />

      {/* Gem type grid */}
      <section id="vault" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="engraved-label flex items-center gap-3">
              <span
                className="block h-px w-8 flex-none"
                style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
              />
              Shop by gem
            </p>
            <h2
              className="mt-3 font-display text-pearl"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Five families, one standard
            </h2>
          </div>
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brass"
          >
            See all {stones.length} stones
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {gemTypes.map((t, i) => (
            <Reveal key={t} delay={i * 0.07}>
              <GemTypeCard type={t} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured stones */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <p className="engraved-label flex items-center gap-3">
            <span
              className="block h-px w-8 flex-none"
              style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
            />
            The display case
          </p>
          <h2
            className="mt-3 font-display text-pearl"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Featured stones
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <StoneCard key={s.id} stone={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function GemTypeCard({ type, index }: { type: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const count = stones.filter((s) => s.type === type).length;
  const iconPath = gemIcons[type] ?? gemIcons.Diamond;
  const glowStyle = gemGlow[type] ?? gemGlow.Diamond;

  return (
    <Link
      to="/browse"
      search={{ type: type as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`facet-sheen group relative block overflow-hidden rounded-xl transition-all duration-300 ${typeAccent[type as keyof typeof typeAccent]}`}
      style={{
        padding: "clamp(1.25rem, 3vw, 2rem) 1rem",
        textAlign: "center",
        boxShadow: hovered ? glowStyle : "var(--shadow-card)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease",
        background: hovered
          ? "linear-gradient(160deg, oklch(0.20 0.020 305 / 0.70) 0%, oklch(0.15 0.015 300 / 0.80) 100%)"
          : "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.60) 0%, oklch(0.13 0.014 300 / 0.70) 100%)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Gem icon */}
      <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 40, height: 40 }}>
        <motion.svg
          animate={{ rotate: hovered ? 15 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#gem-gold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={iconPath} />
          <defs>
            <linearGradient id="gem-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.62 0.08 78)" />
              <stop offset="50%" stopColor="oklch(0.80 0.09 82)" />
              <stop offset="100%" stopColor="oklch(0.62 0.08 78)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <span
        className="font-display text-pearl"
        style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", letterSpacing: "-0.01em" }}
      >
        {type}
      </span>
      <span
        className="mt-2 block font-mono text-[10px] text-muted-foreground"
        style={{ letterSpacing: "0.12em" }}
      >
        {count} listed
      </span>
    </Link>
  );
}

/* ── Hero routing ──────────────────────────────────── */
function ScrollScrubHero() {
  const reducedMotion = useReducedMotion();
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 640,
  );

  useEffect(() => {
    const onResize = () => setIsCompact(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return reducedMotion || isCompact ? <StaticHero /> : <ScrubbingHero />;
}

function ScrubbingHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) {
      setVideoReady(true);
    } else {
      video.load();
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    video.currentTime = progress * video.duration;
  });

  /* Scroll-driven values — used only for details row + halo */
  const detailsOpacity = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const detailsY       = useTransform(scrollYProgress, [0.45, 0.62], [16, 0]);
  const vignetteOpacity= useTransform(scrollYProgress, [0, 1], [0.30, 0.68]);

  /* Gold ambient halo — grows as stone turns into the light */
  const haloOpacity    = useTransform(scrollYProgress, [0.10, 0.55], [0, 0.55]);
  const haloScale      = useTransform(scrollYProgress, [0.10, 0.55], [0.5, 1]);

  return (
    <section ref={trackRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "oklch(0.08 0.01 300)" }}>
        {/* Grain texture overlay — always visible */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.04,
          }}
          aria-hidden="true"
        />

        {/* Static poster fallback — visible immediately while video loads */}
        <img
          src={HERO_VIDEO_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Video — fades in over poster once loaded */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: videoReady ? 1 : 0 }}
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />

        {/* Gold ambient halo — glows as stone catches the light */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: haloOpacity,
            scale: haloScale,
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.70 0.082 78 / 0.18) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom gradient vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, oklch(0.06 0.01 300 / 0) 0%, oklch(0.06 0.01 300 / 0) 38%, oklch(0.06 0.01 300 / 0.96) 100%)",
            opacity: vignetteOpacity,
          }}
          aria-hidden="true"
        />

        {/* Skip / Enter CTA — top right */}
        <a
          href="#vault"
          className="absolute right-5 top-6 z-20 sm:right-8 group flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.20em] text-pearl/60 transition-all duration-300 hover:text-brass"
          style={{
            background: "oklch(0.12 0.01 300 / 0.60)",
            border: "1px solid oklch(1 0 0 / 0.12)",
            backdropFilter: "blur(12px)",
          }}
        >
          Enter the vault
          <span
            className="block h-px transition-all duration-500"
            style={{
              width: "16px",
              background: "linear-gradient(to right, var(--brass-dim), var(--brass))",
            }}
          />
        </a>

        {/* Hero copy */}
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 sm:px-10 sm:pb-20">
          {/* Eyebrow — animates in on mount, always visible */}
          <motion.p
            className="flex items-center gap-3 text-pearl/60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
            }}
          >
            <span
              className="block h-px w-10"
              style={{ background: "linear-gradient(to right, transparent, oklch(0.70 0.082 78 / 0.70))" }}
            />
            Lot 214 · Certified this week
          </motion.p>

          {/* Headline — animates in on mount, always visible */}
          <motion.h1
            className="font-display text-pearl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
              lineHeight: 1.02,
              maxWidth: "14ch",
              letterSpacing: "-0.025em",
              textShadow: "0 4px 32px oklch(0 0 0 / 0.55)",
              marginTop: "0.75rem",
            }}
          >
            A 3.02 ct D / VVS1,{" "}
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 50%, var(--brass-hi) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              turned in full light.
            </em>
          </motion.h1>

          {/* Subtitle — animates in on mount */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.85 }}
            className="mt-4 max-w-sm text-sm leading-relaxed"
            style={{ color: "oklch(1 0 0 / 0.48)", lineHeight: 1.7 }}
          >
            A flawless Botswana diamond, independently graded by GIA.
            Scroll to examine every facet.
          </motion.p>

          {/* Details row */}
          <div
            className="mt-8 flex flex-wrap items-end justify-between gap-6 pt-6"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.10)" }}
          >
            <motion.dl
              className="flex flex-wrap gap-x-8 gap-y-3"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              {[
                { label: "Report",  value: "GIA 2214938471" },
                { label: "Origin",  value: "Botswana" },
                { label: "Colour",  value: "D — Colourless" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt
                    className="text-pearl/40"
                    style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.20em", textTransform: "uppercase" }}
                  >
                    {label}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-pearl/80 sm:text-sm">{value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div style={{ opacity: detailsOpacity }}>
              <Link
                to="/stones/$stoneId"
                params={{ stoneId: "d-3021" }}
                className="facet-sheen btn-gold"
              >
                View this stone
              </Link>
            </motion.div>
          </div>

          {/* Progress rule */}
          <div
            className="absolute bottom-5 left-5 right-5 sm:left-10 sm:right-10"
            style={{ height: "2px", background: "oklch(1 0 0 / 0.08)", borderRadius: "99px" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: scrollYProgress,
                background: "linear-gradient(to right, var(--brass-dim), var(--brass-hi))",
                borderRadius: "99px",
                boxShadow: "0 0 8px 2px var(--glow-gold)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Static fallback — reduced motion and small screens */
function StaticHero() {
  return (
    <section className="relative overflow-hidden border-b border-border" style={{ minHeight: "88vh" }}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.06 0.01 300 / 0.40) 0%, oklch(0.06 0.01 300 / 0.40) 40%, oklch(0.06 0.01 300 / 0.95) 100%)" }}
        aria-hidden="true"
      />

      <a
        href="#vault"
        className="absolute right-5 top-6 z-20 sm:right-8 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.20em] text-pearl/60"
        style={{ background: "oklch(0.12 0.01 300 / 0.60)", border: "1px solid oklch(1 0 0 / 0.12)" }}
      >
        Enter the vault
      </a>

      <div className="relative z-10 flex h-full min-h-[88vh] flex-col justify-end px-5 pb-14 sm:px-10 sm:pb-16">
        <p
          className="text-pearl/60"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.26em", textTransform: "uppercase" }}
        >
          Lot 214 · Certified this week
        </p>
        <h1
          className="font-display mt-3 text-pearl"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", lineHeight: 1.05, maxWidth: "16ch", letterSpacing: "-0.025em" }}
        >
          A 3.02 ct D / VVS1,{" "}
          <em
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, var(--brass-dim), var(--brass), var(--brass-hi))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            turned in full light.
          </em>
        </h1>
        <div
          className="mt-7 flex flex-wrap items-center gap-4 pt-5"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.10)" }}
        >
          <Link
            to="/stones/$stoneId"
            params={{ stoneId: "d-3021" }}
            className="facet-sheen btn-gold"
          >
            View this stone
          </Link>
          <span className="font-mono text-xs text-pearl/60">
            GIA 2214938471 · Botswana · D
          </span>
        </div>
      </div>
    </section>
  );
}
