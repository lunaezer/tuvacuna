import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="contenedor-barra-navegacion">
      <nav className="barra-navegacion">
        <Link to="/" className="logo-marca-navegacion">LOGO TuVacuna</Link>
        <div className="menu-enlaces-navegacion">
          <NavLink to="/panel" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Panel
          </NavLink>
          <NavLink to="/mi-carnet" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Mi carnet
          </NavLink>
          <NavLink to="/centros" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Centros
          </NavLink>
          <NavLink to="/calendario" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Calendario
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
