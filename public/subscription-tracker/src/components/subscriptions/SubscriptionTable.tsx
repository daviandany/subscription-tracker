import { Activity, Trash2 } from "lucide-react";
import type { Subscription } from "../../types/subscription";

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onDelete?: (id: string) => void;
}

function daysUntilRenewal(day: number): number {
  const now = new Date();
  const current = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  if (day >= current) return day - current;
  return daysInMonth - current + day;
}

export default function SubscriptionTable({ subscriptions, onDelete }: SubscriptionTableProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-500">
        <Activity className="w-10 h-10 opacity-30" />
        <span className="text-sm">Nenhuma assinatura encontrada.</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Plataforma
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Categoria
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Preço
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Renovação
              </th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {subscriptions.map((sub) => {
              const days = daysUntilRenewal(sub.day);
              const urgencyColor =
                days <= 3 ? "text-red-400" : days <= 7 ? "text-amber-400" : "text-emerald-400";
              const urgencyBg =
                days <= 3 ? "bg-red-500/10" : days <= 7 ? "bg-amber-500/10" : "bg-emerald-500/10";

              return (
                <tr
                  key={sub.id}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-white">{sub.platform}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium text-gray-300">
                      {sub.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-white">
                      R$ {Number(sub.price).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    Dia {sub.day}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${urgencyColor} ${urgencyBg}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          days <= 3 ? "bg-red-400" : days <= 7 ? "bg-amber-400" : "bg-emerald-400"
                        }`}
                      />
                      {days === 0 ? "Hoje" : `${days} dia${days !== 1 ? "s" : ""}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {onDelete && (
                      <button
                        onClick={() => onDelete(sub.id)}
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-white/5">
        {subscriptions.map((sub) => {
          const days = daysUntilRenewal(sub.day);
          const urgencyColor =
            days <= 3 ? "text-red-400" : days <= 7 ? "text-amber-400" : "text-emerald-400";

          return (
            <div key={sub.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{sub.platform}</p>
                  <p className="text-xs text-gray-500">{sub.category}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-white">
                  R$ {Number(sub.price).toFixed(2)}
                </p>
                <p className={`text-xs ${urgencyColor}`}>
                  {days === 0 ? "Hoje" : `${days}d`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
