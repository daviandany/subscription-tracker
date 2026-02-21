import { DollarSign, RefreshCw, Zap } from "lucide-react";
import type { Activity } from "../types/dashboard";

export function useRecentActivities(): Activity[] {
  // In a real application, this would likely fetch data from an API
  // or use a state management library.
  const activities: Activity[] = [
    { id: 1, type: 'payment', title: 'Netflix Subscription', date: 'Today, 10:00 AM', amount: '-$15.99', icon: <DollarSign className="w-4 h-4" /> },
    { id: 2, type: 'renewal', title: 'Spotify Premium Renewed', date: 'Yesterday', amount: '-$9.99', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 3, type: 'new', title: 'Adobe Creative Cloud', date: 'Feb 15, 2026', amount: '-$54.99', icon: <Zap className="w-4 h-4" /> },
  ];

  return activities;
}
