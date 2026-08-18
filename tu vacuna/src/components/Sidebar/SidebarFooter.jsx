import React from 'react'
import './SidebarFooter.css'

function SidebarFooter({ children, className = '' }) {
  return (
    <div className={`sidebar-footer ${className}`.trim()}>
      {children}
    </div>
  )
}

export default SidebarFooter
