import React, { useState } from 'react'
import './CalendarioWidget.css'

/**
 * Widget de calendario mensual.
 * Muestra una grilla con los días del mes, navegación mes a mes,
 * y resalta días que tienen turnos agendados.
 *
 * @param {Array} diasMarcados - Array de objetos { dia, tipo } para resaltar días
 *   tipo: "turno" (punto verde) | "hoy" (fondo oscuro) | "atrasado" (punto rojo)
 * @param {function} onDiaClick - Callback al clickear un día: (dia, mes, anio) => {}
 */
function CalendarioWidget({ diasMarcados = [], onDiaClick }) {
  const hoy = new Date()
  const [mesActual, setMesActual] = useState(hoy.getMonth())
  const [anioActual, setAnioActual] = useState(hoy.getFullYear())

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const diasSemana = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']

  // ── Navegación ──────────────────────────────────────────
  const irMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11)
      setAnioActual(anioActual - 1)
    } else {
      setMesActual(mesActual - 1)
    }
  }

  const irMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0)
      setAnioActual(anioActual + 1)
    } else {
      setMesActual(mesActual + 1)
    }
  }

  // ── Generar grilla de días ──────────────────────────────
  const primerDiaMes = new Date(anioActual, mesActual, 1)
  const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0)
  const totalDias = ultimoDiaMes.getDate()

  // getDay() devuelve 0=Dom, ajustamos para que Lun=0
  let diaInicio = primerDiaMes.getDay() - 1
  if (diaInicio < 0) diaInicio = 6

  // Días del mes anterior para rellenar la primera semana
  const diasMesAnterior = new Date(anioActual, mesActual, 0).getDate()

  const celdas = []

  // Días del mes anterior (grises)
  for (let i = diaInicio - 1; i >= 0; i--) {
    celdas.push({ dia: diasMesAnterior - i, esMesActual: false })
  }

  // Días del mes actual
  for (let d = 1; d <= totalDias; d++) {
    celdas.push({ dia: d, esMesActual: true })
  }

  // Días del mes siguiente para completar la grilla (hasta 42 celdas = 6 filas)
  const restantes = 42 - celdas.length
  for (let i = 1; i <= restantes; i++) {
    celdas.push({ dia: i, esMesActual: false })
  }

  // ── Helpers ─────────────────────────────────────────────
  const esHoy = (dia) => {
    return (
      dia === hoy.getDate() &&
      mesActual === hoy.getMonth() &&
      anioActual === hoy.getFullYear()
    )
  }

  const obtenerMarca = (dia) => {
    return diasMarcados.find((m) => m.dia === dia)
  }

  // ══════════════════════════════════════════════════════════
  // TODO: Acá va la lógica de conexión con datos reales.
  //
  // Esta función debería:
  //   1. Recibir los turnos del backend o del contexto global
  //   2. Filtrar los turnos correspondientes al mesActual / anioActual
  //   3. Armar el array diasMarcados automáticamente
  //   4. Manejar el click en un día para mostrar detalle o agendar turno
  //
  // Por ahora los diasMarcados se reciben por props.
  // ══════════════════════════════════════════════════════════

  return (
    <div className="calendario-widget">
      {/* Header con mes/año y flechas */}
      <div className="calendario-widget-header">
        <span className="calendario-widget-mes">
          {nombresMeses[mesActual]} {anioActual}
        </span>
        <div className="calendario-widget-nav">
          <button className="calendario-widget-nav-btn" onClick={irMesAnterior} aria-label="Mes anterior">
            ‹
          </button>
          <button className="calendario-widget-nav-btn" onClick={irMesSiguiente} aria-label="Mes siguiente">
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
          const marca = celda.esMesActual ? obtenerMarca(celda.dia) : null
          const clases = [
            'calendario-widget-celda',
            !celda.esMesActual && 'calendario-widget-celda--fuera',
            celda.esMesActual && esHoy(celda.dia) && 'calendario-widget-celda--hoy',
            marca?.tipo === 'turno' && 'calendario-widget-celda--turno',
            marca?.tipo === 'atrasado' && 'calendario-widget-celda--atrasado',
          ].filter(Boolean).join(' ')

          return (
            <button
              key={index}
              className={clases}
              onClick={() => celda.esMesActual && onDiaClick?.(celda.dia, mesActual, anioActual)}
              disabled={!celda.esMesActual}
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
