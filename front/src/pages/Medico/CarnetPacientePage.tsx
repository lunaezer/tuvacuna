import { useParams } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import './CarnetPacientePage.css'

export default function CarnetPacientePage() {
  const { id } = useParams()

  return (
    <div className="contenedor-carnet-paciente">
      <PageHeader titulo="Carnet" subtitulo={`Paciente ${id}`} />

      {/* acá va después: CarnetTimeline del paciente */}
    </div>
  )
}
