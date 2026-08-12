import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="contenedor-barra-navegacion">
      <nav className="barra-navegacion">
        <Link to="/" className="logo-marca-navegacion">LOGO TuVacuna</Link>
        <div className="menu-enlaces-navegacion">
          <NavLink to="/como-funciona" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Como Funciona
          </NavLink>
          <NavLink to="/funciones" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Funciones
          </NavLink>
          <NavLink to="/mapa-de-centros" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Mapa de centros
          </NavLink>
          <NavLink to="/vacunas" className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}>
            Vacunas
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
