import { useNavigate } from 'react-router-dom'
import PerfilMedicoCard from '../../components/PerfilMedicoCard/PerfilMedicoCard'
import DatosUsuario from '../../components/DatosUsuario/DatosUsuario'
import Button from '../../components/Button/Button'
import ColumnaMedico from './ColumnaMedico'
import ColumnaPaciente from './ColumnaPaciente'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './PerfilPage.css'

export default function PerfilPage() {
  const navigate = useNavigate()
  const { usuario, logout } = useUsuario()

  const cerrarSesion = () => {
    logout()
    navigate('/inicio-sesion')
  }

  return (
    <div className="perfil-page">
      <PerfilMedicoCard />

      <div className="perfil-page-grid">
        <DatosUsuario />

        <div className="perfil-page-columna">
          {/* cada columna es un componente aparte para que sus hooks solo corran para su rol */}
          {usuario?.rol === 'medico' ? <ColumnaMedico /> : <ColumnaPaciente />}
          <Button text="Cerrar sesión" variant="outline" className="boton-cerrar-sesion" onClick={cerrarSesion} />
        </div>
      </div>
    </div>
  )
}
