import type { ReactNode } from "react";
import type { CardVariant } from "../../types";
import './Cards.css';

interface CardsProps {
    title?: string
    text?: string
    children?: ReactNode
    variant?: CardVariant
    onClick?: () => void
    className?: string
}

function Cards({ title, text, children, variant = 'white', onClick, className = '' }: CardsProps) {
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