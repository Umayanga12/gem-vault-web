import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
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

/* Restrained type-specific colors for gem rows */
const gemRowAccent: Record<string, string> = {
  Diamond:  "oklch(0.82 0.015 240)",
  Sapphire: "oklch(0.60 0.055 250)",
  Ruby:     "oklch(0.58 0.110 15)",
  Emerald:  "oklch(0.56 0.060 160)",
  Amethyst: "oklch(0.58 0.070 313)",
};

function Home() {
  const featured = stones.slice(0, 6);

  return (
    <>
      <ScrollScrubHero />
      <TrustStrip />

      {/* Gem type list — editorial row layout */}
      <section id="vault" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-14">
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
              Five families,<br />one standard.
            </h2>
          </div>
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brass"
          >
            View all {stones.length} stones
            <span
              className="block h-px transition-all duration-300 group-hover:w-8"
              style={{ width: "20px", background: "var(--brass-dim)" }}
            />
          </Link>
        </Reveal>

        {/* Editorial list */}
        <div>
          {gemTypes.map((type, i) => (
            <Reveal key={type} delay={i * 0.06}>
              <GemTypeRow type={type} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured stones */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        {/* Section header */}
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="engraved-label flex items-center gap-3">
              <span
                className="block h-px w-8 flex-none"
                style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
              />
              The display case
            </p>
            <h2
              className="mt-4 font-display text-pearl"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Featured stones
            </h2>
          </div>
          <Link
            to="/browse"
            search={{ type: undefined }}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-brass"
          >
            Browse all
            <span
              className="block h-px transition-all duration-300 group-hover:w-8"
              style={{ width: "20px", background: "var(--brass-dim)" }}
            />
          </Link>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <StoneCard key={s.id} stone={s} index={i} />
          ))}
        </div>
      </section>

      {/* Contact CTA — editorial */}
      <section id="contact" className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <Reveal>
          <div className="hairline-gold mb-0" />
          <div
            className="relative overflow-hidden px-10 py-16 sm:px-16 sm:py-20"
            style={{
              background: "linear-gradient(160deg, oklch(0.135 0.015 305 / 0.85) 0%, oklch(0.100 0.010 300 / 0.90) 100%)",
              border: "1px solid oklch(1 0 0 / 0.07)",
              borderTop: "none",
            }}
          >
            {/* Ambient glow — single, subtle */}
            <div
              className="pointer-events-none absolute -right-32 -top-32 w-96 h-96"
              style={{
                background: "radial-gradient(circle, oklch(0.68 0.076 76 / 0.06) 0%, transparent 65%)",
                filter: "blur(60px)",
              }}
            />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="engraved-label flex items-center gap-3 mb-6">
                  <span
                    className="block h-px w-8 flex-none"
                    style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
                  />
                  Get in touch
                </p>
                <h2
                  className="font-display text-pearl"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                    lineHeight: 1.04,
                    letterSpacing: "-0.03em",
                  }}
                >
                  We source{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      background:
                        "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 50%, var(--brass-hi) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    the extraordinary.
                  </em>
                </h2>
                <p
                  className="mt-5 text-sm leading-relaxed text-muted-foreground"
                  style={{ maxWidth: "48ch", lineHeight: 1.8 }}
                >
                  Looking for a specific stone? Have questions about our vault?
                  Reach out and our gemologists will assist you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <ContactModal>
                  <button className="facet-sheen btn-gold flex items-center gap-2.5 cursor-pointer">
                    <Mail className="h-3.5 w-3.5" />
                    Email us directly
                  </button>
                </ContactModal>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost flex items-center gap-2.5"
                >
                  <MessageCircle className="h-3.5 w-3.5" style={{ color: "var(--emerald)" }} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="hairline-gold" />
        </Reveal>
      </section>
    </>
  );
}

