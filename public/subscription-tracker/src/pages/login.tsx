import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Shield } from "lucide-react"
import { AuthLayout } from "../components/auth/AuthLayout"
import { AuthCard } from "../components/auth/AuthCard"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function login() {
        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erro ao fazer login")
            }

            localStorage.setItem("token", data.token)
            navigate('/home')
        } catch (error: any) {
            setError(error.message || "Erro ao conectar com o servidor")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        login()
    }

    return (
        <AuthLayout>
            <AuthCard
                title="Bem-vindo de volta"
                subtitle="Entre na sua conta para ver suas assinaturas"
                icon={<Shield size={13} />}
                badgeText="Acesso seguro"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.35s_both]">
                        <label htmlFor="input-email" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">Email</label>
                        <input
                            id="input-email"
                            type="email"
                            required
                            value={email}
                            placeholder="seu@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-4 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6] hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)] focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] placeholder:text-[rgba(100,116,139,0.5)]"
                        />
                    </div>

                    {/* Senha */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.45s_both]">
                        <div className="flex items-center justify-between">
                            <label htmlFor="input-password" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">Senha</label>
                            <a href="#" className="text-[11px] text-[rgba(139,92,246,0.6)] no-underline transition-colors hover:text-[#8b5cf6]">Esqueceu?</a>
                        </div>
                        <input
                            id="input-password"
                            type="password"
                            required
                            value={password}
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-4 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6] hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)] focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)] placeholder:text-[rgba(100,116,139,0.5)]"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.22)] text-[13px] text-[#f87171] font-normal animate-[shake_0.35s_ease-in-out]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="relative flex items-center justify-center gap-2 w-full px-3.5 py-3.5 rounded-full border-none cursor-pointer text-sm font-bold tracking-wide text-white bg-[#8b5cf6] shadow-[0_0_28px_rgba(139,92,246,0.30),0_1px_0_rgba(255,255,255,0.15)_inset] overflow-hidden transition-all mt-1 animate-[fade-in_0.5s_ease-out_0.55s_both] hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.45),0_1px_0_rgba(255,255,255,0.2)_inset] hover:-translate-y-px active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/28 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
                        {isLoading ? (
                            <>
                                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Entrando...
                            </>
                        ) : (
                            <>
                                Entrar
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-[rgba(139,92,246,0.15)]" />
                    <p className="text-xs text-[#475569] whitespace-nowrap">Novo por aqui?</p>
                    <span className="flex-1 h-px bg-[rgba(139,92,246,0.15)]" />
                </div>

                {/* Sign up */}
                <a 
                    href="/register" 
                    className="flex items-center justify-center w-full py-3.5 rounded-full border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.04)] text-sm font-semibold text-[#a78bfa] no-underline transition-all cursor-pointer hover:border-[rgba(139,92,246,0.45)] hover:bg-[rgba(139,92,246,0.09)] hover:text-[#c4b5fd]"
                >
                    Criar conta gratuita
                </a>

            </AuthCard>
        </AuthLayout>
    )
}