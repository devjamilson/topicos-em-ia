'use client'
import React, { useState, SyntheticEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import logo from '../assets/imagens/logo.png'
import Image from "next/image";
import './style.css'

const DEFAULT_EMAIL = 'seuemail@example.com';
const DEFAULT_PASSWORD = '10203040';

export default function Autenticacao() {
    const [email, setEmail] = useState<string>(DEFAULT_EMAIL);
    const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);

    const router = useRouter();

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        // Simulação de autenticação bem-sucedida sem chamar o backend
        const fakeSignIn = async () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ error: false });
                }, 100); // Simular uma pequena pausa antes de retornar
            });
        };

        const result = await fakeSignIn(); // Chamada simulada para autenticação

        if (result?.error) {
            console.log("Erro de autenticação simulado");
            return;
        }

        router.push('/inicial');
    }

    return (
        <main className="container-auth">
            <div className="cont-form-auth">
                <h2>Sistema de Controle de TCC</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            placeholder="Informe o seu usuário..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            placeholder="Informe a sua senha..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="cont-btn-esqueceu-senha">
                            <button className="btn-esqueceu-senha">Esqueceu a Senha?</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn-acessar" type="submit">Acessar</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
