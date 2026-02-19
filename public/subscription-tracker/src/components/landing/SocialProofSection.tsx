import { motion, type Variants, type Transition } from 'framer-motion';
import { DollarSign, Star, Users } from 'lucide-react';

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

export function SocialProofSection() {
    const stats = [
        { icon: Users, value: '+10.000', label: 'Usuários ativos' },
        { icon: DollarSign, value: 'R$ 2M', label: 'Economizados' },
        { icon: Star, value: '4.9/5', label: 'Estrelas' },
    ];

    return (
        <section className="px-6 py-20" id="recursos">
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
