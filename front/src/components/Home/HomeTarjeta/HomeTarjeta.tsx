import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import './HomeTarjeta.css'

interface HomeTarjetaProps {
  id?: string
  className?: string
  delay?: number
  titulo: string
  texto: string
  children?: ReactNode
}

// Tarjeta con título y texto; lo que va arriba del título (píldora o ícono) entra como children
export default function HomeTarjeta({ id, className = '', delay = 0, titulo, texto, children }: HomeTarjetaProps) {
  const { aparecer } = useAnimacionesHome()

  return (
    <motion.article id={id} className={`home-tarjeta ${className}`.trim()} {...aparecer(delay)}>
      {children}
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </motion.article>
  )
}
