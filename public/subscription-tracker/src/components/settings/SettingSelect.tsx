import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type SettingSelectOption<T extends string> = {
  value: T;
  label: string;
};

type SettingSelectProps<T extends string> = {
  label: string;
  options: SettingSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SettingSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: SettingSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-2">
      <span className="text-sm text-gray-400">{label}</span>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((previous) => !previous)}
        className={`flex w-full items-center justify-between rounded-xl border bg-black/20 px-4 py-2.5 text-left text-sm text-gray-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70 ${
          isOpen
            ? "border-purple-500/60 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <span>{selectedOption?.label ?? ""}</span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/96 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="space-y-1">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isSelected
                      ? "bg-purple-500/15 text-white"
                      : "text-slate-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-purple-300" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
