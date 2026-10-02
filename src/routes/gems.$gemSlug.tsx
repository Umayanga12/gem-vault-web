import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { slugToGemInfo, labelToSlug, gemInfoMap } from "@/data/gemDescriptions";
import { gemCategories, gemRowAccent } from "@/page/home/GemTypeCard";
import type { GemType } from "@/data/stones";

export const Route = createFileRoute("/gems/$gemSlug")({
  loader: ({ params }) => {
    const info = slugToGemInfo(params.gemSlug);
    if (!info) throw notFound();
    return { info, slug: params.gemSlug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Gem unavailable — Rhea Cylone" }] };
    }
    const { info } = loaderData;
    return {
      meta: [
        { title: `${info.name} — Sri Lankan Gemstones | Rhea Cylone` },
        { name: "description", content: info.description },
        { property: "og:title", content: `${info.name} — Rhea Cylone` },
        { property: "og:description", content: info.description },
      ],
    };
  },
  component: GemDetailPage,
});

function GemDetailPage() {
  const { info } = Route.useLoaderData();
  const [imageFailed, setImageFailed] = useState(false);

  const accent = info.accent ?? "oklch(0.70 0.082 78)";
  const parentCategory = info.parentType
    ? gemCategories.find((c) => c.routeType === info.parentType)
    : undefined;

  // Sibling sub-types from same parent
  const siblings = info.parentType
    ? Object.entries(gemInfoMap)
        .filter(
          ([key, g]) =>
            g.parentType === info.parentType && g.name !== info.name,
        )
        // de-duplicate by name
        .filter(
          ([, g], i, arr) =>
            arr.findIndex(([, x]) => x.name === g.name) === i,
        )
        .slice(0, 8)
    : [];

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link
          to="/browse"
          search={{ type: undefined }}
          className="rule-label transition-colors hover:text-brass"
        >
          Browse
        </Link>
        {parentCategory && (
          <>
            <ChevronRight className="size-3 text-muted-foreground opacity-50" />
            <Link
              to="/browse"
              search={{ type: parentCategory.routeType as GemType }}
              className="rule-label transition-colors hover:text-brass"
            >
              {parentCategory.title}
            </Link>
          </>
        )}
        <ChevronRight className="size-3 text-muted-foreground opacity-50" />
        <span className="rule-label text-pearl">{info.name}</span>
      </nav>

      {/* Hero section */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
        {/* Image panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
          style={{
            borderRadius: "12px",
            border: `1px solid ${accent.replace(")", " / 0.25)")}`,
            boxShadow: `0 24px 60px -12px oklch(0 0 0 / 0.70), 0 0 0 1px ${accent.replace(")", " / 0.10)")}`,
            aspectRatio: "4/3",
            background: `radial-gradient(circle at 50% 40%, ${accent.replace(")", " / 0.12)")}, oklch(0.10 0.01 300) 70%)`,
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10"
            style={{
              background: `linear-gradient(90deg, ${accent}, ${accent.replace(")", " / 0.20)")})`,
            }}
          />
          {info.image && !imageFailed ? (
            <img
              src={info.image}
              alt={info.name}
              onError={() => setImageFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.88)" }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke={accent}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.5 }}
              >
                <path d="M12 3 19 8.5 19 15.5 12 21 5 15.5 5 8.5Z" />
              </svg>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, oklch(0.08 0.01 300 / 0.80) 100%)",
            }}
          />
          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-10">
            <span
              className="font-display text-pearl"
              style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", letterSpacing: "-0.02em" }}
            >
              {info.name}
            </span>
          </div>
        </motion.div>

        {/* Description panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Type badge */}
          {info.parentType && (
            <span
              className="inline-block rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase mb-5"
              style={{
                background: `${accent.replace(")", " / 0.12)")}`,
                border: `1px solid ${accent.replace(")", " / 0.30)")}`,
                color: accent,
              }}
            >
              {info.parentType} · Natural
            </span>
          )}

          <h1
            className="font-display text-pearl mb-6"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {info.name}
          </h1>

          {/* Divider */}
          <div
            className="mb-6 h-px w-16"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />

          <p
            className="text-[0.9375rem] leading-[1.8] mb-8"
            style={{ color: "oklch(0.82 0.012 85 / 0.90)" }}
          >
            {info.description}
          </p>

          {/* Browse CTA */}
          {parentCategory && (
            <Link
              to="/browse"
              search={{ type: parentCategory.routeType as GemType }}
              className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-brass"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              Browse {parentCategory.title} in our vault
            </Link>
          )}
        </motion.div>
      </div>

      {/* Sibling varieties */}
      {siblings.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, oklch(1 0 0 / 0.06), transparent)" }}
            />
            <p className="engraved-label flex items-center gap-3">
              <span
                className="block h-px w-8 flex-none"
                style={{ background: "linear-gradient(to right, transparent, var(--brass-dim))" }}
              />
              More in {info.parentType}
            </p>
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to left, oklch(1 0 0 / 0.06), transparent)" }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {siblings.map(([key, sibling]) => (
              <Link
                key={key}
                to="/gems/$gemSlug"
                params={{ gemSlug: labelToSlug(key) }}
                className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1.5 transition-all duration-200 hover:opacity-80"
                style={{
                  background: `${(sibling.accent ?? accent).replace(")", " / 0.08)")}`,
                  border: `1px solid ${(sibling.accent ?? accent).replace(")", " / 0.22)")}`,
                  color: sibling.accent ?? accent,
                  borderRadius: "4px",
                }}
              >
                {sibling.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
