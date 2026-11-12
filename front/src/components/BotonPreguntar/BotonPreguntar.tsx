import IAIcon from '../../assets/IAIcon.svg?react'
import { useAsistente } from '../../hooks/useAsistente'
import './BotonPreguntar.css'

// Botón flotante que abre el asistente. Solo se ve en mobile (en escritorio está en la sidebar)
function BotonPreguntar() {
  const { abrirAsistente } = useAsistente()

  return (
    <button className="boton-preguntar" onClick={abrirAsistente}>
      <IAIcon className="boton-preguntar-icono" />
      Preguntá
    </button>
  )
}

export default BotonPreguntar
