import { useEffect, useRef } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import InputPregunta from '../InputPregunta/InputPregunta'
import MensajeAsistente from '../MensajeAsistente/MensajeAsistente'
import SugerenciasAsistente from '../SugerenciasAsistente/SugerenciasAsistente'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useAsistente } from '../../hooks/useAsistente'
import './AsistentePanel.css'

const MAX_CARACTERES = 2000
const SUGERENCIAS = [
  '¿Qué efectos adversos son esperables?',
  '¿Puedo vacunarme estando embarazada?',
  '¿La antigripal se da todos los años?',
]

// Panel flotante del asistente: se abre desde el menú lateral, sobre cualquier página
export default function AsistentePanel() {
  const { usuario } = useUsuario()
  const { mensajes, enviando, error, enviar, nuevaConversacion, abierto, cerrarAsistente } = useAsistente()
  const finRef = useRef<HTMLDivElement>(null)

  // cerrar con Escape
  useEffect(() => {
    if (!abierto) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarAsistente()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [abierto, cerrarAsistente])

  // baja hasta el último mensaje
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, enviando, abierto])

  if (!abierto) return null

  const enConversacion = mensajes.length > 0

  return (
    <div className="asistente-overlay" onClick={cerrarAsistente}>
      <section className="asistente-panel" onClick={(e) => e.stopPropagation()}>
        <header className="asistente-header">
          {enConversacion ? (
            <button className="asistente-icono" onClick={nuevaConversacion} aria-label="Nueva conversación">
              <ArrowLeft size={18} />
            </button>
          ) : (
            <span className="asistente-icono asistente-icono--vacio" />
          )}
          <h1 className="asistente-titulo">Asistente</h1>
          <button className="asistente-icono" onClick={cerrarAsistente} aria-label="Cerrar">
            <X size={18} />
          </button>
        </header>

        <div className="asistente-cuerpo">
          {!enConversacion ? (
            <>
              <h2 className="asistente-saludo">
                Hola {usuario?.nombre}.<br />¿En qué te puedo ayudar?
              </h2>
              <SugerenciasAsistente preguntas={SUGERENCIAS} onElegir={enviar} />
            </>
          ) : (
            <div className="asistente-mensajes">
              {mensajes.map((mensaje, i) => (
                <MensajeAsistente key={i} mensaje={mensaje} />
              ))}
              {enviando && (
                <MensajeAsistente mensaje={{ role: 'assistant', content: 'Escribiendo...' }} escribiendo />
              )}
              {error && <p className="asistente-error">{error}</p>}
              <div ref={finRef} />
            </div>
          )}
        </div>

        <InputPregunta onEnviar={enviar} deshabilitado={enviando} maxLength={MAX_CARACTERES} />

        <p className="asistente-fuentes">Fuentes: Calendario de vacunación — Ministerio de salud</p>
      </section>
    </div>
  )
}
