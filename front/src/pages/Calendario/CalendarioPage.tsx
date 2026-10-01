import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import CalendarioWidget from '../../components/CalendarioWidget/CalendarioWidget'
import TurnoCard from '../../components/TurnoCardCalendario/TurnoCard'
import type { DiaMarcado, Turno } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './CalendarioPage.css'
import type { formDataTurno } from '../../types'
import AgregarTurnoModal from '../../components/AgregarTurnoModal/AgregarTurnoModal'

export default function CalendarioPage() {
  const { token } = useUsuario()

  const hoy = new Date()
  const [mesActual, setMesActual] = useState(hoy.getMonth())
  const [anioActual, setAnioActual] = useState(hoy.getFullYear())

  const [diasMarcados, setDiasMarcados] = useState<DiaMarcado[]>([])
  const [proximosTurnos, setProximosTurnos] = useState<Turno[]>([])
  const [errorTurnos, setErrorTurnos] = useState(false)
  const [modalNuevoTurnoAbierto, setModalNuevoTurnoAbierto] = useState(false)

  const[formDataTurno, setFormDataTurno] = useState<formDataTurno> (
    {
      vacuna: "",
      fecha: "",
      hora: "",
      lugar: "",
    }
  ); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
  const { name, value } = e.target;
  setFormDataTurno((prev) => ({ ...prev, [name]: value }));
  } // VER SI ANDA PARA GUARDAR LOS VALORES DEL FORM

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tu-backend.com/api/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataTurno),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Error al agregar el turno");
        return;
      }
      alert("Turno agregado");
      setModalNuevoTurnoAbierto(false);
      cargarTurnos();
    } catch (err) {
      console.error("No se pudo conectar con el servidor");
    }
  }

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

  useEffect(() => {
    async function cargarMarcados() {
      try {
        const response = await fetch(
          `https://tu-backend.com/api/calendario/marcados?mes=${mesActual}&anio=${anioActual}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        if (!response.ok) throw new Error()
        const data = await response.json()
        setDiasMarcados(data)
      } catch {
        setDiasMarcados([])
      }
    }
    cargarMarcados()
  }, [mesActual, anioActual])

  async function cargarTurnos() {
    try {
      const response = await fetch(
        `https://tu-backend.com/api/turnos?mes=${mesActual}&anio=${anioActual}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setProximosTurnos(data)
      setErrorTurnos(false)
    } catch {
      setProximosTurnos([])
      setErrorTurnos(true)
    }
  }

  useEffect(() => {
    cargarTurnos()
  }, [mesActual, anioActual])

 const handleNuevoTurno = () => {
  setModalNuevoTurnoAbierto(true)
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
            mesActual={mesActual}
            anioActual={anioActual}
            onMesAnteriorClick={irMesAnterior}
            onMesSiguienteClick={irMesSiguiente}
            diasMarcados={diasMarcados}
            onDiaClick={handleDiaClick}
          />
        </div>

     <AgregarTurnoModal
      isOpen={modalNuevoTurnoAbierto}
      onClose={() => setModalNuevoTurnoAbierto(false)}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />

        {/* Columna derecha: próximos turnos */}
        <div className="calendario-col-der">
          <div className="calendario-turnos-header">
            <h2 className="calendario-turnos-titulo">Próximos turnos</h2>
            {!errorTurnos && (
              <span className="calendario-turnos-count">{proximosTurnos.length} ESTE MES</span>
            )}
          </div>

          <div className="calendario-turnos-lista">
            {errorTurnos ? (
              <p className="calendario-turnos-vacio">No se pudo conectar con el servidor.</p>
            ) : proximosTurnos.length === 0 ? (
              <p className="calendario-turnos-vacio">No tenés turnos agendados este mes.</p>
            ) : (
              proximosTurnos.map((turno, index) => (
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
              ))
            )}
          </div>

          <button className="calendario-ver-anio" onClick={handleVerTodoElAnio}>
            Ver todo el año
          </button>
        </div>
      </div>
    </div>
  )
}
