import { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamiliarCard from '../../components/FamiliarCard/FamiliarCard'
import CarnetFamiliarModal from '../../components/CarnetFamiliarModal/CarnetFamiliarModal'
import InvitacionFila from '../../components/InvitacionFila/InvitacionFila'
import AgregarFamiliarBoton from '../../components/AgregarFamiliarBoton/AgregarFamiliarBoton'
import { useFamilia } from '../../hooks/useFamilia'
import { familiaMock } from '../../mocks/carnetMock'
import type { Familiar } from '../../types'
import './FamiliaPage.css'

// Poner en false para usar el back real
const USAR_MOCK = true

export default function FamiliaPage() {
  const { familiares: familiaReal, invitaciones, aceptarInvitacion, rechazarInvitacion, abrirModalAgregar } = useFamilia()
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
      <PageHeader
        titulo="Grupo familiar"
        subtitulo="Gestiona el carnet de tus hijos y familiares a cargo."
      >
        <AgregarFamiliarBoton variante="celeste" onClick={abrirModalAgregar} />
      </PageHeader>

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

      <div className="familia-agregar">
        <AgregarFamiliarBoton variante="card" onClick={abrirModalAgregar} />
      </div>

      <CarnetFamiliarModal
        familiar={familiarSeleccionado}
        onClose={() => setFamiliarSeleccionado(null)}
      />
    </div>
  )
}
