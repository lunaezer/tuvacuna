import type { ReactNode } from 'react'
import type { ButtonVariant } from '../../types'
import './Button.css'

interface ButtonProps {
  text?: string
  icon?: ReactNode
  children?: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  type?:  'button' | 'submit' | 'reset'
  disabled?: boolean

}

function Button({ text, icon, children, onClick, variant = 'primary', className = '', type, disabled}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {text || children}
    </button>
  )
}

export default Button
