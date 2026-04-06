import { CheckCircle2, Power } from "lucide-react";

type SettingToggleButtonProps = {
  checked: boolean;
  label: string;
  onClick: () => void;
};

export function SettingToggleButton({ checked, label, onClick }: SettingToggleButtonProps) {
  const stateLabel = checked ? "Ativado" : "Desativado";
  const helperLabel = checked ? "Clique para desativar" : "Clique para ativar";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      aria-label={`${checked ? "Desativar" : "Ativar"} ${label}`}
      className={`group inline-flex min-w-[12rem] items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 ${
        checked
          ? "border-emerald-400/30 bg-[rgba(16,185,129,0.12)] text-emerald-50 shadow-[0_16px_40px_rgba(16,185,129,0.12)] hover:bg-[rgba(16,185,129,0.18)]"
          : "border-white/10 bg-slate-950/60 text-slate-100 hover:border-white/20 hover:bg-[rgba(255,255,255,0.08)]"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors ${
            checked
              ? "border-emerald-300/30 bg-[rgba(74,222,128,0.18)] text-emerald-200"
              : "border-white/10 bg-[rgba(255,255,255,0.06)] text-slate-300"
          }`}
        >
          {checked ? <CheckCircle2 className="h-5 w-5" /> : <Power className="h-5 w-5" />}
        </span>

        <span className="flex flex-col">
          <span className="text-sm font-semibold">{stateLabel}</span>
          <span className={`text-xs ${checked ? "text-emerald-100" : "text-slate-400"}`}>
            {helperLabel}
          </span>
        </span>
      </span>

      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${
          checked
            ? "bg-[rgba(167,243,208,0.16)] text-emerald-100 ring-1 ring-inset ring-emerald-200/30"
            : "bg-[rgba(255,255,255,0.06)] text-slate-300 ring-1 ring-inset ring-white/10"
        }`}
      >
        {checked ? "ON" : "OFF"}
      </span>
    </button>
  );
}
