import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../Button/Button'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import './HomeBotones.css'

interface HomeBotonesProps {
  delay?: number
  centrado?: boolean
}

// Crear cuenta / Iniciar sesión (se usa en el hero y en el cierre)
export default function HomeBotones({ delay = 0, centrado = false }: HomeBotonesProps) {
  const navigate = useNavigate()
  const { aparecer } = useAnimacionesHome()

  return (
    <motion.div
      className={`home-botones ${centrado ? 'home-botones-centrado' : ''}`.trim()}
      {...aparecer(delay)}
    >
      <Button variant="vidrio" text="Crear cuenta" onClick={() => navigate('/registrarse1')} />
      <Button variant="vidrio" text="Iniciar sesión" onClick={() => navigate('/inicio-sesion')} />
    </motion.div>
  )
}
