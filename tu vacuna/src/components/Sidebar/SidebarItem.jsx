import React from 'react'
import { Link } from 'react-router-dom'
import './SidebarItem.css'

function SidebarItem({ text, to, children, onClick, active = false, className = '' }) {
  const content = text || children

  if (to) {
    return (
      <Link 
        to={to} 
        className={`sidebar-item ${active ? 'active' : ''} ${className}`.trim()}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  return (
    <div 
      className={`sidebar-item ${active ? 'active' : ''} ${className}`.trim()} 
      onClick={onClick}
    >
      {content}
    </div>
  )
}

export default SidebarItem


