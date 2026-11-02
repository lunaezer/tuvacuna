import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  CreditCard,
  CalendarClock,
  MapPin,
  Users,
  Sparkles,
  UserRound,
} from 'lucide-react'
import inicioActual from '../../assets/inicio-actual.png'
import './HomePage.css'

function Ampolla({ fill }: { fill: string }) {
  const id = `g-${fill.slice(1)}`
  return (
    <svg viewBox="0 0 60 200" className="home-ampolla-svg" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity=".05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <path d="M24 0h12l4 60h-20z" fill="#2b3a46" opacity=".85" />
      <rect x="10" y="60" width="40" height="130" rx="14" fill="#16242f" stroke="#ffffff" strokeOpacity=".25" />
      <rect x="13" y="115" width="34" height="72" rx="11" fill={fill} />
      <rect x="10" y="60" width="40" height="130" rx="14" fill={`url(#${id})`} />
    </svg>
  )
}

function Frasco() {
  return (
    <svg viewBox="0 0 160 330" className="home-frasco-svg" aria-hidden="true">
      <defs>
        <linearGradient id="frasco-tapa" x1="0" x2="1">
          <stop offset="0" stopColor="#6b7680" />
          <stop offset=".5" stopColor="#c9d1d8" />
          <stop offset="1" stopColor="#6b7680" />
        </linearGradient>
        <linearGradient id="frasco-liquido" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38a6e0" />
          <stop offset="1" stopColor="#1e86c4" />
        </linearGradient>
        <linearGradient id="frasco-brillo" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".3" />
          <stop offset=".3" stopColor="#ffffff" stopOpacity=".02" />
          <stop offset=".85" stopColor="#ffffff" stopOpacity=".02" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".25" />
        </linearGradient>
      </defs>
      <rect x="30" y="0" width="100" height="58" rx="6" fill="url(#frasco-tapa)" />
      <rect x="26" y="52" width="108" height="20" rx="6" fill="#8b959e" />
      <path d="M40 72h80l22 40v190a20 20 0 0 1-20 20H38a20 20 0 0 1-20-20V112z" fill="#16242f" stroke="#ffffff" strokeOpacity=".22" />
      <path d="M22 262V122h116v140" fill="url(#frasco-liquido)" />
      <rect x="18" y="134" width="124" height="86" fill="#f2f6f9" />
      <rect x="32" y="148" width="62" height="4" rx="2" fill="#6b7680" />
      <rect x="32" y="158" width="38" height="4" rx="2" fill="#6b7680" />
      <rect x="32" y="176" width="96" height="12" rx="2" fill="#aab4bc" />
      <path d="M40 72h80l22 40v190a20 20 0 0 1-20 20H38a20 20 0 0 1-20-20V112z" fill="url(#frasco-brillo)" />
    </svg>
  )
}

const ampollas = [
  { cls: 'home-ampolla-a', fill: '#3aa9e4', rotate: -20, scaleX: 1, delay: 0 },
  { cls: 'home-ampolla-b', fill: '#3aa9e4', rotate: 20, scaleX: -1, delay: 0.8 },
  { cls: 'home-ampolla-c', fill: '#d9a93d', rotate: -22, scaleX: 1, delay: 1.6 },
]

const pasos = [
  {
    etiqueta: '01 · CARGA',
    titulo: 'Subí tu carnet',
    texto:
      'Sacale una foto o cargá las dosis con preguntas guiadas. Sirve igual para tus hijos, tus padres o cualquier familiar a cargo.',
  },
  {
    etiqueta: '02 · ANÁLISIS',
    titulo: 'Cruzamos tu perfil',
    texto:
      'Edad, sexo al nacer, comorbilidades, embarazo y época del año se cruzan con el Calendario Nacional para saber qué te falta.',
  },
  {
    etiqueta: '03 · SEGUIMIENTO',
    titulo: 'Te avisamos a tiempo',
    texto:
      'Recordatorios automáticos antes de cada dosis, turnos agendados y el vacunatorio más cercano a mano.',
  },
]

const funciones = [
  {
    icono: <CreditCard />,
    titulo: 'Carnet digital',
    texto: 'Historial completo por año, con fecha, lote y centro donde te aplicaron cada dosis.',
  },
  {
    icono: <CalendarClock />,
    titulo: 'Calendario automático',
    texto: 'Las dosis anuales se agendan solas según cuándo recibiste la anterior.',
  },
  {
    icono: <MapPin />,
    titulo: 'Centros cercanos',
    texto: 'Vacunatorios públicos y privados con distancia real, horarios y qué vacunas tienen.',
  },
  {
    icono: <Users />,
    titulo: 'Grupo familiar',
    texto: 'Hijos, padres, personas a cargo y médicos todos bajo una cuenta y con su propio calendario.',
  },
  {
    icono: <Sparkles />,
    titulo: 'Asistente con IA',
    texto:
      'Preguntas concretas sobre vacunas, respondidas solo con fuentes oficiales y verificables.',
  },
  {
    id: 'medicos',
    icono: <UserRound />,
    titulo: 'Acceso médico',
    texto:
      'Tu profesional entra con su usuario, si vos lo autorizás, y hace seguimiento con vos.',
  },
]

