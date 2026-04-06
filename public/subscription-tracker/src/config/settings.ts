import type { DigestFrequency, SettingsState, ToggleSettingKey, WeekStart } from "../types/settings";

type SelectOption<T extends string> = {
  value: T;
  label: string;
};

type ToggleSettingDefinition = {
  key: ToggleSettingKey;
  title: string;
  description: string;
};

export const SETTINGS_STORAGE_KEY = "subscription-tracker.settings";

export const defaultSettings: SettingsState = {
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

export const currencyOptions: SelectOption<SettingsState["currency"]>[] = [
  { value: "BRL", label: "Real (R$)" },
  { value: "USD", label: "Dólar (US$)" },
  { value: "EUR", label: "Euro (€)" },
];

export const weekStartOptions: SelectOption<WeekStart>[] = [
  { value: "monday", label: "Segunda-feira" },
  { value: "sunday", label: "Domingo" },
];

export const digestFrequencyOptions: SelectOption<DigestFrequency>[] = [
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensal" },
];

export const toggleSettingItems: ToggleSettingDefinition[] = [
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
];
