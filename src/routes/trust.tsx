import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/vault/reveal";
import { TrustStrip } from "@/components/vault/trust-strip";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Sourcing, Grading and Certification — Cabochon" },
      {
        name: "description",
        content:
          "How we source, grade and disclose every stone: independent laboratory reports, treatment disclosure, origin documentation and escrow settlement.",
      },
      { property: "og:title", content: "Sourcing, Grading and Certification" },
      {
        property: "og:description",
        content: "Independent grading, treatment disclosure and origin documentation explained.",
      },
    ],
  }),
  component: TrustPage,
});

const sections = [
  {
    title: "Independent grading, without exception",
    body: "No stone is listed before it is graded by GIA, IGI, AGS or GRS. We do not grade in-house, and we do not list a stone against a report issued to a different stone. The report number on the page is the report number in the parcel.",
  },
  {
    title: "Treatment is stated, not implied",
    body: "Heat, oil, fracture filling and diffusion each change value materially. Where a laboratory records a treatment, we print it on the card, the detail page and the invoice. 'Unheated' appears only where the report says so.",
  },
  {
    title: "Origin where it can be evidenced",
    body: "Country of origin is a laboratory opinion based on inclusion and trace-element analysis. We state the country the report names. Where origin is inconclusive, we say so rather than inferring it from the colour.",
  },
  {
    title: "Natural and lab-grown, clearly separated",
    body: "Lab-grown stones are labelled at every point in the interface and priced against lab-grown comparables. They are never presented alongside natural material without that distinction.",
  },
];

function TrustPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <p className="rule-label">Trust &amp; certification</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-pearl">
          What we verify before a stone reaches this site
        </h1>
        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <h2 className="font-display text-2xl text-pearl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <TrustStrip />
    </>
  );
}
