import './CentrosPage.css'
import ListaCentros from '../../components/ListaCentros/ListaCentros'
import MapaCentros from '../../components/MapaCentros/MapaCentros'
import PageHeader from '../../components/PageHeader/PageHeader'

export default function CentrosPage() {
  return (
    <div className="contenedor-centros">
      <PageHeader titulo="Centros de salud y vacunatorios" />

      <div className="centros-layout">
        <ListaCentros />
        <MapaCentros />
      </div>
    </div>
  )
}
