import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Scissors, TrendingDown, Sparkles } from "lucide-react";
import type { Subscription } from "../../hooks/useSubscriptions";

interface SavingsSimulatorProps {
  subscriptions: Subscription[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Entretenimento: "#8B5CF6",
  Infraestrutura: "#34D399",
  Trabalho: "#F59E0B",
  Educação: "#3B82F6",
  Saúde: "#FB7185",
  Outros: "#94A3B8",
};

export default function SavingsSimulator({ subscriptions }: SavingsSimulatorProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSubscription = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === subscriptions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(subscriptions.map((s) => s.id)));
    }
  };

  const savings = useMemo(() => {
    return subscriptions
      .filter((sub) => selectedIds.has(sub.id))
      .reduce((acc, sub) => acc + Number(sub.price), 0);
  }, [subscriptions, selectedIds]);

  const totalMonthly = subscriptions.reduce((acc, sub) => acc + Number(sub.price), 0);
  const remainingMonthly = totalMonthly - savings;
  const yearlySavings = savings * 12;

  const savingsPercent = totalMonthly > 0 ? (savings / totalMonthly) * 100 : 0;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10">
            <Scissors className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Simulador de Economia</h3>
            <p className="text-sm text-gray-400">Selecione assinaturas para ver quanto você economizaria</p>
          </div>
        </div>
        <button
          onClick={selectAll}
          className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-all"
        >
          {selectedIds.size === subscriptions.length ? "Desmarcar Todas" : "Selecionar Todas"}
        </button>
      </div>

      {/* Savings summary — animated */}
      <div className="my-6 p-5 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Monthly savings */}
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Economia Mensal</p>
            <motion.p
              key={savings.toFixed(2)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-emerald-400"
            >
              R$ {savings.toFixed(2)}
            </motion.p>
          </div>

          {/* Yearly savings */}
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Economia Anual</p>
            <motion.p
              key={yearlySavings.toFixed(2)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-emerald-400"
            >
              R$ {yearlySavings.toFixed(2)}
            </motion.p>
          </div>

          {/* Savings percentage */}
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Redução</p>
            <motion.p
              key={savingsPercent.toFixed(0)}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-emerald-400"
            >
              {savingsPercent.toFixed(0)}%
            </motion.p>
          </div>
        </div>

        {/* Comparison bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Gasto Atual: R$ {totalMonthly.toFixed(2)}</span>
            <span>Após Cancelar: R$ {remainingMonthly.toFixed(2)}</span>
          </div>
          <div className="relative h-4 rounded-full bg-white/5 overflow-hidden">
            {/* Current spending (full width = total) */}
            <div className="absolute inset-0 rounded-full bg-rose-500/20" />
            {/* Remaining after cancellation */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-emerald-500 to-teal-400"
              initial={false}
              animate={{
                width: totalMonthly > 0 ? `${(remainingMonthly / totalMonthly) * 100}%` : "100%",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            {/* Savings zone pattern */}
            {savings > 0 && (
              <motion.div
                className="absolute inset-y-0 right-0 rounded-r-full bg-linear-to-r from-rose-500/30 to-rose-500/50"
                initial={false}
                animate={{
                  width: `${savingsPercent}%`,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)",
                }}
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-emerald-500 to-teal-400" />
              <span className="text-gray-400">Mantém</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
              <span className="text-gray-400">Cancela</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription list */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        <AnimatePresence>
          {subscriptions.map((sub) => {
            const isSelected = selectedIds.has(sub.id);
            const catColor = CATEGORY_COLORS[sub.category] || "#94A3B8";

            return (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10"

                }`}
                onClick={() => toggleSubscription(sub.id)}
              >
                {/* Checkbox */}
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>

                {/* Category color dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: catColor }}
                />

                {/* Platform info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isSelected ? "text-emerald-300 line-through" : "text-white"}`}>
                    {sub.platform}
                  </p>
                  <p className="text-xs text-gray-500">{sub.category} · Dia {sub.day}</p>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <p className={`text-sm font-semibold ${isSelected ? "text-emerald-400" : "text-white"}`}>
                    R$ {Number(sub.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>

                {/* Savings indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-emerald-400"
                  >
                    <TrendingDown className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {subscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Sparkles className="w-8 h-8 mb-3 opacity-50" />
          <p className="text-sm">Nenhuma assinatura para simular.</p>
        </div>
      )}
    </div>
  );
}
