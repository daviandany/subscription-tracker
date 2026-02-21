import { Play, Tv, Cloud } from "lucide-react";
import type { Subscription } from "../types/dashboard";

export function useSubscriptions(): Subscription[] {
  return [
    {
      id: "1",
      name: "Netflix",
      category: "Entertainment",
      price: 15.99,
      daysUntilRenewal: 12,
      logo: <Play className="w-6 h-6" />
    },
    {
      id: "2",
      name: "Disney+",
      category: "Entertainment",
      price: 10.99,
      daysUntilRenewal: 5,
      logo: <Tv className="w-6 h-6" />
    },
    {
      id: "3",
      name: "AWS",
      category: "Infrastructure",
      price: 45.50,
      daysUntilRenewal: 22,
      logo: <Cloud className="w-6 h-6" />
    }
  ];
}
