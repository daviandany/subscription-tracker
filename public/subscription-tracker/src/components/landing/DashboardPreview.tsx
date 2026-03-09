import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { BarChart3, Bell, CreditCard, DollarSign, Plus, TrendingUp, Zap } from 'lucide-react';

/* ─── Animation presets ─── */
const springTransition: Transition = { type: 'spring', stiffness: 260, damping: 22 };

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { ...springTransition, delay: i * 0.1 },
    }),
};

const counterVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: -16, filter: 'blur(4px)', transition: { duration: 0.25 } },
};

/* ─── Data ─── */
interface Subscription {
    id: number;
    name: string;
    price: string;
    priceNum: number;
    color: string;
    icon: string;
    status: string;
    statusColor: string;
}

const baseSubscriptions: Subscription[] = [
    { id: 1, name: 'Spotify', price: 'R$ 21,90', priceNum: 21.90, color: 'from-green-500 to-green-600', icon: 'S', status: 'Ativa', statusColor: 'bg-green-accent/20 text-green-accent' },
    { id: 2, name: 'Adobe CC', price: 'R$ 224,00', priceNum: 224.00, color: 'from-red-500 to-rose-600', icon: 'A', status: 'Revisar', statusColor: 'bg-yellow-400/20 text-yellow-400' },
    { id: 3, name: 'iCloud', price: 'R$ 12,90', priceNum: 12.90, color: 'from-blue-400 to-blue-600', icon: 'i', status: 'Ativa', statusColor: 'bg-green-accent/20 text-green-accent' },
];

const newSubscription: Subscription = {
    id: 4, name: 'Netflix', price: 'R$ 55,90', priceNum: 55.90, color: 'from-red-600 to-red-700', icon: 'N', status: 'Ativa', statusColor: 'bg-green-accent/20 text-green-accent',
};

const baseTotal = baseSubscriptions.reduce((a, s) => a + s.priceNum, 0);
const finalTotal = baseTotal + newSubscription.priceNum;

/* ─── Animated Number ─── */
function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const duration = 800;
        const start = performance.now();
        const from = display;
        const to = value;

        function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return <>{prefix}{display.toFixed(2).replace('.', ',')}</>;
}

/* ─── Animated Stat Card ─── */
function StatCard({ icon: Icon, label, value, color, delay }: {
    icon: typeof CreditCard;
    label: string;
    value: string;
    color: string;
    delay: number;
}) {
    return (
        <motion.div
            custom={delay}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="group rounded-xl border border-dark-border bg-dark-surface/40 p-4 transition-all duration-300 hover:border-purple/30 hover:bg-dark-surface/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.06)]"
        >
            <div className="mb-2 flex items-center gap-2">
                <div className={`rounded-lg p-1.5 ${color}`}>
                    <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs text-text-muted">{label}</span>
            </div>
            <span className="text-xl font-bold text-text-primary">{value}</span>
        </motion.div>
    );
}

