import { useNavigate } from 'react-router-dom'
import CajaPersonas from '../../components/CajaPersonas/CajaPersonas'
import PersonaFila from '../../components/PersonaFila/PersonaFila'
import Button from '../../components/Button/Button'
import { useMedicos } from '../../hooks/useMedicos'

export default function ColumnaPaciente() {
  const navigate = useNavigate()
  const { medicos } = useMedicos()

  return (
    <CajaPersonas titulo="Quién ve tu carnet" badge={`${medicos.length} ACCESOS`} variante="accesos">
      {medicos.map((medico) => (
        <PersonaFila
          key={medico.id}
          nombre={`Dr. ${medico.nombre} ${medico.apellido}`}
          detalle={[medico.especialidad, medico.matricula && `MN ${medico.matricula}`].filter(Boolean).join(' · ')}
          variante="medico"
        />
      ))}
      {/* pendiente (back): fila "Tu grupo familiar"; el badge solo cuenta médicos por ahora */}
      <Button text="Gestionar accesos" variant="outline" onClick={() => navigate('/familia')} />
    </CajaPersonas>
  )
}
