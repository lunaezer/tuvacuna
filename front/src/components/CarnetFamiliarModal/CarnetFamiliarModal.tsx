import { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import CarnetTimeline from '../CarnetTimeline/CarnetTimeline'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { API_URL } from '../../config'
import { carnetsMock } from '../../mocks/carnetMock'
import type { Familiar, SeccionHistorial } from '../../types'

// Poner en false para usar el back real
const USAR_MOCK = true

interface CarnetFamiliarModalProps {
  familiar: Familiar | null
  onClose: () => void
}

export default function CarnetFamiliarModal({ familiar, onClose }: CarnetFamiliarModalProps) {
  const { token } = useUsuario()
  const [secciones, setSecciones] = useState<SeccionHistorial[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    if (!familiar) return

    setCargando(true)
    setError(undefined)

    if (USAR_MOCK) {
      setSecciones(carnetsMock[familiar.esVos ? 'yo' : familiar.id ?? ''] ?? [])
      setCargando(false)
      return
    }

    let cancelado = false

    const url = familiar.esVos
      ? `${API_URL}/api/carnet`
      : `${API_URL}/api/carnet/${familiar.id}`

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (!response.ok) throw new Error()
        return response.json()
      })
      .then((data) => {
        if (!cancelado) setSecciones(data)
      })
      .catch(() => {
        if (!cancelado) setError('No pudimos cargar el carnet. Probá de nuevo más tarde.')
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    // Si se cierra o se abre otro familiar antes de que responda, ignoramos esa respuesta
    return () => {
      cancelado = true
    }
  }, [familiar, token])

  const handleAgendar = async (idDosis: string) => {
    await fetch(`${API_URL}/api/turnos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ dosisId: idDosis }),
    })
  }

  return (
    <Modal
      isOpen={familiar !== null}
      onClose={onClose}
      className="modal-contenedor--grande"
    >
      {familiar && <h2 className="modal-titulo">Carnet de {familiar.nombre}</h2>}
      <CarnetTimeline
        secciones={secciones}
        cargando={cargando}
        error={error}
        onAgendar={handleAgendar}
      />
    </Modal>
  )
}
