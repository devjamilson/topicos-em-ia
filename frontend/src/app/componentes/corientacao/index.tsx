import React from "react";
import "./style.css";

export default function COrientacao({ nome, status }) { // Use function keyword

  const bordaClasse = status === "concluída" ? "borda-azul" : "borda-cinza";

  return (
    <div className={`container-corientacao ${bordaClasse}`}>
      <div className="professor">
        <div className="cont-professor-img">
          <span className="professor-img"></span>
        </div>
        <div className="professor-info">
          <h1>{nome}</h1>
          <h2>emaildoprofessor@servidor.uepb.edu.br</h2>
        </div>
      </div>
    </div>
  );
}
