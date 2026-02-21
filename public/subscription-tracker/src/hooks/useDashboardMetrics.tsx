import { DollarSign, CreditCard, TrendingUp } from "lucide-react";
import type { SummaryMetric } from "../types/dashboard";

export function useDashboardMetrics(): SummaryMetric[] {
  // In a real application, this would fetch data from an API
  // and manage loading/error states.
  const metrics: SummaryMetric[] = [
    {
      title: "Monthly Spending",
      value: "$124.50",
      icon: <DollarSign className="w-5 h-5" />,
      trend: { value: 12.5, isPositive: false }
    },
    {
      title: "Active Subscriptions",
      value: "8",
      icon: <CreditCard className="w-5 h-5" />,
      trend: { value: 2, isPositive: true }
    },
    {
      title: "Upcoming Renewals",
      value: "3",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  return metrics;
}
