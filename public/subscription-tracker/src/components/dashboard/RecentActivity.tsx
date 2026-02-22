import { useRecentActivities } from "../../hooks/useRecentActivities";

export default function RecentActivity() {
  const activities = useRecentActivities();

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-purple-400 transition-colors">
                {activity.icon}
              </div>
              <div>
                <p className="font-medium text-gray-200">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            </div>
            <span className="font-semibold text-white">{activity.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
