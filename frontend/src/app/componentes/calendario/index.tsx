'use client'

import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import './style.css';

const CalendarioMes = () => {
    const currentDate = new Date();
    const [ano, setAno] = useState(currentDate.getFullYear());
    const [mes, setMes] = useState(currentDate.getMonth());

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

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const mesesDoAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const diasDoMes = [];
    const totalDiasNoMes = getDaysInMonth(mes, ano);
    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay(); 

    for (let i = 0; i < primeiroDiaDoMes; i++) {
        diasDoMes.push(null);
    }

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
                    <div key={index} className={dia === currentDate.getDate() ? "dia-mes current-day" : "dia-mes"}>{dia}</div>
                ))}
            </div>
        </div>
    );
};

export default CalendarioMes;
