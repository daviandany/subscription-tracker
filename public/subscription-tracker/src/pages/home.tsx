import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import SubscriptionCard from "../components/dashboard/SubscriptionCard";
import AnalyticsSidebar from "../components/dashboard/AnalyticsSidebar";
import AddSubscriptionModal from "../components/subscriptions/AddSubscriptionModal";
import { navigationItems } from "../config/navigation";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Loader2, AlertCircle, ChevronDown, ChevronUp, Plus } from "lucide-react";

export default function HomePage() {
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const metrics = useDashboardMetrics();
  const { subscriptions, loading, error, refetch } = useSubscriptions();

  const displayedSubscriptions = showAll ? subscriptions : subscriptions.slice(0, 4);

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        {/* ── Top bar ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Davi. Here's your subscription overview.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Nova Assinatura
          </button>
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <SummaryCard key={metric.title} metric={metric} />
          ))}
        </div>

        {/* ── Main content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Active Subscriptions</h2>
              {subscriptions.length > 4 && (
                <button
                  className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? (
                    <>
                      Ver menos <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Ver todas ({subscriptions.length}) <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center gap-3 py-12 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Carregando assinaturas…</span>
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

            {/* Empty state */}
            {!loading && !error && subscriptions.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500 text-sm">
                <span>Nenhuma assinatura encontrada.</span>
              </div>
            )}

            {/* Subscription cards */}
            {!loading && !error && subscriptions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedSubscriptions.map((sub) => (
                  <SubscriptionCard key={sub.id} subscription={sub} />
                ))}
              </div>
            )}

            <div className="mt-4">
              <RecentActivity />
            </div>
          </div>

          <div className="lg:col-span-1">
            <AnalyticsSidebar />
          </div>
        </div>
      </div>
      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refetch}
      />
    </DashboardLayout>
  );
}