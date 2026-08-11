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

import { gemTypes } from "@/data/stones";
import { StoneCard } from "@/components/vault/stone-card";
import { TrustStrip } from "@/components/vault/trust-strip";
import { Reveal } from "@/components/vault/reveal";
import { PromoBanner } from "@/components/vault/PromoBanner";
import { useVault } from "@/lib/vault-store";

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
  Diamond:  "M12 2 22 9 12 22 2 9Z",
  Sapphire: "M12 3 19 8.5 19 15.5 12 21 5 15.5 5 8.5Z",
  Ruby:     "M12 3 20 10 12 21 4 10Z",
  Emerald:  "M8 3 16 3 20 9 12 21 4 9Z",
  Amethyst: "M12 2 20 8 17 20 7 20 4 8Z",
};

/* Per-type stroke accent colors */
const gemRowAccent: Record<string, string> = {
  Diamond:  "oklch(0.84 0.015 240)",
  Sapphire: "oklch(0.62 0.060 250)",
  Ruby:     "oklch(0.64 0.135 15)",
  Emerald:  "oklch(0.62 0.085 160)",
  Amethyst: "oklch(0.64 0.095 313)",
};

/* Per-type SVG fill on hover */
const gemFillAccent: Record<string, string> = {
  Diamond:  "oklch(0.84 0.015 240 / 0.18)",
  Sapphire: "oklch(0.62 0.060 250 / 0.22)",
  Ruby:     "oklch(0.64 0.135 15  / 0.22)",
  Emerald:  "oklch(0.62 0.085 160 / 0.22)",
  Amethyst: "oklch(0.64 0.095 313 / 0.22)",
};

/* One-line descriptor per gem family */
const gemDescriptor: Record<string, string> = {
  Diamond:  "Colourless to fancy — the hardest substance on Earth",
  Sapphire: "Royal blue to padparadscha — corundum in every hue",
  Ruby:     "Pigeon blood to vivid red — rarest of the corundum family",
  Emerald:  "Muzo to Zambian — the standard bearer of green gemstones",
  Other:    "Rare collector pieces outside the four classical families",
};

/* Why-strip marquee items */
const WHY_ITEMS = [
  "GIA · IGI · AGS · GRS graded",
  "Full origin disclosure",
  "Unheated status stated plainly",
  "Insured transit worldwide",
  "14-day returns",
  "Escrow above $50,000",
  "No conflict stones",
  "Independent gemologist review",
];

