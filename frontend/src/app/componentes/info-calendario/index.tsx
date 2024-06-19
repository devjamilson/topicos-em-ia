'use client'

import React from "react";
import './style.css';
    
export default function InfoCalendario({ onTarefaClick }) {
       const tarefas = [
            {
                id: "1",
                orientation_id: "orientation_1",
                status: "em_progresso",
                title: "Tarefa 4",
                description: "Descrição da Tarefa 1",
                deadline: "2024-06-07",
                extra: {
                    links: {
                        url: "https://exemplo.com/tarefa1",
                        description: "Link para a Tarefa 1"
                    },
                    checklist: [
                        {
                            description: "Item de checklist 1",
                            done: true
                        },
                        {
                            description: "Item de checklist 2",
                            done: false
                        }
                    ]
                }
            },
            {
                id: "2",
                orientation_id: "orientation_2",
                status: "concluido",
                title: "Tarefa 5",
                description: "Descrição da Tarefa 2",
                deadline: "2024-06-10",
                extra: {
                    links: {
                        url: "https://exemplo.com/tarefa2",
                        description: "Link para a Tarefa 2"
                    },
                    checklist: [
                        {
                            description: "Item de checklist 1",
                            done: true
                        }
                    ]
                }
            }
        ];

        return (
            <div className="tarefas">
                <h3>Últimas tarefas</h3>
                <ul>
                    {tarefas.map(tarefa => (
                        <li key={tarefa.id} className={`tarefa ${tarefa.status}`}>
                            <button onClick={() => onTarefaClick(tarefa)}> {/* Adiciona onClick handler */}
                                <h4><strong>{tarefa.title}</strong></h4>
                                <p>{tarefa.description}</p>
                                <p>Prazo: {tarefa.deadline}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    