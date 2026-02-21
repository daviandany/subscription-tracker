import { Link, useLocation } from "react-router-dom";
import type { NavigationItem } from "../../types/dashboard";

interface SidebarProps {
  items: NavigationItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
          SubTracker
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
