import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import './style.css';

const CalendarioMes = ({ onDateSelect }) => {
    const currentDate = new Date();
    const [ano, setAno] = useState(currentDate.getFullYear());
    const [mes, setMes] = useState(currentDate.getMonth());
    const [dataSelecionada, setDataSelecionada] = useState(currentDate.getDate());

    const handleDateClick = (dia) => {
        setDataSelecionada(dia);
        const date = new Date(ano, mes, dia);
        onDateSelect(date.toISOString().split('T')[0]); // Passa a data selecionada no formato 'YYYY-MM-DD'
    };

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
                {diasDoMes.map((dia, index) => {
                    const dataAtual = new Date(ano, mes, dia);
                    const isDiaAtual = dia === currentDate.getDate() && mes === currentDate.getMonth() && ano === currentDate.getFullYear();
                    const isSelectedDay = dia === dataSelecionada && mes === currentDate.getMonth() && ano === currentDate.getFullYear();
                    return (
                        <div key={index} className={dia === null ? "dia-mes empty-day" : isDiaAtual ? "dia-mes current-day" : isSelectedDay ? "dia-mes selected-day" : "dia-mes"} onClick={() => dia !== null && handleDateClick(dia)}>{dia}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarioMes;
