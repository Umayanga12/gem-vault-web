import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useVault } from "@/lib/vault-store";
import { Eye, EyeOff, Lock, ArrowLeft, Gem } from "lucide-react";
import { motion } from "motion/react";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Owner Login — Gem Vault" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const { redirect } = Route.useSearch();
  const { isLoggedIn, login } = useVault();
  const navigate = useNavigate();

  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: redirect || "/dashboard", replace: true });
    }
  }, [isLoggedIn, navigate, redirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Add a tiny artificial delay for premium interface feel
    setTimeout(() => {
      const success = login(passcode);
      if (success) {
        navigate({ to: redirect || "/dashboard", replace: true });
      } else {
        setError("Invalid passcode. Access denied.");
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden"
      style={{ background: "oklch(0.090 0.010 300)" }}
    >
      {/* Ambient Radial Background Glows */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 w-96 h-96"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.076 76 / 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 -bottom-40 w-96 h-96"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.076 76 / 0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="w-full max-w-md z-10">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link
            to="/"
            className="group mb-4 flex size-12 items-center justify-center transition-all duration-300"
            style={{
              background: "oklch(0.120 0.012 305)",
              border: "1px solid oklch(1 0 0 / 0.08)",
              boxShadow: "0 4px 20px oklch(0 0 0 / 0.3)",
              borderRadius: "12px",
            }}
          >
            <Gem className="size-5 transition-transform duration-500 group-hover:rotate-45" style={{ color: "var(--brass)" }} />
          </Link>
          <h1
            className="font-display text-pearl tracking-tight"
            style={{
              fontSize: "1.75rem",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Vault Entrance
          </h1>
          <p className="mt-2 text-xs text-muted-foreground font-sans max-w-[32ch] leading-relaxed">
            Enter the administrator passcode to access inventory management.
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-10"
          style={{
            background: "linear-gradient(160deg, oklch(0.120 0.012 305 / 0.80) 0%, oklch(0.100 0.010 300 / 0.80) 100%)",
            border: "1px solid oklch(1 0 0 / 0.07)",
            boxShadow: "0 24px 64px oklch(0 0 0 / 0.5)",
            backdropFilter: "blur(16px)",
            borderRadius: "16px",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="passcode"
                className="block text-[10px] font-mono uppercase tracking-[0.16em] mb-2"
                style={{ color: "var(--brass-dim)" }}
              >
                Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-muted-foreground">
                  <Lock className="size-3.5" />
                </div>
                <input
                  id="passcode"
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  required
                  className="block w-full py-3 pl-10 pr-10 text-sm bg-black/40 border border-pearl/10 focus:border-brass/40 focus:ring-0 focus:outline-none transition-all duration-300 text-pearl font-mono placeholder-pearl/20"
                  style={{
                    borderRadius: "8px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-pearl transition-colors"
                >
                  {showPasscode ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400 font-sans bg-red-950/20 border border-red-900/30 px-3.5 py-2.5 rounded-lg flex items-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !passcode}
              className="facet-sheen btn-gold w-full flex justify-center items-center py-3 px-4 font-mono text-[10px] uppercase tracking-[0.18em] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Decrypting..." : "Enter Vault"}
            </button>
          </form>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-pearl transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
