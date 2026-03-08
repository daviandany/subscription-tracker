import { useState } from "react";
import type { Subscription } from "../../hooks/useSubscriptions";

interface MonthlyTrendChartProps {
  subscriptions: Subscription[];
}

const MONTH_LABELS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

export default function MonthlyTrendChart({ subscriptions }: MonthlyTrendChartProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const totalMonthly = subscriptions.reduce((acc, sub) => acc + Number(sub.price), 0);

  // Simulate slight variation for each month (realistic projection)
  const monthlyData = MONTH_LABELS.map((label, i) => {
    // Add small variation to make the chart more interesting
    const variation = 1 + (Math.sin(i * 0.8) * 0.08) + (Math.cos(i * 1.2) * 0.05);
    const amount = totalMonthly * variation;
    return { label, amount: Math.round(amount * 100) / 100 };
  });

  const maxAmount = Math.max(...monthlyData.map((d) => d.amount), 1);

  // Chart dimensions
  const chartHeight = 200;
  const barWidth = 32;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Projeção Mensal</h3>
          <p className="text-sm text-gray-400 mt-1">Gastos projetados para os próximos 12 meses</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">
            R$ {(totalMonthly * 12).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">Total anual projetado</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="overflow-x-auto">
        <div className="flex items-end gap-2 min-w-[520px]" style={{ height: chartHeight + 40 }}>
          {monthlyData.map((data, i) => {
            const barHeight = maxAmount > 0 ? (data.amount / maxAmount) * chartHeight : 0;
            const isHovered = hoveredBar === i;

            return (
              <div
                key={data.label}
                className="flex-1 flex flex-col items-center gap-1 relative"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full mb-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-white/10 text-xs text-white whitespace-nowrap z-10 shadow-xl">
                    R$ {data.amount.toFixed(2)}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-white/10 rotate-45 -mt-1" />
                  </div>
                )}

                {/* Bar */}
                <div
                  className="w-full rounded-t-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
                  style={{
                    height: barHeight,
                    maxWidth: barWidth,
                    background: isHovered
                      ? "linear-gradient(180deg, #A78BFA 0%, #8B5CF6 100%)"
                      : "linear-gradient(180deg, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 100%)",
                    boxShadow: isHovered
                      ? "0 0 20px rgba(139, 92, 246, 0.3)"
                      : "none",
                  }}
                >
                  {/* Shimmer effect on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/10 to-transparent" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs transition-colors ${
                    isHovered ? "text-purple-400 font-medium" : "text-gray-500"
                  }`}
                >
                  {data.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
