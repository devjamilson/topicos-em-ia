// Modal.js
import React from "react";
import "./style.css";

export default function Modal({ onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="container-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {/* Seu conteúdo modal aqui */}
                    <h2>Seu Modal</h2>
                    <p>Este é um modal de exemplo.</p>
                    <button onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
