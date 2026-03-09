import { useState } from "react";
import type { Subscription } from "../../hooks/useSubscriptions";

interface SpendingBreakdownProps {
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

export default function SpendingBreakdown({ subscriptions }: SpendingBreakdownProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Compute category totals
  const categoryTotals = subscriptions.reduce<Record<string, number>>((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + Number(sub.price);
    return acc;
  }, {});

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const categories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: CATEGORY_COLORS[category] || "#94A3B8",
    }));

  // Build donut chart segments
  const circumference = 2 * Math.PI * 40; // radius = 40
  let cumulativeOffset = 0;

  const segments = categories.map((cat) => {
    const dashLength = (cat.percentage / 100) * circumference;
    const dashOffset = -cumulativeOffset;
    cumulativeOffset += dashLength;

    return {
      ...cat,
      dashLength,
      dashOffset,
    };
  });

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full">
      <h3 className="text-lg font-semibold text-white mb-6">Gastos por Categoria</h3>

      {/* Donut chart */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50" cy="50" r="40"
            fill="transparent"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          {/* Segments */}
          {segments.map((seg) => (
            <circle
              key={seg.category}
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke={seg.color}
              strokeWidth={hoveredCategory === seg.category ? "14" : "12"}
              strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
              strokeDashoffset={seg.dashOffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-300 cursor-pointer"
              style={{
                opacity: hoveredCategory && hoveredCategory !== seg.category ? 0.3 : 1,
              }}
              onMouseEnter={() => setHoveredCategory(seg.category)}
              onMouseLeave={() => setHoveredCategory(null)}
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {hoveredCategory ? (
            <>
              <span className="text-lg font-bold text-white">
                R$ {categoryTotals[hoveredCategory]?.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">{hoveredCategory}</span>
            </>
          ) : (
            <>
              <span className="text-2xl font-bold text-white">
                R$ {total.toFixed(0)}
              </span>
              <span className="text-xs text-gray-500">Total</span>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.category}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
              hoveredCategory === cat.category ? "bg-white/10" : "hover:bg-white/5"
            }`}
            onMouseEnter={() => setHoveredCategory(cat.category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-gray-300">{cat.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">
                R$ {cat.amount.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 w-12 text-right">
                {cat.percentage.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
