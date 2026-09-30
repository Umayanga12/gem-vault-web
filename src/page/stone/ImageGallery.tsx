import { AnimatePresence, motion } from "motion/react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  angle: number;
  onAngleChange: (i: number) => void;
}

export function ImageGallery({ images, alt, angle, onAngleChange }: ImageGalleryProps) {
  return (
    <div>
      {/* Main image */}
      <div
        className="facet-sheen vault-stage relative aspect-square overflow-hidden rounded-2xl transition-all duration-500"
        style={{
          border: "1px solid oklch(1 0 0 / 0.10)",
          boxShadow: "0 0 48px 8px var(--glow-gold), 0 20px 60px oklch(0 0 0 / 0.60)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={angle}
            src={images[angle]}
            alt={`${alt} — view ${angle + 1} of ${images.length}`}
            width={900}
            height={900}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="size-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onAngleChange(i)}
              aria-label={`Show view ${i + 1}`}
              className="facet-sheen relative aspect-square overflow-hidden rounded-xl transition-all duration-300"
              style={{
                border: `1px solid ${i === angle ? "oklch(0.70 0.082 78 / 0.70)" : "oklch(1 0 0 / 0.08)"}`,
                boxShadow: i === angle ? "0 0 16px 2px var(--glow-gold)" : "none",
                transform: i === angle ? "scale(0.96)" : "scale(1)",
              }}
            >
              <img src={img} alt="" loading="lazy" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
