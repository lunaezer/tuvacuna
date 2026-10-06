import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="contenedor-barra-navegacion">
      <nav className="barra-navegacion">
        <Link to="/" className="logo-marca-navegacion">LOGO TuVacuna</Link>
        <div className="menu-enlaces-navegacion">
          <a href="#como-funciona" className="enlace-navegacion">Como funciona</a>
          <a href="#funciones" className="enlace-navegacion">Funciones</a>
          <a href="#medicos" className="enlace-navegacion">Medicos</a>
        </div>
        <span className="barra-navegacion-espacio" aria-hidden="true" />
      </nav>
    </header>
  )
}
