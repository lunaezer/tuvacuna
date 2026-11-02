import './CentrosPage.css'
import ListaCentros from '../../components/ListaCentros/ListaCentros'
import MapaCentros from '../../components/MapaCentros/MapaCentros'

export default function CentrosPage() {
  return (
    <div className="contenedor-centros">
      <h1 className="titulo-centros">Centros de salud y vacunatorios</h1>
      <p className="subtitulo-centros">Encuentra los vacunatorios habilitados más cercanos.</p>
      <div className="centros-layout">
        <ListaCentros />
        <MapaCentros />
      </div>
    </div>
  )
}
