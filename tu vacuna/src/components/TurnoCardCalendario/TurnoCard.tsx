import type { EstadoTurno } from '../../types'
import './TurnoCard.css'

interface TurnoCardProps {
  dia: string
  mes: string
  titulo: string
  lugar?: string | null
  hora?: string | null
  estado?: EstadoTurno
  etiqueta?: string
}

function TurnoCard({ dia, mes, titulo, lugar, hora, estado = 'agendado', etiqueta }: TurnoCardProps) {
  return (
    <div className={`turno-card turno-card--${estado}`}>
      <div className={`turno-card-fecha turno-card-fecha--${estado}`}>
        <span className="turno-card-dia">{dia}</span>
        <span className="turno-card-mes">{mes}</span>
      </div>

      <div className="turno-card-info">
        {etiqueta && (
          <span className={`turno-card-etiqueta turno-card-etiqueta--${estado}`}>
            {etiqueta}
          </span>
        )}
        <span className="turno-card-titulo">{titulo}</span>
        {lugar && (
          <span className="turno-card-detalle">
            <span className="turno-card-icono">📍</span> {lugar}
          </span>
        )}
        {hora && (
          <span className="turno-card-detalle">
            <span className="turno-card-icono">🕐</span> {hora}
          </span>
        )}
      </div>
    </div>
  )
}

export default TurnoCard
