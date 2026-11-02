import './CentrosPage.css'
import ListaCentros from '../../components/ListaCentros/ListaCentros'
import MapaCentros from '../../components/MapaCentros/MapaCentros'

export default function CentrosPage() {
  return (
    <div className="contenedor-centros">
      <h1 className="titulo-centros">Centros de salud y vacunatorios</h1>
      
      <div className="centros-layout">
        <ListaCentros />
        <MapaCentros />
      </div>
    </div>
  )
}
