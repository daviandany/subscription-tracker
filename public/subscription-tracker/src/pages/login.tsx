import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    
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
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B8EC1]/20 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD4CC]/15 rounded-full blur-[120px] animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6B8EC1]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            {/* Main card with glassmorphism */}
            <div className="w-full max-w-[360px] relative z-10">
                {/* Glow effect behind card */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-[#6B8EC1]/30 via-[#FFD4CC]/20 to-[#6B8EC1]/30 rounded-2xl blur-xl opacity-50 animate-pulse-glow"></div>
                
                {/* Glass card */}
                <div className="relative bg-[#1a1a1a]/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-slide-up">
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        <div className="absolute top-10 left-10 w-1 h-1 bg-[#6B8EC1] rounded-full animate-particle-1"></div>
                        <div className="absolute top-20 right-16 w-1 h-1 bg-[#FFD4CC] rounded-full animate-particle-2"></div>
                        <div className="absolute bottom-16 left-20 w-1 h-1 bg-[#6B8EC1] rounded-full animate-particle-3"></div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#6B8EC1] to-[#FFD4CC] mb-4 animate-bounce-subtle">
                            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight animate-fade-in">Bem-vindo de volta</h1>
                        <p className="text-gray-400 text-sm animate-fade-in-delayed">Entre com suas credenciais</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email field */}
                        <div className="group animate-fade-in-delayed-2">
                            <label 
                                htmlFor="input-email" 
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input 
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email" 
                                    id="input-email"
                                    value={email}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm
                                        placeholder-gray-500 focus:outline-none focus:border-[#6B8EC1] focus:bg-white/10
                                        transition-all duration-300 hover:bg-white/[0.07]"
                                    placeholder="seu@email.com"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6B8EC1]/0 via-[#6B8EC1]/5 to-[#6B8EC1]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="group animate-fade-in-delayed-3">
                            <label 
                                htmlFor="input-password" 
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input 
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" 
                                    id="input-password"
                                    value={password}
                                    required
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white text-sm
                                        placeholder-gray-500 focus:outline-none focus:border-[#FFD4CC] focus:bg-white/10
                                        transition-all duration-300 hover:bg-white/[0.07]"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FFD4CC]/0 via-[#FFD4CC]/5 to-[#FFD4CC]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-3 text-red-400 text-sm animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Submit button */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#6B8EC1] to-[#8FA5CC] text-white font-semibold rounded-xl text-sm
                                hover:from-[#5a7ab0] hover:to-[#7a93ba] hover:shadow-lg hover:shadow-[#6B8EC1]/30 hover:scale-[1.02]
                                active:scale-[0.98] transition-all duration-300
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                relative overflow-hidden group animate-fade-in-delayed-4"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        Entrar
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Additional links */}
                        <div className="flex items-center justify-between text-xs pt-2 animate-fade-in-delayed-5">
                            <a href="#" className="text-gray-400 hover:text-[#6B8EC1] transition-all duration-300 hover:translate-x-0.5">
                                Esqueceu a senha?
                            </a>
                            <a href="#" className="text-gray-400 hover:text-[#FFD4CC] transition-all duration-300 hover:translate-x-0.5">
                                Criar conta
                            </a>
                        </div>
                    </form>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#6B8EC1]/50 to-transparent"></div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    66% {
                        transform: translateY(10px) translateX(-10px);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(15px) translateX(-15px);
                    }
                    66% {
                        transform: translateY(-10px) translateX(10px);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        opacity: 0.2;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes particle-1 {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(20px, -30px);
                    }
                }

                @keyframes particle-2 {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-25px, -35px);
                    }
                }

                @keyframes particle-3 {
                    0%, 100% {
                        transform: translate(0, 0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate(30px, -25px);
                    }
                }

                @keyframes shake {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    25% {
                        transform: translateX(-8px);
                    }
                    75% {
                        transform: translateX(8px);
                    }
                }

                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 25s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }

                .animate-pulse-glow {
                    animation: pulse-glow 4s ease-in-out infinite;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out 0.2s forwards;
                    opacity: 0;
                }

                .animate-fade-in-delayed {
                    animation: fade-in 0.6s ease-out 0.4s forwards;
                    opacity: 0;
                }

                .animate-fade-in-delayed-2 {
                    animation: fade-in 0.6s ease-out 0.5s forwards;
                    opacity: 0;
                }

                .animate-fade-in-delayed-3 {
                    animation: fade-in 0.6s ease-out 0.6s forwards;
                    opacity: 0;
                }

                .animate-fade-in-delayed-4 {
                    animation: fade-in 0.6s ease-out 0.7s forwards;
                    opacity: 0;
                }

                .animate-fade-in-delayed-5 {
                    animation: fade-in 0.6s ease-out 0.8s forwards;
                    opacity: 0;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }

                .animate-particle-1 {
                    animation: particle-1 4s ease-in-out infinite;
                }

                .animate-particle-2 {
                    animation: particle-2 5s ease-in-out infinite 1s;
                }

                .animate-particle-3 {
                    animation: particle-3 4.5s ease-in-out infinite 0.5s;
                }

                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    )
}