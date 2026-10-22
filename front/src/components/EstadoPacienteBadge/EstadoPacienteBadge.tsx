import type { EstadoPaciente } from '../../types'
import './EstadoPacienteBadge.css'

const ETIQUETAS: Record<EstadoPaciente, string> = {
  atrasada: 'Atrasada',
  proxima: 'Próxima',
  'al-dia': 'AL DÍA',
}

export default function EstadoPacienteBadge({ estado }: { estado: EstadoPaciente }) {
  return <span className={`estado-paciente-badge estado-paciente-badge--${estado}`}>{ETIQUETAS[estado]}</span>
}
