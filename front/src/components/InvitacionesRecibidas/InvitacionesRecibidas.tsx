import { useState } from 'react'
import Button from '../Button/Button'
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

  return (
    <section className="invitaciones-recibidas">
      <header className="invitaciones-recibidas-header">
        <h2 className="invitaciones-recibidas-titulo">Invitaciones recibidas</h2>
        {solicitudes.length > 0 && (
          <span className="invitaciones-recibidas-contador">
            {solicitudes.length} {solicitudes.length === 1 ? 'PENDIENTE' : 'PENDIENTES'}
          </span>
        )}
      </header>

      {solicitudes.length === 0 ? (
        <p className="invitaciones-recibidas-vacio">No tenés solicitudes pendientes.</p>
      ) : (
        <ul className="invitaciones-recibidas-lista">
          {solicitudes.map((solicitud) => (
            <li key={solicitud.id} className="invitaciones-recibidas-fila">
              <Iniciales nombre={`${solicitud.nombre} ${solicitud.apellido}`} size="medium" />

              <div className="invitaciones-recibidas-datos">
                <span className="invitaciones-recibidas-nombre">
                  {solicitud.nombre} {solicitud.apellido}
                </span>
                {solicitud.edad !== undefined && (
                  <span className="invitaciones-recibidas-edad">{solicitud.edad} años</span>
                )}
              </div>

              <div className="invitaciones-recibidas-acciones">
                <Button text="Aceptar" variant="aceptar" onClick={() => responder(() => onAceptar(solicitud.id))} />
                <Button text="Rechazar" variant="rechazar" onClick={() => responder(() => onRechazar(solicitud.id))} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="invitaciones-recibidas-error">{error}</p>}

      <Button text="Gestionar pacientes" variant="outline" onClick={onGestionar} />
    </section>
  )
}
