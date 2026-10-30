import { Check, CalendarClock, Clock } from 'lucide-react'
import type { ReactNode } from 'react'
import { useDosis } from '../../hooks/useDosis'
import './DosisResumen.css'

interface Item {
  clave: 'aplicadas' | 'recomendadas' | 'atrasadas'
  icono: ReactNode
  texto: (cantidad: number) => string
}

const ITEMS: Item[] = [
  {
    clave: 'aplicadas',
    icono: <Check size={18} />,
    texto: (n) => (n === 1 ? 'aplicada y registrada' : 'aplicadas y registradas'),
  },
  {
    clave: 'recomendadas',
    icono: <CalendarClock size={18} />,
    texto: (n) =>
      n === 1
        ? 'recomendada en los próximos 60 días'
        : 'recomendadas en los próximos 60 días',
  },
  {
    clave: 'atrasadas',
    icono: <Clock size={18} />,
    texto: (n) => {
      if (n === 0) return 'ninguna atrasada'
      return n === 1 ? 'atrasada, conviene agendarla' : 'atrasadas, conviene agendarlas'
    },
  },
]

export default function DosisResumen() {
  const { conteo } = useDosis()

  return (
    <div className="dosis-resumen">
      {ITEMS.map((item) => {
        const cantidad = conteo[item.clave]
        return (
          <div key={item.clave} className={`dosis-cuadro dosis-${item.clave}`}>
            <span className="dosis-icono">{item.icono}</span>
            <strong className="dosis-numero">{cantidad}</strong>
            <span className="dosis-texto">{item.texto(cantidad)}</span>
          </div>
        )
      })}
    </div>
  )
}
