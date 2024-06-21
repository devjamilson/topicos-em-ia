import React from "react";
import './style.css';

export default function InfoBanca({onTarefaClick}) {

    const banca = [
        {
            "id": "5c86d00c7a8618923481b48a",
            "realized_at": "2024-06-20",
            "score": "2024-06-20",
            "status": "pendente",
            "analyzers": [
              [
                "Paulo",
                "Bruna",
                "Héricles"
              ]
            ]
          }
    ];


    return (
        <div className="tarefas">
            <h3>Defesas </h3>
            <ul>
                {banca.map(tarefa => (
                        <li key={tarefa.id} className={`tarefa ${tarefa.status}`}>
                            <button onClick={() => onTarefaClick(tarefa)}>
                                <h4><strong>{tarefa.status}</strong></h4>
                                <p><strong>Prazo:</strong> {tarefa.score}</p>
                                <span><strong>Banca:</strong> {tarefa.analyzers[0][0]}, {tarefa.analyzers[0][1]} e  {tarefa.analyzers[0][2]}</span>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
