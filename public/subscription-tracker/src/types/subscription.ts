export interface Subscription {
  id: string;
  userId: string;
  price: number;
  day: number;
  platform: string;
  category: string;
}

export interface SubscriptionFiltersState {
  search: string;
  category: string;
  sortBy: "platform" | "price" | "day";
  sortOrder: "asc" | "desc";
}

export const SUBSCRIPTION_CATEGORIES = [
  "Todas",
  "Entretenimento",
  "Infraestrutura",
  "Trabalho",
  "Educação",
  "Saúde",
  "Outros",
] as const;

export type SubscriptionCategory = (typeof SUBSCRIPTION_CATEGORIES)[number];
