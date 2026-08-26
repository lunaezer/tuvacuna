import { useEffect } from 'react'
import type { ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  titulo?: string
  children?: ReactNode
}

export default function Modal({ isOpen, onClose, titulo, children }: ModalProps) {
  // Cerrar el modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-contenedor" 
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic adentro
      >
        <div className="modal-header">
          {titulo && <h2 className="modal-titulo">{titulo}</h2>}
          <button className="modal-btn-cerrar" onClick={onClose} aria-label="Cerrar modal">
            &times;
          </button>
        </div>

        <div className="modal-contenido">
          {children}
        </div>
      </div>
    </div>
  )
}
