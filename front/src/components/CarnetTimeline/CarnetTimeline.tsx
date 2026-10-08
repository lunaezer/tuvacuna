import CarnetCard from '../CarnetCard/CarnetCard'
import type { SeccionHistorial } from '../../types'
import './CarnetTimeline.css'

interface CarnetTimelineProps {
  secciones: SeccionHistorial[]
  cargando: boolean
  error?: string
  onAgendar: (idDosis: string) => void
}

export default function CarnetTimeline({ secciones, cargando, error, onAgendar }: CarnetTimelineProps) {
  return (
    <div className="carnet-timeline">
      {!cargando && !error && secciones.length > 0 && (
        <div className="carnet-timeline-linea" />
      )}

      {error ? (
        <div className="carnet-vacio">
          <p>{error}</p>
        </div>
      ) : cargando ? (
        <p className="carnet-cargando">Cargando información del carnet...</p>
      ) : secciones.length === 0 ? (
        <div className="carnet-vacio">
          <p>No hay dosis registradas para este familiar.</p>
        </div>
      ) : (
        secciones.map((seccion, index) => (
          <div key={seccion.grupo || index} className="carnet-timeline-seccion">
            <div className="carnet-timeline-nodo-header">
              <div
                className={`carnet-timeline-nodo ${
                  seccion.esPendiente ? 'carnet-timeline-nodo--pendientes' : ''
                }`}
              />
              <span className="carnet-timeline-titulo">{seccion.grupo}</span>
            </div>

            <div className="carnet-timeline-cards">
              {seccion.dosis.map((dosis) => (
                <CarnetCard
                  key={dosis.id}
                  titulo={dosis.titulo}
                  subtitulo={dosis.subtitulo}
                  estado={dosis.estado}
                  etiqueta={dosis.etiqueta}
                  mostrarAgendar={dosis.mostrarAgendar}
                  onAgendar={() => onAgendar(dosis.id)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
