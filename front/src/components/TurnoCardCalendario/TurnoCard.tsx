import type { EstadoTurno } from '../../types'
import { NOMBRES_MESES } from '../../utils/fechas'
import './TurnoCard.css'

// un turno pendiente es un turno agendado
const ETIQUETAS_ESTADO: Record<EstadoTurno, string> = {
  pendiente: 'Agendado',
  aplicada: 'Aplicado',
  atrasada: 'Atrasado',
  recomendada: 'Recomendado',
}

interface TurnoCardProps {
  dia: number
  mes: number
  nombre: string
  dosis?: string | null
  lugar?: string | null
  hora?: string | null
  estado?: EstadoTurno
  onEditar?: () => void
  onCancelar?: () => void
}

function TurnoCard({ dia, mes, nombre, dosis, lugar, hora, estado = 'pendiente', onEditar, onCancelar }: TurnoCardProps) {
  return (
    <div className={`turno-card turno-card--${estado}`}>
      <div className={`turno-card-fecha turno-card-fecha--${estado}`}>
        <span className="turno-card-dia">{dia}</span>
        <span className="turno-card-mes">{NOMBRES_MESES[mes].slice(0, 3)}</span>
      </div>

      <div className="turno-card-info">
        <span className="turno-card-titulo">
          <span className={`turno-card-etiqueta turno-card-etiqueta--${estado}`}>
            {ETIQUETAS_ESTADO[estado]}
          </span>
          {' — '}
          {nombre}
        </span>
        {dosis && <span className="turno-card-dosis">{dosis}</span>}
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
        {(onEditar || onCancelar) && (
          <div className="turno-card-acciones">
            {onEditar && (
              <button type="button" className="turno-card-accion" onClick={onEditar}>
                Editar
              </button>
            )}
            {onCancelar && (
              <button type="button" className="turno-card-accion turno-card-accion--cancelar" onClick={onCancelar}>
                Cancelar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TurnoCard
