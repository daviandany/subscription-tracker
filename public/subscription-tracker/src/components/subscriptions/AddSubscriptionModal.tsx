import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { SUBSCRIPTION_CATEGORIES } from "../../types/subscription";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSubscriptionModal({ isOpen, onClose, onSuccess }: AddSubscriptionModalProps) {
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!platform.trim() || !category || !price || !day) {
      setError("Preencha todos os campos.");
      return;
    }

    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      setError("Dia de renovação deve ser entre 1 e 31.");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Preço inválido.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          platform: platform.trim(),
          category,
          price: priceNum,
          day: dayNum,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Erro ${res.status}`);
      }

      // Reset form and close
      setPlatform("");
      setCategory("");
      setPrice("");
      setDay("");
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const categories = SUBSCRIPTION_CATEGORIES.filter((c) => c !== "Todas");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 p-6 rounded-2xl bg-[#0f0f23]/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-500/10 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Nova Assinatura</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Plataforma
            </label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Ex: Netflix, Spotify..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
            >
              <option value="" className="bg-[#1a1a2e]">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1a1a2e]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Day row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.90"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Dia da Renovação
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="15"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adicionando...
              </>
            ) : (
              "Adicionar Assinatura"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
