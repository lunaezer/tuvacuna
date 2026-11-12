import type { ReactNode } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import AsistentePanel from '../AsistentePanel/AsistentePanel'
import TopbarMobile from '../TopbarMobile/TopbarMobile'
import BotonPreguntar from '../BotonPreguntar/BotonPreguntar'
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
        <TopbarMobile />
        {children}
      </main>
      <BotonPreguntar />
      <AsistentePanel />
    </div>
  )
}

export default DashboardLayout
