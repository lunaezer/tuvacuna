import React from 'react'
import './SidebarHeader.css'
import { Link } from 'react-router-dom'

function SidebarHeader({ children, className = '', to }) {
  return (
    <div className={`sidebar-header ${className}`.trim()}>
      <Link to={to} className="sidebar-header-link">
        {children}
      </Link>
    </div>
  )
}

export default SidebarHeader
