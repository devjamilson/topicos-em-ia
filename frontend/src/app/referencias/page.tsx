import React from "react"
import Menu from "../componentes/menu"
import './style.css'


export default function Referencias() {
    return (
        <main className="container">
            <Menu active={"referencias"} currentRoute={"/referencias"}/>
            <div className="perfil">
            <div className="referencia-menu">
                <input type="text" className="referencia-menu__pesquisa" placeholder="Pesquisar..." />
                <button className="referencia-menu__nova">Nova Referencia</button>
            </div>
            </div>
           <h1>Pagina de Referências</h1> 
        </main>
    )
}
