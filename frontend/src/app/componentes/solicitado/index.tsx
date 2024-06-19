import React from "react";
import "./style.css";

export default function Solicitado({ status, description, comment }) {
    return (
        <div className='cont-solicitado'>
            <h1>{status}</h1>
            <div className='text-container'>
                <p>{description}</p>
                <p>{comment}</p>
            </div>
        </div>
    );
}
