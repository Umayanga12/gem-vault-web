import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/vault/reveal";

const pillars = [
  {
    index: "I",
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by NGJA. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
  },
  {
    index: "II",
    title: "Treatment disclosed, every time",
    body: "Heat, oil, fracture filling and diffusion each change value materially. Where a laboratory records a treatment, we print it on the card, the detail page and the invoice. 'Unheated' appears only where the report says so.",
  },
  {
    index: "III",
    title: "Origin where it can be evidenced",
    body: "Country of origin is a laboratory opinion based on inclusion and trace-element analysis. We state the country the report names. Where origin is inconclusive, we say so rather than inferring it from the colour.",
  },
  {
    index: "IV",
    title: "Natural and lab-grown, clearly separated",
    body: "Lab-grown stones are labelled at every point in the interface and priced against lab-grown comparables. They are never presented alongside natural material without that distinction.",
  },
];

function PillarNumber({ label, delay = 0 }: { label: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: reduced ? 0 : delay }}
      className="font-mono select-none block"
      style={{
        fontSize: "0.6rem",
        letterSpacing: "0.20em",
        color: "oklch(0.68 0.076 76 / 0.35)",
        paddingTop: "0.25rem",
      }}
      aria-hidden="true"
    >
      {label}
    </motion.span>
  );
}

function PillarRow({
  pillar,
  isLast,
}: {
  pillar: (typeof pillars)[number];
  isLast: boolean;
}) {
  return (
    <div
      className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-6 sm:gap-x-10 py-12 relative"
      style={{
        borderBottom: isLast ? "none" : "1px solid oklch(1 0 0 / 0.06)",
      }}
    >
      {/* Hover accent bar */}
      <div
        className="absolute left-0 top-0 w-px h-0 transition-all duration-500 ease-out group-hover:h-full"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.68 0.076 76 / 0.45), oklch(0.68 0.076 76 / 0.08), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Roman numeral */}
      <div className="flex flex-col items-center pt-0.5">
        <PillarNumber label={pillar.index} delay={0.05} />
        <motion.div
          className="mt-3 w-[2px] h-[2px] rounded-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.25 }}
          style={{ background: "oklch(0.68 0.076 76 / 0.28)" }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div>
        <h3
          className="font-display text-pearl transition-colors duration-300 group-hover:text-brass"
          style={{
            fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.018em",
          }}
        >
          {pillar.title}
        </h3>
        <p
          className="mt-4"
          style={{
            color: "oklch(0.580 0.014 85 / 0.62)",
            lineHeight: 1.95,
            maxWidth: "56ch",
            fontSize: "0.9375rem",
          }}
        >
          {pillar.body}
        </p>
      </div>
    </div>
  );
}

export function PillarsSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
      <div>
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <PillarRow pillar={p} isLast={i === pillars.length - 1} />
          </Reveal>
        ))}
      </div>

      {/* Sticky supporting image — puts a face on "independent grading" for buyers who can't see the lab themselves */}
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5">
            <img
              src="/assets/images_2.jpg"
              alt="Independent gemologist inspecting a stone under a loupe before grading"
              className="h-full w-full object-cover"
            />
          </div>
          <p
            className="mt-4"
            style={{ color: "oklch(0.580 0.014 85 / 0.45)", fontSize: "0.8125rem", lineHeight: 1.6 }}
          >
            Every stone is examined before it's listed — not photographed and
            described from a supplier's own notes.
          </p>
        </div>
      </div>
    </div>
  );
}
