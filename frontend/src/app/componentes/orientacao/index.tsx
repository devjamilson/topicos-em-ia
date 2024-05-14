// Modal.js
import React from "react";
import "./style.css";

export default function Solicitacao({nome}) {


    return (
        <div className="container-corientacao" >
            <div className="professor">
                    <div className="cont-professor-img">
                         <span className="professor-img"></span>
                    </div>
                    <div className="professor-info">
                        <h1>
                           {nome}
                        </h1> 
                        <h2>emaildoprofessor@servidor.uepb.edu.br</h2>
                    </div>
                </div>
        </div>
    );
}
