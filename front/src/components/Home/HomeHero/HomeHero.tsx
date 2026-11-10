import { motion } from 'framer-motion'
import frascoCeleste from '../../../assets/FrascoCeleste.png'
import frascoAmbar from '../../../assets/FrascoAmbar.png'
import ampolla from '../../../assets/Ampolla.png'
import { useAnimacionesHome } from '../../../hooks/useAnimacionesHome'
import HomeBotones from '../HomeBotones/HomeBotones'
import './HomeHero.css'

// Las imágenes ya traen su inclinación; solo se espeja la ampolla de la izquierda
const ampollas = [
  { cls: 'home-ampolla-a', src: ampolla, scaleX: -1, delay: 0 },
  { cls: 'home-ampolla-b', src: ampolla, scaleX: 1, delay: 0.8 },
  { cls: 'home-ampolla-c', src: frascoAmbar, scaleX: 1, delay: 1.6 },
]

export default function HomeHero() {
  const { reducir, aparecer, flotar } = useAnimacionesHome()

  return (
    <section className="home-hero">
      <div className="home-hero-texto">
        <motion.span className="home-insignia" {...aparecer(0)}><i /> Calendario Nacional · 2026</motion.span>
        <motion.h1 {...aparecer(0.15)}>Cada dosis, registrada y verificable.</motion.h1>
        <motion.p {...aparecer(0.3)}>
          Cargá tu carnet una vez. Cruzamos tu edad, tus comorbilidades y el Calendario Nacional
          para decirte qué te falta y cuándo.
        </motion.p>
        <HomeBotones delay={0.45} />
      </div>

      <div className="home-hero-visual" aria-hidden="true">
        <div className="home-visor">
          <motion.div
            {...(reducir
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.85 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, delay: 0.3, ease: 'easeOut' as const },
                })}
          >
            <img className="home-frasco-img" src={frascoCeleste} alt="" />
          </motion.div>
        </div>
        {ampollas.map((a) => (
          <motion.div
            key={a.cls}
            className={`home-ampolla ${a.cls}`}
            style={{ scaleX: a.scaleX }}
            {...flotar(a.delay, 6, 3.5 + a.delay, 2.5)}
          >
            <img className="home-ampolla-img" src={a.src} alt="" />
          </motion.div>
        ))}
        <motion.span className="home-dosis" {...aparecer(0.9)}>0,5 ml</motion.span>
        <motion.div className="home-lote" {...aparecer(1.1)}>
          <p>LOTE <b>4471-B</b> · ANTIGRIPAL 2026</p>
          <p>CADENA DE FRÍO <b>2–8 °C</b></p>
          <p>APLICADA <b>03·ABR·2026</b></p>
        </motion.div>
      </div>
    </section>
  )
}
