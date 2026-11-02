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
import LogoTuVacuna from '../../assets/LogoHorizontalBlanco.svg'
import Iniciales from '../Iniciales/Iniciales'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useAsistente } from '../../hooks/useAsistente'

interface SidebarProps {
  activeItem?: string
  className?: string
}

interface ItemMenu {
  text: string
  to?: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  abreAsistente?: boolean
}

const itemsPaciente: ItemMenu[] = [
  { text: 'Inicio', to: '/inicio', Icon: HomeIcon },
  { text: 'Mi carnet', to: '/mi-carnet', Icon: CarnetIcon },
  { text: 'Calendario', to: '/calendario', Icon: CalendarioIcon },
  { text: 'Centros', to: '/centros', Icon: CentrosIcon },
  { text: 'Familia', to: '/familia', Icon: FamiliaIcon },
  { text: 'Asistente', Icon: IAIcon, abreAsistente: true }, // no navega: abre el panel flotante
]

const itemsMedico: ItemMenu[] = [
  { text: 'Inicio', to: '/inicio', Icon: HomeIcon },
  { text: 'Pacientes', to: '/pacientes', Icon: FamiliaIcon },
]

function Sidebar({ activeItem = 'Inicio', className = '' }: SidebarProps) {
  const { usuario, logout } = useUsuario()
  const { abierto, abrirAsistente } = useAsistente()
  const items = usuario?.rol === 'medico' ? itemsMedico : itemsPaciente
  const nombreUsuario = usuario?.rol === 'medico'
    ? `Dr. ${[usuario.nombre, usuario.apellido].filter(Boolean).join(' ')}`
    : usuario?.nombre

  return (
    <aside className={`sidebar ${className}`.trim()}>
      <SidebarHeader to="/">
        <img className="logo-sidebar" src={LogoTuVacuna} alt="TuVacuna" />
      </SidebarHeader>

      <nav className="sidebar-nav">
        {items.map(({ text, to, Icon, abreAsistente }) => (
          <SidebarItem
            key={text}
            text={text}
            to={to}
            onClick={abreAsistente ? abrirAsistente : undefined}
            active={abreAsistente ? abierto : activeItem === text}
          >
            <Icon className="Logo" />
          </SidebarItem>
        ))}
      </nav>

      <SidebarFooter>
        <SidebarItem text="Cerrar Sesion" onClick={logout} to="/inicio-sesion">
          <LogoutIcon className="Logo" />
        </SidebarItem>
        <SidebarItem text={nombreUsuario} to="/perfil" active={activeItem === 'Perfil'}>
          <Iniciales nombre={`${usuario?.nombre ?? ''} ${usuario?.apellido ?? ''}`.trim()} size="medium" />
        </SidebarItem>
      </SidebarFooter>
    </aside>
  )
}

export default Sidebar
