import { motion, type Variants, type Transition } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';

const fadeUpTransition: Transition = {
    duration: 0.6,
    ease: 'easeOut',
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: fadeUpTransition,
    },
};

const stagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export function HeroSection() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
            {/* Glow background */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

            <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto max-w-4xl text-center"
            >
                {/* Badge */}
                <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-dark-border bg-dark-surface/60 px-4 py-1.5 text-xs font-medium text-purple-light">
                    <Shield className="h-3.5 w-3.5" />
                    Controle financeiro inteligente
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={fadeUp}
                    className="mb-6 bg-gradient-to-b from-white to-text-secondary bg-clip-text text-5xl leading-tight font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                >
                    Pare de queimar dinheiro com assinaturas esquecidas.
                </motion.h1>

                {/* Sub-headline */}
                <motion.p
                    variants={fadeUp}
                    className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl"
                >
                    Tome o controle total dos seus gastos recorrentes em um só lugar.
                    Economize em média <span className="font-semibold text-green-accent">R$ 1.200 por ano</span> identificando o que você não usa.
                </motion.p>

                {/* CTA */}
                <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
                    <a
                        href="/login"
                        className="inline-flex items-center gap-2 rounded-full bg-purple px-8 py-4 text-lg font-bold text-white shadow-[0_0_32px_rgba(139,92,246,0.35)] transition-all hover:bg-purple-dark hover:shadow-[0_0_48px_rgba(139,92,246,0.5)] active:scale-95"
                    >
                        Começar Gratuitamente
                        <ArrowRight className="h-5 w-5" />
                    </a>
                    <span className="text-sm text-text-muted">Sem cartão de crédito necessário</span>
                </motion.div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="relative z-10 mx-auto mt-16 w-full max-w-5xl"
            >
                <DashboardPreview />
            </motion.div>
        </section>
    );
}
