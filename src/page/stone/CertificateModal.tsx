import { AnimatePresence, motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { type Stone } from "@/data/stones";

interface CertificateModalProps {
  open: boolean;
  stone: Stone;
  spec: [string, string][];
  onClose: () => void;
}

export function CertificateModal({ open, stone, onClose }: CertificateModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: "oklch(0.06 0.01 300 / 0.85)", backdropFilter: "blur(16px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl p-6"
            style={{
              background: "linear-gradient(160deg, oklch(0.19 0.020 305) 0%, oklch(0.14 0.015 300) 100%)",
              border: "1px solid oklch(1 0 0 / 0.10)",
              boxShadow: "0 40px 120px oklch(0 0 0 / 0.70), inset 0 1px 0 oklch(1 0 0 / 0.08)",
            }}
            role="dialog"
            aria-label="Grading report"
          >
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
