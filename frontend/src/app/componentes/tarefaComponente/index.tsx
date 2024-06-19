import React from "react";
import './style.css';

// Este componente recebe a tarefa como uma propriedade e exibe seus detalhes
const TarefaComponente = ({ tarefa }) => {
    return (
        <div className="tarefa-detalhes">
            <div>
                <h3>{tarefa.title}</h3>
                <p><strong>Descrição:</strong> {tarefa.description}</p>
                <p><strong>Prazo:</strong> {tarefa.deadline}</p>
                <p><strong>Status:</strong> {tarefa.status}</p>
            </div>
            
        </div>
    );
};

export default TarefaComponente;
