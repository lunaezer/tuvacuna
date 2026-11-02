import { useState } from 'react'
import './CentrosPage.css'
import MapaCentros from '../../components/MapaCentros/MapaCentros'
import type { Centro } from '../../types'

// TEMPORAL: datos de prueba, se borran al armar el context
const PRUEBA: Centro[] = [
  { id: 1, nombre: 'A', direccion: 'x', lat: -34.6037, lng: -58.3816 },
  { id: 2, nombre: 'B', direccion: 'x', lat: -34.6293, lng: -58.3636 },
  { id: 3, nombre: 'C', direccion: 'x', lat: -34.5686, lng: -58.4731 },
]

export default function CentrosPage() {
  const [seleccionado, setSeleccionado] = useState<Centro | null>(null)

  return (
    <div className="contenedor-centros">
      <h1 className="titulo-centros">Centros de salud y vacunatorios</h1>
      <p className="subtitulo-centros">Encuentra los vacunatorios habilitados más cercanos.</p>
      <MapaCentros
        centros={PRUEBA}
        seleccionado={seleccionado}
        onSeleccionar={setSeleccionado}
      />
    </div>
  )
}
