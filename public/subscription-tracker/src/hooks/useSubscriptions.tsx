import { useEffect, useState } from "react";

export interface Subscription {
  id: string;
  userId: string;
  price: number;
  day: number;
  platform: string;
  category: string;
}

interface UseSubscriptionsReturn {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSubscriptions(): UseSubscriptionsReturn {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token"); // ajuste a chave se necessário

      const res = await fetch("http://localhost:3000/api/subscriptions/get-by-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Erro ${res.status}`);
      }

      const data: Subscription[] = await res.json();
      setSubscriptions(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return { subscriptions, loading, error, refetch: fetchSubscriptions };
}