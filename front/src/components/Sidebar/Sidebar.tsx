import SidebarHeader from './SidebarHeader'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import './Sidebar.css'
import HomeIcon from '../../assets/HomeIcon.svg?react'
import CarnetIcon from '../../assets/CarnetIcon.svg?react'
import CalendarioIcon from '../../assets/CalendarioIcon.svg?react'
import CentrosIcon from '../../assets/CentrosIcon.svg?react'
import FamiliaIcon from '../../assets/FamiliaIcon.svg?react'
import IAIcon from '../../assets/IAIcon.svg?react'
import LogoutIcon from '../../assets/LogoutIcon.svg?react'
import Iniciales from '../Iniciales/Iniciales'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'

interface SidebarProps {
  activeItem?: string
  className?: string
}

const itemsPaciente = [
  { text: 'Inicio', to: '/inicio', Icon: HomeIcon },
  { text: 'Mi carnet', to: '/mi-carnet', Icon: CarnetIcon },
  { text: 'Calendario', to: '/calendario', Icon: CalendarioIcon },
  { text: 'Centros', to: '/centros', Icon: CentrosIcon },
  { text: 'Familia', to: '/familia', Icon: FamiliaIcon },
  { text: 'Asistente', to: '/asistente', Icon: IAIcon },
]

const itemsMedico = [
  { text: 'Pacientes', to: '/medico', Icon: FamiliaIcon },
]

function Sidebar({ activeItem = 'Inicio', className = '' }: SidebarProps) {
  const { usuario, logout } = useUsuario()
  const items = usuario?.rol === 'medico' ? itemsMedico : itemsPaciente

  return (
    <aside className={`sidebar ${className}`.trim()}>
      <SidebarHeader to="/">
        <h1 className='titulo-sidebar'>TuVacuna</h1>
      </SidebarHeader>

      <nav className="sidebar-nav">
        {items.map(({ text, to, Icon }) => (
          <SidebarItem key={text} text={text} to={to} active={activeItem === text}>
            <Icon className="Logo" />
          </SidebarItem>
        ))}
      </nav>

      <SidebarFooter>
        <SidebarItem text="Cerrar Sesion" onClick={logout} to="/inicio-sesion">
          <LogoutIcon className="Logo" />
        </SidebarItem>
        <SidebarItem text={usuario?.nombre}>
          <Iniciales nombre={`${usuario?.nombre ?? ''} ${usuario?.apellido ?? ''}`.trim()} size="medium" />
        </SidebarItem>
      </SidebarFooter>
    </aside>
  )
}

export default Sidebar
