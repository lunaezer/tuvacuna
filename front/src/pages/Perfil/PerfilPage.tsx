import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditarPerfilModal from '../../components/EditarPerfilModal/EditarPerfilModal'
import PerfilCard from '../../components/PerfilCard/PerfilCard'
import DatosUsuario from '../../components/DatosUsuario/DatosUsuario'
import Button from '../../components/Button/Button'
import ColumnaMedico from './ColumnaMedico'
import ColumnaPaciente from './ColumnaPaciente'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './PerfilPage.css'

export default function PerfilPage() {
  const navigate = useNavigate()
  const { usuario, logout } = useUsuario()
  const [editando, setEditando] = useState(false)
  const esPaciente = usuario?.rol === 'paciente'

  const cerrarSesion = () => {
    logout()
    navigate('/inicio-sesion')
  }

  return (
    <div className="perfil-page">
      <PerfilCard onEditar={esPaciente ? () => setEditando(true) : undefined} />

      <div className="perfil-page-grid">
        <DatosUsuario />

        <div className="perfil-page-columna">
          {/* cada columna es un componente aparte para que sus hooks solo corran para su rol */}
          {usuario?.rol === 'medico' ? <ColumnaMedico /> : <ColumnaPaciente />}
          <Button text="Cerrar sesión" variant="peligro" onClick={cerrarSesion} />
        </div>
      </div>

      {esPaciente && <EditarPerfilModal isOpen={editando} onClose={() => setEditando(false)} />}
    </div>
  )
}
