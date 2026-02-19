import { motion, type Variants, type Transition } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';

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

export function PricingSection() {
    const plans = [
        {
            name: 'Free',
            price: 'R$ 0',
            period: '/mês',
            description: 'Para quem está começando a organizar suas assinaturas.',
            features: [
                { text: 'Até 5 assinaturas', included: true },
                { text: 'Dashboard básico', included: true },
                { text: 'Alertas por e-mail', included: true },
                { text: 'Relatórios avançados', included: false },
                { text: 'Categorização automática', included: false },
                { text: 'Suporte prioritário', included: false },
            ],
            cta: 'Começar Grátis',
            featured: false,
        },
        {
            name: 'Pro',
            price: 'R$ 5,90',
            period: '/mês',
            description: 'Para quem quer o controle total e máxima economia.',
            features: [
                { text: 'Assinaturas ilimitadas', included: true },
                { text: 'Dashboard completo', included: true },
                { text: 'Alertas por e-mail e push', included: true },
                { text: 'Relatórios avançados', included: true },
                { text: 'Categorização automática', included: true },
                { text: 'Suporte prioritário', included: true },
            ],
            cta: 'Assinar Pro',
            featured: true,
        },
    ];

    return (
        <section className="relative px-6 py-24 sm:py-32" id="precos">
            {/* Section glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />

            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-10 mx-auto max-w-5xl"
            >
                <motion.div variants={fadeUp} className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                        Simples e transparente.
                    </h2>
                    <p className="mx-auto max-w-xl text-text-secondary">
                        Sem surpresas. Escolha o plano que faz sentido para você.
                    </p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeUp}
                            className={`relative rounded-2xl border p-8 transition-all sm:p-10 ${plan.featured
                                    ? 'border-purple bg-gradient-to-b from-purple/10 to-dark-surface/40 shadow-[0_0_40px_rgba(139,92,246,0.12)]'
                                    : 'border-dark-border bg-dark-surface/30'
                                }`}
                        >
                            {plan.featured && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple px-4 py-1 text-xs font-bold text-white">
                                    Mais Popular
                                </span>
                            )}

                            <h3 className="mb-2 text-xl font-bold text-text-primary">{plan.name}</h3>
                            <p className="mb-6 text-sm text-text-secondary">{plan.description}</p>

                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-text-primary">{plan.price}</span>
                                <span className="text-text-muted">{plan.period}</span>
                            </div>

                            <ul className="mb-8 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature.text} className="flex items-center gap-3 text-sm">
                                        {feature.included ? (
                                            <Check className="h-4 w-4 shrink-0 text-green-accent" />
                                        ) : (
                                            <X className="h-4 w-4 shrink-0 text-text-muted" />
                                        )}
                                        <span className={feature.included ? 'text-text-primary' : 'text-text-muted'}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/login"
                                className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all active:scale-95 ${plan.featured
                                        ? 'bg-purple text-white shadow-[0_0_24px_rgba(139,92,246,0.3)] hover:bg-purple-dark hover:shadow-[0_0_40px_rgba(139,92,246,0.45)]'
                                        : 'border border-dark-border bg-dark-surface/50 text-text-primary hover:border-purple/40 hover:bg-dark-surface/80'
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
