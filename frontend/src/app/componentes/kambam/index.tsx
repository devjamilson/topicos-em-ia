// Kambam.js
'use client'
import React, { useState } from "react";
import { HiPlusSm } from "react-icons/hi";
import './style.css';

export default function Kambam() {

    return (
        <main className="container-kambam">
            <header className="menu-kambam">
                <button >Card <HiPlusSm /></button>
            </header>
            <div className="cont-column">
                <section className="column">
                    <div className="column-header-card">
                        <h2>Em Progresso</h2>
                    </div>
                </section>
                <section className="column">
                    <div className="column-header-card">
                       <h2>Revisar</h2> 
                    </div>
                </section>
                <section className="column">
                    <div className="column-header-card">
                        <h2>Finalizado</h2>
                    </div>
                </section>
            </div>
        </main>
    );
}
