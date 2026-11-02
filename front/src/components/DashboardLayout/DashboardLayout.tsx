import type { ReactNode } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AsistentePanel from '../AsistentePanel/AsistentePanel'
import './DashboardLayout.css'

interface DashboardLayoutProps {
  activeItem: string
  children?: ReactNode
}

function DashboardLayout({ activeItem, children }: DashboardLayoutProps) {
  return (
    <div className="layout-dashboard">
      <Sidebar activeItem={activeItem} />
      <main className="contenido-principal-dashboard">
        {children}
      </main>
      <AsistentePanel />
    </div>
  )
}

export default DashboardLayout
