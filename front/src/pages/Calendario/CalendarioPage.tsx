import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import CalendarioWidget from '../../components/CalendarioWidget/CalendarioWidget'
import TurnoCard from '../../components/TurnoCardCalendario/TurnoCard'
import type { DiaMarcado, Turno } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './CalendarioPage.css'
import type { formDataTurno } from '../../types'
import AgregarTurnoModal from '../../components/AgregarTurnoModal/AgregarTurnoModal'
import ConfirmarModal from '../../components/ConfirmarModal/ConfirmarModal'
import Toast from '../../components/Toast/Toast'
import { API_URL } from "../../config";

const FORM_TURNO_VACIO: formDataTurno = { idVacuna: "", fecha: "", hora: "", lugar: "" }

export default function CalendarioPage() {
  const { token } = useUsuario()
  const location = useLocation()

  const hoy = new Date()
  const [mesActual, setMesActual] = useState(hoy.getMonth())
  const [anioActual, setAnioActual] = useState(hoy.getFullYear())

  const [diasMarcados, setDiasMarcados] = useState<DiaMarcado[]>([])
  const [proximosTurnos, setProximosTurnos] = useState<Turno[]>([])
  const [errorTurnos, setErrorTurnos] = useState(false)
  // los turnos ya pasados no se pueden editar (el back rechaza fechas anteriores a hoy), solo cancelar
  const hoyISO = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
  const turnosFuturos = proximosTurnos.filter((t) => t.fecha.slice(0, 10) >= hoyISO)
  const turnosAnteriores = proximosTurnos.filter((t) => t.fecha.slice(0, 10) < hoyISO)
  const [modalNuevoTurnoAbierto, setModalNuevoTurnoAbierto] = useState(false)

  const [formDataTurno, setFormDataTurno] = useState<formDataTurno>(FORM_TURNO_VACIO)
  const [errorModal, setErrorModal] = useState("")
  const [turnoEditando, setTurnoEditando] = useState<Turno | null>(null)
  const [turnoACancelar, setTurnoACancelar] = useState<Turno | null>(null)
  const [errorCancelar, setErrorCancelar] = useState(false)

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setFormDataTurno((prev) => ({ ...prev, [name]: value }))
  }

  const cerrarModal = () => {
    setModalNuevoTurnoAbierto(false)
    setFormDataTurno(FORM_TURNO_VACIO)
    setErrorModal("")
    setTurnoEditando(null)
  }

  const handleEditar = (turno: Turno) => {
    setTurnoEditando(turno)
    setFormDataTurno({
      idVacuna: String(turno.id_vacuna),
      fecha: turno.fecha,
      hora: turno.hora ?? "",
      lugar: turno.lugar ?? "",
    })
    setModalNuevoTurnoAbierto(true)
  }

  const confirmarCancelar = async () => {
    if (!turnoACancelar) return
    try {
      const response = await fetch(`${API_URL}/api/turnos/${turnoACancelar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error()
      setTurnoACancelar(null)
      cargarTurnos()
      cargarMarcados()
    } catch {
      setTurnoACancelar(null)
      setErrorCancelar(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorModal("")
    try {
      // El PUT reemplaza el turno entero: siempre se mandan todos los campos
      const response = await fetch(
        turnoEditando ? `${API_URL}/api/turnos/${turnoEditando.id}` : `${API_URL}/api/turnos`,
        {
          method: turnoEditando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_vacuna: Number(formDataTurno.idVacuna),
            fecha: formDataTurno.fecha,
            // hora y lugar son opcionales: si están vacíos, no se mandan
            hora: formDataTurno.hora || undefined,
            lugar: formDataTurno.lugar.trim() || undefined,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setErrorModal(data.mensaje || "No se pudo guardar el turno")
        return
      }

      cerrarModal()
      // el turno se ve solo: se vuelven a pedir la lista y los puntos de la grilla
      cargarTurnos()
      cargarMarcados()
    } catch {
      setErrorModal("No se pudo conectar con el servidor")
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

  async function cargarMarcados() {
    try {
      const response = await fetch(
        `${API_URL}/api/calendario/marcados?mes=${mesActual}&anio=${anioActual}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setDiasMarcados(data)
    } catch {
      setDiasMarcados([])
    }
  }

  useEffect(() => {
    cargarMarcados()
  }, [mesActual, anioActual])

  async function cargarTurnos() {
    try {
      const response = await fetch(
        `${API_URL}/api/turnos?anio=${anioActual}`,
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

  // la lista trae todos los turnos del año, así que solo depende del año
  useEffect(() => {
    cargarTurnos()
  }, [anioActual])

  // Viene del carnet (con una vacuna) o de Centros (con un lugar): se abre el modal con eso cargado
  useEffect(() => {
    const idVacuna = location.state?.idVacuna
    const lugar = location.state?.lugar
    if (idVacuna || lugar) {
      setFormDataTurno((prev) => ({
        ...prev,
        ...(idVacuna && { idVacuna: String(idVacuna) }),
        ...(lugar && { lugar }),
      }))
      setModalNuevoTurnoAbierto(true)
      window.history.replaceState({}, '') // para que no se reabra al recargar
    }
  }, [])

 const handleNuevoTurno = () => {
  setModalNuevoTurnoAbierto(true)
}

  const handleDiaClick = (dia: number, mes: number, anio: number) => {
    // no se puede agendar en días que ya pasaron
    if (new Date(anio, mes, dia) < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) return

    // el input type="date" espera "YYYY-MM-DD"; mes viene 0-indexado
    const fecha = `${anio}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    setFormDataTurno({ ...FORM_TURNO_VACIO, fecha })
    setModalNuevoTurnoAbierto(true)
  }


  return (
    <div className="contenedor-calendario">
      <PageHeader
        titulo="Calendario"
        subtitulo="Turnos agendados y dosis recomendadas de todo el grupo familiar."
      >
        <Button text="Nuevo turno" variant="celeste" onClick={handleNuevoTurno} />
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
          onClose={cerrarModal}
          formData={formDataTurno}
          error={errorModal}
          editando={turnoEditando !== null}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <ConfirmarModal
          isOpen={turnoACancelar !== null}
          titulo="Cancelar turno"
          mensaje={
            <>
              ¿Seguro que querés cancelar el turno de <strong>{turnoACancelar?.nombre}</strong>? Esta acción no se puede deshacer.
            </>
          }
          textoConfirmar="Cancelar turno"
          onClose={() => setTurnoACancelar(null)}
          onConfirmar={confirmarCancelar}
        />

        <Toast
          isOpen={errorCancelar}
          mensaje="Error al cancelar turno"
          variante="error"
          onClose={() => setErrorCancelar(false)}
        />

        {/* Columna derecha: próximos turnos */}
        <div className="calendario-col-der">
          <div className="calendario-turnos-header">
            <h2 className="calendario-turnos-titulo">Próximos turnos</h2>
            {!errorTurnos && (
              <span className="calendario-turnos-count">{turnosFuturos.length} EN {anioActual}</span>
            )}
          </div>

          <div className="calendario-turnos-lista">
            {errorTurnos ? (
              <p className="calendario-turnos-vacio">No se pudo conectar con el servidor.</p>
            ) : proximosTurnos.length === 0 ? (
              <p className="calendario-turnos-vacio">No tenés turnos agendados en {anioActual}.</p>
            ) : (
              <>
                {turnosFuturos.length === 0 && (
                  <p className="calendario-turnos-vacio">No tenés turnos próximos en {anioActual}.</p>
                )}
                {turnosFuturos.map((turno) => (
                  <TurnoCard
                    key={turno.id}
                    dia={turno.dia}
                    mes={turno.mes}
                    nombre={turno.nombre}
                    dosis={turno.dosis}
                    lugar={turno.lugar}
                    hora={turno.hora}
                    estado={turno.estado}
                    onEditar={() => handleEditar(turno)}
                    onCancelar={() => setTurnoACancelar(turno)}
                  />
                ))}

                {turnosAnteriores.length > 0 && (
                  <>
                    <h3 className="calendario-turnos-subtitulo">Turnos anteriores</h3>
                    {turnosAnteriores.map((turno) => (
                      <TurnoCard
                        key={turno.id}
                        dia={turno.dia}
                        mes={turno.mes}
                        nombre={turno.nombre}
                        dosis={turno.dosis}
                        lugar={turno.lugar}
                        hora={turno.hora}
                        estado={turno.estado}
                        onCancelar={() => setTurnoACancelar(turno)}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
