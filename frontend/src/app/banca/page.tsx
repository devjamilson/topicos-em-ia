'use client'

import React, {useState} from "react";
import Menu from "../componentes/menu";
import './style.css';
import InfoBanca from "../componentes/info-banca";
import BancaComponente from "../componentes/bancaComponente";
import Perfil from "../componentes/perfil"

export default function Banca() {
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    // Função para lidar com o clique no botão da tarefa
    const handleTarefaClick = (tarefa) => {
        setTarefaSelecionada(tarefa);
    };



    return (
        <main className="container">
             <Menu active={"banca"} currentRoute={"/banca"}  />
             <div className="perfil">
                <div className="aluno">
                        <span className="aluno-img"></span>
                        <div>
                            <Perfil />
                        </div>
                 </div>
                <div className="container-menu-banca">
                   <InfoBanca onTarefaClick={handleTarefaClick}  ></InfoBanca>
                </div>
            </div>
           <div>
                 {tarefaSelecionada && <BancaComponente tarefa={tarefaSelecionada} />}

            </div> 
        </main>
    );
}
