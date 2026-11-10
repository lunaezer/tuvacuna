import { motion } from 'framer-motion'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import './HomeEtiqueta.css'

interface HomeEtiquetaProps {
  children: string
}

export default function HomeEtiqueta({ children }: HomeEtiquetaProps) {
  const { aparecer } = useAnimacionesHome()
  return (
    <motion.span className="home-etiqueta-celeste" {...aparecer(0)}>
      {children}
    </motion.span>
  )
}
