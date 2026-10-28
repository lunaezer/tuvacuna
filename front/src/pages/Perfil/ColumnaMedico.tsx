import { useNavigate } from 'react-router-dom'
import InvitacionesRecibidas from '../../components/InvitacionesRecibidas/InvitacionesRecibidas'
import { useSolicitudesMedico } from '../../hooks/useSolicitudesMedico'
import { usePacientes } from '../../hooks/usePacientes'

export default function ColumnaMedico() {
  const navigate = useNavigate()
  const { solicitudes, aceptar, rechazar } = useSolicitudesMedico()
  const { cargarLista } = usePacientes()

  const aceptarYActualizar = async (id: number) => {
    await aceptar(id) // si falla, tira el error y no sigue
    cargarLista() // el paciente aceptado aparece en "Mis pacientes"
  }

  return (
    <InvitacionesRecibidas
      solicitudes={solicitudes}
      onAceptar={aceptarYActualizar}
      onRechazar={rechazar}
      onGestionar={() => navigate('/pacientes')}
    />
  )
}
