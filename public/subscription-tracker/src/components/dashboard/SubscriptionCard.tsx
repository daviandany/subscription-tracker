import { Activity } from "lucide-react";
import type { Subscription } from "../../types/dashboard";

interface SubscriptionCardProps {
  subscription: Subscription;
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const progress = (subscription.daysUntilRenewal / 30) * 100;

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            {subscription.logo || <Activity className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="font-semibold text-white">{subscription.name}</h4>
            <p className="text-sm text-gray-400">{subscription.category}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-white">${subscription.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500">per month</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Renewal in {subscription.daysUntilRenewal} days</span>
          <span className="text-purple-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
