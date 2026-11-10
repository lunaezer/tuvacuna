import { motion } from 'framer-motion'
import inicioActual from '../../../assets/inicio-actual.png'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import HomeEtiqueta from '../HomeEtiqueta/HomeEtiqueta'
import './HomePanel.css'

export default function HomePanel() {
  const { reducir, aparecer, enfocar } = useAnimacionesHome()

  return (
    <section className="home-panel-seccion">
      <HomeEtiqueta>TU PANEL, EN VIVO</HomeEtiqueta>
      <motion.h2 {...enfocar(0.1)}>Todo tu grupo familiar en una sola pantalla</motion.h2>
      <motion.p {...aparecer(0.2)}>
        Cobertura, dosis atrasadas, próximos turnos y el centro más cercano. Sin planillas, sin
        papeles, sin recordar nada de memoria.
      </motion.p>
      <motion.img
        className="home-panel-img"
        src={inicioActual}
        alt="Vista previa del panel de TuVacuna"
        {...(reducir
          ? {}
          : {
              initial: { opacity: 0, y: 60, scale: 0.94 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.9, ease: 'easeOut' as const },
            })}
      />
    </section>
  )
}
