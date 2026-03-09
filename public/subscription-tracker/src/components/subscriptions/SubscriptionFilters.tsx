import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import type { SubscriptionFiltersState } from "../../types/subscription";
import { SUBSCRIPTION_CATEGORIES } from "../../types/subscription";

interface SubscriptionFiltersProps {
  filters: SubscriptionFiltersState;
  onChange: (filters: SubscriptionFiltersState) => void;
}

export default function SubscriptionFilters({ filters, onChange }: SubscriptionFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Buscar assinatura..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-8 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer min-w-[160px]"
        >
          {SUBSCRIPTION_CATEGORIES.map((cat) => (
            <option key={cat} value={cat === "Todas" ? "" : cat} className="bg-[#1a1a2e] text-gray-200">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-") as [
              SubscriptionFiltersState["sortBy"],
              SubscriptionFiltersState["sortOrder"]
            ];
            onChange({ ...filters, sortBy, sortOrder });
          }}
          className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-8 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer min-w-[180px]"
        >
          <option value="platform-asc" className="bg-[#1a1a2e]">Nome A→Z</option>
          <option value="platform-desc" className="bg-[#1a1a2e]">Nome Z→A</option>
          <option value="price-asc" className="bg-[#1a1a2e]">Preço ↑</option>
          <option value="price-desc" className="bg-[#1a1a2e]">Preço ↓</option>
          <option value="day-asc" className="bg-[#1a1a2e]">Renovação ↑</option>
          <option value="day-desc" className="bg-[#1a1a2e]">Renovação ↓</option>
        </select>
      </div>
    </div>
  );
}
