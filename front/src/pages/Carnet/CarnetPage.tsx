import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import CarnetCard from '../../components/CarnetCard/CarnetCard'
import Button from '../../components/Button/Button'
import Modal from '../../components/Modal/Modal'
import type { Familiar, SeccionHistorial } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { familiaMock, carnetMock } from '../../mocks/carnetMock'
import './CarnetPage.css'

// Poner en false para usar el back real
const USAR_MOCK = true

export default function CarnetPage() {
  const { token, usuario } = useUsuario()

  const [familiares, setFamiliares] = useState<Familiar[]>([])
  const [indexFamiliarActivo, setIndexFamiliarActivo] = useState(0)
  const [seccionesHistorial, setSeccionesHistorial] = useState<SeccionHistorial[]>([])
  const [cargando, setCargando] = useState(true)

  // Estado para los modales (popups)
  const [modalCargarDosisAbierto, setModalCargarDosisAbierto] = useState(false)
  const [modalSubirFotoAbierto, setModalSubirFotoAbierto] = useState(false)

  // Campos del formulario Cargar Dosis
  const [formDosis, setFormDosis] = useState({
    nombreVacuna: '',
    fecha: '',
    lugar: '',
  })

  useEffect(() => {
    if (USAR_MOCK) {
      setFamiliares(familiaMock)
      return
    }
    async function cargarFamiliares() {
      const response = await fetch('https://tu-backend.com/api/familia', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setFamiliares(data)
    }
    cargarFamiliares()
  }, [])

  async function cargarCarnet(idFamiliar?: string) {
    if (USAR_MOCK) {
      setSeccionesHistorial(carnetMock)
      setCargando(false)
      return
    }
    if (!usuario) return
    setCargando(true)

    const url = idFamiliar
      ? `https://tu-backend.com/api/carnet/${usuario.id}/${idFamiliar}`
      : `https://tu-backend.com/api/carnet/${usuario.id}`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setSeccionesHistorial(data)
    setCargando(false)
  }

  useEffect(() => {
    if (familiares.length === 0 || (!usuario && !USAR_MOCK)) return
    const familiarSeleccionado = familiares[indexFamiliarActivo]
    if (!familiarSeleccionado) return

    cargarCarnet(familiarSeleccionado.esVos ? undefined : familiarSeleccionado.id)
  }, [indexFamiliarActivo, familiares, usuario])

  const handleAgendar = async (idDosis: string) => {
    await fetch('https://tu-backend.com/api/turnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ dosisId: idDosis }),
    })
  }

  const handleGuardarDosis = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    const familiarSeleccionado = familiares[indexFamiliarActivo]
    if (!familiarSeleccionado || !usuario) return

    const url = familiarSeleccionado.esVos
      ? `https://tu-backend.com/api/carnet/${usuario.id}/dosis`
      : `https://tu-backend.com/api/carnet/${usuario.id}/${familiarSeleccionado.id}/dosis`

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formDosis),
    })

    // Refresca el carnet para que aparezca la dosis recién cargada
    await cargarCarnet(familiarSeleccionado.esVos ? undefined : familiarSeleccionado.id)

    setModalCargarDosisAbierto(false)
    setFormDosis({ nombreVacuna: '', fecha: '', lugar: '' })
  }

  const CameraIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )

  return (
    <div className="contenedor-carnet">
      {/* Header */}
      <PageHeader
        titulo="Carnet"
        subtitulo="Consulta tu historial de vacunación y certificados."
      >
        <div className="carnet-header-acciones">
          <Button
            text="Subir foto del carnet"
            icon={CameraIcon}
            variant="secondary"
            className="btn-subir-foto"
            onClick={() => setModalSubirFotoAbierto(true)}
          />
          <Button
            text="Cargar dosis"
            icon={<span>+</span>}
            variant="celeste"
            className="btn-cargar-dosis"
            onClick={() => setModalCargarDosisAbierto(true)}
          />
        </div>
      </PageHeader>

      {/* Selector de familiares */}
      <FamilySelector
        familiares={familiares}
        activoIndex={indexFamiliarActivo}
        onSelect={setIndexFamiliarActivo}
        onAgregar={() => console.log('Agregar familiar')}
      />

      {/* Línea de tiempo */}
      <div className="carnet-timeline">
        <div className="carnet-timeline-linea" />

        {cargando ? (
          <p className="carnet-cargando">Cargando información del carnet...</p>
        ) : seccionesHistorial.length === 0 ? (
          <div className="carnet-vacio">
            <p>No hay dosis registradas para este familiar.</p>
          </div>
        ) : (
          seccionesHistorial.map((seccion, index) => (
            <div key={seccion.grupo || index} className="carnet-timeline-seccion">
              <div className="carnet-timeline-nodo-header">
                <div
                  className={`carnet-timeline-nodo ${
                    seccion.esPendiente ? 'carnet-timeline-nodo--pendientes' : ''
                  }`}
                />
                <span className="carnet-timeline-titulo">{seccion.grupo}</span>
              </div>

              <div className="carnet-timeline-cards">
                {seccion.dosis.map((dosis) => (
                  <CarnetCard
                    key={dosis.id}
                    titulo={dosis.titulo}
                    subtitulo={dosis.subtitulo}
                    estado={dosis.estado}
                    etiqueta={dosis.etiqueta}
                    mostrarAgendar={dosis.mostrarAgendar}
                    onAgendar={() => handleAgendar(dosis.id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* PopUp 1: Cargar Dosis */}
      <Modal
        isOpen={modalCargarDosisAbierto}
        onClose={() => setModalCargarDosisAbierto(false)}
        titulo="Cargar nueva dosis"
      >
        <form className="modal-form" onSubmit={handleGuardarDosis}>
          <div className="modal-form-campo">
            <label htmlFor="nombreVacuna">Nombre de la vacuna</label>
            <input
              id="nombreVacuna"
              type="text"
              placeholder="Ej: Antigripal, Triple Viral..."
              value={formDosis.nombreVacuna}
              onChange={(e) => setFormDosis({ ...formDosis, nombreVacuna: e.target.value })}
              required
            />
          </div>

          <div className="modal-form-campo">
            <label htmlFor="fechaDosis">Fecha de aplicación</label>
            <input
              id="fechaDosis"
              type="date"
              value={formDosis.fecha}
              onChange={(e) => setFormDosis({ ...formDosis, fecha: e.target.value })}
              required
            />
          </div>

          <div className="modal-form-campo">
            <label htmlFor="lugarDosis">Lugar / Vacunatorio</label>
            <input
              id="lugarDosis"
              type="text"
              placeholder="Ej: Hospital Regional, Vacunatorio Centro..."
              value={formDosis.lugar}
              onChange={(e) => setFormDosis({ ...formDosis, lugar: e.target.value })}
            />
          </div>

          <div className="modal-form-acciones">
            <Button
              text="Cancelar"
              variant="outline"
              onClick={() => setModalCargarDosisAbierto(false)}
            />
            <Button
              text="Guardar dosis"
              variant="celeste"
              onClick={handleGuardarDosis}
            />
          </div>
        </form>
      </Modal>

      {/* PopUp 2: Subir Foto del Carnet */}
      <Modal
        isOpen={modalSubirFotoAbierto}
        onClose={() => setModalSubirFotoAbierto(false)}
        titulo="Subir foto del carnet"
      >
        <div className="modal-form">
          <div className="modal-upload-area" onClick={() => console.log('Seleccionar archivo')}>
            <span className="modal-upload-icon">📷</span>
            <p className="modal-upload-texto">Arrastrá la foto del carnet aquí o hacé clic para seleccionar</p>
            <span className="modal-upload-hint">Formatos soportados: JPG, PNG, PDF (Máx. 5MB)</span>
          </div>

          <div className="modal-form-acciones">
            <Button
              text="Cancelar"
              variant="outline"
              onClick={() => setModalSubirFotoAbierto(false)}
            />
            <Button
              text="Subir imagen"
              variant="celeste"
              onClick={() => {
                console.log('Imagen subida')
                setModalSubirFotoAbierto(false)
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
