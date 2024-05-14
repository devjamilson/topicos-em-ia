'use client'

import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight} from "react-icons/hi";
import './style.css';

const CalendarioMes = () => {
    // Obtém o ano e o mês atuais
    const currentDate = new Date();
    const [ano, setAno] = useState(currentDate.getFullYear());
    const [mes, setMes] = useState(currentDate.getMonth());

    // Função para avançar para o próximo mês
    const proximoMes = () => {
        setMes(prevMes => {
            if (prevMes === 11) {
                setAno(prevAno => prevAno + 1);
                return 0;
            } else {
                return prevMes + 1;
            }
        });
    };

    // Função para retroceder para o mês anterior
    const mesAnterior = () => {
        setMes(prevMes => {
            if (prevMes === 0) {
                setAno(prevAno => prevAno - 1);
                return 11;
            } else {
                return prevMes - 1;
            }
        });
    };

    // Função para obter o número de dias em um determinado mês e ano
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Array de dias da semana
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Array de nomes dos meses
    const mesesDoAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    // Array com os números dos dias do mês atual
    const diasDoMes = [];
    const totalDiasNoMes = getDaysInMonth(mes, ano);
    for (let i = 1; i <= totalDiasNoMes; i++) {
        diasDoMes.push(i);
    }

    return (
        <div className="calendario-mes">
            <div className="header">
                <button onClick={mesAnterior}><HiChevronLeft /></button>
                <h2>{mesesDoAno[mes]} {ano}</h2>
                <button onClick={proximoMes}><HiChevronRight /></button>
            </div>
            <div className="dias-semana">
                {diasDaSemana.map((dia, index) => (
                    <div key={index} className="dia-semana">{dia}</div>
                ))}
            </div>
            <div className="dias-mes">
                {diasDoMes.map((dia, index) => (
                    <div key={index} className="dia-mes">{dia}</div>
                ))}
            </div>
        </div>
    );
};

export default CalendarioMes;
