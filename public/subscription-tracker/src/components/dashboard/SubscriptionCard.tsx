import { Activity } from "lucide-react";

interface Subscription {
  id: string;
  userId: string;
  price: number;
  day: number;       // day of month for renewal (1–31)
  platform: string;
  category: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

function daysUntilRenewal(day: number): number {
  const now = new Date();
  const current = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  if (day >= current) return day - current;
  return daysInMonth - current + day;
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const days = daysUntilRenewal(subscription.day);
  const progress = Math.min(100, Math.round((days / 30) * 100));

  const urgencyColor =
    days <= 3 ? "#f87171" : days <= 7 ? "#f59e0b" : "#a78bfa";

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white">{subscription.platform}</h4>
            <p className="text-sm text-gray-400">{subscription.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-white">
            R$ {Number(subscription.price).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">por mês</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            Renova em{" "}
            <strong style={{ color: urgencyColor }}>
              {days === 0 ? "hoje" : `${days} dia${days !== 1 ? "s" : ""}`}
            </strong>
          </span>
          <span className="text-xs font-medium" style={{ color: urgencyColor }}>
            {progress}%
          </span>
        </div>
        <div className="progress-bar h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="progress-fill h-full bg-purple-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}