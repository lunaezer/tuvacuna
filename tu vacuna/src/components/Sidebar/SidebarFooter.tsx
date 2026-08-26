import type { ReactNode } from 'react'
import './SidebarFooter.css'

interface SidebarFooterProps {
  children?: ReactNode
  className?: string
}

function SidebarFooter({ children, className = '' }: SidebarFooterProps) {
  return (
    <div className={`sidebar-footer ${className}`.trim()}>
      {children}
    </div>
  )
}

export default SidebarFooter
