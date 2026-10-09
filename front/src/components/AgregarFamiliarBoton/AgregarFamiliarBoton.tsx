import { Plus } from 'lucide-react'
import Button from '../Button/Button'
import './AgregarFamiliarBoton.css'

interface AgregarFamiliarBotonProps {
  onClick: () => void
  variante?: 'pildora' | 'card' | 'celeste'
}

export default function AgregarFamiliarBoton({ onClick, variante = 'pildora' }: AgregarFamiliarBotonProps) {
  if (variante === 'celeste') {
    return <Button text="Agregar familiar" variant="celeste" onClick={onClick} />
  }

  if (variante === 'card') {
    return (
      <button
        type="button"
        className="agregar-familiar-boton agregar-familiar-boton--card"
        onClick={onClick}
      >
        <span className="agregar-familiar-boton-icono">
          <Plus size={28} strokeWidth={1.75} />
        </span>
        <span className="agregar-familiar-boton-titulo">Agregar familiar</span>
        <span className="agregar-familiar-boton-texto">
          Un hijo, un adulto mayor o cualquier persona a tu cargo
        </span>
      </button>
    )
  }

  return (
    <button type="button" className="agregar-familiar-boton" onClick={onClick}>
      + Agregar familiar
    </button>
  )
}
