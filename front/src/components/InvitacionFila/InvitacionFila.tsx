import { User } from 'lucide-react'
import Button from '../Button/Button'
import type { Invitacion } from '../../types'
import './InvitacionFila.css'

interface InvitacionFilaProps {
  invitacion: Invitacion
  onAceptar: () => void
  onRechazar: () => void
}

export default function InvitacionFila({ invitacion, onAceptar, onRechazar }: InvitacionFilaProps) {
  const esMedico = invitacion.rol === 'medico'
  const nombreCompleto = `${esMedico ? 'Dr. ' : ''}${invitacion.nombre} ${invitacion.apellido}`

  return (
    <div className="invitacion-fila">
      <div className={`invitacion-fila-icono invitacion-fila-icono--${invitacion.rol}`}>
        <User size={18} />
      </div>

      <span className="invitacion-fila-nombre">{nombreCompleto}</span>

      <span className={`invitacion-fila-rol invitacion-fila-rol--${invitacion.rol}`}>
        {esMedico ? 'Medico' : 'Familiar'}
      </span>

      <div className="invitacion-fila-acciones">
        <Button text="Rechazar" variant="rechazar" onClick={onRechazar} />
        <Button text="Aceptar" variant="aceptar" onClick={onAceptar} />
      </div>
    </div>
  )
}
