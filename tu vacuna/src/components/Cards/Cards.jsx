import React from "react";
import './Cards.css';

function Cards({ title, text, children, variant = 'white', onClick, className = '' }) {
    return (
        <div
            className={`card-tarjeta ${variant ? `card-${variant}` : ''} ${className}`.trim()}
            onClick={onClick}
        >
            {title && <h3 className="card-titulo">{title}</h3>}
            {text && <p className="card-texto">{text}</p>}
            {children}
        </div>
    );
}

export default Cards;