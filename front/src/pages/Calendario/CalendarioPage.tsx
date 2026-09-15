import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import CalendarioWidget from '../../components/CalendarioWidget/CalendarioWidget'
import TurnoCard from '../../components/TurnoCardCalendario/TurnoCard'
import type { DiaMarcado, Turno } from '../../types'
import './CalendarioPage.css'

export default function CalendarioPage() {

  // ══════════════════════════════════════════════════════════
  // TODO: Acá va la lógica principal del calendario.
  //
  // Esta función debería:
  //   1. Traer los turnos del usuario y su grupo familiar (backend / contexto)
  //   2. Armar el array de diasMarcados para el CalendarioWidget
  //   3. Armar el array de próximos turnos para las TurnoCards
  //   4. Manejar "Nuevo turno" — abrir modal o navegar
  //   5. Manejar click en un día del calendario
  //   6. Manejar "Ver todo el año"
  //
  // Por ahora usamos datos de ejemplo hardcodeados abajo.
  // ══════════════════════════════════════════════════════════

  // Datos de ejemplo — reemplazar con datos reales
  const diasMarcados: DiaMarcado[] = [
    { dia: 14, tipo: 'turno' },
    { dia: 30, tipo: 'turno' },
  ]

  const proximosTurnos: Turno[] = [
    {
      dia: '14',
      mes: 'AGO',
      titulo: 'Antigripal — Tomás',
      lugar: 'Vacunatorio Municipal',
      hora: '10:30 H',
      estado: 'agendado',
    },
    {
      dia: '30',
      mes: 'AGO',
      titulo: 'HPV 2ª dosis — Sofía',
      lugar: 'Hospital Regional',
      hora: '09:00 H',
      estado: 'agendado',
    },
    {
      dia: '02',
      mes: 'JUL',
      titulo: 'Antitetánica — Sofía',
      lugar: null,
      hora: null,
      estado: 'atrasado',
      etiqueta: 'SIN AGENDAR',
    },
  ]

  const handleNuevoTurno = () => {
    // TODO: Abrir modal o navegar a la página de agendar turno
    console.log('Nuevo turno')
  }

  const handleDiaClick = (dia: number, mes: number, anio: number) => {
    // TODO: Mostrar detalle del día o abrir agenda
    console.log(`Día clickeado: ${dia}/${mes + 1}/${anio}`)
  }

  const handleVerTodoElAnio = () => {
    // TODO: Navegar a vista anual o expandir calendario
    console.log('Ver todo el año')
  }

  return (
    <div className="contenedor-calendario">
      <PageHeader
        titulo="Calendario"
        subtitulo="Turnos agendados y dosis recomendadas de todo el grupo familiar."
      >
        <Button text="+ Nuevo turno" variant="celeste" onClick={handleNuevoTurno} />
      </PageHeader>

      <div className="calendario-layout">
        {/* Columna izquierda: calendario mensual */}
        <div className="calendario-col-izq">
          <CalendarioWidget
            diasMarcados={diasMarcados}
            onDiaClick={handleDiaClick}
          />
        </div>

        {/* Columna derecha: próximos turnos */}
        <div className="calendario-col-der">
          <div className="calendario-turnos-header">
            <h2 className="calendario-turnos-titulo">Próximos turnos</h2>
            <span className="calendario-turnos-count">{proximosTurnos.length} ESTE MES</span>
          </div>

          <div className="calendario-turnos-lista">
            {proximosTurnos.map((turno, index) => (
              <TurnoCard
                key={index}
                dia={turno.dia}
                mes={turno.mes}
                titulo={turno.titulo}
                lugar={turno.lugar}
                hora={turno.hora}
                estado={turno.estado}
                etiqueta={turno.etiqueta}
              />
            ))}
          </div>

          <button className="calendario-ver-anio" onClick={handleVerTodoElAnio}>
            Ver todo el año
          </button>
        </div>
      </div>
    </div>
  )
}
