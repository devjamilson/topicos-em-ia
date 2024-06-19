// Kambam.js
'use client'
import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './style.css';

const initialData = [
    { id: '1', title: 'Tarefa 1', status: 'Finalizado', deadline:'2024-06-7'},
    { id: '2', title: 'Tarefa 2', status: 'Revisar', deadline:'2024-06-10' },
    { id: '3', title: 'Tarefa 3', status: 'Finalizado', deadline:'2024-06-24'},
    { id: '4', title: 'Tarefa 4', status: 'Em Progresso', deadline:'2024-06-7'},
    { id: '5', title: 'Tarefa 5', status: 'Finalizado', deadline:'2024-06-10' },
    { id: '6', title: 'Tarefa 6', status: 'Finalizado', deadline:'2024-06-24'},
];

const ItemTypes = {
    CARD: 'card',
};

export default function Kambam() {




    const [tasks, setTasks] = useState(initialData);

    const handleAddTask = () => {
        const newTask = { id: `${tasks.length + 1}`, title: `Tarefa ${tasks.length + 1}`, status: 'Em Progresso' };
        setTasks([...tasks, newTask]);
    };

    const moveTask = (id, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="container-kambam">
                <header className="menu-kambam">
                    <button onClick={handleAddTask}>Card <HiPlusSm /></button>
                </header>
                <div className="cont-column">
                    {['Em Progresso', 'Revisar', 'Finalizado'].map(status => (
                        <Column key={status} status={status} tasks={tasks} moveTask={moveTask} />
                    ))}
                </div>
            </main>
        </DndProvider>
    );
}

function Column({ status, tasks, moveTask }) {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item) => moveTask(item.id, status),
    });

    return (
        <section ref={drop} className="column">
            <div className="column-header-card">
                <h2>{status}</h2>
            </div>
            {tasks.filter(task => task.status === status).map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
            ))}
        </section>
    );
}

function TaskCard({ task }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="task-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <p>{task.title}</p>
            <p className="data">{task.deadline}</p>
        </div>
    );
}
