'use client'
import React from "react";
import Menu from "../componentes/menu";
import { useRouter } from "next/navigation";
import './style.css';

export default function Perfil() {
    const router = useRouter();

    function handleLogout() {
        // Clear the access token from local storage
        localStorage.removeItem('accessToken');
        
        // Redirect to the login page
        router.push('/autenticacao');
    }

    return (
        <main className="container-perfil">
             <Menu active={"perfil"} userType={"aluno"}></Menu>
             <div className="perfil">
                <div className="use">
                    <span>

                    </span>
                </div>
                <button className="btn-sair" onClick={handleLogout}>Sair
                </button>
            </div>
        </main>
    );
}
