import React from "react"
import Kambam from "../componentes/kambam"
import Menu from "../componentes/menu"
import './style.css'


export default function Inicial() {
    return (
        <main className="container">
            <Menu active={"/inicial"} currentRoute={"/inicial"} />
            <div className="cont-perfil">
                <div className="perfil">
                    <div className="aluno">
                        <span className="aluno-img"></span>
                        <div>
                            <h1>
                                Nome do Aluno
                            </h1> 
                            <h2>emaildoaluno@aluno.uepb.edu.br</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Kambam></Kambam>
        </main>
    )
}
