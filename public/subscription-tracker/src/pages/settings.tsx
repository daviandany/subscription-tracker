import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCircle2, RotateCcw, Save, Settings2, SlidersHorizontal, UserRound } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { navigationItems } from "../config/navigation";

type DigestFrequency = "daily" | "weekly" | "monthly";
type WeekStart = "sunday" | "monday";

type SettingsState = {
  fullName: string;
  email: string;
  currency: string;
  renewalReminderDays: number;
  digestFrequency: DigestFrequency;
  weekStart: WeekStart;
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  compactCards: boolean;
};

const STORAGE_KEY = "subscription-tracker.settings";

const defaultSettings: SettingsState = {
  fullName: "Davi",
  email: "davi@email.com",
  currency: "BRL",
  renewalReminderDays: 3,
  digestFrequency: "weekly",
  weekStart: "monday",
  emailNotifications: true,
  pushNotifications: false,
  darkMode: true,
  compactCards: false,
};

function Toggle({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={`relative h-7 w-12 rounded-full transition-colors ${
        checked ? "bg-purple-500" : "bg-white/15"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    const rawSettings = window.localStorage.getItem(STORAGE_KEY);
    if (!rawSettings) return;

    try {
      const parsed = JSON.parse(rawSettings) as Partial<SettingsState>;
      setSettings((previous) => ({ ...previous, ...parsed }));
    } catch {
      setSettings(defaultSettings);
    }
  }, []);

  const lastSaveLabel = useMemo(() => {
    if (!savedAt) return "";

    return savedAt.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [savedAt]);

  const updateField = <K extends keyof SettingsState>(field: K, value: SettingsState[K]) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
  };

  const handleSave = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSavedAt(new Date());
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    setSavedAt(new Date());
  };

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Configurações</h1>
            <p className="text-gray-400">
              Personalize sua experiência, notificações e preferências da conta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar padrão
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-colors shadow-lg shadow-purple-500/20"
            >
              <Save className="w-4 h-4" />
              Salvar alterações
            </button>
          </div>
        </div>

        {savedAt && (
          <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
            <CheckCircle2 className="w-4 h-4" />
            Configurações salvas às {lastSaveLabel}.
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
            <div className="flex items-center gap-2 text-white">
              <UserRound className="w-4 h-4 text-purple-300" />
              <h2 className="font-semibold">Perfil da conta</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">Nome</span>
                <input
                  value={settings.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">E-mail</span>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">Moeda padrão</span>
                <select
                  value={settings.currency}
                  onChange={(event) => updateField("currency", event.target.value)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60"
                >
                  <option value="BRL">Real (R$)</option>
                  <option value="USD">Dólar (US$)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">Dia inicial da semana</span>
                <select
                  value={settings.weekStart}
                  onChange={(event) => updateField("weekStart", event.target.value as WeekStart)}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60"
                >
                  <option value="monday">Segunda-feira</option>
                  <option value="sunday">Domingo</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
            <div className="flex items-center gap-2 text-white">
              <SlidersHorizontal className="w-4 h-4 text-purple-300" />
              <h2 className="font-semibold">Preferências</h2>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">Lembrete de renovação</span>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <input
                  min={1}
                  max={30}
                  type="range"
                  value={settings.renewalReminderDays}
                  onChange={(event) => updateField("renewalReminderDays", Number(event.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Avisar {settings.renewalReminderDays} dia(s) antes do vencimento.
                </p>
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">Resumo automático</span>
              <select
                value={settings.digestFrequency}
                onChange={(event) => updateField("digestFrequency", event.target.value as DigestFrequency)}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60"
              >
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </label>
          </section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-white mb-6">
            <Bell className="w-4 h-4 text-purple-300" />
            <h2 className="font-semibold">Notificações e interface</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                key: "emailNotifications",
                title: "Notificações por e-mail",
                description: "Receba alertas sobre cobranças futuras e mudanças de preço.",
              },
              {
                key: "pushNotifications",
                title: "Notificações push",
                description: "Ative alertas em tempo real para novos eventos da conta.",
              },
              {
                key: "darkMode",
                title: "Modo escuro",
                description: "Use o tema escuro para melhor conforto visual.",
              },
              {
                key: "compactCards",
                title: "Cards compactos",
                description: "Mostra mais assinaturas por tela no dashboard.",
              },
            ].map((item) => {
              const key = item.key as keyof Pick<
                SettingsState,
                "emailNotifications" | "pushNotifications" | "darkMode" | "compactCards"
              >;

              return (
                <article
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div>
                    <h3 className="text-sm font-medium text-white">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                  </div>
                  <Toggle
                    checked={settings[key]}
                    onClick={() => updateField(key, !settings[key])}
                  />
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 flex items-start gap-3">
          <Settings2 className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
          <p className="text-sm text-purple-100/90 leading-relaxed">
            Essas configurações ficam salvas no seu navegador para facilitar a personalização local da plataforma.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
}