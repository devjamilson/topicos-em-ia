'use client'

import React, { useState } from "react";
import Menu from "../componentes/menu";
import CalendarioMes from "../componentes/calendario";
import './style.css';
import InfoCalendario from "../componentes/info-calendario";

// Importe o componente correspondente à tarefa aqui
import TarefaComponente from "../componentes/tarefaComponente";

export default function Calendario() {
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    // Função para lidar com o clique no botão da tarefa
    const handleTarefaClick = (tarefa) => {
        setTarefaSelecionada(tarefa);
    };

    return (
        <main className="container">
            <Menu active={"calendario"} currentRoute={"/calendario"}  />
            <div className="perfil">
                <div className="container-menu-calendario">
                    <CalendarioMes />
                </div>
                <div>
                     <InfoCalendario onTarefaClick={handleTarefaClick} />
                </div>
            </div>
            {/* Renderize o componente correspondente à tarefa selecionada */}
            {tarefaSelecionada && <TarefaComponente tarefa={tarefaSelecionada} />}
        </main>
    );
}
