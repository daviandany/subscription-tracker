import { DollarSign } from 'lucide-react';
import type { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#0d0d0f] flex flex-col items-center relative overflow-hidden font-['DM_Sans','Segoe_UI',sans-serif] text-[#e2e8f0]">
            
            {/* Ambient glows */}
            <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18)_0%,transparent_70%)]" />
            <div className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.10)_0%,transparent_70%)]" />

            {/* Navbar */}
            <nav className="w-full max-w-[1200px] flex items-center px-8 py-5 relative z-10">
                <a href="/" className="flex items-center gap-2 text-lg font-bold text-[#f1f5f9] no-underline tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-[#8b5cf6] flex items-center justify-center">
                        <DollarSign size={18} color="#fff" />
                    </div>
                    SubTracker
                </a>
            </nav>

            <main className="flex-1 flex items-center justify-center px-4 py-6 pb-16 relative z-10 w-full">
                {children}
            </main>
        </div>
    );
}
