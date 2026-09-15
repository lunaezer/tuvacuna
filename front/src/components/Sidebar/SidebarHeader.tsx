import type { ReactNode } from 'react'
import './SidebarHeader.css'
import { Link } from 'react-router-dom'

interface SidebarHeaderProps {
  children?: ReactNode
  className?: string
  to: string
}

function SidebarHeader({ children, className = '', to }: SidebarHeaderProps) {
  return (
    <div className={`sidebar-header ${className}`.trim()}>
      <Link to={to} className="sidebar-header-link">
        {children}
      </Link>
    </div>
  )
}

export default SidebarHeader
