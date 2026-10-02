import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";

const sections = [
  {
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by GIA, IGI, AGS or GRS. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
    /* TODO: add image src when available */
    image: "/assets/1111.jpg",
    imageAlt: "GIA grading report and gemstone under laboratory conditions",
  },
  {
    title: "Treatment is stated, not implied",
    body: "Heat, oil, fracture filling and diffusion each change value materially. Where a laboratory records a treatment, we print it on the card, the detail page and the invoice. 'Unheated' appears only where the report says so.",
    image: "/assets/Gueda1.jpg",
    imageAlt: "Gemologist documenting treatment details under a microscope",
  },
  {
    title: "Origin where it can be evidenced",
    body: "Country of origin is a laboratory opinion based on inclusion and trace-element analysis. We state the country the report names. Where origin is inconclusive, we say so rather than inferring it from the colour.",
    image: "/assets/images (1).jpg",
    imageAlt: "Map of Sri Lankan gem-bearing regions with origin documentation",
  },
  {
    title: "100% natural — no lab-grown, ever",
    body: "Every stone in our inventory formed naturally within the earth over millions of years. We do not carry synthetic or laboratory-grown material. What you see is what nature made.",
    image: "/assets/mining/image.png",
    imageAlt: "Natural gemstone rough material fresh from the mine",
  },
];

function SectionRow({
  s,
  i,
  isLast,
}: {
  s: (typeof sections)[number];
  i: number;
  isLast: boolean;
}) {
  const reduced = useReducedMotion();
  const isEven = i % 2 === 0;

  return (
    <Reveal delay={i * 0.05}>
      <div
        className="group grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-8 lg:gap-12 py-12"
        style={{ borderBottom: isLast ? "none" : "1px solid oklch(1 0 0 / 0.07)" }}
      >
        {/* ── Text side ── */}
        <div className={`flex gap-7 ${isEven ? "" : "lg:order-2"}`}>
          {/* Number marker */}
          <div className="shrink-0 pt-1">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduced ? 0 : i * 0.05 + 0.2, duration: 0.5 }}
              className="font-display block select-none"
              style={{
                fontSize: "2.75rem",
                lineHeight: 1,
                letterSpacing: "-0.045em",
                background:
                  "linear-gradient(180deg, oklch(0.70 0.082 78 / 0.55) 0%, oklch(0.50 0.060 78 / 0.20) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
          </div>

          <div>
            <h2
              className="font-display text-pearl transition-colors duration-300 group-hover:text-brass"
              style={{
                fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
                lineHeight: 1.13,
                letterSpacing: "-0.018em",
              }}
            >
              {s.title}
            </h2>
            <p
              className="mt-4"
              style={{
                color: "oklch(0.580 0.014 85 / 0.60)",
                lineHeight: 1.9,
                fontSize: "0.9375rem",
                maxWidth: "52ch",
              }}
            >
              {s.body}
            </p>
          </div>
        </div>

        {/* ── Image side ── */}
        <div
          className={`hidden lg:block ${isEven ? "lg:order-2" : "lg:order-1"}`}
        >
          <div
            className="relative w-full overflow-hidden rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.015]"
            style={{
              aspectRatio: "4/3",
              border: "1px solid oklch(1 0 0 / 0.07)",
            }}
          >
            {s.image ? (
              <img
                src={s.image}
                alt={s.imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              /* Placeholder — remove once you have an actual image */
              <div
                className="h-full w-full flex flex-col items-center justify-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.17 0.018 305 / 0.90) 0%, oklch(0.13 0.013 300 / 0.95) 100%)",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.68 0.076 76)"
                  strokeWidth="0.7"
                  opacity={0.28}
                  aria-hidden="true"
                >
                  <polygon points="12 2 22 9 12 22 2 9" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="9" x2="22" y2="9" />
                </svg>
                <p
                  className="font-mono text-center px-4"
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.10em",
                    color: "oklch(0.58 0.014 85 / 0.28)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.imageAlt}
                </p>
              </div>
            )}

            {/* Subtle corner accent */}
            <div
              className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(225deg, oklch(0.68 0.076 76 / 0.08) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function TrustSections() {
  return (
    <section aria-labelledby="trust-certification-heading" className="py-4">
      {/* Section label */}
      <Reveal>
        <p className="engraved-label flex items-center gap-3 mb-6">
          <span
            className="block h-px w-8"
            style={{
              background: "linear-gradient(to right, transparent, var(--brass-dim))",
            }}
          />
          Certification standards
        </p>
      </Reveal>

      <Reveal delay={0.04}>
        <h2
          id="trust-certification-heading"
          className="font-display text-pearl mb-12"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.022em",
            maxWidth: "24ch",
          }}
        >
          Four commitments that apply to every natural stone without exception
        </h2>
      </Reveal>

      <div className="space-y-0">
        {sections.map((s, i) => (
          <SectionRow key={s.title} s={s} i={i} isLast={i === sections.length - 1} />
        ))}
      </div>
    </section>
  );
}
