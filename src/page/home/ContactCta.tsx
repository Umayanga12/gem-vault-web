import { Mail, MessageCircle } from "lucide-react";
import { ContactModal } from "@/components/vault/contact-modal";
import { Reveal } from "@/components/vault/reveal";
import { SocialDock } from "../contactus/SocialDock";

export function ContactCta() {
  return (
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
              <SocialDock/>
            </div>
          </div>
        </div>
        <div className="hairline-gold" />
      </Reveal>
    </section>
  );
}
