import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import UserInfo from '../../components/UserInfo/UserInfo'
import BuscadorPacientes, { type FiltroPacientes } from '../../components/BuscadorPacientes/BuscadorPacientes'
import ListaPacientes from '../../components/ListaPacientes/ListaPacientes'
import PreviewPaciente from '../../components/PreviewPaciente/PreviewPaciente'
import { pacientesMock } from '../../mocks/pacientesMock'
import './PacientesPage.css'

export default function PacientesPage() {
  const navigate = useNavigate()
  const pacientes = pacientesMock // después: los trae el back
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<FiltroPacientes>('todos')
  const [seleccionadoId, setSeleccionadoId] = useState<number | null>(pacientes[0]?.id ?? null)

  const visibles = pacientes.filter((p) => {
    const texto = `${p.nombre} ${p.apellido} ${p.dni}`.toLowerCase()
    const coincide = texto.includes(busqueda.toLowerCase())
    const pasaFiltro = filtro === 'todos' || p.estado === 'atrasada'
    return coincide && pasaFiltro
  })

  // se busca en la lista completa para que el preview no desaparezca al filtrar
  const seleccionado = pacientes.find((p) => p.id === seleccionadoId) ?? null

  return (
    <div className="contenedor-pacientes">
      <PageHeader titulo="Mis pacientes" subtitulo="Seguimiento de vacunación de tus pacientes." />

      <UserInfo />

      <BuscadorPacientes
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        filtro={filtro}
        onFiltro={setFiltro}
        total={pacientes.length}
        atrasados={pacientes.filter((p) => p.estado === 'atrasada').length}
      />

      <ListaPacientes pacientes={visibles} seleccionadoId={seleccionadoId} onSeleccionar={setSeleccionadoId} />

      <PreviewPaciente paciente={seleccionado} onVerCarnet={(id) => navigate(`/pacientes/${id}/carnet`)} />
    </div>
  )
}
