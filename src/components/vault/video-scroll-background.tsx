"use client";
import { useEffect, useRef } from "react";

/**
 * VideoScrollBackground
 *
 * Pins a <video> element as a fixed full-viewport layer and scrubs its
 * currentTime in sync with the page's scroll position.
 *
 * Scroll 0   → frame 0
 * Scroll end → last frame
 *
 * A smooth lerp (requestAnimationFrame) is used so the scrub feels silky
 * rather than jumping. Respects prefers-reduced-motion (pauses at first frame).
 */
export function VideoScrollBackground({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video never actually plays on its own timeline
    video.pause();

    if (reducedMotion) {
      // Show first frame only
      video.currentTime = 0;
      return;
    }

    /* ── Smooth scrub loop ── */
    const animate = () => {
      if (video.readyState >= 2 && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime += diff * 0.10; // ease 10% per frame ≈ ~60 fps lerp
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    /* ── Map scroll → video time ── */
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (video.readyState >= 2 && video.duration) {
        targetTimeRef.current = progress * video.duration;
      }
    };

    // Set initial frame once metadata loaded
    const onMeta = () => { onScroll(); };
    video.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        // Prevent any auto-play from starting the timeline
        autoPlay={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Primary dim overlay for legibility across ALL pages */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, oklch(0.08 0.011 300 / 0.75) 0%, oklch(0.10 0.015 305 / 0.55) 50%, oklch(0.12 0.011 300 / 0.80) 100%)",
        }}
      />

      {/* Subtle noise-like vignette edge */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 120px 60px oklch(0.06 0.01 300 / 0.70)",
        }}
      />
    </div>
  );
}
