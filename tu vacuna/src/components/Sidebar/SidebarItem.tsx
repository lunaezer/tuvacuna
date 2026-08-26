import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './SidebarItem.css'

interface SidebarItemProps {
  text?: string
  to?: string
  children?: ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
}

function SidebarItem({ text, to, children, onClick, active = false, className = '' }: SidebarItemProps) {
  const content = (
    <>
      {children}
      {text && <span>{text}</span>}
    </>
  )

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


