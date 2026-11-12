import { Link } from 'react-router-dom'
import Iniciales from '../Iniciales/Iniciales'
import LogoTuVacuna from '../../assets/LogoHorizontalOscuro.png'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './TopbarMobile.css'

// Barra superior solo mobile: logo a la izquierda y avatar (lleva al perfil) a la derecha
function TopbarMobile() {
  const { usuario } = useUsuario()

  return (
    <header className="topbar-mobile">
      <Link to="/">
        <img className="topbar-mobile-logo" src={LogoTuVacuna} alt="TuVacuna" />
      </Link>
      <Link to="/perfil" aria-label="Mi perfil">
        <Iniciales nombre={`${usuario?.nombre ?? ''} ${usuario?.apellido ?? ''}`.trim()} size="medium" />
      </Link>
    </header>
  )
}

export default TopbarMobile
