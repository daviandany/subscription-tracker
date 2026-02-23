import { BarChart3, Bell, CreditCard, DollarSign } from 'lucide-react';

/* Fake dashboard inside a glassy browser frame */
export function DashboardPreview() {
    return (
        <div className="overflow-hidden rounded-2xl border border-dark-border shadow-2xl shadow-purple/10">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-dark-border bg-dark-surface/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-4 flex-1 rounded-md bg-dark-bg/60 px-3 py-1 text-xs text-text-muted">app.subtracker/dashboard</span>
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
