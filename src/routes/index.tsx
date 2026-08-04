import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import { ContactModal } from "@/components/vault/contact-modal";
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px] md:auto-rows-[220px]">
          {gemTypes.map((t, i) => {
            const size = t === "Diamond" ? "large" : t === "Emerald" ? "wide" : "normal";
            const spanClass = 
              t === "Diamond" ? "md:col-span-2 md:row-span-2" :
              t === "Emerald" ? "md:col-span-2 md:row-span-1" :
              "md:col-span-1 md:row-span-1";
            
            return (
              <Reveal key={t} delay={i * 0.07} className={spanClass}>
                <GemTypeCard type={t} index={i} size={size} />
              </Reveal>
            );
          })}
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

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl border p-10 sm:p-14"
            style={{
              background: "linear-gradient(160deg, oklch(0.12 0.015 305 / 0.8) 0%, oklch(0.08 0.01 300 / 0.9) 100%)",
              borderColor: "oklch(1 0 0 / 0.1)",
              boxShadow: "0 24px 48px -12px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.1)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full mix-blend-screen"
              style={{
                background: "radial-gradient(circle, oklch(0.70 0.082 78 / 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:text-left lg:justify-between">
              <div className="max-w-xl">
                <p className="engraved-label mb-3 flex items-center justify-center gap-3 lg:justify-start">
                  <span
                    className="block h-px w-8 flex-none"
                    style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
                  />
                  Get in touch
                </p>
                <h2
                  className="font-display text-pearl"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  We source the extraordinary.
                </h2>
                <p className="mt-4 text-muted-foreground" style={{ fontSize: "1.05rem", lineHeight: 1.6 }}>
                  Looking for a specific stone? Have questions about our vault? Reach out directly, and our gemologists will assist you.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <ContactModal>
                    <button className="facet-sheen btn-gold flex items-center gap-2 cursor-pointer">
                      <Mail className="h-4 w-4" />
                      Email us directly
                    </button>
                  </ContactModal>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-pearl transition-all hover:bg-white/5"
                    style={{ border: "1px solid oklch(1 0 0 / 0.12)" }}
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4 lg:mt-0 lg:items-end">
                <span className="font-mono text-xs uppercase tracking-widest text-pearl/50">
                  Follow our journey
                </span>
                <div className="flex gap-3">
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pearl transition-colors hover:border-brass hover:bg-white/10 hover:text-brass">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pearl transition-colors hover:border-brass hover:bg-white/10 hover:text-brass">
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-pearl transition-colors hover:border-brass hover:bg-white/10 hover:text-brass">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                    <span className="sr-only">TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function GemTypeCard({ type, index, size = "normal" }: { type: string; index: number; size?: "large" | "wide" | "normal" }) {
  const [hovered, setHovered] = useState(false);
  const count = stones.filter((s) => s.type === type).length;
  const displayType = type === "Other" ? "Rare Gems" : type;
  const iconKey = type === "Other" ? "Amethyst" : type;
  const iconPath = gemIcons[iconKey] ?? gemIcons.Diamond;
  const glowStyle = gemGlow[iconKey] ?? gemGlow.Diamond;

  return (
    <Link
      to="/browse"
      search={{ type: type as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`facet-sheen group relative flex w-full h-full overflow-hidden rounded-2xl transition-all duration-500 ${typeAccent[type as keyof typeof typeAccent] ?? typeAccent.Other}`}
      style={{
        boxShadow: hovered ? glowStyle : "var(--shadow-card)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        background: hovered
          ? "linear-gradient(160deg, oklch(0.20 0.020 305 / 0.70) 0%, oklch(0.15 0.015 300 / 0.80) 100%)"
          : "linear-gradient(160deg, oklch(0.15 0.015 305 / 0.40) 0%, oklch(0.10 0.010 300 / 0.50) 100%)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Background Glow Element */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${size === 'large' ? '70% 30%' : '50% 50%'}, ${glowStyle.split('4px ')[1]} 0%, transparent 60%)`,
          filter: "blur(20px)"
        }}
      />

      <div className={`relative z-10 flex w-full h-full p-6 ${
        size === "large" ? "flex-col justify-end items-start p-10" :
        size === "wide" ? "flex-row items-center justify-between px-10" :
        "flex-col items-center justify-center text-center"
      }`}>
        
        {/* Gem icon */}
        <div 
          className={`flex items-center justify-center transition-transform duration-500 ${
            size === "large" ? "absolute top-10 right-10 w-24 h-24 group-hover:rotate-12 group-hover:scale-110" :
            size === "wide" ? "w-16 h-16 group-hover:rotate-12 group-hover:scale-110" :
            "w-12 h-12 mb-4 group-hover:rotate-12 group-hover:scale-110"
          }`}
        >
          <motion.svg
            animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#gem-gold)"
            strokeWidth={size === "large" ? "0.8" : "1.2"}
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

        <div className={size === "wide" ? "text-left" : ""}>
          <span
            className={`font-display block text-pearl transition-all duration-300 ${
              size === "large" ? "text-4xl md:text-5xl lg:text-6xl mb-2" :
              size === "wide" ? "text-3xl lg:text-4xl" :
              "text-xl"
            }`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {displayType}
          </span>
          <span
            className={`block font-mono text-muted-foreground transition-all duration-300 ${
              size === "large" ? "text-sm mt-2 opacity-80" :
              "text-[10px] mt-1"
            }`}
            style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            {count} {count === 1 ? 'stone' : 'stones'} listed
          </span>
          
          {size === "large" && (
            <p className="mt-4 text-sm text-pearl/60 max-w-[240px] leading-relaxed hidden sm:block">
              Explore our vast collection of certified, hand-selected stones.
            </p>
          )}
        </div>

        {/* Action arrow for wide and large */}
        {(size === "large" || size === "wide") && (
          <div className={`absolute bottom-6 right-6 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/20 text-pearl opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${size === "wide" ? "relative bottom-auto right-auto opacity-100 translate-x-0 group-hover:bg-white/10 group-hover:border-brass mt-4 sm:mt-0" : ""}`}>
            <span className="font-mono text-lg leading-none">→</span>
          </div>
        )}
      </div>
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
