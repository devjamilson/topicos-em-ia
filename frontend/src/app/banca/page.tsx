'use client'

import React, {useState} from "react";
import Menu from "../componentes/menu";
import './style.css';
import InfoCalendario from "../componentes/info-calendario";
import TarefaComponente from "../componentes/tarefaComponente";

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
                <div className="container-menu-banca">
                   <InfoCalendario onTarefaClick={handleTarefaClick}  ></InfoCalendario>
                </div>
            </div>
           <div>
                 {tarefaSelecionada && <TarefaComponente tarefa={tarefaSelecionada} />}

            </div> 
        </main>
    );
}
