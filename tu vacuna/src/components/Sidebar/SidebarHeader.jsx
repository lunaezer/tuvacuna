import React from 'react'
import './SidebarHeader.css'

function SidebarHeader({ children, className = ''}) {
  return (
    <div className={`sidebar-header ${className}`.trim()}>
      {children}
      
    </div>
  )
}

export default SidebarHeader
