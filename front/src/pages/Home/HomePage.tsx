import { useNavigate } from 'react-router-dom'
import {
  CreditCard,
  CalendarClock,
  MapPin,
  Users,
  Sparkles,
  UserRound,
  House,
  Calendar,
  LogOut,
  Send,
  Bot,
  Clock,
  Syringe,
} from 'lucide-react'
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
  { cls: 'home-ampolla-a', fill: '#3aa9e4' },
  { cls: 'home-ampolla-b', fill: '#3aa9e4' },
  { cls: 'home-ampolla-c', fill: '#d9a93d' },
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

function MockupPanel() {
  return (
    <div className="home-panel" role="img" aria-label="Vista previa del panel de TuVacuna">
      <aside className="home-panel-side">
        <span className="home-panel-brand">TuVacuna</span>
        <ul>
          <li className="activo"><House size={14} /> Inicio</li>
          <li><CreditCard size={14} /> Carnet</li>
          <li><Calendar size={14} /> Calendario</li>
          <li><MapPin size={14} /> Centros</li>
          <li><Users size={14} /> Familia</li>
          <li><Bot size={14} /> Asistente</li>
        </ul>
        <div className="home-panel-logout"><LogOut size={14} /> Cerrar sesion</div>
        <div className="home-panel-user"><span>XX</span><i /></div>
      </aside>

      <div className="home-panel-main">
        <div className="home-panel-top">
          <h4>Hola, ___!</h4>
          <span className="home-panel-agendar">Agendar turno</span>
        </div>
        <div className="home-panel-chips">
          <span className="chip-activo"><b>XX</b> ___</span>
          <span className="chip-agregar">+ Agregar familiar</span>
        </div>

        <div className="home-panel-grid">
          <div className="home-panel-card">
            <div className="home-panel-anillo"><strong>80%</strong><small>Al día</small></div>
            <div>
              <h5>Cobertura de vacunación</h5>
              <p><i className="verde" />16 Vacunas aplicadas y registradas</p>
              <p><i className="amarillo" />3 Recomendadas en los próximos 60 días</p>
              <p><i className="rojo" />2 atrasadas</p>
            </div>
          </div>

          <div className="home-panel-card oscura">
            <h5>Centro mas cercano</h5>
            <p className="km">1,2 <small>Km</small></p>
            <p className="centro"><MapPin size={14} /> Vacunatorio municipal centro <small>AV. Rivadavia 2145</small></p>
            <span className="home-panel-boton">Ver en el mapa</span>
          </div>

          <div className="home-panel-card columna">
            <h5>Para agendar</h5>
            <div className="fila"><Syringe size={14} /><span>HPV — Segunda dosis</span><em className="rec">Recomendada</em></div>
            <div className="fila"><Clock size={14} /><span>Antitetanica — Refuerzo</span><em className="atr">Atrasada</em></div>
            <div className="fila"><Clock size={14} /><span>Antitetanica — Refuerzo</span><em className="atr">Atrasada</em></div>
          </div>

          <div className="home-panel-card columna">
            <h5>Preguntale a TuVacuna</h5>
            <div className="home-panel-input">¿La antigripal se da todos los años? <Send size={12} /></div>
            <div className="home-panel-sugerencias">
              <span>¿Puedo vacunarme embarazada?</span>
              <span>Que efectos tienen las vacunas</span>
              <span>¿Que es la Hepatitis B?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  const irRegistro = () => navigate('/registrarse1')
  const irLogin = () => navigate('/inicio-sesion')

  return (
    <div className="pagina-inicio">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-texto">
          <span className="home-insignia"><i /> Calendario Nacional · 2026</span>
          <h1>Cada dosis, registrada y verificable.</h1>
          <p>
            Cargá tu carnet una vez. Cruzamos tu edad, tus comorbilidades y el Calendario Nacional
            para decirte qué te falta y cuándo.
          </p>
          <div className="home-botones">
            <button className="home-boton-vidrio" onClick={irRegistro}>Crear cuenta</button>
            <button className="home-boton-vidrio" onClick={irLogin}>Iniciar sesión</button>
          </div>
        </div>

        <div className="home-hero-visual" aria-hidden="true">
          <div className="home-visor">
            <Frasco />
          </div>
          {ampollas.map((a) => (
            <div key={a.cls} className={`home-ampolla ${a.cls}`}>
              <Ampolla fill={a.fill} />
            </div>
          ))}
          <span className="home-dosis">0,5 ml</span>
          <div className="home-lote">
            <p>LOTE <b>4471-B</b> · ANTIGRIPAL 2026</p>
            <p>CADENA DE FRÍO <b>2–8 °C</b></p>
            <p>APLICADA <b>03·ABR·2026</b></p>
          </div>
        </div>
      </section>

      {/* Panel en vivo */}
      <section className="home-panel-seccion">
        <span className="home-etiqueta-celeste">TU PANEL, EN VIVO</span>
        <h2>Todo tu grupo familiar en una sola pantalla</h2>
        <p>
          Cobertura, dosis atrasadas, próximos turnos y el centro más cercano. Sin planillas, sin
          papeles, sin recordar nada de memoria.
        </p>
        <MockupPanel />
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="home-claro">
        <div className="home-contenedor">
          <div className="home-encabezado">
            <span className="home-regla" />
            <span className="home-etiqueta-clara">CÓMO FUNCIONA</span>
            <h2>Del papel arrugado a un registro que te avisa solo</h2>
            <p className="home-bajada">
              Tres pasos, una sola vez. Después TuVacuna trabaja en segundo plano
            </p>
          </div>
          <div className="home-pasos">
            {pasos.map((p) => (
              <article key={p.etiqueta} className="home-tarjeta">
                <span className="home-pildora">{p.etiqueta}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Funciones */}
      <section id="funciones" className="home-claro home-funciones">
        <div className="home-contenedor">
          <div className="home-encabezado">
            <span className="home-regla" />
            <span className="home-etiqueta-clara">FUNCIONES</span>
            <h2>Todo el seguimiento en un solo lugar.</h2>
          </div>
          <div className="home-grilla">
            {funciones.map((f) => (
              <article key={f.titulo} id={f.id} className="home-tarjeta home-tarjeta-funcion">
                <span className="home-icono">{f.icono}</span>
                <h3>{f.titulo}</h3>
                <p>{f.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <span className="home-etiqueta-celeste">EMPEZÁ HOY · EN CINCO MINUTOS</span>
        <h2>Una vida entera registrada</h2>
        <p>
          Desde el primer día de vida hasta los refuerzos de los 65. TuVacuna lleva la cuenta para
          que vos no tengas que hacerlo.
        </p>
        <div className="home-botones">
          <button className="home-boton-vidrio" onClick={irRegistro}>Crear cuenta</button>
          <button className="home-boton-vidrio" onClick={irLogin}>Iniciar sesión</button>
        </div>

        <ol className="home-linea">
          {hitos.map((h) => (
            <li key={h.edad}>
              <span className="vac">{h.vacunas}</span>
              <i />
              <span className="edad">{h.edad}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
