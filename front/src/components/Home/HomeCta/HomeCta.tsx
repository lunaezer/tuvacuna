import { motion } from 'framer-motion'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import HomeEtiqueta from '../HomeEtiqueta/HomeEtiqueta'
import HomeBotones from '../HomeBotones/HomeBotones'
import './HomeCta.css'

const hitos = [
  { vacunas: 'BCG · Hepatitis B', edad: 'RECIÉN NACIDO' },
  { vacunas: 'Pentavalente', edad: '2 MESES' },
  { vacunas: 'Triple viral', edad: '12 MESES' },
  { vacunas: 'VPH · Meningococo', edad: '11 AÑOS' },
  { vacunas: 'dTpa · Antigripal', edad: 'ADULTEZ' },
  { vacunas: 'Antineumocócica', edad: '65 +' },
]

export default function HomeCta() {
  const { aparecer, enfocar } = useAnimacionesHome()

  return (
    <section className="home-cta">
      <HomeEtiqueta>EMPEZÁ HOY · EN CINCO MINUTOS</HomeEtiqueta>
      <motion.h2 {...enfocar(0.1)}>Una vida entera registrada</motion.h2>
      <motion.p {...aparecer(0.2)}>
        Desde el primer día de vida hasta los refuerzos de los 65. TuVacuna lleva la cuenta para
        que vos no tengas que hacerlo.
      </motion.p>
      <HomeBotones delay={0.3} centrado />

      <ol className="home-linea">
        {hitos.map((h, i) => (
          <motion.li key={h.edad} {...aparecer(i * 0.1)}>
            <span className="vac">{h.vacunas}</span>
            <i />
            <span className="edad">{h.edad}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
