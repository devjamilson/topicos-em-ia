
import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

export default function Solicitacao({ id_professor, id_aluno }) {
    const [description, setDescription] = useState("");
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error('Token não encontrado no localStorage.');
            return;
        }

        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }
        };

        const solicitationData = {
            aluno_id: id_aluno,
            professor_id: id_professor,
            description,
            comment
        };

        try {
            const response = await axios.post('http://localhost:3001/v1/solicitacoes', solicitationData, config);
            console.log('Solicitação enviada com sucesso:', response.data);
            setStatus("Solicitação enviada com sucesso.");
        } catch (error) {
            console.error('Erro:', error);
            if (error.response) {
                console.error('Servidor:', error.response.data);
            } else if (error.request) {
                console.error('Sem resposta:', error.request);
            } else {
                console.error('Requisicao:', error.message);
            }
            console.log(id_professor)
            console.log(id_aluno)
            setStatus("Erro ao enviar solicitação.");
        }
    };

    return (
        <div className="container-solicitacao">
            <div className="status">
                <div className="info-status">
                    <h1><strong>Solicitação:</strong></h1>
                </div>
                <div className="data-status">
                    <h1><strong>Status:</strong><span>{status}</span></h1>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="form-env-solic">
                <div>
                    <label>Descrição:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Comentario:</label>
                    <textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Enviar Solicitação</button>
            </form>
        </div>
    );
}
