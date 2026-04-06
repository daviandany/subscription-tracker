import { CreditCard, LayoutDashboard, PieChart, Settings2 } from "lucide-react";
import type { NavigationItem } from "../types/dashboard";

export const navigationItems: NavigationItem[] = [
  { name: "Dashboard", href: "/home", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Subscriptions", href: "/subscriptions", icon: <CreditCard className="w-5 h-5" /> },
  { name: "Analytics", href: "/analytics", icon: <PieChart className="w-5 h-5" /> },
  { name: "Settings", href: "/settings", icon: <Settings2 className="w-5 h-5" /> },
];
