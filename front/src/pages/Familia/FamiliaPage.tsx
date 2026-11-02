import { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamiliarCard from '../../components/FamiliarCard/FamiliarCard'
import CarnetFamiliarModal from '../../components/CarnetFamiliarModal/CarnetFamiliarModal'
import CajaPersonas from '../../components/CajaPersonas/CajaPersonas'
import PersonaFila from '../../components/PersonaFila/PersonaFila'
import Button from '../../components/Button/Button'
import AgregarFamiliarBoton from '../../components/AgregarFamiliarBoton/AgregarFamiliarBoton'
import ConfirmarModal from '../../components/ConfirmarModal/ConfirmarModal'
import Toast from '../../components/Toast/Toast'
import { useFamilia } from '../../hooks/useFamilia'
import { useMedicos } from '../../hooks/useMedicos'
import { familiaMock } from '../../mocks/carnetMock'
import type { AccesoFamiliar, Familiar, Medico } from '../../types'
import './FamiliaPage.css'

// Poner en false para usar el back real
const USAR_MOCK = false

export default function FamiliaPage() {
  const {
    familiares: familiaReal, invitaciones, aceptarInvitacion, rechazarInvitacion, abrirModalAgregar,
    accesos, enviadas, quitarAcceso,
  } = useFamilia()
  const { medicos, errorMedicos, abrirModalAgregarMedico, quitarMedico } = useMedicos()
  const familiares = USAR_MOCK ? familiaMock : familiaReal
  const [familiarSeleccionado, setFamiliarSeleccionado] = useState<Familiar | null>(null)
  const [accesoAQuitar, setAccesoAQuitar] = useState<AccesoFamiliar | null>(null)
  const [medicoAQuitar, setMedicoAQuitar] = useState<Medico | null>(null)
  const [errorQuitar, setErrorQuitar] = useState('')

  const medicoPendiente = medicoAQuitar?.estado === 'pendiente'

  const confirmarQuitarMedico = async () => {
    if (!medicoAQuitar?.idVinculo) return
    try {
      await quitarMedico(medicoAQuitar.idVinculo)
    } catch (error) {
      setErrorQuitar(error instanceof Error ? error.message : 'No se pudo quitar al médico')
    }
    setMedicoAQuitar(null)
  }

  const confirmarQuitarAcceso = async () => {
    if (!accesoAQuitar) return
    try {
      await quitarAcceso(accesoAQuitar.id)
    } catch (error) {
      setErrorQuitar(error instanceof Error ? error.message : 'No se pudo quitar el acceso')
    }
    setAccesoAQuitar(null)
  }

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
              nombre={`${invitacion.solicitante.nombre} ${invitacion.solicitante.apellido}`}
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
            >
              {medico.idVinculo !== undefined && (
                <Button
                  text={medico.estado === 'pendiente' ? 'Cancelar solicitud' : 'Quitar'}
                  variant="peligro"
                  onClick={() => setMedicoAQuitar(medico)}
                />
              )}
            </PersonaFila>
          ))}
        </CajaPersonas>
      )}

      {accesos.length > 0 && (
        <CajaPersonas titulo="Quién ve tu carnet" badge={`${accesos.length}`} variante="accesos">
          {accesos.map((acceso) => (
            <PersonaFila
              key={acceso.id}
              nombre={`${acceso.nombre} ${acceso.apellido}`}
              detalle={acceso.mail}
              variante="familiar"
            >
              <Button text="Quitar acceso" variant="peligro" onClick={() => setAccesoAQuitar(acceso)} />
            </PersonaFila>
          ))}
        </CajaPersonas>
      )}

      {enviadas.length > 0 && (
        <CajaPersonas titulo="Solicitudes enviadas" badge="Pendientes" variante="invitaciones">
          {enviadas.map((solicitud) => (
            <PersonaFila
              key={solicitud.id}
              nombre={`${solicitud.destinatario.nombre} ${solicitud.destinatario.apellido}`}
              detalle={solicitud.destinatario.mail}
              etiqueta="Pendiente"
              etiquetaPendiente
              variante="familiar"
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

      <ConfirmarModal
        isOpen={accesoAQuitar !== null}
        titulo="Quitar acceso"
        mensaje={
          <>
            ¿Seguro que querés quitarle el acceso a <strong>{accesoAQuitar?.nombre} {accesoAQuitar?.apellido}</strong>? Va a dejar de ver tu carnet y tu calendario.
          </>
        }
        textoConfirmar="Quitar acceso"
        onClose={() => setAccesoAQuitar(null)}
        onConfirmar={confirmarQuitarAcceso}
      />

      <ConfirmarModal
        isOpen={medicoAQuitar !== null}
        titulo={medicoPendiente ? 'Cancelar solicitud' : 'Quitar médico'}
        mensaje={
          medicoPendiente ? (
            <>
              ¿Cancelar la solicitud a <strong>Dr. {medicoAQuitar?.nombre} {medicoAQuitar?.apellido}</strong>?
            </>
          ) : (
            <>
              ¿Seguro que querés quitarle el acceso a <strong>Dr. {medicoAQuitar?.nombre} {medicoAQuitar?.apellido}</strong>? Va a dejar de ver tu carnet.
            </>
          )
        }
        textoConfirmar={medicoPendiente ? 'Cancelar solicitud' : 'Quitar médico'}
        onClose={() => setMedicoAQuitar(null)}
        onConfirmar={confirmarQuitarMedico}
      />

      <Toast
        isOpen={errorQuitar !== ''}
        mensaje={errorQuitar}
        variante="error"
        onClose={() => setErrorQuitar('')}
      />
    </div>
  )
}
