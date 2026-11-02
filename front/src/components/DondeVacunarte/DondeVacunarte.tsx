import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Button from '../Button/Button'
import { useCentros } from '../../hooks/useCentros'
import './DondeVacunarte.css'

const MAXIMO_CENTROS = 2

// Contenido de la card "Donde vacunarte" de Inicio: unos centros y un acceso al mapa
export default function DondeVacunarte() {
  const navigate = useNavigate()
  const { centros, cargando, error, setSeleccionado } = useCentros()

  const verEnElMapa = (centro?: (typeof centros)[number]) => {
    if (centro) setSeleccionado(centro) // el mapa lo abre ya elegido
    navigate('/centros')
  }

  const mensaje = cargando
    ? 'Cargando centros...'
    : error
      ? error
      : centros.length === 0
        ? 'No hay centros para mostrar.'
        : null

  return (
    <div className="donde-vacunarte">
      {mensaje ? (
        <p className="donde-vacunarte-mensaje">{mensaje}</p>
      ) : (
        <ul className="donde-vacunarte-lista">
          {centros.slice(0, MAXIMO_CENTROS).map((centro) => (
            <li key={centro.id}>
              <button type="button" className="donde-vacunarte-centro" onClick={() => verEnElMapa(centro)}>
                <span className="donde-vacunarte-icono"><MapPin size={18} /></span>
                <span className="donde-vacunarte-datos">
                  <strong>{centro.nombre}</strong>
                  <span>{centro.direccion}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Button text="Ver en el mapa" variant="outline" className="donde-vacunarte-boton" onClick={() => verEnElMapa()} />
    </div>
  )
}
