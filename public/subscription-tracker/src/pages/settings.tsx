import { useEffect, useState } from "react";
import { Bell, CheckCircle2, RotateCcw, Save, Settings2, SlidersHorizontal, UserRound } from "lucide-react";
import { SettingSelect } from "../components/settings/SettingSelect";
import { SettingToggleCard } from "../components/settings/SettingToggleCard";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  currencyOptions,
  defaultSettings,
  digestFrequencyOptions,
  SETTINGS_STORAGE_KEY,
  toggleSettingItems,
  weekStartOptions,
} from "../config/settings";
import { navigationItems } from "../config/navigation";
import type { SettingsState, ToggleSettingKey } from "../types/settings";

const panelClassName = "rounded-2xl border border-white/10 bg-white/5 p-6";
const fieldClassName =
  "rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-purple-500/60";
const secondaryActionButtonClassName =
  "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-gray-200 transition-all hover:border-white/20 hover:bg-white/10";
const primaryActionButtonClassName =
  "inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-600 px-5 py-2 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-500 hover:shadow-purple-500/30";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(() => ({ ...defaultSettings }));
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    const rawSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!rawSettings) return;

    try {
      const parsed = JSON.parse(rawSettings) as Partial<SettingsState>;
      setSettings((previous) => ({ ...previous, ...parsed }));
    } catch {
      setSettings({ ...defaultSettings });
    }
  }, []);

  const lastSaveLabel =
    savedAt?.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }) ?? "";

  const updateField = <K extends keyof SettingsState>(field: K, value: SettingsState[K]) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
  };

  const handleSave = () => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    setSavedAt(new Date());
  };

  const handleReset = () => {
    setSettings({ ...defaultSettings });
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
    setSavedAt(new Date());
  };

  const toggleSetting = (field: ToggleSettingKey) => {
    updateField(field, !settings[field]);
  };

  return (
    <DashboardLayout navigationItems={navigationItems}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white">Configurações</h1>
            <p className="text-gray-400">
              Personalize sua experiência, notificações e preferências da conta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={handleReset} className={secondaryActionButtonClassName}>
              <RotateCcw className="w-4 h-4" />
              Restaurar padrão
            </button>
            <button type="button" onClick={handleSave} className={primaryActionButtonClassName}>
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

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className={`${panelClassName} space-y-5 xl:col-span-2`}>
            <div className="flex items-center gap-2 text-white">
              <UserRound className="w-4 h-4 text-purple-300" />
              <h2 className="font-semibold">Perfil da conta</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">Nome</span>
                <input
                  value={settings.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  className={fieldClassName}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-400">E-mail</span>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={fieldClassName}
                />
              </label>

              <SettingSelect
                label="Moeda padrão"
                options={currencyOptions}
                value={settings.currency}
                onChange={(value) => updateField("currency", value)}
              />

              <SettingSelect
                label="Dia inicial da semana"
                options={weekStartOptions}
                value={settings.weekStart}
                onChange={(value) => updateField("weekStart", value)}
              />
            </div>
          </section>

          <section className={`${panelClassName} space-y-5`}>
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

            <SettingSelect
              label="Resumo automático"
              options={digestFrequencyOptions}
              value={settings.digestFrequency}
              onChange={(value) => updateField("digestFrequency", value)}
            />
          </section>
        </div>

        <section className={panelClassName}>
          <div className="mb-3 flex items-center gap-2 text-white">
            <Bell className="w-4 h-4 text-purple-300" />
            <h2 className="font-semibold">Notificações e interface</h2>
          </div>

          <p className="mb-6 text-sm text-slate-400">
            Os controles abaixo deixam mais claro o que está ativo ou inativo e permitem alternar cada opção com um clique.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {toggleSettingItems.map((item) => (
              <SettingToggleCard
                key={item.key}
                title={item.title}
                description={item.description}
                checked={settings[item.key]}
                onToggle={() => toggleSetting(item.key)}
              />
            ))}
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
          <Settings2 className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
          <p className="text-sm text-purple-100/90 leading-relaxed">
            Essas configurações ficam salvas no seu navegador para facilitar a personalização local da plataforma.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
}
