import { useState } from 'react'
import Button from '../Button/Button'
import PersonaFila from '../PersonaFila/PersonaFila'
import Iniciales from '../Iniciales/Iniciales'
import type { SolicitudPaciente } from '../../types'
import './InvitacionesRecibidas.css'

interface InvitacionesRecibidasProps {
  solicitudes: SolicitudPaciente[]
  onAceptar: (id: number) => Promise<void>
  onRechazar: (id: number) => Promise<void>
  onGestionar: () => void
}

export default function InvitacionesRecibidas({
  solicitudes,
  onAceptar,
  onRechazar,
  onGestionar,
}: InvitacionesRecibidasProps) {
  const [error, setError] = useState('')

  const responder = async (accion: () => Promise<void>) => {
    setError('')
    try {
      await accion()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo responder la solicitud')
    }
  }

  // las ya respondidas se ven un momento como confirmación, pero no cuentan como pendientes
  const pendientes = solicitudes.filter((s) => !s.respuesta).length

  return (
    <section className="invitaciones-recibidas">
      <header className="invitaciones-recibidas-header">
        <h2 className="invitaciones-recibidas-titulo">Invitaciones recibidas</h2>
        {pendientes > 0 && (
          <span className="invitaciones-recibidas-contador">
            {pendientes} {pendientes === 1 ? 'PENDIENTE' : 'PENDIENTES'}
          </span>
        )}
      </header>

      {solicitudes.length === 0 ? (
        <p className="invitaciones-recibidas-vacio">No tenés solicitudes pendientes.</p>
      ) : (
        <div className="invitaciones-recibidas-lista">
          {solicitudes.map((solicitud) => {
            if (solicitud.respuesta === 'aceptada') {
              return (
                <div key={solicitud.id} className="invitaciones-recibidas-franja invitaciones-recibidas-franja--aceptada">
                  ✓ Paciente aceptado: {solicitud.nombre} {solicitud.apellido}
                </div>
              )
            }
            if (solicitud.respuesta === 'rechazada') {
              return (
                <div key={solicitud.id} className="invitaciones-recibidas-franja invitaciones-recibidas-franja--rechazada">
                  Solicitud rechazada
                </div>
              )
            }
            return (
              <PersonaFila
                key={solicitud.id}
                nombre={`${solicitud.nombre} ${solicitud.apellido}`}
                detalle={solicitud.edad !== undefined ? `${solicitud.edad} años` : undefined}
                variante="paciente"
                avatar={<Iniciales nombre={`${solicitud.nombre} ${solicitud.apellido}`} size="medium" />}
              >
                <Button text="Aceptar" variant="aceptar" onClick={() => responder(() => onAceptar(solicitud.id))} />
                <Button text="Rechazar" variant="rechazar" onClick={() => responder(() => onRechazar(solicitud.id))} />
              </PersonaFila>
            )
          })}
        </div>
      )}

      {error && <p className="invitaciones-recibidas-error">{error}</p>}

      <Button text="Gestionar pacientes" variant="outline" onClick={onGestionar} />
    </section>
  )
}
