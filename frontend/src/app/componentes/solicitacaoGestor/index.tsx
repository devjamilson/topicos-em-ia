
import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

export default function SolicitacaoGestor({ id_gestor }) {
    return (
        <div>
            <h3>Solicitações do Gestor {id_gestor}</h3>
            {/* Adicione o conteúdo específico para solicitações do gestor aqui */}
        </div>
    );
}