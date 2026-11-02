import './SugerenciasAsistente.css'

interface SugerenciasAsistenteProps {
  preguntas: string[]
  onElegir: (pregunta: string) => void
}

// Las preguntas de ejemplo de la pantalla inicial del asistente
export default function SugerenciasAsistente({ preguntas, onElegir }: SugerenciasAsistenteProps) {
  return (
    <div className="sugerencias-asistente">
      {preguntas.map((pregunta) => (
        <button key={pregunta} className="sugerencia-asistente" onClick={() => onElegir(pregunta)}>
          {pregunta}
        </button>
      ))}
    </div>
  )
}
