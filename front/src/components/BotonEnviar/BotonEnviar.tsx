import { Send } from 'lucide-react'
import './BotonEnviar.css'

interface BotonEnviarProps {
  disabled?: boolean
}

// Botón redondo de enviar; va dentro de un <form> (submit)
export default function BotonEnviar({ disabled }: BotonEnviarProps) {
  return (
    <button className="boton-enviar" type="submit" disabled={disabled} aria-label="Enviar">
      <Send size={16} />
    </button>
  )
}
