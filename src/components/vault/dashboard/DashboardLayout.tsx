import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  LayoutDashboard,
  Gem,
  Tag,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";

type Tab = "overview" | "stones" | "discounts";

interface DashboardLayoutProps {
  children: (activeTab: Tab, setTab: (t: Tab) => void) => React.ReactNode;
}

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "stones", label: "Stones", icon: Gem },
  { id: "discounts", label: "Discounts & Promotions", icon: Tag },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "oklch(0.090 0.010 300)" }}
    >
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-none overflow-hidden"
        style={{
          background: "oklch(0.110 0.012 305)",
          borderRight: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center gap-3 px-4 py-5"
          style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
        >
          <div
            className="flex size-8 flex-none items-center justify-center"
            style={{ background: "var(--brass)", borderRadius: "4px" }}
          >
            <Gem className="size-4 text-black" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p
                  className="font-display text-pearl truncate"
                  style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
                >
                  Gem Vault
                </p>
                <p
                  className="font-mono uppercase"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.16em",
                    color: "var(--brass-dim)",
                  }}
                >
                  Admin Dashboard
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="mt-4 px-2">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="mb-1 flex w-full items-center gap-3 px-3 py-2.5 text-left transition-all duration-200"
                style={{
                  background: active
                    ? "oklch(0.68 0.076 76 / 0.12)"
                    : "transparent",
                  borderRadius: "6px",
                  border: active
                    ? "1px solid oklch(0.68 0.076 76 / 0.22)"
                    : "1px solid transparent",
                }}
              >
                <Icon
                  className="size-4 flex-none transition-colors"
                  style={{ color: active ? "var(--brass)" : "var(--muted-foreground)" }}
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="font-sans text-sm truncate"
                      style={{ color: active ? "var(--pearl)" : "var(--muted-foreground)" }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && sidebarOpen && (
                  <ChevronRight className="ml-auto size-3" style={{ color: "var(--brass-dim)" }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle collapse button */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute bottom-20 right-3 flex size-6 items-center justify-center transition-colors hover:text-pearl"
          style={{
            color: "var(--muted-foreground)",
            background: "oklch(0.14 0.012 305)",
            border: "1px solid oklch(1 0 0 / 0.07)",
            borderRadius: "4px",
          }}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <ChevronRight
            className="size-3 transition-transform"
            style={{ transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>

        {/* Footer */}
        <div
          className="absolute bottom-0 left-0 right-0 px-2 pb-4"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.06)" }}
        >
          <a
            href="/"
            className="mt-3 flex items-center gap-3 px-3 py-2.5 transition-colors hover:text-pearl"
            style={{ color: "var(--muted-foreground)", borderRadius: "6px" }}
          >
            <LogOut className="size-4 flex-none" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Back to site
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:text-pearl"
            style={{ color: "var(--muted-foreground)", borderRadius: "6px" }}
          >
            <Settings className="size-4 flex-none" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-8 py-4"
          style={{
            background: "oklch(0.110 0.012 305 / 0.80)",
            borderBottom: "1px solid oklch(1 0 0 / 0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <p
              className="font-display text-pearl"
              style={{ fontSize: "1.35rem", letterSpacing: "-0.02em" }}
            >
              {tabs.find((t) => t.id === activeTab)?.label}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="size-8 flex items-center justify-center font-mono text-xs"
              style={{
                background: "oklch(0.68 0.076 76 / 0.15)",
                border: "1px solid oklch(0.68 0.076 76 / 0.30)",
                borderRadius: "50%",
                color: "var(--brass)",
              }}
            >
              A
            </div>
          </div>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {children(activeTab, setActiveTab)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
