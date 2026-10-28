import type { ReactNode } from 'react'
import { User } from 'lucide-react'
import './PersonaFila.css'

interface PersonaFilaProps {
  nombre: string
  detalle?: string // línea chica debajo del nombre (opcional)
  etiqueta?: string // opcional
  etiquetaPendiente?: boolean // pinta la etiqueta de rojo (ej: solicitud pendiente)
  variante: 'familiar' | 'medico' | 'paciente' // define los colores del ícono y la etiqueta
  avatar?: ReactNode // reemplaza al ícono (ej: las iniciales)
  children?: ReactNode // acciones (opcional)
}

export default function PersonaFila({ nombre, detalle, etiqueta, etiquetaPendiente, variante, avatar, children }: PersonaFilaProps) {
  return (
    <div className="persona-fila">
      {avatar ? (
        <div className="persona-fila-avatar">{avatar}</div>
      ) : (
        <div className={`persona-fila-icono persona-fila-icono--${variante}`}>
          <User size={18} />
        </div>
      )}

      <div className="persona-fila-datos">
        <span className="persona-fila-nombre">{nombre}</span>
        {detalle && <span className="persona-fila-detalle">{detalle}</span>}
      </div>

      {etiqueta && (
        <span
          className={`persona-fila-etiqueta persona-fila-etiqueta--${variante}${etiquetaPendiente ? ' persona-fila-etiqueta--pendiente' : ''}`}
        >
          {etiqueta}
        </span>
      )}

      {children && <div className="persona-fila-acciones">{children}</div>}
    </div>
  )
}
