import InputPregunta from '../InputPregunta/InputPregunta'
import SugerenciasAsistente from '../SugerenciasAsistente/SugerenciasAsistente'
import { useAsistente } from '../../hooks/useAsistente'
import './PreguntaAsistente.css'

const SUGERENCIAS = [
  '¿Puedo vacunarme embarazada?',
  '¿Qué efectos tienen las vacunas?',
  '¿Qué es la Hepatitis B?',
]

// Contenido de la card "Preguntale a TuVacuna" de Inicio: al preguntar se abre el asistente
export default function PreguntaAsistente() {
  const { enviar, abrirAsistente, enviando } = useAsistente()

  const preguntar = (pregunta: string) => {
    abrirAsistente()
    enviar(pregunta)
  }

  return (
    <div className="pregunta-asistente">
      <InputPregunta
        variante="claro"
        placeholder="¿La antigripal se da todos los años?"
        onEnviar={preguntar}
        deshabilitado={enviando}
        maxLength={2000}
      />
      <SugerenciasAsistente variante="claro" preguntas={SUGERENCIAS} onElegir={preguntar} />
    </div>
  )
}
