
import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

export default function SolicitacaoProfessor({ id_professor }) {
    return (
        <div>
            <h3>Solicitações do Professor {id_professor}</h3>
            {/* Adicione o conteúdo específico para solicitações do professor aqui */}
        </div>
    );
}