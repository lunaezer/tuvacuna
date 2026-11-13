import { CalendarDays, Plus } from 'lucide-react'
import './AccesosRapidos.css'

interface AccesosRapidosProps {
  onAgendar: () => void
  onCargar: () => void
}

// Dos tarjetas grandes de acceso rápido. Solo se ven en celular
export default function AccesosRapidos({ onAgendar, onCargar }: AccesosRapidosProps) {
  return (
    <div className="accesos-rapidos">
      <button className="acceso-rapido acceso-rapido--oscuro" onClick={onAgendar}>
        <span className="acceso-rapido-icono"><CalendarDays size={20} /></span>
        <strong>Agendar turno</strong>
        <small>Elegís día, hora y centro</small>
      </button>
      <button className="acceso-rapido" onClick={onCargar}>
        <span className="acceso-rapido-icono"><Plus size={20} /></span>
        <strong>Cargar dosis</strong>
        <small>Foto o a mano</small>
      </button>
    </div>
  )
}
