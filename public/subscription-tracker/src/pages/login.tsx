import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
            console.log(data.token)

            if (!response.ok) {
                throw new Error(data.error || "Erro ao fazer login")
            }

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
        <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden font-['Jost',sans-serif]">

            {/* Fundo com padrão arabesco sutil */}
            <div className="absolute inset-0 pointer-events-none bg-pattern" />

            {/* Orbs animados */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/5 left-1/5 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(80,130,220,0.12)_0%,transparent_70%)] blur-[60px] animate-float" />
                <div className="absolute bottom-1/5 right-1/5 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(60,100,200,0.08)_0%,transparent_70%)] blur-[80px] animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(80,130,220,0.06)_0%,transparent_70%)] blur-[60px] animate-pulse-slow" />
            </div>

            {/* Card Wrapper */}
            <div className="relative z-10 w-full max-w-[380px]">
                {/* Glow atrás do card */}
                <div className="absolute -inset-0.5 rounded-[20px] blur-[16px] opacity-40 animate-pulse-glow bg-[linear-gradient(135deg,rgba(80,130,220,0.25),rgba(50,90,180,0.1),rgba(80,130,220,0.2))]" />

                {/* Glass card */}
                <div className="relative rounded-[20px] px-8 pt-9 pb-7 animate-slide-up
                    bg-[linear-gradient(160deg,#131313_0%,#0d0d0d_50%,#111111_100%)]
                    border border-[rgba(80,130,220,0.18)]
                    shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(80,130,220,0.06)_inset,0_1px_0_rgba(80,130,220,0.12)_inset]">

                    {/* Partículas flutuantes */}
                    <div className="absolute inset-0 overflow-hidden rounded-[20px] pointer-events-none">
                        <div className="absolute top-[30px] left-[30px] w-0.5 h-0.5 rounded-full bg-[#5082DC] animate-particle-1" />
                        <div className="absolute top-[60px] right-[40px] w-0.5 h-0.5 rounded-full bg-[#5082DC] animate-particle-2" />
                        <div className="absolute bottom-[50px] left-[55px] w-0.5 h-0.5 rounded-full bg-[#5082DC] animate-particle-3" />
                    </div>

                    {/* Ornamento superior */}
                    <div className="flex justify-center mb-5">
                        <svg width="160" height="12" viewBox="0 0 160 12" fill="none">
                            <line x1="0" y1="6" x2="60" y2="6" stroke="url(#gLeft)" strokeWidth="0.5" />
                            <circle cx="80" cy="6" r="3" fill="none" stroke="#5082DC" strokeWidth="0.8" />
                            <circle cx="80" cy="6" r="1" fill="#5082DC" />
                            <circle cx="68" cy="6" r="1.5" fill="none" stroke="#5082DC" strokeWidth="0.6" opacity="0.5" />
                            <circle cx="92" cy="6" r="1.5" fill="none" stroke="#5082DC" strokeWidth="0.6" opacity="0.5" />
                            <line x1="100" y1="6" x2="160" y2="6" stroke="url(#gRight)" strokeWidth="0.5" />
                            <defs>
                                <linearGradient id="gLeft" x1="0" y1="0" x2="60" y2="0">
                                    <stop offset="0%" stopColor="#5082DC" stopOpacity="0" />
                                    <stop offset="100%" stopColor="#5082DC" stopOpacity="0.6" />
                                </linearGradient>
                                <linearGradient id="gRight" x1="0" y1="0" x2="60" y2="0">
                                    <stop offset="0%" stopColor="#5082DC" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#5082DC" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-7">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 animate-bounce-subtle
                            bg-[linear-gradient(135deg,#3A6AC8_0%,#5E8FE8_40%,#2A50A8_100%)]
                            shadow-[0_0_0_1px_rgba(80,130,220,0.3),0_8px_24px_rgba(80,130,220,0.2),0_0_40px_rgba(80,130,220,0.1)]">
                            <svg width="28" height="28" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="font-['Cormorant_Garamond',Georgia,serif] text-[26px] font-medium tracking-[0.04em] text-[#D0DCFF] mb-1.5 leading-tight animate-fade-in">
                            Bem-vindo de volta
                        </h1>
                        <p className="text-[12px] font-light tracking-[0.12em] uppercase text-[rgba(80,130,220,0.55)] m-0 animate-fade-in-delayed">
                            Entre com suas credenciais
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-4 animate-fade-in-delayed-2">
                            <label htmlFor="input-email" className="block text-[10px] font-normal tracking-[0.18em] uppercase text-[rgba(80,130,220,0.6)] mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="input-email"
                                    value={email}
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full px-4 py-3 rounded-[10px] text-[14px] font-light tracking-[0.04em] outline-none transition-all duration-300 box-border
                                        bg-[rgba(255,255,255,0.025)] border border-[rgba(80,130,220,0.15)] text-[#C8D8F8]
                                        placeholder:text-[rgba(100,140,220,0.3)] placeholder:tracking-[0.06em]
                                        hover:bg-[rgba(80,130,220,0.04)] hover:border-[rgba(80,130,220,0.25)]
                                        focus:bg-[rgba(80,130,220,0.06)] focus:border-[rgba(80,130,220,0.5)]
                                        focus:shadow-[0_0_0_1px_rgba(80,130,220,0.1),0_4px_16px_rgba(80,130,220,0.08)]"
                                />
                                <div className="absolute inset-0 rounded-[10px] pointer-events-none bg-[linear-gradient(105deg,rgba(80,130,220,0)_40%,rgba(80,130,220,0.04)_50%,rgba(80,130,220,0)_60%)]" />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="mb-4 animate-fade-in-delayed-3">
                            <label htmlFor="input-password" className="block text-[10px] font-normal tracking-[0.18em] uppercase text-[rgba(80,130,220,0.6)] mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="input-password"
                                    value={password}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-[10px] text-[14px] font-light tracking-[0.04em] outline-none transition-all duration-300 box-border
                                        bg-[rgba(255,255,255,0.025)] border border-[rgba(80,130,220,0.15)] text-[#C8D8F8]
                                        placeholder:text-[rgba(100,140,220,0.3)] placeholder:tracking-[0.06em]
                                        hover:bg-[rgba(80,130,220,0.04)] hover:border-[rgba(80,130,220,0.25)]
                                        focus:bg-[rgba(80,130,220,0.06)] focus:border-[rgba(80,130,220,0.5)]
                                        focus:shadow-[0_0_0_1px_rgba(80,130,220,0.1),0_4px_16px_rgba(80,130,220,0.08)]"
                                />
                                <div className="absolute inset-0 rounded-[10px] pointer-events-none bg-[linear-gradient(105deg,rgba(80,130,220,0)_40%,rgba(80,130,220,0.04)_50%,rgba(80,130,220,0)_60%)]" />
                            </div>
                        </div>

                        {/* Erro */}
                        {error && (
                            <div className="flex items-center gap-2 rounded-[10px] px-3.5 py-2.5 mb-3.5 text-[12px] font-light tracking-[0.04em] text-[#d4706a] animate-shake
                                bg-[rgba(180,60,60,0.08)] border border-[rgba(200,80,80,0.2)]">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full px-5 py-[13px] rounded-[10px] border-none cursor-pointer overflow-hidden transition-all duration-300 mb-5 group
                                bg-[linear-gradient(135deg,#3A6AC8_0%,#5E8FE8_40%,#2A50A8_100%)]
                                shadow-[0_4px_20px_rgba(80,130,220,0.25),0_1px_0_rgba(255,255,255,0.15)_inset]
                                hover:not(:disabled):-translate-y-px hover:not(:disabled):scale-[1.01]
                                hover:not(:disabled):shadow-[0_8px_30px_rgba(80,130,220,0.35),0_1px_0_rgba(255,255,255,0.2)_inset]
                                active:not(:disabled):scale-[0.98]
                                disabled:opacity-50 disabled:cursor-not-allowed
                                animate-fade-in-delayed-4"
                        >
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out
                                bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.3)_50%,transparent_70%)]" />
                            <span className="relative flex items-center justify-center gap-2 text-[13px] font-medium tracking-[0.14em] uppercase text-white">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        Entrar
                                        <svg className="transition-transform duration-300 group-hover:translate-x-1" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Links */}
                        <div className="flex justify-between items-center animate-fade-in-delayed-5">
                            <a href="#" className="text-[11px] font-light tracking-[0.08em] text-[rgba(100,140,220,0.55)] no-underline transition-all duration-300 hover:text-[#5082DC] hover:tracking-[0.1em]">
                                Esqueceu a senha?
                            </a>
                            <a href="#" className="link-alt text-[11px] font-light tracking-[0.08em] text-[rgba(100,140,220,0.55)] no-underline transition-all duration-300 hover:text-[#5082DC] hover:tracking-[0.1em]">
                                Criar conta
                            </a>
                        </div>
                    </form>

                    {/* Ornamento inferior */}
                    <div className="mt-6 flex justify-center">
                        <div className="w-20 h-px bg-[linear-gradient(90deg,transparent,rgba(80,130,220,0.4),transparent)]" />
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap');

                /* ─── Padrão de fundo arabesco ─── */
                .bg-pattern {
                    background-image:
                        repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(80,130,220,0.025) 60px, rgba(80,130,220,0.025) 61px),
                        repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(80,130,220,0.02) 60px, rgba(80,130,220,0.02) 61px);
                }

                /* ─── Pseudo-elemento do link "Criar conta" ─── */
                .link-alt { position: relative; }
                .link-alt::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #5082DC;
                    transition: width 0.3s ease;
                }
                .link-alt:hover::after { width: 100%; }

                /* ─── Keyframes & animações customizadas ─── */
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-20px) translateX(10px); }
                    66% { transform: translateY(10px) translateX(-10px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(15px) translateX(-15px); }
                    66% { transform: translateY(-10px) translateX(10px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes particle-1 {
                    0%, 100% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(20px, -30px); }
                }
                @keyframes particle-2 {
                    0%, 100% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(-25px, -35px); }
                }
                @keyframes particle-3 {
                    0%, 100% { transform: translate(0, 0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translate(30px, -25px); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-float          { animation: float 20s ease-in-out infinite; }
                .animate-float-delayed  { animation: float-delayed 25s ease-in-out infinite; }
                .animate-pulse-slow     { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-pulse-glow     { animation: pulse-glow 4s ease-in-out infinite; }
                .animate-slide-up       { animation: slide-up 0.8s ease-out forwards; }
                .animate-bounce-subtle  { animation: bounce-subtle 3s ease-in-out infinite; }
                .animate-particle-1     { animation: particle-1 4s ease-in-out infinite; }
                .animate-particle-2     { animation: particle-2 5s ease-in-out infinite 1s; }
                .animate-particle-3     { animation: particle-3 4.5s ease-in-out infinite 0.5s; }
                .animate-shake          { animation: shake 0.4s ease-in-out; }
                .animate-spin           { animation: spin 1s linear infinite; }

                .animate-fade-in            { animation: fade-in 0.6s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-delayed    { animation: fade-in 0.6s ease-out 0.4s forwards; opacity: 0; }
                .animate-fade-in-delayed-2  { animation: fade-in 0.6s ease-out 0.5s forwards; opacity: 0; }
                .animate-fade-in-delayed-3  { animation: fade-in 0.6s ease-out 0.6s forwards; opacity: 0; }
                .animate-fade-in-delayed-4  { animation: fade-in 0.6s ease-out 0.7s forwards; opacity: 0; }
                .animate-fade-in-delayed-5  { animation: fade-in 0.6s ease-out 0.8s forwards; opacity: 0; }
            `}</style>
        </div>
    )
}