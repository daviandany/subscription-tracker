import { DollarSign } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-dark-border px-6 py-12">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple">
                        <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    SubTracker
                </a>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
                    <a href="#" className="transition-colors hover:text-text-primary">Sobre</a>
                    <a href="#" className="transition-colors hover:text-text-primary">Recursos</a>
                    <a href="#" className="transition-colors hover:text-text-primary">Preços</a>
                    <a href="#" className="transition-colors hover:text-text-primary">Contato</a>
                    <a href="#" className="transition-colors hover:text-text-primary">Privacidade</a>
                </div>

                {/* Tagline */}
                <p className="text-center text-xs text-text-muted sm:text-right">
                    Seu dinheiro, sob seu controle. © {new Date().getFullYear()} SubTracker
                </p>
            </div>
        </footer>
    );
}
