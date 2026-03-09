import { DollarSign, TrendingDown, PiggyBank, Calculator } from "lucide-react";
import type { Subscription } from "../../hooks/useSubscriptions";

interface AnalyticsSummaryCardsProps {
  subscriptions: Subscription[];
}

export default function AnalyticsSummaryCards({ subscriptions }: AnalyticsSummaryCardsProps) {
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + Number(sub.price), 0);
  const totalYearly = totalMonthly * 12;
  const avgPrice = subscriptions.length > 0 ? totalMonthly / subscriptions.length : 0;

  const stats = [
    {
      title: "Gasto Mensal",
      value: `R$ ${totalMonthly.toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Gasto Anual Projetado",
      value: `R$ ${totalYearly.toFixed(2)}`,
      icon: <TrendingDown className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Economia Máxima Possível",
      value: `R$ ${totalYearly.toFixed(2)}/ano`,
      icon: <PiggyBank className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Média por Assinatura",
      value: `R$ ${avgPrice.toFixed(2)}`,
      icon: <Calculator className="w-5 h-5" />,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-all hover:translate-y-[-2px]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {stat.title}
            </span>
            <div
              className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} opacity-80 text-white group-hover:opacity-100 transition-opacity`}
            >
              {stat.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
}
