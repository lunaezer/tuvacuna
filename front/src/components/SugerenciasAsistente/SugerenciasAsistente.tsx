import './SugerenciasAsistente.css'

interface SugerenciasAsistenteProps {
  preguntas: string[]
  onElegir: (pregunta: string) => void
  variante?: 'oscuro' | 'claro' // oscuro: lista en el panel del asistente; claro: chips sobre una card blanca
}

// Las preguntas de ejemplo del asistente
export default function SugerenciasAsistente({ preguntas, onElegir, variante = 'oscuro' }: SugerenciasAsistenteProps) {
  return (
    <div className={`sugerencias-asistente sugerencias-asistente--${variante}`}>
      {preguntas.map((pregunta) => (
        <button key={pregunta} className="sugerencia-asistente" onClick={() => onElegir(pregunta)}>
          {pregunta}
        </button>
      ))}
    </div>
  )
}
