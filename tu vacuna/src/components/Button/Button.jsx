import React from 'react'
import './Button.css'

function Button({ text, onClick, variant = 'primary' }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
