import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import UserInfo from '../../components/UserInfo/UserInfo'
import BuscadorPacientes, { type FiltroPacientes } from '../../components/BuscadorPacientes/BuscadorPacientes'
import ListaPacientes from '../../components/ListaPacientes/ListaPacientes'
import PreviewPaciente from '../../components/PreviewPaciente/PreviewPaciente'
import { usePacientes } from '../../hooks/usePacientes'
import { normalizar } from '../../utils/texto'
import './PacientesPage.css'

export default function PacientesPage() {
  const navigate = useNavigate()
  const {
    pacientes, cargandoLista, errorLista,
    seleccionadoId, detalle, cargandoDetalle, errorDetalle, seleccionar,
  } = usePacientes()
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<FiltroPacientes>('todos')

  const visibles = pacientes.filter((p) => {
    const texto = normalizar(`${p.nombre} ${p.apellido} ${p.dni}`)
    const coincide = texto.includes(normalizar(busqueda))
    const pasaFiltro = filtro === 'todos' || p.estado === 'atrasada'
    return coincide && pasaFiltro
  })

  const seleccionado = pacientes.find((p) => p.id === seleccionadoId) ?? null

  return (
    <div className="contenedor-pacientes">
      <PageHeader titulo="Mis pacientes" subtitulo="Seguimiento de vacunación de tus pacientes." />

      <UserInfo />

      {errorLista ? (
        <p className="pacientes-mensaje">{errorLista}</p>
      ) : cargandoLista ? (
        <p className="pacientes-mensaje">Cargando pacientes...</p>
      ) : (
        <>
          <BuscadorPacientes
            busqueda={busqueda}
            onBusqueda={setBusqueda}
            filtro={filtro}
            onFiltro={setFiltro}
            total={pacientes.length}
            atrasados={pacientes.filter((p) => p.estado === 'atrasada').length}
          />

          <ListaPacientes pacientes={visibles} seleccionadoId={seleccionadoId} onSeleccionar={seleccionar} onVerCarnet={(id) => navigate(`/pacientes/${id}/carnet`)}/>

          <PreviewPaciente
            paciente={seleccionado}
            detalle={detalle}
            cargando={cargandoDetalle}
            error={errorDetalle}
            onVerCarnet={(id) => navigate(`/pacientes/${id}/carnet`)}
          />
        </>
      )}
    </div>
  )
}
