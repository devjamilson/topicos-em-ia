import React from "react";
import Menu from "../componentes/menu";
import CalendarioMes from "../componentes/calendario";
import './style.css';

export default function Calendario() {
    return (
        <main className="container">
             <Menu active={"calendario"} currentRoute={"/calendario"} />
             <div className="perfil">
                <div className="container-menu-calendario">
                    <CalendarioMes />
                </div>
            </div>
           <h1>Pagina de Calendario</h1> 
        </main>
    );
}
