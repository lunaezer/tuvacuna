import React from 'react'
import './Button.css'

function Button({ text, icon, children, onClick, variant = 'primary', className = '' }) {
  return (
    <button
      className={`btn btn-${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {text || children}
    </button>
  )
}

export default Button
