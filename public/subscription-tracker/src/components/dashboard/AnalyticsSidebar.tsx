import type { CategorySpending } from "../../types/dashboard";

export default function AnalyticsSidebar() {
  const categorySpending: CategorySpending[] = [
    { category: "Entertainment", amount: 45.98, color: "#8B5CF6" },
    { category: "Infrastructure", amount: 120.50, color: "#34D399" },
    { category: "Work", amount: 35.00, color: "#F59E0B" },
  ];

  const total = categorySpending.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white mb-6">Spending by Category</h3>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
            />
            {/* Simple static donut chart for demo - can be made dynamic later */}
            <circle
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke="#8B5CF6"
              strokeWidth="12"
              strokeDasharray="180 251.2"
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke="#34D399"
              strokeWidth="12"
              strokeDasharray="60 251.2"
              strokeDashoffset="-180"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">${total.toFixed(0)}</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
        </div>

        <div className="space-y-3">
          {categorySpending.map(item => (
            <div key={item.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-300">{item.category}</span>
              </div>
              <span className="text-sm font-medium text-white">${item.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white mb-4">Projected Yearly Cost</h3>
        <p className="text-3xl font-bold text-white mb-4">$1,494.00</p>
        <div className="h-24 flex items-end gap-2">
          {[40, 60, 45, 70, 55, 85, 65, 90].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-purple-500/20 rounded-t-sm hover:bg-purple-500/50 transition-colors"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
