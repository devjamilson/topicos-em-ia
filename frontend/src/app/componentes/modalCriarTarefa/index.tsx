// Modal.js
import React from 'react';
import './style.css'; // Crie um arquivo CSS para estilizar o modal

export default function Modal({ show, onClose, onSave }) {
    if (!show) return null;

    const handleSave = () => {
        const title = document.getElementById('task-title').value;
        const deadline = document.getElementById('task-deadline').value;
        onSave(title, deadline);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Criar Tarefa</h2>
                <input id="task-title" type="text" placeholder="Título da Tarefa" required />
                <input id="task-deadline" type="date" placeholder="Data de Entrega" required />
                <button className="cancelar" onClick={onClose}>Cancelar</button>
                <button className="salvar" onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
}
