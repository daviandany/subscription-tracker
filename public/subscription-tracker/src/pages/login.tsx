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
        <div className="login-root">
            {/* Fundo com padrão arabesco sutil */}
            <div className="bg-pattern"></div>

            {/* Orbs animados */}
            <div className="orb-layer">
                <div className="orb orb-1 animate-float"></div>
                <div className="orb orb-2 animate-float-delayed"></div>
                <div className="orb orb-3 animate-pulse-slow"></div>
            </div>

            {/* Card principal */}
            <div className="card-wrapper">
                {/* Glow atrás do card */}
                <div className="card-glow animate-pulse-glow"></div>

                {/* Glass card */}
                <div className="card animate-slide-up">
                    {/* Partículas flutuantes */}
                    <div className="particles">
                        <div className="particle p1 animate-particle-1"></div>
                        <div className="particle p2 animate-particle-2"></div>
                        <div className="particle p3 animate-particle-3"></div>
                    </div>

                    {/* Ornamento superior */}
                    <div className="ornament-top">
                        <svg width="160" height="12" viewBox="0 0 160 12" fill="none">
                            <line x1="0" y1="6" x2="60" y2="6" stroke="url(#gLeft)" strokeWidth="0.5"/>
                            <circle cx="80" cy="6" r="3" fill="none" stroke="#5082DC" strokeWidth="0.8"/>
                            <circle cx="80" cy="6" r="1" fill="#5082DC"/>
                            <circle cx="68" cy="6" r="1.5" fill="none" stroke="#5082DC" strokeWidth="0.6" opacity="0.5"/>
                            <circle cx="92" cy="6" r="1.5" fill="none" stroke="#5082DC" strokeWidth="0.6" opacity="0.5"/>
                            <line x1="100" y1="6" x2="160" y2="6" stroke="url(#gRight)" strokeWidth="0.5"/>
                            <defs>
                                <linearGradient id="gLeft" x1="0" y1="0" x2="60" y2="0">
                                    <stop offset="0%" stopColor="#5082DC" stopOpacity="0"/>
                                    <stop offset="100%" stopColor="#5082DC" stopOpacity="0.6"/>
                                </linearGradient>
                                <linearGradient id="gRight" x1="0" y1="0" x2="60" y2="0">
                                    <stop offset="0%" stopColor="#5082DC" stopOpacity="0.6"/>
                                    <stop offset="100%" stopColor="#5082DC" stopOpacity="0"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Header */}
                    <div className="header">
                        <div className="icon-wrapper animate-bounce-subtle">
                            <svg width="28" height="28" fill="none" stroke="#0a0a0a" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="animate-fade-in">Bem-vindo de volta</h1>
                        <p className="subtitle animate-fade-in-delayed">Entre com suas credenciais</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="field-group animate-fade-in-delayed-2">
                            <label htmlFor="input-email">Email</label>
                            <div className="input-wrap">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="input-email"
                                    value={email}
                                    required
                                    placeholder="seu@email.com"
                                />
                                <div className="input-shine"></div>
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="field-group animate-fade-in-delayed-3">
                            <label htmlFor="input-password">Senha</label>
                            <div className="input-wrap">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="input-password"
                                    value={password}
                                    required
                                    placeholder="••••••••"
                                />
                                <div className="input-shine"></div>
                            </div>
                        </div>

                        {/* Erro */}
                        {error && (
                            <div className="error-msg animate-shake">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="submit-btn animate-fade-in-delayed-4"
                        >
                            <div className="btn-shimmer"></div>
                            <span className="btn-content">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin" width="18" height="18" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Entrando...
                                    </>
                                ) : (
                                    <>
                                        Entrar
                                        <svg className="arrow-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Links */}
                        <div className="links animate-fade-in-delayed-5">
                            <a href="#">Esqueceu a senha?</a>
                            <a href="#" className="link-alt">Criar conta</a>
                        </div>
                    </form>

                    {/* Ornamento inferior */}
                    <div className="ornament-bottom">
                        <div className="divider-line"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap');

                /* ─── Reset & Root ─── */
                .login-root {
                    min-height: 100vh;
                    background: #050505;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Jost', sans-serif;
                }

                /* ─── Padrão de fundo arabesco ─── */
                .bg-pattern {
                    position: absolute;
                    inset: 0;
                    background-image:
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 60px,
                            rgba(80,130,220,0.025) 60px,
                            rgba(80,130,220,0.025) 61px
                        ),
                        repeating-linear-gradient(
                            -45deg,
                            transparent,
                            transparent 60px,
                            rgba(80,130,220,0.02) 60px,
                            rgba(80,130,220,0.02) 61px
                        );
                    pointer-events: none;
                }

                /* ─── Orbs ─── */
                .orb-layer {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                }

                .orb-1 {
                    top: 20%;
                    left: 20%;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(80,130,220,0.12) 0%, transparent 70%);
                    filter: blur(60px);
                }

                .orb-2 {
                    bottom: 20%;
                    right: 20%;
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(60,100,200,0.08) 0%, transparent 70%);
                    filter: blur(80px);
                }

                .orb-3 {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(80,130,220,0.06) 0%, transparent 70%);
                    filter: blur(60px);
                }

                /* ─── Card Wrapper ─── */
                .card-wrapper {
                    width: 100%;
                    max-width: 380px;
                    position: relative;
                    z-index: 10;
                }

                .card-glow {
                    position: absolute;
                    inset: -2px;
                    background: linear-gradient(135deg, rgba(80,130,220,0.25), rgba(50,90,180,0.1), rgba(80,130,220,0.2));
                    border-radius: 20px;
                    filter: blur(16px);
                    opacity: 0.4;
                }

                /* ─── Card ─── */
                .card {
                    position: relative;
                    background: linear-gradient(160deg, #131313 0%, #0d0d0d 50%, #111111 100%);
                    border: 1px solid rgba(80,130,220,0.18);
                    border-radius: 20px;
                    padding: 36px 32px 28px;
                    box-shadow:
                        0 32px 80px rgba(0,0,0,0.8),
                        0 0 0 1px rgba(80,130,220,0.06) inset,
                        0 1px 0 rgba(80,130,220,0.12) inset;
                }

                /* ─── Partículas ─── */
                .particles {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    border-radius: 20px;
                    pointer-events: none;
                }

                .particle {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    border-radius: 50%;
                    background: #5082DC;
                }

                .p1 { top: 30px; left: 30px; }
                .p2 { top: 60px; right: 40px; }
                .p3 { bottom: 50px; left: 55px; }

                /* ─── Ornamento topo ─── */
                .ornament-top {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                /* ─── Header ─── */
                .header {
                    text-align: center;
                    margin-bottom: 28px;
                }

                .icon-wrapper {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3A6AC8 0%, #5E8FE8 40%, #2A50A8 100%);
                    margin-bottom: 16px;
                    box-shadow:
                        0 0 0 1px rgba(80,130,220,0.3),
                        0 8px 24px rgba(80,130,220,0.2),
                        0 0 40px rgba(80,130,220,0.1);
                }

                .header h1 {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 26px;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    color: #D0DCFF;
                    margin: 0 0 6px;
                    line-height: 1.2;
                }

                .subtitle {
                    font-family: 'Jost', sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(80,130,220,0.55);
                    margin: 0;
                }

                /* ─── Fields ─── */
                .field-group {
                    margin-bottom: 16px;
                }

                .field-group label {
                    display: block;
                    font-family: 'Jost', sans-serif;
                    font-size: 10px;
                    font-weight: 400;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: rgba(80,130,220,0.6);
                    margin-bottom: 8px;
                }

                .input-wrap {
                    position: relative;
                }

                .input-wrap input {
                    width: 100%;
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.025);
                    border: 1px solid rgba(80,130,220,0.15);
                    border-radius: 10px;
                    color: #C8D8F8;
                    font-family: 'Jost', sans-serif;
                    font-size: 14px;
                    font-weight: 300;
                    letter-spacing: 0.04em;
                    outline: none;
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                }

                .input-wrap input::placeholder {
                    color: rgba(100,140,220,0.3);
                    letter-spacing: 0.06em;
                }

                .input-wrap input:hover {
                    background: rgba(80,130,220,0.04);
                    border-color: rgba(80,130,220,0.25);
                }

                .input-wrap input:focus {
                    background: rgba(80,130,220,0.06);
                    border-color: rgba(80,130,220,0.5);
                    box-shadow:
                        0 0 0 1px rgba(80,130,220,0.1),
                        0 4px 16px rgba(80,130,220,0.08);
                }

                .input-shine {
                    position: absolute;
                    inset: 0;
                    border-radius: 10px;
                    background: linear-gradient(105deg, rgba(80,130,220,0) 40%, rgba(80,130,220,0.04) 50%, rgba(80,130,220,0) 60%);
                    pointer-events: none;
                }

                /* ─── Erro ─── */
                .error-msg {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(180,60,60,0.08);
                    border: 1px solid rgba(200,80,80,0.2);
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: #d4706a;
                    font-family: 'Jost', sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    letter-spacing: 0.04em;
                    margin-bottom: 14px;
                }

                /* ─── Botão ─── */
                .submit-btn {
                    width: 100%;
                    padding: 13px 20px;
                    background: linear-gradient(135deg, #3A6AC8 0%, #5E8FE8 40%, #2A50A8 100%);
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                    box-shadow:
                        0 4px 20px rgba(80,130,220,0.25),
                        0 1px 0 rgba(255,255,255,0.15) inset;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-1px) scale(1.01);
                    box-shadow:
                        0 8px 30px rgba(80,130,220,0.35),
                        0 1px 0 rgba(255,255,255,0.2) inset;
                    background: linear-gradient(135deg, #4878D8 0%, #6E9FF8 40%, #3460B8 100%);
                }

                .submit-btn:active:not(:disabled) {
                    transform: scale(0.98);
                }

                .submit-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .btn-shimmer {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
                    transform: translateX(-200%);
                    transition: transform 0.7s ease;
                }

                .submit-btn:hover .btn-shimmer {
                    transform: translateX(200%);
                }

                .btn-content {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-family: 'Jost', sans-serif;
                    font-size: 13px;
                    font-weight: 500;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: #ffffff;
                }

                .arrow-icon {
                    transition: transform 0.3s ease;
                }

                .submit-btn:hover .arrow-icon {
                    transform: translateX(4px);
                }

                /* ─── Links ─── */
                .links {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .links a {
                    font-family: 'Jost', sans-serif;
                    font-size: 11px;
                    font-weight: 300;
                    letter-spacing: 0.08em;
                    color: rgba(100,140,220,0.55);
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .links a:hover {
                    color: #5082DC;
                    letter-spacing: 0.1em;
                }

                .link-alt {
                    position: relative;
                }

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

                .link-alt:hover::after {
                    width: 100%;
                }

                /* ─── Ornamento inferior ─── */
                .ornament-bottom {
                    margin-top: 24px;
                    display: flex;
                    justify-content: center;
                }

                .divider-line {
                    width: 80px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(80,130,220,0.4), transparent);
                }

                /* ─── Spin (para loading) ─── */
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                /* ─── Animações originais mantidas ─── */
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

                .animate-float { animation: float 20s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
                .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }

                .animate-fade-in { animation: fade-in 0.6s ease-out 0.2s forwards; opacity: 0; }
                .animate-fade-in-delayed { animation: fade-in 0.6s ease-out 0.4s forwards; opacity: 0; }
                .animate-fade-in-delayed-2 { animation: fade-in 0.6s ease-out 0.5s forwards; opacity: 0; }
                .animate-fade-in-delayed-3 { animation: fade-in 0.6s ease-out 0.6s forwards; opacity: 0; }
                .animate-fade-in-delayed-4 { animation: fade-in 0.6s ease-out 0.7s forwards; opacity: 0; }
                .animate-fade-in-delayed-5 { animation: fade-in 0.6s ease-out 0.8s forwards; opacity: 0; }

                .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
                .animate-particle-1 { animation: particle-1 4s ease-in-out infinite; }
                .animate-particle-2 { animation: particle-2 5s ease-in-out infinite 1s; }
                .animate-particle-3 { animation: particle-3 4.5s ease-in-out infinite 0.5s; }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>
        </div>
    )
}