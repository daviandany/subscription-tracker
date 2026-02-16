import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DollarSign, ArrowRight, Shield } from "lucide-react"

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
        <div className="login-root">

            {/* ── Ambient glows ── */}
            <div className="glow glow-top" />
            <div className="glow glow-bottom" />

            {/* ── Navbar strip ── */}
            <nav className="navbar">
                <a href="/" className="navbar-logo">
                    <div className="logo-icon">
                        <DollarSign size={18} color="#fff" />
                    </div>
                    SubTracker
                </a>
            </nav>

            {/* ── Card ── */}
            <main className="card-wrapper">
                <div className="card animate-slide-up">

                    {/* Badge */}
                    <div className="badge">
                        <Shield size={13} />
                        Acesso seguro
                    </div>

                    {/* Header */}
                    <div className="card-header">
                        <h1 className="card-title">Bem-vindo de volta</h1>
                        <p className="card-subtitle">
                            Entre na sua conta para ver suas assinaturas
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="form">

                        {/* Email */}
                        <div className="field animate-fade-in-1">
                            <label htmlFor="input-email" className="label">Email</label>
                            <input
                                id="input-email"
                                type="email"
                                required
                                value={email}
                                placeholder="seu@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* Senha */}
                        <div className="field animate-fade-in-2">
                            <div className="label-row">
                                <label htmlFor="input-password" className="label">Senha</label>
                                <a href="#" className="forgot-link">Esqueceu?</a>
                            </div>
                            <input
                                id="input-password"
                                type="password"
                                required
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="error-box animate-shake">
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
                            className="btn-primary animate-fade-in-3"
                        >
                            <span className="btn-shine" />
                            {isLoading ? (
                                <>
                                    <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                    <div className="divider">
                        <span />
                        <p>Novo por aqui?</p>
                        <span />
                    </div>

                    {/* Sign up */}
                    <a href="#" className="btn-secondary">
                        Criar conta gratuita
                    </a>

                </div>
            </main>

            <style>{`
                /* ─── Reset / Root ─── */
                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .login-root {
                    min-height: 100vh;
                    background: #0d0d0f;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    font-family: 'DM Sans', 'Segoe UI', sans-serif;
                    color: #e2e8f0;
                }

                /* ─── Ambient glows ─── */
                .glow {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(80px);
                }
                .glow-top {
                    top: -120px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 700px;
                    height: 400px;
                    background: radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%);
                }
                .glow-bottom {
                    bottom: -100px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 500px;
                    height: 300px;
                    background: radial-gradient(ellipse at center, rgba(139,92,246,0.10) 0%, transparent 70%);
                }

                /* ─── Navbar ─── */
                .navbar {
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    align-items: center;
                    padding: 20px 32px;
                    position: relative;
                    z-index: 10;
                }
                .navbar-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                    font-weight: 700;
                    color: #f1f5f9;
                    text-decoration: none;
                    letter-spacing: -0.01em;
                }
                .logo-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: #8b5cf6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* ─── Card wrapper ─── */
                .card-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 16px 64px;
                    position: relative;
                    z-index: 10;
                    width: 100%;
                }

                /* ─── Card ─── */
                .card {
                    width: 100%;
                    max-width: 420px;
                    background: linear-gradient(160deg, #141418 0%, #0f0f13 50%, #121216 100%);
                    border: 1px solid rgba(139,92,246,0.18);
                    border-radius: 20px;
                    padding: 40px 36px 36px;
                    box-shadow:
                        0 32px 80px rgba(0,0,0,0.7),
                        0 0 0 1px rgba(139,92,246,0.06) inset,
                        0 1px 0 rgba(139,92,246,0.14) inset;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                /* ─── Badge ─── */
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    align-self: flex-start;
                    padding: 5px 12px;
                    border-radius: 999px;
                    border: 1px solid rgba(139,92,246,0.25);
                    background: rgba(139,92,246,0.08);
                    font-size: 11px;
                    font-weight: 500;
                    color: #a78bfa;
                    letter-spacing: 0.03em;
                    margin-bottom: 24px;
                }

                /* ─── Header ─── */
                .card-header { margin-bottom: 28px; }

                .card-title {
                    font-size: 26px;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1.15;
                    color: #f1f5f9;
                    margin-bottom: 8px;
                }

                .card-subtitle {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.5;
                    font-weight: 400;
                }

                /* ─── Form ─── */
                .form { display: flex; flex-direction: column; gap: 16px; }

                .field { display: flex; flex-direction: column; gap: 6px; }

                .label-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .label {
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #64748b;
                }

                .forgot-link {
                    font-size: 11px;
                    color: rgba(139,92,246,0.6);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .forgot-link:hover { color: #8b5cf6; }

                .input {
                    width: 100%;
                    padding: 12px 16px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #cbd5e1;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(139,92,246,0.14);
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                    caret-color: #8b5cf6;
                    font-family: inherit;
                }
                .input::placeholder { color: rgba(100,116,139,0.5); }
                .input:hover {
                    background: rgba(139,92,246,0.04);
                    border-color: rgba(139,92,246,0.28);
                }
                .input:focus {
                    background: rgba(139,92,246,0.06);
                    border-color: rgba(139,92,246,0.55);
                    box-shadow: 0 0 0 3px rgba(139,92,246,0.08);
                }

                /* ─── Error ─── */
                .error-box {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    background: rgba(239,68,68,0.07);
                    border: 1px solid rgba(239,68,68,0.22);
                    font-size: 13px;
                    color: #f87171;
                    font-weight: 400;
                }

                /* ─── Primary button ─── */
                .btn-primary {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 14px;
                    border-radius: 999px;
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    color: #fff;
                    background: #8b5cf6;
                    box-shadow: 0 0 28px rgba(139,92,246,0.30), 0 1px 0 rgba(255,255,255,0.15) inset;
                    overflow: hidden;
                    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
                    margin-top: 4px;
                    font-family: inherit;
                }
                .btn-primary:hover:not(:disabled) {
                    background: #7c3aed;
                    box-shadow: 0 0 40px rgba(139,92,246,0.45), 0 1px 0 rgba(255,255,255,0.2) inset;
                    transform: translateY(-1px);
                }
                .btn-primary:active:not(:disabled) { transform: scale(0.98); }
                .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

                /* shine sweep */
                .btn-shine {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%);
                    transform: translateX(-100%);
                    transition: transform 0.7s ease;
                }
                .btn-primary:hover .btn-shine { transform: translateX(100%); }

                /* ─── Secondary button ─── */
                .btn-secondary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 13px;
                    border-radius: 999px;
                    border: 1px solid rgba(139,92,246,0.2);
                    background: rgba(139,92,246,0.04);
                    font-size: 14px;
                    font-weight: 600;
                    color: #a78bfa;
                    text-decoration: none;
                    transition: border-color 0.2s, background 0.2s, color 0.2s;
                    font-family: inherit;
                    cursor: pointer;
                }
                .btn-secondary:hover {
                    border-color: rgba(139,92,246,0.45);
                    background: rgba(139,92,246,0.09);
                    color: #c4b5fd;
                }

                /* ─── Divider ─── */
                .divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 20px 0 14px;
                }
                .divider span {
                    flex: 1;
                    height: 1px;
                    background: rgba(139,92,246,0.15);
                }
                .divider p {
                    font-size: 12px;
                    color: #475569;
                    white-space: nowrap;
                    font-weight: 400;
                }

                /* ─── Spinner ─── */
                .spinner {
                    animation: spin 1s linear infinite;
                }

                /* ─── Animations ─── */
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25%      { transform: translateX(-6px); }
                    75%      { transform: translateX(6px); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                .animate-slide-up { animation: slide-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
                .animate-fade-in-1 { animation: fade-in 0.5s ease-out 0.35s both; }
                .animate-fade-in-2 { animation: fade-in 0.5s ease-out 0.45s both; }
                .animate-fade-in-3 { animation: fade-in 0.5s ease-out 0.55s both; }
                .animate-shake     { animation: shake 0.35s ease-in-out; }
            `}</style>
        </div>
    )
}