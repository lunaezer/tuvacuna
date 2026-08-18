import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import './Sidebar.css'

function Sidebar({ activeItem = 'Panel', className = '' }) {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      <SidebarHeader />

      <nav className="sidebar-nav">
        <SidebarItem text="Panel" to="/panel" active={activeItem === 'Panel'} />
        <SidebarItem text="Mi carnet" to="/mi-carnet" active={activeItem === 'Mi carnet'} />
        <SidebarItem text="Calendario" to="/calendario" active={activeItem === 'Calendario'} />
        <SidebarItem text="Centros" to="/centros" active={activeItem === 'Centros'} />
        <SidebarItem text="Familia" to="/familia" active={activeItem === 'Familia'} />
        <SidebarItem text="Asistente" to="/asistente" active={activeItem === 'Asistente'} />
      </nav>

      <SidebarFooter />
    </aside>
  )
}

export default Sidebar



