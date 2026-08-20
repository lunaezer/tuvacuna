import React from 'react'
import './TurnoCard.css'

/**
 * Tarjeta de turno de vacunación.
 *
 * @param {string} dia - Día numérico (ej: "14")
 * @param {string} mes - Abreviatura del mes (ej: "AGO")
 * @param {string} titulo - Nombre de la vacuna + persona (ej: "Antigripal — Tomás")
 * @param {string} lugar - Centro de vacunación (ej: "Vacunatorio Municipal")
 * @param {string} hora - Horario del turno (ej: "10:30 H")
 * @param {string} estado - "agendado" | "sin-agendar" | "atrasado"
 * @param {string} etiqueta - Texto extra (ej: "SIN AGENDAR", "ATRASADA 34 DÍAS")
 */
function TurnoCard({ dia, mes, titulo, lugar, hora, estado = 'agendado', etiqueta }) {
  return (
    <div className={`turno-card turno-card--${estado}`}>
      <div className={`turno-card-fecha turno-card-fecha--${estado}`}>
        <span className="turno-card-dia">{dia}</span>
        <span className="turno-card-mes">{mes}</span>
      </div>

      <div className="turno-card-info">
        {etiqueta && (
          <span className={`turno-card-etiqueta turno-card-etiqueta--${estado}`}>
            {etiqueta}
          </span>
        )}
        <span className="turno-card-titulo">{titulo}</span>
        {lugar && (
          <span className="turno-card-detalle">
            <span className="turno-card-icono">📍</span> {lugar}
          </span>
        )}
        {hora && (
          <span className="turno-card-detalle">
            <span className="turno-card-icono">🕐</span> {hora}
          </span>
        )}
      </div>
    </div>
  )
}

export default TurnoCard
