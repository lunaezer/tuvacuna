import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import './HomeSeccionClara.css'

interface HomeSeccionClaraProps {
  id: string
  className?: string
  etiqueta: string
  titulo: string
  bajada?: string
  children: ReactNode
}

// Sección de fondo claro con su encabezado (regla, etiqueta, título y bajada)
export default function HomeSeccionClara({
  id,
  className = '',
  etiqueta,
  titulo,
  bajada,
  children,
}: HomeSeccionClaraProps) {
  const { aparecer, enfocar, regla } = useAnimacionesHome()

  return (
    <section id={id} className={`home-claro ${className}`.trim()}>
      <div className="home-contenedor">
        <div className="home-encabezado">
          <motion.span className="home-regla" {...regla} />
          <span className="home-etiqueta-clara">{etiqueta}</span>
          <motion.h2 {...enfocar(0.1)}>{titulo}</motion.h2>
          {bajada && (
            <motion.p className="home-bajada" {...aparecer(0.2)}>
              {bajada}
            </motion.p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
