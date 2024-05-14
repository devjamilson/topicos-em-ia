'use client'

import React, { useState, useEffect } from "react";
import Menu from "../componentes/menu";
import COrientacao from "../componentes/orientacao";
import './style.css';
import Solicitacao from "../componentes/solicitacao";

export default function Orientacao() {
    // Estado para armazenar os itens da API para COrientacao
    const [orientacoes, setOrientacoes] = useState([]);

    // Estado para armazenar os itens da API para Solicitacao
    const [solicitacoes, setSolicitacoes] = useState([]);

    // Estado para armazenar a solicitação atualmente selecionada, default é a do Professor 1
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);

    // Simulação de chamada à API (pode ser substituído por uma chamada real)
    useEffect(() => {
        // Simulação de dados da API para COrientacao
        const dadosDaAPIOrientacao = [
            { id: 1, nome: "Professor 1" },
            { id: 2, nome: "Professor 2" },
            { id: 3, nome: "Professor 3" }
        ];

        // Definindo os dados da API para COrientacao no estado
        setOrientacoes(dadosDaAPIOrientacao);

        // Simulação de dados da API para Solicitacao
        const dadosDaAPISolicitacao = [
            { id: 1, nome: "Solicitação 1", status:"em andamento", data:'10/05/2024' },
            { id: 2, nome: "Solicitação 2", status:"pendente", data:'12/05/2024' },
            { id: 3, nome: "Solicitação 3", status:"concluída", data:'15/05/2024' }
        ];

        // Definindo os dados da API para Solicitacao no estado
        setSolicitacoes(dadosDaAPISolicitacao);

        // Encontrar a solicitação correspondente ao Professor 1 e definir como a solicitação selecionada
        const solicitacaoProfessor1 = dadosDaAPISolicitacao.find(solicitacao => solicitacao.id === 1);
        setSolicitacaoSelecionada(solicitacaoProfessor1);
    }, []);

    // Função para lidar com o clique no componente COrientacao
    const handleClickCOrientacao = (professorId) => {
        // Encontrar a solicitação correspondente ao professor clicado
        const solicitacao = solicitacoes.find(solicitacao => solicitacao.id === professorId);
        // Definir a solicitação selecionada
        setSolicitacaoSelecionada(solicitacao);
    };

    return (
        <main className="container-orientacao">
            <Menu active={"orientacao"} currentRoute={"/orientacao"} />
            <div className="perfil">
                <div className="aluno">
                    <span className="aluno-img"></span>
                    <div>
                        <h1>Nome do Aluno</h1>
                        <h2>emaildoaluno@aluno.uepb.edu.br</h2>
                    </div>
                </div>
                {/* Mapeando os itens da API para renderizar os componentes COrientacao */}
                {orientacoes.map(orientacao => (
                    <button className="btn-corientacao" key={orientacao.id} onClick={() => handleClickCOrientacao(orientacao.id)}>
                        <COrientacao nome={orientacao.nome} />
                    </button>
                ))}
            </div>
            <div className="cont-solicitacao">
                {/* Renderizando a Solicitacao correspondente à solicitação selecionada */}
                {solicitacaoSelecionada && <Solicitacao nome={solicitacaoSelecionada.nome} status={solicitacaoSelecionada.status} data={solicitacaoSelecionada.data} />}
            </div>
        </main>
    );
}
