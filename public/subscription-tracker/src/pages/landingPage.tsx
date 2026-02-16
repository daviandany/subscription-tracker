import { motion, type Variants, type Transition } from 'framer-motion';
import {
    Eye,
    RefreshCcw,
    Clock,
    Users,
    DollarSign,
    Star,
    Check,
    X,
    ArrowRight,
    CreditCard,
    BarChart3,
    Bell,
    Shield,
} from 'lucide-react';

/* ─── animation variants ─── */
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

/* ─────────────────────────── NAVIGATION ─────────────────────────── */
function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple">
                        <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    SubTracker
                </a>

                {/* CTA */}
                <a
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-dark hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] active:scale-95"
                >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </nav>
    );
}

/* ─────────────────────────── HERO ─────────────────────────── */
function HeroSection() {
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

/* Fake dashboard inside a glassy browser frame */
function DashboardPreview() {
    return (
        <div className="overflow-hidden rounded-2xl border border-dark-border shadow-2xl shadow-purple/10">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-dark-border bg-dark-surface/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-4 flex-1 rounded-md bg-dark-bg/60 px-3 py-1 text-xs text-text-muted">app.subtracker.io/dashboard</span>
            </div>

            {/* Dashboard content */}
            <div className="bg-dark-bg/90 p-6 sm:p-8">
                {/* Stats row */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: 'Assinaturas Ativas', value: '12', icon: CreditCard, color: 'text-purple-light' },
                        { label: 'Gasto Mensal', value: 'R$ 489', icon: BarChart3, color: 'text-red-400' },
                        { label: 'Economia Potencial', value: 'R$ 127', icon: DollarSign, color: 'text-green-accent' },
                        { label: 'Alertas', value: '3', icon: Bell, color: 'text-yellow-400' },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-dark-border bg-dark-surface/50 p-4">
                            <div className="mb-2 flex items-center gap-2">
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                <span className="text-xs text-text-muted">{stat.label}</span>
                            </div>
                            <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                        </div>
                    ))}
                </div>

                {/* Fake subscription list */}
                <div className="space-y-3">
                    {[
                        { name: 'Netflix', price: 'R$ 55,90', status: 'Ativa', statusColor: 'bg-green-accent/20 text-green-accent' },
                        { name: 'Spotify', price: 'R$ 21,90', status: 'Ativa', statusColor: 'bg-green-accent/20 text-green-accent' },
                        { name: 'Adobe CC', price: 'R$ 224,00', status: 'Revisar', statusColor: 'bg-yellow-400/20 text-yellow-400' },
                        { name: 'Coursera', price: 'R$ 79,00', status: 'Cancelar', statusColor: 'bg-red-400/20 text-red-400' },
                    ].map((sub) => (
                        <div key={sub.name} className="flex items-center justify-between rounded-lg border border-dark-border bg-dark-surface/30 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple/20 text-sm font-bold text-purple-light">
                                    {sub.name[0]}
                                </div>
                                <span className="font-medium text-text-primary">{sub.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-text-primary">{sub.price}</span>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${sub.statusColor}`}>
                                    {sub.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────── PAIN POINTS ─────────────────────────── */
function PainPointsSection() {
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
        <section className="relative px-6 py-24 sm:py-32">
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

/* ─────────────────────────── SOCIAL PROOF ─────────────────────────── */
function SocialProofSection() {
    const stats = [
        { icon: Users, value: '+10.000', label: 'Usuários ativos' },
        { icon: DollarSign, value: 'R$ 2M', label: 'Economizados' },
        { icon: Star, value: '4.9/5', label: 'Estrelas' },
    ];

    return (
        <section className="px-6 py-20">
            <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-dark-border bg-gradient-to-r from-purple/10 via-dark-surface/60 to-purple/10"
            >
                <div className="grid grid-cols-1 divide-y divide-dark-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            className="flex flex-col items-center px-8 py-10"
                        >
                            <stat.icon className="mb-3 h-6 w-6 text-purple-light" />
                            <span className="mb-1 text-3xl font-extrabold text-text-primary sm:text-4xl">{stat.value}</span>
                            <span className="text-sm text-text-secondary">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

/* ─────────────────────────── PRICING ─────────────────────────── */
function PricingSection() {
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
            price: 'R$ 19,90',
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
        <section className="relative px-6 py-24 sm:py-32">
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

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
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

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */
export default function LandingPage() {
    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />
            <HeroSection />
            <PainPointsSection />
            <SocialProofSection />
            <PricingSection />
            <Footer />
        </div>
    );
}