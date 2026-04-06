import { SettingToggleButton } from "./SettingToggleButton";

type SettingToggleCardProps = {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
};

export function SettingToggleCard({
  title,
  description,
  checked,
  onToggle,
}: SettingToggleCardProps) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all md:flex-row md:items-center md:justify-between ${
        checked
          ? "border-emerald-400/20 bg-[rgba(16,185,129,0.08)]"
          : "border-white/10 bg-black/20 hover:border-white/15"
      }`}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              checked
                ? "border-emerald-400/28 bg-[rgba(74,222,128,0.12)] text-emerald-200"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${checked ? "bg-emerald-300" : "bg-slate-500"}`} />
            {checked ? "Ativo" : "Inativo"}
          </span>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-slate-400">{description}</p>
      </div>

      <SettingToggleButton checked={checked} label={title} onClick={onToggle} />
    </article>
  );
}
