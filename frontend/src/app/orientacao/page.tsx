'use client'

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Menu from "../componentes/menu";
import COrientacao from "../componentes/corientacao";
import Solicitacao from "../componentes/solicitacao";
import Solicitado from "../componentes/solicitado";
import './style.css';
import Perfil from "../componentes/perfil";

export default function Orientacao() {
    const [orientacoes, setOrientacoes] = useState([]);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(false);
    const [userName, setUserName] = useState("Nome do Usuário");
    const [userEmail, setUserEmail] = useState("emaildousuario@usuario.uepb.edu.br");
    const [id, setId] = useState("2d7915ed-6146-4444-b2cc-ab9d55a408bf");
    const [idProf, setIdProf] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token não encontrado no localStorage.');
            return;
        }

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };

        axios.get(`http://localhost:3001/v1/alunos/${id}`, config)
            .then(response => {
                console.log('Resposta da API do usuário:', response.data);
                setUserName(response.data.name);
                setUserEmail(response.data.email);
            })
            .catch(error => {
                console.error('Erro na requisição de usuário:', error);
            });

        axios.get('http://localhost:3001/v1/professores/available', config)
            .then(response => {
                console.log('Resposta da API de Professores:', response.data);
                setOrientacoes(response.data);
            })
            .catch(error => {
                console.error('Erro na requisição de professores:', error);
            });
    }, [id]);

    const handleClickCOrientacao = (professorId) => {
        const token = localStorage.getItem('accessToken');
        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };

        axios.get(`http://localhost:3001/v1/professores/${professorId}/solicitacoes`, config)
            .then(response => {
                console.log('Resposta da API de Solicitações:', response.data);
                setSolicitacoes(response.data);
                setSolicitacaoSelecionada(true);
                setIdProf(professorId);
            })
            .catch(error => {
                console.error('Erro na requisição de solicitações:', error);
            });
    };

    return (
        <main className="container-orientacao">
            <Menu active={"orientacao"} currentRoute={"/orientacao"} />

            <div className="perfil">
                <div className="aluno">
                    <span className="aluno-img"></span>
                    <div>
                        <Perfil></Perfil>
                    </div>
                </div>

                {orientacoes.map(orientacao => (
                    <button className="btn-corientacao" key={orientacao.id} onClick={() => handleClickCOrientacao(orientacao.id)}>
                        <COrientacao nome={orientacao.name} status={orientacao.available ? "disponível" : "indisponível"} />
                    </button>
                ))}
            </div>

            <div className="cont-solicitacao">
                {solicitacaoSelecionada ? (
                    solicitacoes.length > 0 ? (
                        solicitacoes.map(solicitacao => (
                            <Solicitado key={solicitacao.id} status={solicitacao.status} description={solicitacao.description} comment={solicitacao.comment}/>
                        ))
                    ) : (<Solicitacao id_professor={idProf} id_aluno={id} />
                        
                    )
                ) : (
                    <p>Sem solicitações</p>
                )}
            </div>
        </main>
    );
}
