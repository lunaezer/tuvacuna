import { useState } from 'react'
import BotonEnviar from '../BotonEnviar/BotonEnviar'
import './InputPregunta.css'

interface InputPreguntaProps {
  onEnviar: (texto: string) => void
  deshabilitado?: boolean // mientras espera una respuesta
  maxLength?: number
  placeholder?: string
  variante?: 'oscuro' | 'claro' // oscuro: dentro del panel del asistente; claro: sobre una card blanca
}

export default function InputPregunta({
  onEnviar,
  deshabilitado,
  maxLength,
  placeholder = 'Escribí tu pregunta...',
  variante = 'oscuro',
}: InputPreguntaProps) {
  const [texto, setTexto] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!texto.trim() || deshabilitado) return
    onEnviar(texto)
    setTexto('')
  }

  return (
    <form className={`input-pregunta input-pregunta--${variante}`} onSubmit={handleSubmit}>
      <input
        className="input-pregunta-campo"
        placeholder={placeholder}
        maxLength={maxLength}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <BotonEnviar disabled={deshabilitado || !texto.trim()} />
    </form>
  )
}
