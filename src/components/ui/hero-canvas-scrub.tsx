// Optional upgrade for ScrubbingHero in index.tsx, if native <video>
// currentTime scrubbing feels stuttery in practice (likely, given this
// source's ~1s keyframe spacing). Same idea, but scrubs a pre-extracted
// JPEG frame sequence drawn to a <canvas> instead of seeking a codec —
// this is the technique most "scroll through a product video" pages
// actually use under the hood, because frame-accurate seeking is far
// more reliable than asking a video decoder to seek precisely on every
// scroll tick.
//
// Setup:
//   1. Unzip hero-scrub-frames.zip into /public/media/hero-scrub/
//      (72 frames, frame-001.jpg … frame-072.jpg, 960px wide)
//   2. These were extracted from your uploaded video at 960px for a fast
//      first test. Re-export at a higher resolution from your original
//      master before shipping — this pack is compressed twice over
//      (source mp4 → jpg) and will look softer than the native video.
//   3. Swap <ScrubbingHero /> for <CanvasScrubHero /> in index.tsx, and
//      move the overlay content (eyebrow / headline / details / CTA /
//      progress rule) from ScrubbingHero into this component the same way.

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const FRAME_COUNT = 72;
const frameSrc = (i: number) => `/media/hero-scrub/frame-${String(i + 1).padStart(3, "0")}.jpg`;

export function CanvasScrubHero({ trackHeight = "280vh" }: { trackHeight?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let dx = 0;
    let dy = 0;

    // object-fit: cover, ported to canvas math
    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      dx = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      dy = (height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  }

  // preload every frame once on mount
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      images.push(img);
    }
    imagesRef.current = images;
    images[0].onload = () => drawFrame(0);
  }, []);

  // keep the canvas' pixel size in sync with its displayed size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      drawFrame(index);
    }
  });

  return (
    <div ref={trackRef} className="relative" style={{ height: trackHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        {/* Move ScrubbingHero's overlay JSX (vignette, eyebrow, headline,
            details, CTA, progress rule) in here — it's identical, this
            component only swaps the pixel source underneath it. */}
      </div>
    </div>
  );
}
