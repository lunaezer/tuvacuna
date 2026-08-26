import React from 'react'

export default function CarnetIcon({ estado }) {
  switch (estado) {
    case 'atrasada':
      return (
        <div className="carnet-card-icono carnet-card-icono--atrasada">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      )
    case 'pendiente':
      return (
        <div className="carnet-card-icono carnet-card-icono--pendiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      )
    case 'aplicada':
    default:
      return (
        <div className="carnet-card-icono carnet-card-icono--aplicada">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )
  }
}
