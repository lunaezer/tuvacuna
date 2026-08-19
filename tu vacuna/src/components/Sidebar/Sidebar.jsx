import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import './Sidebar.css'

function Sidebar({ activeItem = 'Panel', className = '' }) {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      <SidebarHeader >
        <h1 className='titulo-sidebar'>TuVacuna</h1>
        </SidebarHeader>

      <nav className="sidebar-nav">
        <SidebarItem text="Panel" to="/panel" active={activeItem === 'Panel'} />
        <SidebarItem text="Mi carnet" to="/mi-carnet" active={activeItem === 'Mi carnet'} />
        <SidebarItem text="Calendario" to="/calendario" active={activeItem === 'Calendario'} />
        <SidebarItem text="Centros" to="/centros" active={activeItem === 'Centros'} />
        <SidebarItem text="Familia" to="/familia" active={activeItem === 'Familia'} />
        <SidebarItem text="Asistente" to="/asistente" active={activeItem === 'Asistente'} />
      </nav>

      <SidebarFooter >
        <SidebarItem text="Cerrar Sesion"/>
        <SidebarItem text="nombre_usuario"/>
      </SidebarFooter>
      
      
    </aside>
  )
}

export default Sidebar



