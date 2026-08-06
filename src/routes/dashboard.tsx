import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/vault/dashboard/DashboardLayout";
import { OverviewPanel } from "@/components/vault/dashboard/OverviewPanel";
import { StonesPanel } from "@/components/vault/dashboard/StonesPanel";
import { DiscountsPanel } from "@/components/vault/dashboard/DiscountsPanel";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Gem Vault" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
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