/* ─── Main Component ─── */
export function DashboardPreview() {
    const [subs, setSubs] = useState<Subscription[]>(baseSubscriptions);
    const [total, setTotal] = useState(baseTotal);
    const [showCursor, setShowCursor] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    const [cycle, setCycle] = useState(0);

    const resetAndReplay = useCallback(() => {
        setSubs(baseSubscriptions);
        setTotal(baseTotal);
        setShowCursor(false);
        setButtonActive(false);
        setCycle(c => c + 1);
    }, []);

    useEffect(() => {
        // Phase 1: Show cursor moving to button (2s after mount/cycle)
        const t1 = setTimeout(() => setShowCursor(true), 2000);

        // Phase 2: Click animation (3.2s)
        const t2 = setTimeout(() => {
            setButtonActive(true);
            setShowCursor(false);
        }, 3200);

        // Phase 3: Add subscription (3.6s)
        const t3 = setTimeout(() => {
            setSubs(prev => [...prev, newSubscription]);
            setTotal(finalTotal);
        }, 3600);

        // Phase 4: Reset button (4.2s)
        const t4 = setTimeout(() => setButtonActive(false), 4200);

        // Phase 5: Reset cycle (8s)
        const t5 = setTimeout(resetAndReplay, 8000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            clearTimeout(t5);
        };
    }, [cycle, resetAndReplay]);

    return (
        <div className="overflow-hidden rounded-2xl border border-dark-border shadow-2xl shadow-purple/10 relative">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12)_0%,transparent_70%)]" />

            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-dark-border bg-dark-surface/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-4 flex-1 rounded-md bg-dark-bg/60 px-3 py-1 text-xs text-text-muted">app.subtracker.io/dashboard</span>
            </div>

            {/* Dashboard content */}
            <div className="relative bg-dark-bg/90 p-5 sm:p-8">
                {/* Stats row */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    <StatCard icon={CreditCard} label="Assinaturas" value={String(subs.length)} color="bg-purple/20 text-purple-light" delay={0} />
                    <StatCard icon={BarChart3} label="Gasto Mensal" value={`R$ ${total.toFixed(0)}`} color="bg-rose-accent/20 text-rose-accent" delay={1} />
                    <StatCard icon={DollarSign} label="Economia" value="R$ 127" color="bg-green-accent/20 text-green-accent" delay={2} />
                    <StatCard icon={Bell} label="Alertas" value="3" color="bg-yellow-400/20 text-yellow-400" delay={3} />
                </div>

                {/* Mini Chart Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mb-6 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-text-muted">Projeção Semanal</span>
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-1.5 w-1.5 rounded-full bg-purple/40" />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-end gap-2 h-16">
                        {[40, 65, 45, 90, 55, 75, 60].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: 2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                                className={`flex-1 rounded-t-sm transition-colors ${i === 3 ? 'bg-purple-light shadow-[0_0_10px_rgba(167,139,250,0.4)]' : 'bg-purple/20 group-hover:bg-purple/30'}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Subscription list header */}
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <TrendingUp className="h-4 w-4 text-purple-light" />
                        Minhas Assinaturas
                    </h4>
                    <motion.button
                        animate={buttonActive
                            ? { scale: [1, 0.92, 1.05, 1], backgroundColor: 'rgba(139, 92, 246, 0.8)' }
                            : { scale: 1, backgroundColor: 'rgba(139, 92, 246, 0.2)' }
                        }
                        transition={{ duration: 0.35 }}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-purple-light"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Adicionar</span>
                    </motion.button>
                </div>

                {/* Hero metric — animated total */}
                <div className="mb-5 rounded-xl border border-dark-border bg-gradient-to-r from-dark-surface/60 to-dark-surface/30 p-5 relative overflow-hidden">
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple/[0.04] to-transparent" />
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted">Gasto Mensal Total</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-purple-light">R$</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={total}
                                variants={counterVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl"
                            >
                                <AnimatedNumber value={total} />
                            </motion.span>
                        </AnimatePresence>
                        <span className="ml-1 text-sm text-text-muted">/mês</span>
                    </div>
                </div>

                {/* Subscription cards */}
                <div className="space-y-2.5">
                    <AnimatePresence>
                        {subs.map((sub, i) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, x: -20, scale: 0.96 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.96 }}
                                transition={{ ...springTransition, delay: i * 0.08 }}
                                className="group flex items-center justify-between rounded-xl border border-dark-border bg-dark-surface/30 px-4 py-3 transition-all duration-200 hover:border-purple/20 hover:bg-dark-surface/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${sub.color} text-sm font-bold text-white shadow-lg`}>
                                        {sub.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">{sub.name}</p>
                                        <p className="text-xs text-text-muted">Mensal</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-text-primary">{sub.price}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${sub.statusColor}`}>
                                        {sub.status}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Fake animated cursor */}
                <AnimatePresence>
                    {showCursor && (
                        <motion.div
                            initial={{ opacity: 0, x: '40%', y: '30%' }}
                            animate={{ opacity: 1, x: '85%', y: '18%' }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                            className="pointer-events-none absolute z-20"
                        >
                            {/* Cursor SVG */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">
                                <path d="M5.5 3.21V20.79c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L5.85 2.35c-.31-.31-.85-.09-.85.35l0 .51Z" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1.5" />
                            </svg>
                            {/* Cursor glow */}
                            <div className="absolute -inset-2 rounded-full bg-purple/30 blur-md" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
