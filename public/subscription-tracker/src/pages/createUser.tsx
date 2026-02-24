import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Shield, User, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { AuthLayout } from "../components/auth/AuthLayout"
import { AuthCard } from "../components/auth/AuthCard"

export default function CreateUserPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    // Password strength validation
    const validatePassword = (pwd: string): string[] => {
        const issues: string[] = []
        if (pwd.length < 6) issues.push("Mínimo de 6 caracteres")
        if (!/[A-Z]/.test(pwd)) issues.push("Uma letra maiúscula")
        if (!/[0-9]/.test(pwd)) issues.push("Um número")
        return issues
    }

    const passwordIssues = password ? validatePassword(password) : []
    const passwordsMatch = password && confirmPassword && password === confirmPassword

    async function register() {
        const validationErrors: string[] = []
        
        if (!name.trim()) validationErrors.push("Nome é obrigatório")
        if (!email.trim()) validationErrors.push("Email é obrigatório")
        if (!password) validationErrors.push("Senha é obrigatória")
        if (password !== confirmPassword) validationErrors.push("As senhas não coincidem")
        if (passwordIssues.length > 0) {
            validationErrors.push(`Senha fraca: ${passwordIssues.join(", ")}`)
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors([])
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password: password,
                    confirmPassword: confirmPassword
                })
            })

            const data = await response.json()

            if (!response.ok) {
                // Handle different error scenarios
                if (response.status === 409) {
                    setErrors(["Este email já está cadastrado"])
                } else if (data.errors && Array.isArray(data.errors)) {
                    setErrors(data.errors)
                } else if (data.error) {
                    setErrors([data.error])
                } else {
                    setErrors(["Erro ao criar conta. Tente novamente."])
                }
                return
            }
            
            // Success
            setSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 1500)

        } catch (error: any) {
            setErrors(["Erro ao conectar com o servidor. Verifique sua conexão."])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        register()
    }

    return (
        <AuthLayout>
            <AuthCard
                title="Crie sua conta"
                subtitle="Comece a controlar suas assinaturas hoje mesmo"
                icon={<Shield size={13} />}
                badgeText="Cadastro seguro"
            >
                {/* Success Message */}
                {success && (
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.25)] text-[#4ade80] text-sm font-medium mb-4 animate-[fade-in_0.4s_ease-out]">
                        <CheckCircle2 size={16} className="shrink-0" />
                        Conta criada com sucesso! Redirecionando...
                    </div>
                )}

                {/* Error Messages */}
                {errors.length > 0 && (
                    <div className="rounded-xl bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.22)] p-4 mb-4 animate-[shake_0.35s_ease-in-out]">
                        <div className="flex items-start gap-2.5 mb-2">
                            <AlertCircle size={16} className="text-[#f87171] shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#f87171]">
                                {errors.length === 1 ? "Erro encontrado" : `${errors.length} erros encontrados`}
                            </span>
                        </div>
                        <ul className="space-y-1.5 pl-6">
                            {errors.map((error, idx) => (
                                <li key={idx} className="text-sm text-[#fca5a5] list-disc">
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.35s_both]">
                        <label htmlFor="input-name" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">
                            Nome Completo
                        </label>
                        <div className="relative flex items-center">
                            <User size={16} className="absolute left-3.5 text-[#64748b] pointer-events-none transition-colors" />
                            <input
                                id="input-name"
                                type="text"
                                required
                                value={name}
                                placeholder="Seu nome"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6]
                                hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)]
                                focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]
                                placeholder:text-[rgba(100,116,139,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.4s_both]">
                        <label htmlFor="input-email" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">
                            Email
                        </label>
                        <div className="relative flex items-center">
                            <Mail size={16} className="absolute left-3.5 text-[#64748b] pointer-events-none transition-colors" />
                            <input
                                id="input-email"
                                type="email"
                                required
                                value={email}
                                placeholder="seu@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6]
                                hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)]
                                focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]
                                placeholder:text-[rgba(100,116,139,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.45s_both]">
                        <label htmlFor="input-password" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">
                            Senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-3.5 text-[#64748b] pointer-events-none transition-colors" />
                            <input
                                id="input-password"
                                type="password"
                                required
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6]
                                hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)]
                                focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]
                                placeholder:text-[rgba(100,116,139,0.5)]"
                            />
                        </div>
                        
                        {/* Password strength indicators */}
                        {password && (
                            <div className="flex flex-col gap-1.5 mt-1 px-1">
                                {passwordIssues.length === 0 ? (
                                    <div className="flex items-center gap-1.5 text-xs text-[#4ade80]">
                                        <CheckCircle2 size={12} />
                                        Senha forte
                                    </div>
                                ) : (
                                    <div className="text-xs text-[#f87171]">
                                        Necessário: {passwordIssues.join(", ")}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5 animate-[fade-in_0.5s_ease-out_0.5s_both]">
                        <label htmlFor="input-confirm-password" className="text-[11px] font-semibold tracking-widest uppercase text-[#64748b]">
                            Confirmar Senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-3.5 text-[#64748b] pointer-events-none transition-colors" />
                            <input
                                id="input-confirm-password"
                                type="password"
                                required
                                value={confirmPassword}
                                placeholder="••••••••"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[#cbd5e1] bg-[rgba(255,255,255,0.03)] border border-[rgba(139,92,246,0.14)] outline-none transition-all caret-[#8b5cf6]
                                hover:bg-[rgba(139,92,246,0.04)] hover:border-[rgba(139,92,246,0.28)]
                                focus:bg-[rgba(139,92,246,0.06)] focus:border-[rgba(139,92,246,0.55)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]
                                placeholder:text-[rgba(100,116,139,0.5)]"
                            />
                        </div>
                        
                        {/* Password match indicator */}
                        {confirmPassword && (
                            <div className="flex items-center gap-1.5 mt-1 px-1 text-xs">
                                {passwordsMatch ? (
                                    <span className="text-[#4ade80] flex items-center gap-1">
                                        <CheckCircle2 size={12} />
                                        As senhas coincidem
                                    </span>
                                ) : (
                                    <span className="text-[#f87171] flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        As senhas não coincidem
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading || success}
                        className="relative flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-full border-none cursor-pointer text-sm font-bold tracking-wide text-white bg-[#8b5cf6] shadow-[0_0_28px_rgba(139,92,246,0.30),0_1px_0_rgba(255,255,255,0.15)_inset] overflow-hidden transition-all mt-2 animate-[fade-in_0.5s_ease-out_0.55s_both]
                        hover:bg-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.45),0_1px_0_rgba(255,255,255,0.2)_inset] hover:-translate-y-px
                        active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        {isLoading ? (
                            <>
                                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                                    <path fill="currentColor" opacity="0.75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Criando conta...
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle2 size={18} />
                                Conta criada!
                            </>
                        ) : (
                            <>
                                Criar Conta
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <span className="flex-1 h-px bg-[rgba(139,92,246,0.15)]" />
                    <p className="text-xs text-[#475569] whitespace-nowrap">Já tem uma conta?</p>
                    <span className="flex-1 h-px bg-[rgba(139,92,246,0.15)]" />
                </div>

                {/* Login Link */}
                <a 
                    href="/login" 
                    className="flex items-center justify-center w-full py-3 rounded-full border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.04)] text-sm font-semibold text-[#a78bfa] no-underline transition-all cursor-pointer
                    hover:border-[rgba(139,92,246,0.45)] hover:bg-[rgba(139,92,246,0.09)] hover:text-[#c4b5fd]"
                >
                    Fazer Login
                </a>
            </AuthCard>
        </AuthLayout>
    )
}