const hitos = [
  { vacunas: 'BCG · Hepatitis B', edad: 'RECIÉN NACIDO' },
  { vacunas: 'Pentavalente', edad: '2 MESES' },
  { vacunas: 'Triple viral', edad: '12 MESES' },
  { vacunas: 'VPH · Meningococo', edad: '11 AÑOS' },
  { vacunas: 'dTpa · Antigripal', edad: 'ADULTEZ' },
  { vacunas: 'Antineumocócica', edad: '65 +' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const irRegistro = () => navigate('/registrarse1')
  const irLogin = () => navigate('/inicio-sesion')

  // Con "reducir movimiento" activado en el sistema no se anima nada
  const reducir = useReducedMotion()

  const aparecer = (delay = 0) =>
    reducir
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: 'easeOut' as const },
        }

  const enfocar = (delay = 0) =>
    reducir
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: 'blur(12px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.8, delay, ease: 'easeOut' as const },
        }

  const flotar = (delay = 0, alto = 14, duracion = 5) =>
    reducir
      ? {}
      : {
          animate: { y: [0, -alto, 0] },
          transition: { duration: duracion, delay, repeat: Infinity, ease: 'easeInOut' as const },
        }

  const regla = reducir
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true },
        transition: { duration: 0.9, ease: 'easeOut' as const },
        style: { originX: 0 },
      }

  return (
    <div className="pagina-inicio">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-texto">
          <motion.span className="home-insignia" {...aparecer(0)}><i /> Calendario Nacional · 2026</motion.span>
          <motion.h1 {...aparecer(0.15)}>Cada dosis, registrada y verificable.</motion.h1>
          <motion.p {...aparecer(0.3)}>
            Cargá tu carnet una vez. Cruzamos tu edad, tus comorbilidades y el Calendario Nacional
            para decirte qué te falta y cuándo.
          </motion.p>
          <motion.div className="home-botones" {...aparecer(0.45)}>
            <button className="home-boton-vidrio" onClick={irRegistro}>Crear cuenta</button>
            <button className="home-boton-vidrio" onClick={irLogin}>Iniciar sesión</button>
          </motion.div>
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
              <motion.div {...flotar(1.2, 16, 6)}>
                <Frasco />
              </motion.div>
            </motion.div>
          </div>
          {ampollas.map((a) => (
            <motion.div
              key={a.cls}
              className={`home-ampolla ${a.cls}`}
              style={{ rotate: a.rotate, scaleX: a.scaleX }}
              {...flotar(a.delay, 12, 4.5 + a.delay)}
            >
              <Ampolla fill={a.fill} />
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

      {/* Panel en vivo */}
      <section className="home-panel-seccion">
        <motion.span className="home-etiqueta-celeste" {...aparecer(0)}>TU PANEL, EN VIVO</motion.span>
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

      {/* Cómo funciona */}
      <section id="como-funciona" className="home-claro">
        <div className="home-contenedor">
          <div className="home-encabezado">
            <motion.span className="home-regla" {...regla} />
            <span className="home-etiqueta-clara">CÓMO FUNCIONA</span>
            <motion.h2 {...enfocar(0.1)}>Del papel arrugado a un registro que te avisa solo</motion.h2>
            <motion.p className="home-bajada" {...aparecer(0.2)}>
              Tres pasos, una sola vez. Después TuVacuna trabaja en segundo plano
            </motion.p>
          </div>
          <div className="home-pasos">
            {pasos.map((p, i) => (
              <motion.article key={p.etiqueta} className="home-tarjeta" {...aparecer(i * 0.12)}>
                <span className="home-pildora">{p.etiqueta}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Funciones */}
      <section id="funciones" className="home-claro home-funciones">
        <div className="home-contenedor">
          <div className="home-encabezado">
            <motion.span className="home-regla" {...regla} />
            <span className="home-etiqueta-clara">FUNCIONES</span>
            <motion.h2 {...enfocar(0.1)}>Todo el seguimiento en un solo lugar.</motion.h2>
          </div>
          <div className="home-grilla">
            {funciones.map((f, i) => (
              <motion.article
                key={f.titulo}
                id={f.id}
                className="home-tarjeta home-tarjeta-funcion"
                {...aparecer((i % 3) * 0.12)}
              >
                <span className="home-icono">{f.icono}</span>
                <h3>{f.titulo}</h3>
                <p>{f.texto}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <motion.span className="home-etiqueta-celeste" {...aparecer(0)}>EMPEZÁ HOY · EN CINCO MINUTOS</motion.span>
        <motion.h2 {...enfocar(0.1)}>Una vida entera registrada</motion.h2>
        <motion.p {...aparecer(0.2)}>
          Desde el primer día de vida hasta los refuerzos de los 65. TuVacuna lleva la cuenta para
          que vos no tengas que hacerlo.
        </motion.p>
        <motion.div className="home-botones" {...aparecer(0.3)}>
          <button className="home-boton-vidrio" onClick={irRegistro}>Crear cuenta</button>
          <button className="home-boton-vidrio" onClick={irLogin}>Iniciar sesión</button>
        </motion.div>

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
    </div>
  )
}
