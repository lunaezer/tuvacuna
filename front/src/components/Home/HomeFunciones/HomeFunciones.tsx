import type { ReactNode } from 'react'
import {
  CreditCard,
  CalendarClock,
  MapPin,
  Users,
  Sparkles,
  UserRound,
} from 'lucide-react'
import HomeSeccionClara from '../HomeSeccionClara/HomeSeccionClara'
import HomeTarjeta from '../HomeTarjeta/HomeTarjeta'
import './HomeFunciones.css'

const funciones: { id?: string; icono: ReactNode; titulo: string; texto: string }[] = [
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

export default function HomeFunciones() {
  return (
    <HomeSeccionClara
      id="funciones"
      className="home-funciones"
      etiqueta="FUNCIONES"
      titulo="Todo el seguimiento en un solo lugar."
    >
      <div className="home-rejilla home-grilla">
        {funciones.map((f, i) => (
          <HomeTarjeta
            key={f.titulo}
            id={f.id}
            className="home-tarjeta-funcion"
            delay={(i % 3) * 0.12}
            titulo={f.titulo}
            texto={f.texto}
          >
            <span className="home-icono">{f.icono}</span>
          </HomeTarjeta>
        ))}
      </div>
    </HomeSeccionClara>
  )
}
