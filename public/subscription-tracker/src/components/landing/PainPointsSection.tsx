import { motion, type Variants, type Transition } from 'framer-motion';
import { Clock, Eye, RefreshCcw } from 'lucide-react';

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

export function PainPointsSection() {
    const points = [
        {
            icon: Eye,
            title: 'Taxas Escondidas',
            description: 'Pequenas cobranças que passam despercebidas no extrato vão se acumulando mês a mês sem você notar.',
        },
        {
            icon: RefreshCcw,
            title: 'Renovações Automáticas',
            description: 'Serviços que você esqueceu que assinou continuam renovando automaticamente e drenando seu dinheiro.',
        },
        {
            icon: Clock,
            title: 'Esquecimento de Testes Grátis',
            description: 'Aquele trial de 7 dias que você ia cancelar? Já virou 3 meses de cobrança na sua fatura.',
        },
    ];

    return (
        <section className="relative px-6 py-24 sm:py-32" id="sobre">
             {/* Section glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative z-10 mx-auto max-w-6xl"
            >
                <motion.div variants={fadeUp} className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                        Você está perdendo dinheiro — e nem sabe.
                    </h2>
                    <p className="mx-auto max-w-xl text-text-secondary">
                        Esses são os 3 vilões silenciosos que drenam suas finanças todos os meses.
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-3">
                    {points.map((point) => (
                        <motion.div
                            key={point.title}
                            variants={fadeUp}
                            className="group rounded-2xl border border-dark-border bg-dark-surface/40 p-8 transition-all hover:border-purple/40 hover:bg-dark-surface/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]"
                        >
                            <div className="mb-5 inline-flex rounded-xl bg-purple/10 p-3">
                                <point.icon className="h-6 w-6 text-purple-light" />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-text-primary">{point.title}</h3>
                            <p className="leading-relaxed text-text-secondary">{point.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
