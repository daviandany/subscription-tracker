import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import SubscriptionCard from "../components/dashboard/SubscriptionCard";
import AnalyticsSidebar from "../components/dashboard/AnalyticsSidebar";
import { navigationItems } from "../config/navigation";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { useSubscriptions } from "../hooks/useSubscriptions";

export default function HomePage() {
  const metrics = useDashboardMetrics();
  const subscriptions = useSubscriptions();

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome back, Davi. Here's your subscription overview.</p>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95">
            + New Subscription
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <SummaryCard key={metric.title} metric={metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Active Subscriptions</h2>
              <button className="text-sm text-purple-400 hover:text-purple-300">View all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.slice(0, 4).map(sub => (
                <SubscriptionCard key={sub.id} subscription={sub} />
              ))}
            </div>
            
            <div className="mt-4">
              <RecentActivity />
            </div>
          </div>

          <div className="lg:col-span-1">
            <AnalyticsSidebar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}