import { useState, useMemo } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SubscriptionStats from "../components/subscriptions/SubscriptionStats";
import SubscriptionFilters from "../components/subscriptions/SubscriptionFilters";
import SubscriptionTable from "../components/subscriptions/SubscriptionTable";
import AddSubscriptionModal from "../components/subscriptions/AddSubscriptionModal";
import { navigationItems } from "../config/navigation";
import { useSubscriptions } from "../hooks/useSubscriptions";
import type { SubscriptionFiltersState } from "../types/subscription";
import { Loader2, AlertCircle, Plus } from "lucide-react";

export default function SubscriptionsPage() {
  const { subscriptions, loading, error, refetch } = useSubscriptions();
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<SubscriptionFiltersState>({
    search: "",
    category: "",
    sortBy: "platform",
    sortOrder: "asc",
  });

  // Filter and sort subscriptions
  const filtered = useMemo(() => {
    let result = [...subscriptions];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (sub) =>
          sub.platform.toLowerCase().includes(q) ||
          sub.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((sub) => sub.category === filters.category);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "platform":
          comparison = a.platform.localeCompare(b.platform);
          break;
        case "price":
          comparison = Number(a.price) - Number(b.price);
          break;
        case "day":
          comparison = a.day - b.day;
          break;
      }
      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [subscriptions, filters]);

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Assinaturas
            </h1>
            <p className="text-gray-400">
              Gerencie todas as suas assinaturas em um só lugar.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Nova Assinatura
          </button>
        </div>

        {/* Stats */}
        {!loading && !error && subscriptions.length > 0 && (
          <SubscriptionStats subscriptions={subscriptions} />
        )}

        {/* Filters */}
        {!loading && !error && subscriptions.length > 0 && (
          <SubscriptionFilters filters={filters} onChange={setFilters} />
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
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

        {/* Table */}
        {!loading && !error && (
          <SubscriptionTable subscriptions={filtered} />
        )}

        {/* Result count */}
        {!loading && !error && subscriptions.length > 0 && (
          <p className="text-sm text-gray-500 text-center">
            Mostrando {filtered.length} de {subscriptions.length} assinatura
            {subscriptions.length !== 1 ? "s" : ""}
          </p>
        )}
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
