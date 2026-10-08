import { useState } from 'react'
import FamiliarCard from '../../components/FamiliarCard/FamiliarCard'
import CarnetFamiliarModal from '../../components/CarnetFamiliarModal/CarnetFamiliarModal'
import InvitacionFila from '../../components/InvitacionFila/InvitacionFila'
import { useFamilia } from '../../hooks/useFamilia'
import { familiaMock } from '../../mocks/carnetMock'
import type { Familiar } from '../../types'
import './FamiliaPage.css'

// Poner en false para usar el back real
const USAR_MOCK = true

export default function FamiliaPage() {
  const { familiares: familiaReal, invitaciones, aceptarInvitacion, rechazarInvitacion } = useFamilia()
  const familiares = USAR_MOCK ? familiaMock : familiaReal
  const [familiarSeleccionado, setFamiliarSeleccionado] = useState<Familiar | null>(null)

  const responder = async (accion: () => Promise<void>) => {
    try {
      await accion()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo responder la invitación')
    }
  }

  return (
    <div className="contenedor-familia">
      <h1 className="titulo-familia">Grupo familiar</h1>
      <p className="subtitulo-familia">Gestiona el carnet de tus hijos y familiares a cargo.</p>

      {invitaciones.length > 0 && (
        <section className="familia-invitaciones">
          <div className="familia-invitaciones-header">
            <h2 className="familia-invitaciones-titulo">Invitaciones recibidas</h2>
            <span className="familia-invitaciones-badge">Pendientes</span>
          </div>

          {invitaciones.map((invitacion) => (
            <InvitacionFila
              key={invitacion.id}
              invitacion={invitacion}
              onAceptar={() => responder(() => aceptarInvitacion(invitacion.id))}
              onRechazar={() => responder(() => rechazarInvitacion(invitacion.id))}
            />
          ))}
        </section>
      )}

      <div className="familia-grid">
        {familiares.map((familiar, index) => (
          <FamiliarCard
            key={familiar.id ?? index}
            familiar={familiar}
            onVerCarnet={() => setFamiliarSeleccionado(familiar)}
          />
        ))}
      </div>

      <CarnetFamiliarModal
        familiar={familiarSeleccionado}
        onClose={() => setFamiliarSeleccionado(null)}
      />
    </div>
  )
}
