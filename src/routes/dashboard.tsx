import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useVault } from "@/lib/vault-store";
import { DashboardLayout } from "@/components/vault/dashboard/DashboardLayout";
import { OverviewPanel } from "@/components/vault/dashboard/OverviewPanel";
import { StonesPanel } from "@/components/vault/dashboard/StonesPanel";
import { DiscountsPanel } from "@/components/vault/dashboard/DiscountsPanel";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Rhea Cylone" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { isLoggedIn } = useVault();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({
        to: "/login",
        search: { redirect: "/dashboard" },
        replace: true,
      });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <DashboardLayout>
      {(activeTab, setTab) => {
        if (activeTab === "stones") return <StonesPanel />;
        if (activeTab === "discounts") return <DiscountsPanel />;
        return (
          <OverviewPanel
            onNavigate={(tab) => setTab(tab)}
          />
        );
      }}
    </DashboardLayout>
  );
}
