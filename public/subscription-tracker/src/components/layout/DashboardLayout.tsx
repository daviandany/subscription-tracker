import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { NavigationItem } from "../../types/dashboard";

interface DashboardLayoutProps {
  children: ReactNode;
  navigationItems: NavigationItem[];
}

export default function DashboardLayout({ children, navigationItems }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <Sidebar items={navigationItems} />
      
      <div className="flex-1 flex flex-col relative z-10 w-full h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto p-4 md:p-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
