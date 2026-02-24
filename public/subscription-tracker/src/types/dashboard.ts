import type { ReactNode } from "react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface SummaryMetric {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface Activity {
  id: number | string;
  type: string;
  title: string;
  date: string;
  amount: string;
  icon: ReactNode;
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  daysUntilRenewal: number;
  logo?: ReactNode;
}

export interface CategorySpending {
  category: string;
  amount: number;
  color: string;
}
