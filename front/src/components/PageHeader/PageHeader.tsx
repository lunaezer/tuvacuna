import type { ReactNode } from 'react'
import './PageHeader.css'

interface PageHeaderProps {
  titulo: string
  subtitulo?: string
  children?: ReactNode
}

function PageHeader({ titulo, subtitulo, children }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-texto">
        <h1 className="page-header-titulo">{titulo}</h1>
        {subtitulo && <p className="page-header-subtitulo">{subtitulo}</p>}
      </div>
      
      {children && <div className="page-header-acciones">{children}</div>}
    </div>
  )
}

export default PageHeader
