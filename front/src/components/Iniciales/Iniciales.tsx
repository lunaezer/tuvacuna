import './Iniciales.css'

// Extrae automáticamente las iniciales a partir de un nombre
export function obtenerIniciales(nombre = '') {
  if (!nombre) return ''
  
  // Limpiar paréntesis ej: "Sofía (vos)" -> "Sofía"
  const limpio = nombre.replace(/\(.*\)/g, '').trim()
  const palabras = limpio.split(' ').filter(Boolean)

  if (palabras.length === 0) return ''

  // Si la primera palabra ya son 2 letras mayúsculas (ej: "TG", "SG", "MR")
  if (palabras[0].length === 2 && palabras[0] === palabras[0].toUpperCase() && palabras.length > 1) {
    return palabras[0]
  }

  // Si tiene 2 o más palabras (ej: "Tomás Gómez" -> "TG")
  if (palabras.length >= 2) {
    return (palabras[0][0] + palabras[1][0]).toUpperCase()
  }

  // Si es 1 sola palabra (ej: "Tomás" -> "TG" si empieza con T, o 2 primeras letras)
  if (palabras[0].length >= 2) {
    return palabras[0].substring(0, 2).toUpperCase()
  }

  return palabras[0][0].toUpperCase()
}

// Colores armoniosos predefinidos para los avatares
const COLORES_PALETA = [
  { bg: '#fcb354', color: '#0f172a' }, // Naranja / Ámbar
  { bg: '#38bdf8', color: '#0f172a' }, // Celeste
  { bg: '#2dd4bf', color: '#0f172a' }, // Verde menta
  { bg: '#f472b6', color: '#0f172a' }, // Rosa
  { bg: '#a78bfa', color: '#0f172a' }, // Violeta
]

function obtenerColorPorNombre(nombre = '') {
  let hash = 0
  for (let i = 0; i < nombre.length; i++) {
    hash = nombre.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLORES_PALETA.length
  return COLORES_PALETA[index]
}

interface InicialesProps {
  nombre?: string
  texto?: string
  colorBg?: string
  colorTexto?: string
  size?: string
  className?: string
}

export default function Iniciales({ nombre, texto, colorBg, colorTexto, size = 'medium', className = '' }: InicialesProps) {
  const iniciales = texto || obtenerIniciales(nombre)
  const estiloAuto = obtenerColorPorNombre(nombre || texto || 'avatar')

  const bg = colorBg || estiloAuto.bg
  const color = colorTexto || estiloAuto.color

  return (
    <div
      className={`avatar-iniciales avatar-iniciales--${size} ${className}`.trim()}
      style={{ backgroundColor: bg, color: color }}
    >
      {iniciales}
    </div>
  )
}
