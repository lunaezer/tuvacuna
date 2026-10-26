import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '../../components/PageHeader/PageHeader'
import CarnetTimeline from '../../components/CarnetTimeline/CarnetTimeline'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { usePacientes } from '../../hooks/usePacientes'
import { API_URL } from '../../config'
import { carnetsPacientesMock } from '../../mocks/pacientesMock'
import type { SeccionHistorial } from '../../types'
import './CarnetPacientePage.css'

// Poner en false para usar el back real
const USAR_MOCK = true

export default function CarnetPacientePage() {
  const { id = '' } = useParams()
  const { token } = useUsuario()
  const { pacientes } = usePacientes()

  // el nombre sale de la lista que ya tiene el contexto
  const paciente = pacientes.find((p) => p.id === Number(id))
  const titulo = paciente ? `Carnet de ${paciente.nombre} ${paciente.apellido}` : 'Carnet'

  const [secciones, setSecciones] = useState<SeccionHistorial[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError('')

      if (USAR_MOCK) {
        setSecciones(carnetsPacientesMock[Number(id)] ?? [])
        setCargando(false)
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/carnet/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          const data = await response.json().catch(() => null)
          setError(data?.mensaje ?? 'No pudimos cargar el carnet de este paciente.')
          return
        }
        setSecciones(await response.json())
      } catch {
        setError('No se pudo conectar con el servidor')
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [id, token])

  return (
    <div className="contenedor-carnet-paciente">
      <Link to="/pacientes" className="carnet-paciente-volver">
        <ArrowLeft size={16} /> Volver a pacientes
      </Link>

      <PageHeader titulo={titulo} />

      <CarnetTimeline
        secciones={secciones}
        cargando={cargando}
        error={error || undefined}
        mensajeVacio="No hay dosis registradas para este paciente."
      />
    </div>
  )
}
