import type { SummaryMetric } from "../../types/dashboard";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

interface SummaryCardProps {
  metric: SummaryMetric;
}

export default function SummaryCard({ metric }: SummaryCardProps) {
  const isCountdown = metric.title.toLowerCase().includes('due');

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-4 group hover:bg-white/10 transition-all hover:translate-y-[-2px]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{metric.title}</span>
        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
          {metric.icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-white mb-2">{metric.value}</h3>
        
        {isCountdown ? (
          <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 w-fit px-2 py-1 rounded-md">
            <Clock className="w-4 h-4" />
            <span>4 days remaining</span>
          </div>
        ) : metric.trend && (
          <div className={`flex items-center gap-1 text-sm ${metric.trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {metric.trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(metric.trend.value)}% from last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
