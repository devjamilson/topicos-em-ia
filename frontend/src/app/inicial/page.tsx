'use client'

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Menu from "../componentes/menu";
import Kambam from "../componentes/kambam";
import Tarefas from "../componentes/tarefas";
import Perfil from "../componentes/perfil";
import './style.css';

export default function Inicial() {
    const [userName, setUserName] = useState("Nome do Usuario");
    const [userEmail, setUserEmail] = useState("emaildousuario@usuario.uepb.edu.br");
    const [id, setId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token não encontrado no localStorage.');
            return;
        }

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };

        console.log('Iniciando requisição para obter o tipo de usuário');

        const type = localStorage.getItem('user_name');

        let endpoint = '';
        if (type.includes('aluno')) {
            endpoint = `http://localhost:3001/v1/alunos?username=${type}`;
            localStorage.setItem('user_type', 'aluno');
        } else if (type.includes('professor') || type.includes('gestor')) {
            endpoint = `http://localhost:3001/v1/professores?username=${type}`;
            if (type.includes('professor')){
                localStorage.setItem('user_type', 'professor');
            }else{
                localStorage.setItem('user_type', 'gestor');}
        } else {
            console.error('Tipo de usuário desconhecido:', type);
            return;
        }

        // Primeira requisição para obter o ID do usuário
        axios.get(endpoint, config)
            .then(response => {
                const userData = response.data[0]; // Assumindo que a resposta é um array e pegando o primeiro item
                console.log('Dados do usuário obtidos:', userData);
                setId(userData.id);
                setUserName(userData.name);
                setUserEmail(userData.email);
                localStorage.setItem('user_email', userData.email);
                if(endpoint.includes('aluno')){
                    localStorage.setItem('user_id', userData.id);
                }
                

                // Segunda requisição para obter mais informações usando o ID
                return axios.get(`${endpoint}/${userData.id}`, config);
            })
            .then(response => {
                console.log('Informações detalhadas do usuário:', response.data);
                // Atualizar estado com as informações detalhadas, se necessário
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
                            <Perfil />
                        </div>
                    </div>
                    <div>
                        <Tarefas />
                    </div>
                </div>
            </div>
            <Kambam />
        </main>
    );
}
