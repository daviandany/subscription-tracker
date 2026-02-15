import { useState } from "react"

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function login() {
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
            const data = await response.json();
            console.log(data.token);

            if (!response.ok) {
                throw new Error(data.error || "Erro ao fazer login");
            }

        } catch (error: any) {
            console.log(error)
        }
    }
    
    return <div>
        <div className="login-form">
            <label htmlFor="input-email">Type your email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" name="input-email"/>
            <br /><br />
            <label htmlFor="input-password">Type your password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="input-password"/>
            <br /><br />
            <button onClick={login}>
                Login
            </button>
        </div>
    </div>
}