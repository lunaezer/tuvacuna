import CarnetIcon from './CarnetIcon'
import Button from '../Button/Button'
import type { EstadoDosis } from '../../types'
import './CarnetCard.css'

interface CarnetCardProps {
  titulo?: string
  subtitulo?: string
  estado?: EstadoDosis
  etiqueta?: string
  mostrarAgendar?: boolean
  onAgendar?: () => void
}

function CarnetCard({
  titulo = '',
  subtitulo = '',
  estado = 'aplicada',
  etiqueta = '',
  mostrarAgendar = false,
  onAgendar
}: CarnetCardProps) {
  return (
    <div className={`carnet-card carnet-card--${estado}`}>
      <div className="carnet-card-contenido-izq">
        <CarnetIcon estado={estado} />
        <div className="carnet-card-info">
          {titulo && <h3 className="carnet-card-titulo">{titulo}</h3>}
          {subtitulo && <p className="carnet-card-subtitulo">{subtitulo}</p>}
        </div>
      </div>

      <div className="carnet-card-acciones">
        {etiqueta && (
          <span className={`carnet-card-badge carnet-card-badge--${estado}`}>
            {etiqueta}
          </span>
        )}
        {mostrarAgendar && (
          <Button 
            text="Agendar" 
            variant="secondary" 
            className="carnet-card-btn-agendar" 
            onClick={onAgendar} 
          />
        )}
      </div>
    </div>
  )
}

export default CarnetCard
