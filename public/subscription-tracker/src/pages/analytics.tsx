import DashboardLayout from "../components/layout/DashboardLayout";
import AnalyticsSummaryCards from "../components/analytics/AnalyticsSummaryCards";
import SavingsSimulator from "../components/analytics/SavingsSimulator";
import SpendingBreakdown from "../components/analytics/SpendingBreakdown";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import { navigationItems } from "../config/navigation";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Loader2, AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const { subscriptions, loading, error, refetch } = useSubscriptions();

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">
            Analise seus gastos e simule economias ao cancelar assinaturas.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm">Carregando dados…</span>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
            <button
              onClick={refetch}
              className="ml-auto text-xs underline hover:text-red-300"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Summary cards */}
            <AnalyticsSummaryCards subscriptions={subscriptions} />

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column — Savings + Trend */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <SavingsSimulator subscriptions={subscriptions} />
                <MonthlyTrendChart subscriptions={subscriptions} />
              </div>

              {/* Right column — Breakdown */}
              <div className="lg:col-span-1">
                <SpendingBreakdown subscriptions={subscriptions} />
              </div>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && subscriptions.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-500 text-sm">
            <span>Nenhuma assinatura encontrada para analisar.</span>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
