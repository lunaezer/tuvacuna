import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './DashboardLayout.css'

function DashboardLayout({ activeItem, children }) {
  return (
    <div className="layout-dashboard">
      <Sidebar activeItem={activeItem} />
      <main className="contenido-principal-dashboard">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
