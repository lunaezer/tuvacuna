import { Sparkles } from 'lucide-react'
import './AvatarAsistente.css'

// El ícono del asistente, al lado de sus respuestas
export default function AvatarAsistente() {
  return (
    <span className="avatar-asistente">
      <Sparkles size={16} />
    </span>
  )
}
