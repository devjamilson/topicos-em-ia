'use client';

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Menu from "../componentes/menu";
import COrientacao from "../componentes/corientacao";
import Solicitacao from "../componentes/solicitacao";
import Solicitado from "../componentes/solicitado";
import SolicitacaoProfessor from "../componentes/solicitacaoProfessor";
import SolicitacaoGestor from "../componentes/solicitacaoGestor";
import './style.css';
import Perfil from "../componentes/perfil";

export default function Orientacao() {
    const [orientacoes, setOrientacoes] = useState([]);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(false);
    const [id, setId] = useState("");
    const [idProf, setIdProf] = useState("");
    const [emailProf, setEmailProf] = useState("");
    const [useType, setUserType] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userTypeFromStorage = localStorage.getItem('user_type');

        if (!token) {
            console.error('Token não encontrado no localStorage.');
            return;
        }

        setUserType(userTypeFromStorage);

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        };

        axios.get('http://localhost:3001/v1/professores/available', config)
            .then(response => {
                console.log('Resposta da API de Professores:', response.data);
                setOrientacoes(response.data);
                setEmailProf(response.data.email);
            })
            .catch(error => {
                console.error('Erro na requisição de professores:', error);
            });
    }, []);

    const handleClickCOrientacao = (professorId) => {
        console.log(professorId)
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

    const getTitle = () => {
        switch (useType) {
            case "aluno":
                return "Professores aptos";
            case "professor":
                return "Solicitações recebidas";
            case "gestor":
                return "Orientações";
            default:
                return "Título";
        }
    };

    return (
        <main className="container-orientacao">
            <Menu active={"orientacao"} currentRoute={"/orientacao"} />

            <div className="perfil">
                <div className="aluno">
                    <span className="aluno-img"></span>
                    <div>
                        <Perfil />
                    </div>
                </div>
                <h3 className="titulo">{getTitle()}</h3>
                {orientacoes.map(orientacao => (
                    <button className="btn-corientacao" key={orientacao.id} onClick={() => handleClickCOrientacao(orientacao.id)}>
                        <COrientacao nome={orientacao.name} status={orientacao.available ? "disponível" : "indisponível"} />
                    </button>
                ))}
            </div>

            <div className="cont-solicitacao">
                {useType === "aluno" ? (
                    solicitacaoSelecionada ? (
                        solicitacoes.length > 0 ? (
                            solicitacoes.map(solicitacao => (
                                <Solicitado key={solicitacao.id} status={solicitacao.status} description={solicitacao.description} comment={solicitacao.comment} />
                            ))
                        ) : (
                            <Solicitacao id_professor={idProf} id_aluno={id} />
                        )
                    ) : (
                        <Solicitacao id_professor={idProf} id_aluno={id} />
                    )
                ) : useType === "professor" ? (
                    <SolicitacaoProfessor id_professor={idProf} />
                ) : useType === "gestor" ? (
                    <SolicitacaoGestor id_gestor={id} />
                ) : (
                    <div>{useType}</div>
                )}
            </div>
        </main>
    );
}
