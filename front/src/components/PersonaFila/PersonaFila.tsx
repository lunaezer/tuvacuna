import type { ReactNode } from 'react'
import { User } from 'lucide-react'
import './PersonaFila.css'

interface PersonaFilaProps {
  nombre: string
  etiqueta: string
  variante: 'familiar' | 'medico' // define los colores del ícono y la etiqueta
  children?: ReactNode // acciones (opcional)
}

export default function PersonaFila({ nombre, etiqueta, variante, children }: PersonaFilaProps) {
  return (
    <div className="persona-fila">
      <div className={`persona-fila-icono persona-fila-icono--${variante}`}>
        <User size={18} />
      </div>

      <span className="persona-fila-nombre">{nombre}</span>
      <span className={`persona-fila-etiqueta persona-fila-etiqueta--${variante}`}>{etiqueta}</span>

      {children && <div className="persona-fila-acciones">{children}</div>}
    </div>
  )
}
