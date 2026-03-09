import { DollarSign, CreditCard, CalendarClock, Tag } from "lucide-react";
import type { Subscription } from "../../types/subscription";

interface SubscriptionStatsProps {
  subscriptions: Subscription[];
}

function daysUntilRenewal(day: number): number {
  const now = new Date();
  const current = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  if (day >= current) return day - current;
  return daysInMonth - current + day;
}

export default function SubscriptionStats({ subscriptions }: SubscriptionStatsProps) {
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + Number(sub.price), 0);
  const totalCount = subscriptions.length;

  const nextRenewal = subscriptions.length > 0
    ? subscriptions.reduce((closest, sub) => {
        const days = daysUntilRenewal(sub.day);
        const closestDays = daysUntilRenewal(closest.day);
        return days < closestDays ? sub : closest;
      })
    : null;

  const nextDays = nextRenewal ? daysUntilRenewal(nextRenewal.day) : null;

  // Category with highest total spending
  const categoryTotals = subscriptions.reduce<Record<string, number>>((acc, sub) => {
    acc[sub.category] = (acc[sub.category] || 0) + Number(sub.price);
    return acc;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];

  const stats = [
    {
      title: "Total Mensal",
      value: `R$ ${totalMonthly.toFixed(2)}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Assinaturas Ativas",
      value: totalCount,
      icon: <CreditCard className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Próxima Renovação",
      value: nextDays !== null
        ? nextDays === 0
          ? "Hoje"
          : `${nextDays} dia${nextDays !== 1 ? "s" : ""}`
        : "—",
      subtitle: nextRenewal?.platform,
      icon: <CalendarClock className="w-5 h-5" />,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Top Categoria",
      value: topCategory ? topCategory[0] : "—",
      subtitle: topCategory ? `R$ ${topCategory[1].toFixed(2)}` : undefined,
      icon: <Tag className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-500",
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
          {stat.subtitle && (
            <p className="text-sm text-gray-400 mt-1">{stat.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