/* ── Gem Type Row — editorial list item ──────────────── */
function GemTypeRow({ type, index }: { type: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  const count = stones.filter((s) => s.type === type).length;
  const displayType = type === "Other" ? "Rare Gems" : type;
  const iconKey = type === "Other" ? "Amethyst" : type;
  const iconPath = gemIcons[iconKey] ?? gemIcons.Diamond;
  const accentColor = gemRowAccent[iconKey] ?? gemRowAccent.Diamond;

  return (
    <Link
      to="/browse"
      search={{ type: type as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center justify-between py-7 relative"
      style={{
        borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      {/* Hover background — subtle fill */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400"
        style={{
          background: `linear-gradient(to right, ${accentColor.replace(")", " / 0.04)")}, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 w-px transition-all duration-400 ease-out"
        style={{
          height: hovered ? "100%" : "0%",
          background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
        }}
      />

      <div className="relative z-10 flex items-center gap-6">
        {/* Index numeral */}
        <span
          className="font-mono text-[9px] w-5 text-right shrink-0"
          style={{
            color: "oklch(0.68 0.076 76 / 0.35)",
            letterSpacing: "0.14em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Gem icon */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: hovered ? 20 : 0, opacity: hovered ? 1 : 0.45 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d={iconPath} />
        </motion.svg>

        {/* Name */}
        <span
          className="font-display text-pearl transition-colors duration-300"
          style={{
            fontSize: "clamp(1.4rem, 2.8vw, 2rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: hovered ? "var(--pearl)" : "oklch(0.945 0.012 85 / 0.80)",
          }}
        >
          {displayType}
        </span>
      </div>

      {/* Right side — count + arrow */}
      <div className="relative z-10 flex items-center gap-6">
        <span
          className="font-mono text-[9px] uppercase tracking-wider"
          style={{
            color: hovered ? accentColor : "var(--muted-foreground)",
            letterSpacing: "0.16em",
            transition: "color 300ms ease",
          }}
        >
          {count} {count === 1 ? "stone" : "stones"}
        </span>
        <motion.span
          animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-sm"
          style={{ color: accentColor }}
        >
          →
        </motion.span>
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

  const detailsOpacity = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const detailsY       = useTransform(scrollYProgress, [0.45, 0.62], [14, 0]);
  const vignetteOpacity= useTransform(scrollYProgress, [0, 1], [0.25, 0.72]);
  const haloOpacity    = useTransform(scrollYProgress, [0.10, 0.55], [0, 0.40]);
  const haloScale      = useTransform(scrollYProgress, [0.10, 0.55], [0.6, 1]);

  return (
    <section ref={trackRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "oklch(0.07 0.009 300)" }}>
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.032,
          }}
          aria-hidden="true"
        />

        {/* Poster fallback */}
        <img
          src={HERO_VIDEO_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 800ms ease",
          }}
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

        {/* Subtle gold ambient halo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: haloOpacity,
            scale: haloScale,
            background: "radial-gradient(ellipse 55% 35% at 50% 50%, oklch(0.68 0.076 76 / 0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.06 0.009 300 / 0) 0%, oklch(0.06 0.009 300 / 0) 30%, oklch(0.06 0.009 300 / 0.97) 100%)",
            opacity: vignetteOpacity,
          }}
          aria-hidden="true"
        />

        {/* "Enter" CTA — refined */}
        <motion.a
          href="#vault"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-5 top-6 z-20 sm:right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-pearl/50 transition-colors duration-300 hover:text-brass"
          style={{
            letterSpacing: "0.20em",
          }}
        >
          Enter the vault
          <span
            className="block h-px"
            style={{
              width: "20px",
              background: "linear-gradient(to right, var(--brass-dim), var(--brass))",
            }}
          />
        </motion.a>

        {/* Hero copy */}
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 sm:px-10 sm:pb-20">
          {/* Eyebrow */}
          <motion.p
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "oklch(0.68 0.076 76 / 0.60)",
            }}
          >
            <span
              className="block h-px w-8"
              style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.60))" }}
            />
            Lot 214 · Certified this week
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display text-pearl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.75rem)",
              lineHeight: 1.00,
              maxWidth: "14ch",
              letterSpacing: "-0.03em",
              textShadow: "0 4px 40px oklch(0 0 0 / 0.50)",
              marginTop: "0.875rem",
            }}
          >
            A 3.02 ct D / VVS1,{" "}
            <em
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 50%, var(--brass-hi) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              turned in full light.
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.85 }}
            className="mt-4 max-w-sm text-sm"
            style={{ color: "oklch(1 0 0 / 0.42)", lineHeight: 1.75 }}
          >
            A flawless Botswana diamond, independently graded by GIA.
            Scroll to examine every facet.
          </motion.p>

          {/* Details row */}
          <div
            className="mt-8 flex flex-wrap items-end justify-between gap-6 pt-6"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
          >
            <motion.dl
              className="flex flex-wrap gap-x-10 gap-y-3"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              {[
                { label: "Report",  value: "GIA 2214938471" },
                { label: "Origin",  value: "Botswana" },
                { label: "Colour",  value: "D — Colourless" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "oklch(1 0 0 / 0.32)",
                    }}
                  >
                    {label}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-pearl/75 sm:text-sm">
                    {value}
                  </dd>
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
            style={{ height: "1px", background: "oklch(1 0 0 / 0.06)" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: scrollYProgress,
                background: "linear-gradient(to right, var(--brass-dim), var(--brass-hi))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Static fallback */
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
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.009 300 / 0.35) 0%, oklch(0.06 0.009 300 / 0.40) 40%, oklch(0.06 0.009 300 / 0.97) 100%)",
        }}
        aria-hidden="true"
      />

      <a
        href="#vault"
        className="absolute right-5 top-6 z-20 sm:right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-pearl/50"
      >
        Enter the vault
        <span
          className="block h-px w-5"
          style={{ background: "linear-gradient(to right, var(--brass-dim), var(--brass))" }}
        />
      </a>

      <div className="relative z-10 flex h-full min-h-[88vh] flex-col justify-end px-5 pb-14 sm:px-10 sm:pb-16">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "oklch(0.68 0.076 76 / 0.60)",
          }}
        >
          Lot 214 · Certified this week
        </p>
        <h1
          className="font-display mt-4 text-pearl"
          style={{
            fontSize: "clamp(2rem, 8vw, 3rem)",
            lineHeight: 1.03,
            maxWidth: "16ch",
            letterSpacing: "-0.028em",
          }}
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
          className="mt-8 flex flex-wrap items-center gap-4 pt-5"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          <Link
            to="/stones/$stoneId"
            params={{ stoneId: "d-3021" }}
            className="facet-sheen btn-gold"
          >
            View this stone
          </Link>
          <span className="font-mono text-xs text-pearl/50">
            GIA 2214938471 · Botswana · D
          </span>
        </div>
      </div>
    </section>
  );
}
