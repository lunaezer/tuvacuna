import React from 'react'
import SidebarHeader from './SidebarHeader'
import SidebarItem from './SidebarItem'
import SidebarFooter from './SidebarFooter'
import './Sidebar.css'
import HomeLogoBlack from '../../assets/HomeLogoBlack.png'
import CarnetLogoWhite from '../../assets/CarnetLogoWhite.png'
import CalendarioLogoWhite from '../../assets/CalendarioLogoWhite.png'
import CentrosLogoWhite from '../../assets/CentrosLogoWhite.png'
import FamiliaLogoWhite from '../../assets/FamiliaLogoWhite.png'
import IALogoWhite from '../../assets/IALogoWhite.png'

function Sidebar({ activeItem = 'Panel', className = '' }) {
  return (
    <aside className={`sidebar ${className}`.trim()}>
      <SidebarHeader to="/">
        <h1 className='titulo-sidebar'>TuVacuna</h1>
        </SidebarHeader>

      <nav className="sidebar-nav">
        <SidebarItem text="Panel" to="/panel" active={activeItem === 'Panel'} >
          <img src={HomeLogoBlack} alt='HomeLogo' className='Logo' />
        </SidebarItem>
        <SidebarItem text="Mi carnet" to="/mi-carnet" active={activeItem === 'Mi carnet'}>
          <img src={CarnetLogoWhite} alt="CarnetLogoWhite" className='Logo' />
        </SidebarItem> 
        <SidebarItem text="Calendario" to="/calendario" active={activeItem === 'Calendario'}> 
          <img src={CalendarioLogoWhite} alt="CalendarioLogoWhite" className='Logo' />
        </SidebarItem>
        <SidebarItem text="Centros" to="/centros" active={activeItem === 'Centros'}>
          <img src={CentrosLogoWhite} alt="CentrosLogoWhite" className='Logo' />
        </SidebarItem>
        <SidebarItem text="Familia" to="/familia" active={activeItem === 'Familia'}>
          <img src={FamiliaLogoWhite} alt="FamiliaLogoWhite" className='Logo' />
        </SidebarItem>
        <SidebarItem text="Asistente" to="/asistente" active={activeItem === 'Asistente'}>
          <img src={IALogoWhite} alt="IALogoWhite" className='Logo' />
        </SidebarItem>
      </nav>

      <SidebarFooter >
        <SidebarItem text="Cerrar Sesion"/>
        <SidebarItem text="nombre_usuario"/>
      </SidebarFooter>
      
      
    </aside>
  )
}

export default Sidebar



