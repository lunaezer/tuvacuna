import type { DiaMarcado } from '../../types'
import './CalendarioWidget.css'

interface CalendarioWidgetProps {
  mesActual: number
  anioActual: number
  onMesAnteriorClick: () => void
  onMesSiguienteClick: () => void
  diasMarcados?: DiaMarcado[]
  onDiaClick?: (dia: number, mes: number, anio: number) => void
}

function CalendarioWidget({
  mesActual,
  anioActual,
  onMesAnteriorClick,
  onMesSiguienteClick,
  diasMarcados = [],
  onDiaClick,
}: CalendarioWidgetProps) {
  const hoy = new Date()

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']

  // ── Generar grilla de días ──────────────────────────────
  const primerDiaMes = new Date(anioActual, mesActual, 1)
  const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0)
  const totalDias = ultimoDiaMes.getDate()

  // getDay() devuelve 0=Dom, ajustamos para que Lun=0
  let diaInicio = primerDiaMes.getDay() - 1
  if (diaInicio < 0) diaInicio = 6

  // Días del mes anterior para rellenar la primera semana
  const diasMesAnterior = new Date(anioActual, mesActual, 0).getDate()

  const mesAnterior = mesActual === 0 ? 11 : mesActual - 1
  const anioMesAnterior = mesActual === 0 ? anioActual - 1 : anioActual
  const mesSiguiente = mesActual === 11 ? 0 : mesActual + 1
  const anioMesSiguiente = mesActual === 11 ? anioActual + 1 : anioActual

  const celdas = []

  // Días del mes anterior (grises)
  for (let i = diaInicio - 1; i >= 0; i--) {
    celdas.push({ dia: diasMesAnterior - i, esMesActual: false, mes: mesAnterior, anio: anioMesAnterior })
  }

  // Días del mes actual
  for (let d = 1; d <= totalDias; d++) {
    celdas.push({ dia: d, esMesActual: true, mes: mesActual, anio: anioActual })
  }

  // Días del mes siguiente para completar la grilla (hasta 35 celdas = 5 filas)
  const restantes = 35 - celdas.length
  for (let i = 1; i <= restantes; i++) {
    celdas.push({ dia: i, esMesActual: false, mes: mesSiguiente, anio: anioMesSiguiente })
  }

  // ── Helpers ─────────────────────────────────────────────
  const esHoy = (dia: number) => {
    return (
      dia === hoy.getDate() &&
      mesActual === hoy.getMonth() &&
      anioActual === hoy.getFullYear()
    )
  }

  const obtenerMarca = (dia: number, mes: number, anio: number) => {
    return diasMarcados.find((m) => m.dia === dia && m.mes === mes && m.anio === anio)
  }

  return (
    <div className="calendario-widget">
      {/* Header con mes/año y flechas */}
      <div className="calendario-widget-header">
        <span className="calendario-widget-mes">
          {nombresMeses[mesActual]} {anioActual}
        </span>
        <div className="calendario-widget-nav">
          <button className="calendario-widget-nav-btn" onClick={onMesAnteriorClick} aria-label="Mes anterior">
            ‹
          </button>
          <button className="calendario-widget-nav-btn" onClick={onMesSiguienteClick} aria-label="Mes siguiente">
            ›
          </button>
        </div>
      </div>

      {/* Nombres de días */}
      <div className="calendario-widget-dias-semana">
        {diasSemana.map((nombre) => (
          <span key={nombre} className="calendario-widget-dia-nombre">{nombre}</span>
        ))}
      </div>

      {/* Grilla de días */}
      <div className="calendario-widget-grilla">
        {celdas.map((celda, index) => {
          const marca = obtenerMarca(celda.dia, celda.mes, celda.anio)
          const clases = [
            'calendario-widget-celda',
            !celda.esMesActual && 'calendario-widget-celda--fuera',
            celda.esMesActual && esHoy(celda.dia) && 'calendario-widget-celda--hoy',
            marca?.tipo === 'turno' && 'calendario-widget-celda--turno',
            marca?.tipo === 'atrasado' && 'calendario-widget-celda--atrasado',
            marca?.tipo === 'recomendado' && 'calendario-widget-celda--recomendado',
          ].filter(Boolean).join(' ')

          return (
            <button
              key={index}
              className={clases}
              onClick={() => onDiaClick?.(celda.dia, celda.mes, celda.anio)}
            >
              <span className="calendario-widget-celda-numero">{celda.dia}</span>
              {marca && <span className={`calendario-widget-punto calendario-widget-punto--${marca.tipo}`} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarioWidget
