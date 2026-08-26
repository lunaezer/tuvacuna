import React from 'react'
import './PageHeader.css'
import Button from '../Button/Button'

function PageHeader({ titulo, subtitulo, children }) {
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
