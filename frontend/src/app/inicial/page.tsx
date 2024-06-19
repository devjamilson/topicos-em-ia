'use client'

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Menu from "../componentes/menu";
import Kambam from "../componentes/kambam";
import Tarefas from "../componentes/tarefas";
import Perfil from "../componentes/perfil"
import './style.css';

export default function Inicial() {
    const [userName, setUserName] = useState("Nome do Usuario");
    const [userEmail, setUserEmail] = useState("emaildousuario@usuario.uepb.edu.br");
    const [id, setId] = useState("2d7915ed-6146-4444-b2cc-ab9d55a408bf")

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token não encontrado no localStorage.');
            return;
        }

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };

        console.log('Iniciando requisição para /v1/user');
        
        
        axios.get(`http://localhost:3001/v1/alunos/${id}`, config) // Substitua pelo endpoint correto da sua API
            .then(response => {
                console.log('Resposta da API do usuário:', response.data);
                setUserName(response.data.name);
                console.log("aqui")
                setUserEmail(response.data.email);

                
                localStorage.setItem('user_name', response.data.name);
                localStorage.setItem('user_email', response.data.email);


            })
            .catch(error => {
                console.error('Erro na requisição de usuário:', error);
                if (error.response) {
                    console.error('Erro no servidor:', error.response.data);
                } else if (error.request) {
                    console.error('Não houve resposta do servidor:', error.request);
                } else {
                    console.error('Erro durante a requisição:', error.message);
                }
            });
    }, []);

    return (
        <main className="container">
            <Menu active={"/inicial"} currentRoute={"/inicial"} />
            <div className="cont-perfil">
                <div className="perfil">
                    <div className="aluno">
                        <span className="aluno-img"></span>
                        <div>
                            <Perfil></Perfil>
                        </div>
                    </div>
                    <div>
                        <Tarefas></Tarefas>
                    </div>
                    
                </div>
            </div>
            <Kambam></Kambam>
        </main>
    )
}
