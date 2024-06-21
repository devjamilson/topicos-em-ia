'use client';
import React, { useState, SyntheticEvent } from "react";
import { IoMdEye, IoIosEyeOff  } from "react-icons/io";
import Image from 'next/image';
import Logo from "../assets/imagens/logo.png";
import { useRouter } from "next/navigation";
import Perfil from "../componentes/perfil"

import './style.css';

export default function Autenticacao() {

    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/v1/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: user, password })
            });

            if (!response.ok) {
                throw new Error('Erro na autenticação');
            }

            const data = await response.json();

            if (data.error) {
                console.log("Erro de autenticação: ", data.message);
                return;
            }
            localStorage.setItem('accessToken', data.access_token); 

            localStorage.setItem('user_name', user);
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_type');
            localStorage.removeItem('user_id');

            router.push('/inicial');
        } catch (error) {
            console.error('Erro ao autenticar:', error);
        }
    }

    return (
        <main className="container-auth">
            <div className="cont-form-auth">
                <div className="cont-img">
                    <Image className="img" src={Logo} alt="Logo" />
                </div>
                <h2>Sistema de Controle de TCC</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text"
                            id="email"
                            placeholder="Informe o seu usuário..."
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group-p">
                        <div className="cont-form">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Informe a sua senha..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn-show-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoIosEyeOff /> : <IoMdEye /> }
                            </button>
                        </div>
                    </div>
                    <div className="cont-btn-esqueceu-senha">
                            <button className="btn-esqueceu-senha" type="button">Esqueceu a Senha?</button>
                    </div>
                    <div className="form-group">
                        <button className="btn-acessar" type="submit">Acessar</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
