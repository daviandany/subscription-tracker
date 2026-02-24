import type { ReactNode } from 'react';

interface AuthCardProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    icon?: ReactNode;
    badgeText?: string;
}

export function AuthCard({ children, title, subtitle, icon, badgeText }: AuthCardProps) {
    return (
        <div className="w-full max-w-[440px] bg-gradient-to-br from-[#141418] via-[#0f0f13] to-[#121216] border border-[rgba(139,92,246,0.18)] rounded-[20px] p-9 shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(139,92,246,0.06)_inset,0_1px_0_rgba(139,92,246,0.14)_inset] animate-[slide-up_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]">
            
            {/* Badge */}
            {(icon || badgeText) && (
                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.08)] text-[11px] font-medium text-[#a78bfa] tracking-wide mb-6">
                    {icon}
                    {badgeText}
                </div>
            )}

            {/* Header */}
            <div className="mb-7">
                <h1 className="text-[26px] font-extrabold tracking-tight leading-tight text-[#f1f5f9] mb-2">
                    {title}
                </h1>
                <p className="text-sm text-[#64748b] leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {children}

            <style>{`
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25%      { transform: translateX(-6px); }
                    75%      { transform: translateX(6px); }
                }
            `}</style>
        </div>
    );
}
