import PageHeader from '../../components/PageHeader/PageHeader'
import './PacientesPage.css'

export default function PacientesPage() {
  return (
    <div className="contenedor-pacientes">
      <PageHeader
        titulo="Mis pacientes"
        subtitulo="Seguimiento de vacunación de tus pacientes."
      />

      {/* acá van después: UserInfo, buscador, tabla y detalle */}
    </div>
  )
}
