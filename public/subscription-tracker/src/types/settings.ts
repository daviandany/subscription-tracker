export type DigestFrequency = "daily" | "weekly" | "monthly";
export type WeekStart = "sunday" | "monday";

export type SettingsState = {
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

export type ToggleSettingKey = keyof Pick<
  SettingsState,
  "emailNotifications" | "pushNotifications" | "darkMode" | "compactCards"
>;
