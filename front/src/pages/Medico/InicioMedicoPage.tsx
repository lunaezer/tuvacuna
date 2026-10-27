import { useNavigate } from 'react-router-dom'
import PerfilMedicoCard from '../../components/PerfilMedicoCard/PerfilMedicoCard'
import DatosMedico from '../../components/DatosMedico/DatosMedico'
import InvitacionesRecibidas from '../../components/InvitacionesRecibidas/InvitacionesRecibidas'
import Button from '../../components/Button/Button'
import { useSolicitudesMedico } from '../../hooks/useSolicitudesMedico'
import { usePacientes } from '../../hooks/usePacientes'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './InicioMedicoPage.css'

export default function InicioMedicoPage() {
  const navigate = useNavigate()
  const { logout } = useUsuario()
  const { solicitudes, aceptar, rechazar } = useSolicitudesMedico()
  const { cargarLista } = usePacientes()

  const aceptarYActualizar = async (id: number) => {
    await aceptar(id) // si falla, tira el error y no sigue
    cargarLista() // el paciente aceptado aparece en "Mis pacientes"
  }

  const cerrarSesion = () => {
    logout()
    navigate('/inicio-sesion')
  }

  return (
    <div className="contenedor-inicio-medico">
      <PerfilMedicoCard />

      <div className="inicio-medico-grid">
        <DatosMedico />

        <div className="inicio-medico-columna">
          <InvitacionesRecibidas
            solicitudes={solicitudes}
            onAceptar={aceptarYActualizar}
            onRechazar={rechazar}
            onGestionar={() => navigate('/pacientes')}
          />
          <Button text="Cerrar sesión" variant="outline" className="boton-cerrar-sesion" onClick={cerrarSesion} />
        </div>
      </div>
    </div>
  )
}
