import { useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";

export function VaultFilm() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Autoplay after the poster is dismissed; browsers require a user gesture for sound-on video.
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <Reveal>
      <div className="py-20 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <p
            className="font-mono text-[9px] uppercase mb-5"
            style={{ color: "oklch(0.68 0.076 76 / 0.45)", letterSpacing: "0.26em" }}
          >
            Inside the vault
          </p>
          <h2
            className="font-display text-pearl mb-5"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.026em" }}
          >
            Watch a stone go from parcel to report
          </h2>
          <p
            style={{
              color: "oklch(0.580 0.014 85 / 0.65)",
              lineHeight: 1.95,
              maxWidth: "54ch",
              fontSize: "0.9375rem",
            }}
          >
            Most buyers on the platform are ordering from another country and will
            never hold the stone before it ships. This is the process they're
            trusting — filmed in our own vault, unedited.
          </p>
        </div>

        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-white/5"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {!playing ? (
            <button
              type="button"
              onClick={handlePlay}
              className="group absolute inset-0 h-full w-full"
              aria-label="Play video: inside the grading vault"
            >
              <img
                src="src\assets\video\vault-process-poster.jpg"
                alt="Gemologist examining a stone under a loupe in the grading vault"
                className="h-full w-full object-cover"
              />
              <span
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, oklch(0 0 0 / 0.15), oklch(0 0 0 / 0.45))" }}
              />
              <span
                className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow: "0 0 24px 4px oklch(0.68 0.076 76 / 0.25)",
                }}
              >
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                  <path d="M2 2v18l16-9L2 2z" fill="oklch(0.14 0.01 85)" />
                </svg>
              </span>
              <span
                className="absolute bottom-5 left-5 font-mono text-[10px] uppercase"
                style={{ color: "oklch(0.95 0 0 / 0.85)", letterSpacing: "0.2em" }}
              >
                3:40 — Full grading walkthrough
              </span>
            </button>
          ) : (
            <video
              ref={videoRef}
              src="src\assets\video\vault-process.mp4"
              controls
              playsInline
              className="h-full w-full"
            />
          )}
        </motion.div>
      </div>
    </Reveal>
  );
}
