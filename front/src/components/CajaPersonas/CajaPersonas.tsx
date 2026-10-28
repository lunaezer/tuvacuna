import type { ReactNode } from 'react'
import './CajaPersonas.css'

interface CajaPersonasProps {
  titulo: string
  badge?: string
  variante: 'invitaciones' | 'medicos' | 'accesos' // define el color del borde
  children: ReactNode
}

export default function CajaPersonas({ titulo, badge, variante, children }: CajaPersonasProps) {
  return (
    <section className={`caja-personas caja-personas--${variante}`}>
      <div className="caja-personas-header">
        <h2 className="caja-personas-titulo">{titulo}</h2>
        {badge && <span className="caja-personas-badge">{badge}</span>}
      </div>
      {children}
    </section>
  )
}
