import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DollarSign, ArrowRight, Shield, User, Mail, Lock } from "lucide-react"

export default function CreateUserPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError("As senhas não coincidem")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: "POST",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    password: password
                })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erro ao criar conta")
            }

            navigate('/login')
        } catch (error: any) {
            setError(error.message || "Erro ao conectar com o servidor")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="login-root">
            <div className="glow glow-top" />
            <div className="glow glow-bottom" />

            <nav className="navbar">
                <a href="/" className="navbar-logo">
                    <div className="logo-icon">
                        <DollarSign size={18} color="#fff" />
                    </div>
                    SubTracker
                </a>
            </nav>

            <main className="card-wrapper">
                <div className="card animate-slide-up">
                    <div className="badge">
                        <Shield size={13} />
                        Privacidade garantida
                    </div>

                    <div className="card-header">
                        <h1 className="card-title">Crie sua conta</h1>
                        <p className="card-subtitle">Comece a economizar em minutos</p>
                    </div>

                    <form onSubmit={handleRegister} className="form">
                        <div className="field">
                            <label className="label">Nome Completo</label>
                            <div className="input-group">
                                <User size={16} className="input-icon" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    placeholder="João Silva"
                                    onChange={(e) => setName(e.target.value)}
                                    className="input with-icon"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="input-group">
                                <Mail size={16} className="input-icon" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    placeholder="seu@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input with-icon"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Senha</label>
                            <div className="input-group">
                                <Lock size={16} className="input-icon" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input with-icon"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Confirmar Senha</label>
                            <div className="input-group">
                                <Lock size={16} className="input-icon" />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    placeholder="••••••••"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input with-icon"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="error-box animate-shake">
                                <Shield size={14} className="text-red-400" />
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary">
                            <span className="btn-shine" />
                            {isLoading ? "Criando..." : "Criar Conta"}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="divider">
                        <span />
                        <p>Já tem conta?</p>
                        <span />
                    </div>

                    <a href="/login" className="btn-secondary">Fazer Login</a>
                </div>
            </main>

            <style>{`
                /* Reuse login styles */
                .login-root { min-height: 100vh; background: #0d0d0f; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; font-family: 'DM Sans', sans-serif; color: #e2e8f0; }
                .glow { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
                .glow-top { top: -120px; left: 50%; transform: translateX(-50%); width: 700px; height: 400px; background: radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%); }
                .glow-bottom { bottom: -100px; left: 50%; transform: translateX(-50%); width: 500px; height: 300px; background: radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%); }
                .navbar { width: 100%; max-width: 1200px; display: flex; align-items: center; padding: 20px 32px; z-index: 10; }
                .navbar-logo { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; color: #f1f5f9; text-decoration: none; }
                .logo-icon { width: 32px; height: 32px; border-radius: 8px; background: #8b5cf6; display: flex; align-items: center; justify-content: center; }
                .card-wrapper { flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px 16px; z-index: 10; width: 100%; }
                .card { width: 100%; max-width: 440px; background: linear-gradient(160deg, #141418 0%, #0f0f13 50%, #121216 100%); border: 1px solid rgba(139,92,246,0.18); border-radius: 20px; padding: 40px 36px; box-shadow: 0 32px 80px rgba(0,0,0,0.7); }
                .badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 999px; border: 1px solid rgba(139,92,246,0.25); background: rgba(139,92,246,0.08); font-size: 11px; color: #a78bfa; margin-bottom: 24px; }
                .card-title { font-size: 26px; font-weight: 800; color: #f1f5f9; margin-bottom: 8px; }
                .card-subtitle { font-size: 14px; color: #64748b; margin-bottom: 28px; }
                .form { display: flex; flex-direction: column; gap: 16px; }
                .field { display: flex; flex-direction: column; gap: 6px; }
                .label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.1em; }
                .input-group { position: relative; display: flex; align-items: center; }
                .input-icon { position: absolute; left: 14px; color: #64748b; pointer-events: none; }
                .input { width: 100%; padding: 12px 16px; border-radius: 10px; font-size: 14px; color: #cbd5e1; background: rgba(255,255,255,0.03); border: 1px solid rgba(139,92,246,0.14); outline: none; transition: all 0.2s; }
                .input.with-icon { padding-left: 42px; }
                .input:focus { border-color: #8b5cf6; background: rgba(139,92,246,0.06); box-shadow: 0 0 0 3px rgba(139,92,246,0.08); }
                .btn-primary { position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 999px; border: none; cursor: pointer; background: #8b5cf6; color: #fff; font-weight: 700; overflow: hidden; box-shadow: 0 0 28px rgba(139,92,246,0.3); transition: all 0.2s; }
                .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 40px rgba(139,92,246,0.45); }
                .btn-shine { position: absolute; inset: 0; background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.7s; }
                .btn-primary:hover .btn-shine { transform: translateX(100%); }
                .btn-secondary { display: flex; align-items: center; justify-content: center; width: 100%; padding: 13px; border-radius: 999px; border: 1px solid rgba(139,92,246,0.2); background: rgba(139,92,246,0.04); color: #a78bfa; font-weight: 600; text-decoration: none; transition: all 0.2s; }
                .btn-secondary:hover { border-color: rgba(139,92,246,0.45); background: rgba(139,92,246,0.09); }
                .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0 14px; }
                .divider span { flex: 1; height: 1px; background: rgba(139,92,246,0.15); }
                .divider p { font-size: 12px; color: #475569; }
                .error-box { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.22); font-size: 13px; color: #f87171; }
                .animate-slide-up { animation: slide-up 0.7s ease-out; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    )
}
