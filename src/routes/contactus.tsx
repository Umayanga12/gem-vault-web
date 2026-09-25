import { createFileRoute } from "@tanstack/react-router";
import { ConsultationHero } from "@/page/contactus/ConsultationHero";
import { GeneralInquiries } from "@/page/contactus/GeneralInquiries";
import { WhyBookCard } from "@/page/contactus/WhyBookCard";

export const Route = createFileRoute("/contactus")({
  head: () => ({
    meta: [
      { title: "Contact Us & Consultation — Rhea Cylone" },
      {
        name: "description",
        content:
          "Reach out for general inquiries or book a 30-minute call with a graduate gemologist to review stones.",
      },
      { property: "og:title", content: "Contact & Consultation" },
      {
        property: "og:description",
        content: "Reach out to us directly or book time with a gemologist.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <ConsultationHero />

      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 sm:px-8 lg:grid-cols-2">
        {/* Left — Inline email form & social links */}
        <GeneralInquiries />

        {/* Right — Why book card (sticky so it stays visible while scrolling the form) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <WhyBookCard />
        </div>
      </div>
    </>
  );
}
