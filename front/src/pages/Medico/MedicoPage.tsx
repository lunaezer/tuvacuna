import PageHeader from '../../components/PageHeader/PageHeader'
import './MedicoPage.css'

export default function MedicoPage() {
  return (
    <div className="contenedor-medico">
      <PageHeader
        titulo="Mis pacientes"
        subtitulo="Seguimiento de vacunación de tus pacientes."
      />

      {/* acá van después: UserInfo, buscador, tabla y detalle */}
    </div>
  )
}
