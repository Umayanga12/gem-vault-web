import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Facebook, Check, Send } from "lucide-react";
import { Reveal } from "@/components/vault/reveal";
import { ConsultField } from "./ConsultField";
import { ConsultTextarea } from "./ConsultTextarea";

export function GeneralInquiries() {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Reveal>
      {/* Section header */}
      <h2 className="font-display text-2xl text-pearl mb-2">General Inquiries</h2>
      <p className="text-base text-muted-foreground" style={{ lineHeight: 1.8 }}>
        Looking for a specific stone? Have questions about our vault, shipping, or sourcing?
        Send us a message and our gemologists will get back to you promptly.
      </p>

      {/* Inline email form */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center rounded-2xl py-12 text-center"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
                border: "1px solid oklch(0.70 0.082 78 / 0.20)",
                boxShadow: "0 0 40px var(--glow-gold)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: "backOut" }}
                className="mb-5 flex size-14 items-center justify-center rounded-full"
                style={{
                  background: "var(--gradient-gold)",
                  boxShadow: "0 0 24px var(--glow-gold)",
                }}
              >
                <Check className="size-7 text-primary-foreground" strokeWidth={2.5} />
              </motion.div>
              <p className="font-display text-xl text-pearl" style={{ letterSpacing: "-0.02em" }}>
                Message sent
              </p>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Thank you for reaching out. We'll respond within one business day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.175 0.018 305 / 0.65) 0%, oklch(0.14 0.014 300 / 0.75) 100%)",
                border: "1px solid oklch(1 0 0 / 0.08)",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.06)",
              }}
            >
              <ConsultField
                label="Your name"
                type="text"
                required
                focused={focused === "name"}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
              <ConsultField
                label="Email"
                type="email"
                required
                focused={focused === "email"}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <ConsultTextarea
                label="Your message"
                focused={focused === "message"}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="facet-sheen btn-gold mt-1 flex items-center justify-center gap-2 w-full cursor-pointer"
              >
                <Send className="size-4" />
                Send message
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
