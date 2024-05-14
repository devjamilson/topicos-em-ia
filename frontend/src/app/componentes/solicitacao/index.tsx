// Modal.js
import React from "react";
import "./style.css";

export default function Solicitacao({status, data}) {


    return (
        <div className="container-solicitacao" >
           <div className="status">
                <div className="info-status">
                    <h1><strong>Solicitação:</strong>{data} </h1>
                </div>
                <div className="data-status"><h1><strong>Status:</strong><span>{status}</span></h1></div>
           </div>
           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione blanditiis explicabo vitae officiis ducimus voluptates fugit vel sit iure aperiam mollitia, sint aspernatur, amet dolorum tenetur doloremque? Necessitatibus, vero eaque.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione blanditiis explicabo vitae officiis ducimus voluptates fugit vel sit iure aperiam mollitia, sint aspernatur, amet dolorum tenetur doloremque? Necessitatibus, vero eaque.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione blanditiis explicabo vitae officiis ducimus voluptates fugit vel sit iure aperiam mollitia, sint aspernatur, amet dolorum tenetur doloremque? Necessitatibus, vero eaque.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione blanditiis explicabo vitae officiis ducimus voluptates fugit vel sit iure aperiam mollitia, sint aspernatur, amet dolorum tenetur doloremque? Necessitatibus, vero eaque.</p>
        </div>
    );
}
