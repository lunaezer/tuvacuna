import { useState } from 'react'
import BotonEnviar from '../BotonEnviar/BotonEnviar'
import './InputPregunta.css'

interface InputPreguntaProps {
  onEnviar: (texto: string) => void
  deshabilitado?: boolean // mientras espera una respuesta
  maxLength?: number
}

export default function InputPregunta({ onEnviar, deshabilitado, maxLength }: InputPreguntaProps) {
  const [texto, setTexto] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!texto.trim() || deshabilitado) return
    onEnviar(texto)
    setTexto('')
  }

  return (
    <form className="input-pregunta" onSubmit={handleSubmit}>
      <input
        className="input-pregunta-campo"
        placeholder="Escribí tu pregunta..."
        maxLength={maxLength}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <BotonEnviar disabled={deshabilitado || !texto.trim()} />
    </form>
  )
}
