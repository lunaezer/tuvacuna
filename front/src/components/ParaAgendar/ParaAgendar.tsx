import { useNavigate } from 'react-router-dom'
import CarnetCard from '../CarnetCard/CarnetCard'
import { useDosis } from '../../hooks/useDosis'
import './ParaAgendar.css'

const MAXIMO_DOSIS = 3

export default function ParaAgendar() {
  const { paraAgendar, aplicadas, cargandoDosis } = useDosis()
  const navigate = useNavigate()

  // Si no hay nada para agendar, por ahora se muestran las aplicadas
  const dosis = paraAgendar.length > 0 ? paraAgendar : aplicadas

  if (cargandoDosis) {
    return <p className="para-agendar-vacio">Cargando dosis...</p>
  }

  if (dosis.length === 0) {
    return <p className="para-agendar-vacio">Todavía no hay dosis en tu carnet.</p>
  }

  return (
    <div className="para-agendar">
      {dosis.slice(0, MAXIMO_DOSIS).map((d) => (
        <CarnetCard
          key={d.id}
          dosis={d}
          onAgendar={() => navigate('/calendario')}
        />
      ))}
    </div>
  )
}
