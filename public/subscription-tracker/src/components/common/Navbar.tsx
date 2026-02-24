import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, ArrowRight, Menu, X as XIcon } from 'lucide-react';

const navLinks = [
    { label: 'Recursos', href: '#recursos' },
    { label: 'Preços', href: '#precos' },
    { label: 'Sobre', href: '#sobre' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-4 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2 rounded-2xl transition-all duration-500 ${
                scrolled ? 'glass-navbar-scrolled' : 'glass-navbar'
            }`}
        >
            <div className="flex items-center justify-between px-5 py-3 sm:px-6">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-text-primary">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple to-purple-dark shadow-[0_0_14px_rgba(139,92,246,0.35)]">
                        <DollarSign className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-text-primary to-purple-light bg-clip-text text-transparent">
                        SubTracker
                    </span>
                </a>

                {/* Desktop nav links */}
                <div className="hidden items-center gap-1 sm:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-white/[0.06] hover:text-text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right side: CTA + mobile toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple to-purple-dark px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(139,92,246,0.5)] hover:brightness-110 active:scale-95"
                    >
                        Começar
                        <ArrowRight className="h-4 w-4" />
                    </a>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/[0.06] hover:text-text-primary sm:hidden"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <XIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile nav dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-white/[0.06] sm:hidden"
                    >
                        <div className="flex flex-col gap-1 px-5 py-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/[0.06] hover:text-text-primary"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