function Home() {
  const { stones } = useVault();
  const featuredStones = stones.filter((s) => s.isFeatured);
  const featured = featuredStones.length > 0 ? featuredStones : stones.slice(0, 6);

  return (
    <>
      <ScrollScrubHero />
      <PromoBanner />
      <TrustStrip />
      <WhyStrip />

      {/* Gem type list — editorial row layout */}
      <section id="vault" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-5">
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
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--muted-foreground)", maxWidth: "46ch", lineHeight: 1.75 }}
            >
              Every stone belongs to one of five gem families — each graded to the
              same exacting standard regardless of type or price.
            </p>
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


        {/* Modern grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
          {gemTypes.map((type, i) => (
            <GemTypeCard key={type} type={type} index={i} />
          ))}
        </div>
      </section>

      {/* Featured stones */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
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

      {/* Contact CTA */}
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
                      background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 50%, var(--brass-hi) 100%)",
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

/* ── Why-Strip — scrolling marquee between trust strip and gem types ── */
function WhyStrip() {
  const doubled = [...WHY_ITEMS, ...WHY_ITEMS];
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: "1px solid oklch(1 0 0 / 0.05)",
        borderBottom: "1px solid oklch(1 0 0 / 0.05)",
        background: "oklch(0.125 0.013 305 / 0.50)",
      }}
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to right, var(--obsidian), transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{ background: "linear-gradient(to left, var(--obsidian), transparent)" }}
      />
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.20em] px-8"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item}
            </span>
            <span
              className="block w-px h-3 shrink-0"
              style={{ background: "oklch(0.68 0.076 76 / 0.22)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Gem Type Card — enriched grid tile item ────────── */
function GemTypeCard({ type, index }: { type: string; index: number }) {
  const { stones } = useVault();
  const [hovered, setHovered] = useState(false);
  const count = stones.filter((s) => s.type === type).length;
  const displayType = type === "Other" ? "Rare Gems" : type;
  const iconKey = type === "Other" ? "Amethyst" : type;
  const iconPath = gemIcons[iconKey] ?? gemIcons.Diamond;
  const accentColor = gemRowAccent[iconKey] ?? gemRowAccent.Diamond;
  const fillColor = gemFillAccent[iconKey] ?? gemFillAccent.Diamond;
  const descriptor = gemDescriptor[type] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link
        to="/browse"
        search={{ type: type as any }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col justify-between h-full min-h-[250px] p-6 overflow-hidden transition-all duration-300"
        style={{
          background: "linear-gradient(160deg, oklch(0.135 0.015 305 / 0.55) 0%, oklch(0.100 0.010 300 / 0.60) 100%)",
          border: hovered ? `1px solid ${accentColor.replace(")", " / 0.30)")}` : "1px solid oklch(1 0 0 / 0.06)",
          boxShadow: hovered 
            ? `0 12px 30px -10px oklch(0 0 0 / 0.8), 0 0 20px -2px ${accentColor.replace(")", " / 0.12)")}`
            : "0 4px 20px -10px oklch(0 0 0 / 0.5)",
        }}
      >
        {/* Top colored accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor.replace(")", " / 0.35)")})`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Hover ambient color glow behind icon */}
        <motion.div
          className="absolute pointer-events-none w-32 h-32 -right-8 -top-8 rounded-full"
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Card Header (Index & Count) */}
        <div className="flex items-center justify-between z-10">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{ color: "oklch(0.68 0.076 76 / 0.40)" }}
          >
            {String(index + 1).padStart(2, "0")} / {displayType.toUpperCase()}
          </span>
          <span
            className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5"
            style={{
              color: hovered ? "var(--pearl)" : "var(--muted-foreground)",
              background: hovered ? accentColor.replace(")", " / 0.12)") : "oklch(1 0 0 / 0.03)",
              border: hovered ? `1px solid ${accentColor.replace(")", " / 0.25)")}` : "1px solid oklch(1 0 0 / 0.05)",
              borderRadius: "2px",
              transition: "all 0.3s ease",
            }}
          >
            {count} {count === 1 ? "stone" : "stones"}
          </span>
        </div>

        {/* Card Body (Large visual icon with orbital ring) */}
        <div className="flex items-center justify-center my-6 relative z-10">
          {/* Orbital path outline */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            animate={{ rotate: hovered ? 90 : 0, scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "60px",
              height: "60px",
              border: `1px dashed ${accentColor.replace(")", " / 0.15)")}`,
            }}
          />

          <motion.svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill={hovered ? fillColor : "none"}
            stroke={accentColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: hovered ? 15 : 0,
              scale: hovered ? 1.1 : 1,
            }}
            style={{
              filter: hovered
                ? `drop-shadow(0 0 8px ${accentColor.replace(")", " / 0.45)")})`
                : "none",
              transition: "filter 0.35s ease",
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <path d={iconPath} />
          </motion.svg>
        </div>

        {/* Card Footer (Name, description & arrow) */}
        <div className="relative z-10 flex flex-col justify-end">
          <div className="flex items-end justify-between gap-2">
            <span
              className="font-display block transition-colors duration-300"
              style={{
                fontSize: "1.35rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: hovered ? "var(--pearl)" : "oklch(0.945 0.012 85 / 0.85)",
              }}
            >
              {displayType}
            </span>
            <motion.span
              animate={{ x: hovered ? 2 : -2, opacity: hovered ? 1 : 0.35 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-sm leading-none"
              style={{ color: accentColor }}
            >
              →
            </motion.span>
          </div>
          <span
            className="block text-[11px] mt-2 font-sans"
            style={{
              color: "var(--muted-foreground)",
              lineHeight: 1.5,
              opacity: hovered ? 0.95 : 0.65,
              transition: "opacity 0.3s ease",
            }}
          >
            {descriptor}
          </span>
        </div>
      </Link>
    </motion.div>
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) setVideoReady(true);
    else video.load();
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    video.currentTime = progress * video.duration;
    if (progress > 0.04) setScrolled(true);
    if (progress < 0.02) setScrolled(false);
  });

  /* — Phased reveals — */
  // Phase 1 (0% to 30%)
  const text1Opacity         = useTransform(scrollYProgress, [0.25, 0.30], [1, 0]);
  const text1Y               = useTransform(scrollYProgress, [0.25, 0.30], [0, -15]);
  const text1SubtitleOpacity = useTransform(scrollYProgress, [0.06, 0.20, 0.25, 0.30], [0, 1, 1, 0]);
  const text1SubtitleY       = useTransform(scrollYProgress, [0.06, 0.20, 0.25, 0.30], [10, 0, 0, -15]);

  // Phase 2 (30% to 60%)
  const text2Opacity         = useTransform(scrollYProgress, [0.25, 0.30, 0.55, 0.60], [0, 1, 1, 0]);
  const text2Y               = useTransform(scrollYProgress, [0.25, 0.30, 0.55, 0.60], [15, 0, 0, -15]);

  // Phase 3 (60% to 100%)
  const text3Opacity         = useTransform(scrollYProgress, [0.55, 0.60], [0, 1]);
  const text3Y               = useTransform(scrollYProgress, [0.55, 0.60], [15, 0]);

  const badgeOpacity     = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const badgeY           = useTransform(scrollYProgress, [0.18, 0.32], [8,  0]);
  const detailsOpacity   = useTransform(scrollYProgress, [0.45, 0.62], [0, 1]);
  const detailsY         = useTransform(scrollYProgress, [0.45, 0.62], [14, 0]);
  const ctaOpacity       = useTransform(scrollYProgress, [0.55, 0.68], [0, 1]);
  const vignetteOpacity  = useTransform(scrollYProgress, [0, 1], [0.30, 0.78]);
  const haloOpacity      = useTransform(scrollYProgress, [0.05, 0.55], [0, 0.55]);
  const haloScale        = useTransform(scrollYProgress, [0.05, 0.55], [0.55, 1.05]);
  const sidebarOpacity   = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <section ref={trackRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "oklch(0.07 0.009 300)" }}>

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.028,
          }}
          aria-hidden="true"
        />

        {/* Poster fallback */}
        <img src={HERO_VIDEO_POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 800ms ease" }}
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

        {/* Gold halo — grows and intensifies as user scrolls */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: haloOpacity,
            scale: haloScale,
            background: "radial-gradient(ellipse 52% 38% at 50% 48%, oklch(0.68 0.076 76 / 0.16) 0%, oklch(0.68 0.076 76 / 0.05) 55%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, oklch(0.06 0.009 300 / 0) 0%, oklch(0.06 0.009 300 / 0) 25%, oklch(0.06 0.009 300 / 0.97) 100%)",
            opacity: vignetteOpacity,
          }}
          aria-hidden="true"
        />

        {/* Top bleed */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, oklch(0.07 0.009 300 / 0.40) 0%, transparent 18%)" }}
          aria-hidden="true"
        />

        {/* ── Top-right “Enter the vault” link ── */}
        <motion.a
          href="#vault"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-5 top-6 z-20 sm:right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-pearl/50 transition-colors duration-300 hover:text-brass"
        >
          Enter the vault
          <span
            className="block h-px"
            style={{ width: "20px", background: "linear-gradient(to right, var(--brass-dim), var(--brass))" }}
          />
        </motion.a>

        {/* ── Vertical side label — fades out after 28% scroll ── */}
        <motion.div
          className="absolute left-5 top-1/2 z-20 hidden sm:flex items-center gap-3"
          style={{
            opacity: sidebarOpacity,
            rotate: -90,
            translateY: "-50%",
            transformOrigin: "left center",
          }}
          aria-hidden="true"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.28em]" style={{ color: "oklch(0.68 0.076 76 / 0.38)" }}>
            Scroll to reveal
          </span>
          <span className="block h-px w-6" style={{ background: "linear-gradient(to right, oklch(0.68 0.076 76 / 0.38), transparent)" }} />
        </motion.div>

        {/* ── Hero copy ── */}
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 sm:px-12 sm:pb-20">

          {/* Eyebrow */}
          <motion.p
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "oklch(0.68 0.076 76 / 0.65)",
            }}
          >
            <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.65))" }} />
            Lot 214 · Certified this week
          </motion.p>

          {/* Headline & Subtitle Phases */}
          <div className="relative mt-[0.875rem]">
            {/* Phase 1 */}
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="relative">
              <motion.h1
                className="font-display text-pearl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
                  lineHeight: 1.00,
                  maxWidth: "14ch",
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 40px oklch(0 0 0 / 0.55)",
                }}
              >
                A 3.02 ct D / VVS1,{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 45%, var(--brass-hi) 70%, var(--brass) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gold-shimmer 5s linear infinite",
                  }}
                >
                  turned in full light.
                </em>
              </motion.h1>
              <motion.p style={{ opacity: text1SubtitleOpacity, y: text1SubtitleY }} className="mt-4 max-w-sm text-sm">
                <span style={{ color: "oklch(1 0 0 / 0.45)", lineHeight: 1.75, display: "block" }}>
                  A flawless Botswana diamond, independently graded by GIA.
                  Scroll to examine every facet.
                </span>
              </motion.p>
            </motion.div>

            {/* Phase 2 */}
            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-0 pointer-events-none">
              <h1
                className="font-display text-pearl"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
                  lineHeight: 1.00,
                  maxWidth: "14ch",
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 40px oklch(0 0 0 / 0.55)",
                }}
              >
                Uncompromising{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 45%, var(--brass-hi) 70%, var(--brass) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gold-shimmer 5s linear infinite",
                  }}
                >
                  clarity.
                </em>
              </h1>
              <p className="mt-4 max-w-sm text-sm">
                <span style={{ color: "oklch(1 0 0 / 0.45)", lineHeight: 1.75, display: "block" }}>
                  Notice the precise facet alignment and absolute absence of inclusions, visible at every angle.
                </span>
              </p>
            </motion.div>

            {/* Phase 3 */}
            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-0 pointer-events-none">
              <h1
                className="font-display text-pearl"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
                  lineHeight: 1.00,
                  maxWidth: "14ch",
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 40px oklch(0 0 0 / 0.55)",
                }}
              >
                Ready for the{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, var(--brass-dim) 0%, var(--brass) 45%, var(--brass-hi) 70%, var(--brass) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gold-shimmer 5s linear infinite",
                  }}
                >
                  vault.
                </em>
              </h1>
              <p className="mt-4 max-w-sm text-sm">
                <span style={{ color: "oklch(1 0 0 / 0.45)", lineHeight: 1.75, display: "block" }}>
                  Fully certified and available for secure acquisition today. Includes comprehensive GIA documentation.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Stat badge — phase 3: 18% scroll */}
          <motion.div style={{ opacity: badgeOpacity, y: badgeY }} className="mt-5 w-fit">
            <span
              className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] px-3 py-1.5"
              style={{
                color: "oklch(0.68 0.076 76 / 0.90)",
                background: "oklch(0.68 0.076 76 / 0.08)",
                border: "1px solid oklch(0.68 0.076 76 / 0.22)",
              }}
            >
              <span
                className="block w-1.5 h-1.5 rounded-full animate-tip-glow"
                style={{ background: "var(--brass)" }}
              />
              3 new stones this week
            </span>
          </motion.div>

          {/* Details row — phase 4: 45% scroll */}
          <div
            className="mt-8 flex flex-wrap items-end justify-between gap-6 pt-5"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.09)" }}
          >
            <motion.dl
              className="flex flex-wrap gap-x-10 gap-y-4"
              style={{ opacity: detailsOpacity, y: detailsY }}
            >
              {[
                { label: "Report",  value: "GIA 2214938471" },
                { label: "Origin",  value: "Botswana" },
                { label: "Colour",  value: "D — Colourless" },
                { label: "Clarity", value: "VVS1" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "oklch(1 0 0 / 0.28)",
                    }}
                  >
                    {label}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-pearl/75 sm:text-sm" style={{ letterSpacing: "0.04em" }}>
                    {value}
                  </dd>
                </div>
              ))}
            </motion.dl>

            {/* CTA — phase 5: 55% scroll */}
            <motion.div style={{ opacity: ctaOpacity }}>
              <Link to="/stones/$stoneId" params={{ stoneId: "d-3021" }} className="facet-sheen btn-gold">
                View this stone
              </Link>
            </motion.div>
          </div>

          {/* Progress bar + glowing tip dot */}
          <div className="absolute bottom-5 left-5 right-5 sm:left-12 sm:right-12 flex items-center gap-4">
            <div className="relative flex-1" style={{ height: "2px", background: "oklch(1 0 0 / 0.07)" }}>
              <motion.div
                className="h-full origin-left relative"
                style={{
                  scaleX: scrollYProgress,
                  background: "linear-gradient(to right, var(--brass-dim), var(--brass-hi))",
                }}
              >
                <span
                  className="absolute right-0 top-1/2 w-2 h-2 rounded-full animate-tip-glow"
                  style={{ background: "var(--brass-hi)", transform: "translate(50%, -50%)" }}
                />
              </motion.div>
            </div>
            <span
              className="font-mono text-[8px] shrink-0 uppercase tracking-[0.18em]"
              style={{ color: "oklch(0.68 0.076 76 / 0.40)" }}
            >
              Scroll
            </span>
          </div>
        </div>

        {/* ── Scroll invitation — animated chevron, fades after first scroll ── */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              key="scroll-invite"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.6, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-14 left-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
              style={{ transform: "translateX(-50%)" }}
              aria-hidden="true"
            >
              {/* Pulse ring */}
              <span
                className="absolute w-8 h-8 rounded-full -top-3"
                style={{
                  border: "1px solid oklch(0.68 0.076 76 / 0.30)",
                  animation: "ring-pulse 2.4s ease-out infinite",
                }}
              />
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="oklch(0.68 0.076 76 / 0.75)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="animate-bounce-gentle"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              <span
                className="font-mono text-[7.5px] uppercase tracking-[0.28em]"
                style={{ color: "oklch(0.68 0.076 76 / 0.38)" }}
              >
                Scroll
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Static fallback (mobile / reduced-motion) ──────── */
function StaticHero() {
  return (
    <section className="relative overflow-hidden border-b border-border" style={{ minHeight: "88vh" }}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        autoPlay muted loop playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, oklch(0.06 0.009 300 / 0.30) 0%, oklch(0.06 0.009 300 / 0.35) 35%, oklch(0.06 0.009 300 / 0.97) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Gold halo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 48%, oklch(0.68 0.076 76 / 0.10) 0%, transparent 70%)",
          animation: "fade-in 2s ease both",
        }}
        aria-hidden="true"
      />

      <a
        href="#vault"
        className="absolute right-5 top-6 z-20 sm:right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-pearl/50 hover:text-brass transition-colors"
      >
        Enter the vault
        <span className="block h-px w-5" style={{ background: "linear-gradient(to right, var(--brass-dim), var(--brass))" }} />
      </a>

      <div className="relative z-10 flex h-full min-h-[88vh] flex-col justify-end px-5 pb-14 sm:px-10 sm:pb-16">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "oklch(0.68 0.076 76 / 0.60)",
          }}
        >
          <span className="flex items-center gap-3">
            <span className="block h-px w-8" style={{ background: "linear-gradient(to right, transparent, oklch(0.68 0.076 76 / 0.60))" }} />
            Lot 214 · Certified this week
          </span>
        </motion.p>

        <motion.h1
          className="font-display mt-4 text-pearl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            fontSize: "clamp(2rem, 8vw, 3rem)",
            lineHeight: 1.03,
            maxWidth: "16ch",
            letterSpacing: "-0.028em",
            textShadow: "0 4px 32px oklch(0 0 0 / 0.55)",
          }}
        >
          A 3.02 ct D / VVS1,{" "}
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
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-4 text-sm max-w-sm"
          style={{ color: "oklch(1 0 0 / 0.42)", lineHeight: 1.75 }}
        >
          A flawless Botswana diamond, independently graded by GIA.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4 pt-5"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <Link to="/stones/$stoneId" params={{ stoneId: "d-3021" }} className="facet-sheen btn-gold">
            View this stone
          </Link>
          <span className="font-mono text-xs text-pearl/45" style={{ letterSpacing: "0.08em" }}>
            GIA 2214938471 · Botswana · D
          </span>
        </motion.div>
      </div>
    </section>
  );
}
