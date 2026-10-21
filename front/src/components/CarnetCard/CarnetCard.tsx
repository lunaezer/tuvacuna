import CarnetIcon from './CarnetIcon'
import Button from '../Button/Button'
import type { Dosis, EstadoDosis } from '../../types'
import './CarnetCard.css'

const ETIQUETA: Record<EstadoDosis, string> = {
  aplicada: 'Aplicada',
  pendiente: 'Pendiente',
  atrasada: 'Atrasada',
  recomendada: 'Recomendada',
}

// Se arma con las partes numéricas: new Date("2000-05-06") lo toma como UTC y corre un día
function formatearFecha(iso: string) {
  const [anio, mes, dia] = iso.split('-').map(Number)
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface CarnetCardProps {
  dosis: Dosis
  onAgendar?: () => void
}

function CarnetCard({ dosis, onAgendar }: CarnetCardProps) {
  const { nombre: titulo, estado, fecha_de_aplicacion, lugar } = dosis
  const subtitulo = [fecha_de_aplicacion && formatearFecha(fecha_de_aplicacion), lugar]
    .filter(Boolean)
    .join(' · ')
  const etiqueta = ETIQUETA[estado]
  const mostrarAgendar = estado !== 'aplicada'

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
