import { useNavigate } from 'react-router-dom'
import CajaPersonas from '../../components/CajaPersonas/CajaPersonas'
import PersonaFila from '../../components/PersonaFila/PersonaFila'
import Button from '../../components/Button/Button'
import { useMedicos } from '../../hooks/useMedicos'
import { useFamilia } from '../../hooks/useFamilia'

export default function ColumnaPaciente() {
  const navigate = useNavigate()
  const { medicos } = useMedicos()
  const { accesos } = useFamilia()

  return (
    <CajaPersonas titulo="Quién ve tu carnet" badge={`${medicos.length + accesos.length} ACCESOS`} variante="accesos">
      {medicos.map((medico) => (
        <PersonaFila
          key={medico.id}
          nombre={`Dr. ${medico.nombre} ${medico.apellido}`}
          detalle={[medico.especialidad, medico.matricula && `MN ${medico.matricula}`].filter(Boolean).join(' · ')}
          variante="medico"
        />
      ))}
      {accesos.map((acceso) => (
        <PersonaFila
          key={`familiar-${acceso.id}`}
          nombre={`${acceso.nombre} ${acceso.apellido}`}
          detalle={acceso.mail}
          etiqueta="Familiar"
          variante="familiar"
        />
      ))}
      <Button text="Gestionar accesos" variant="outline" onClick={() => navigate('/familia')} />
    </CajaPersonas>
  )
}
