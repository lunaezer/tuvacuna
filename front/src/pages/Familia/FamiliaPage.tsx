import { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamiliarCard from '../../components/FamiliarCard/FamiliarCard'
import CarnetFamiliarModal from '../../components/CarnetFamiliarModal/CarnetFamiliarModal'
import CajaPersonas from '../../components/CajaPersonas/CajaPersonas'
import PersonaFila from '../../components/PersonaFila/PersonaFila'
import Button from '../../components/Button/Button'
import AgregarFamiliarBoton from '../../components/AgregarFamiliarBoton/AgregarFamiliarBoton'
import { useFamilia } from '../../hooks/useFamilia'
import { useMedicos } from '../../hooks/useMedicos'
import { familiaMock } from '../../mocks/carnetMock'
import type { Familiar } from '../../types'
import './FamiliaPage.css'

// Poner en false para usar el back real
const USAR_MOCK = true

export default function FamiliaPage() {
  const { familiares: familiaReal, invitaciones, aceptarInvitacion, rechazarInvitacion, abrirModalAgregar } = useFamilia()
  const { medicos, errorMedicos, abrirModalAgregarMedico } = useMedicos()
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
        <div className="familia-header-botones">
          <Button text="Agregar medico" variant="primary" onClick={abrirModalAgregarMedico} />
          <AgregarFamiliarBoton variante="celeste" onClick={abrirModalAgregar} />
        </div>
      </PageHeader>

      {invitaciones.length > 0 && (
        <CajaPersonas titulo="Invitaciones recibidas" badge="Pendientes" variante="invitaciones">
          {invitaciones.map((invitacion) => (
            <PersonaFila
              key={invitacion.id}
              nombre={`${invitacion.nombre} ${invitacion.apellido}`}
              etiqueta="Familiar"
              variante="familiar"
            >
              <Button text="Rechazar" variant="rechazar" onClick={() => responder(() => rechazarInvitacion(invitacion.id))} />
              <Button text="Aceptar" variant="aceptar" onClick={() => responder(() => aceptarInvitacion(invitacion.id))} />
            </PersonaFila>
          ))}
        </CajaPersonas>
      )}

      {errorMedicos && <p className="familia-error">{errorMedicos}</p>}
      {medicos.length > 0 && (
        <CajaPersonas titulo="Médicos" variante="medicos">
          {medicos.map((medico) => (
            <PersonaFila
              key={medico.id}
              nombre={`Dr. ${medico.nombre} ${medico.apellido}`}
              detalle={[medico.especialidad, medico.institucion].filter(Boolean).join(' · ')}
              etiqueta={medico.estado === 'pendiente' ? 'Pendiente' : 'Médico'}
              etiquetaPendiente={medico.estado === 'pendiente'}
              variante="medico"
            />
          ))}
        </CajaPersonas>
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
