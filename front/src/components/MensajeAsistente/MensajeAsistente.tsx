import Iniciales from '../Iniciales/Iniciales'
import AvatarAsistente from '../AvatarAsistente/AvatarAsistente'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import type { MensajeChat } from '../../types'
import './MensajeAsistente.css'

interface MensajeAsistenteProps {
  mensaje: MensajeChat
  escribiendo?: boolean // burbuja de "Escribiendo..." mientras llega la respuesta
}

// Una burbuja del chat: las tuyas a la derecha con tus iniciales, las del asistente a la izquierda
export default function MensajeAsistente({ mensaje, escribiendo }: MensajeAsistenteProps) {
  const { usuario } = useUsuario()
  const esMio = mensaje.role === 'user'

  return (
    <div className={`mensaje-asistente mensaje-asistente--${mensaje.role}`}>
      {!esMio && <AvatarAsistente />}
      <p className={`mensaje-asistente-burbuja${escribiendo ? ' mensaje-asistente-burbuja--escribiendo' : ''}`}>
        {mensaje.content}
      </p>
      {esMio && <Iniciales nombre={[usuario?.nombre, usuario?.apellido].filter(Boolean).join(' ')} size="small" />}
    </div>
  )
}
