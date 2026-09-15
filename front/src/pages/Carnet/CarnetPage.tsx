import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import CarnetCard from '../../components/CarnetCard/CarnetCard'
import Button from '../../components/Button/Button'
import Modal from '../../components/Modal/Modal'
import type { Familiar, SeccionHistorial } from '../../types'
import './CarnetPage.css'

// Simulación de respuesta de la API: Lista de familiares del usuario autenticado
const MOCK_FAMILIARES_API: Familiar[] = [
  { id: 'usr-1', nombre: 'Sofía', esVos: true, iniciales: 'SG', colorBg: '#2dd4bf' },
  { id: 'usr-2', nombre: 'Tomás', esVos: false, iniciales: 'TG', colorBg: '#fcb354' },
  { id: 'usr-3', nombre: 'Mamá', esVos: false, iniciales: 'MR', colorBg: '#38bdf8' },
]

// Simulación de respuesta de la API: Dosis por el ID de cada familiar
const MOCK_DOSIS_POR_FAMILIAR_API: Record<string, SeccionHistorial[]> = {
  'usr-1': [
    {
      grupo: 'PENDIENTES',
      esPendiente: true,
      dosis: [
        {
          id: 'dosis-101',
          titulo: 'Antitetánica · refuerzo',
          subtitulo: 'VENCIÓ 02·JUL·2026 · CADA 10 AÑOS',
          estado: 'atrasada',
          etiqueta: 'ATRASADA',
          mostrarAgendar: true,
        },
        {
          id: 'dosis-102',
          titulo: 'HPV · 2ª dosis',
          subtitulo: 'RECOMENDADA 30·AGO·2026 · SEGÚN TU EDAD',
          estado: 'pendiente',
          etiqueta: 'EN 25 DÍAS',
          mostrarAgendar: true,
        },
      ],
    },
    {
      grupo: '2026',
      esPendiente: false,
      dosis: [
        {
          id: 'dosis-103',
          titulo: 'Antigripal',
          subtitulo: '03·ABR·2026 · VACUNATORIO MUNICIPAL CENTRO',
          estado: 'aplicada',
          etiqueta: 'APLICADA',
          mostrarAgendar: false,
        },
        {
          id: 'dosis-104',
          titulo: 'Triple viral · 2ª dosis',
          subtitulo: '12·MAR·2026 · HOSPITAL REGIONAL',
          estado: 'aplicada',
          etiqueta: 'APLICADA',
          mostrarAgendar: false,
        },
      ],
    },
    {
      grupo: '2019',
      esPendiente: false,
      dosis: [
        {
          id: 'dosis-105',
          titulo: 'VPH · 1ª dosis',
          subtitulo: '20·SEP·2019 · CAMPAÑA ESCOLAR NACIONAL',
          estado: 'aplicada',
          etiqueta: 'APLICADA',
          mostrarAgendar: false,
        },
      ],
    },
  ],

  'usr-2': [
    {
      grupo: 'PENDIENTES',
      esPendiente: true,
      dosis: [
        {
          id: 'dosis-201',
          titulo: 'Fiebre Amarilla',
          subtitulo: 'RECOMENDADA PARA VIAJES',
          estado: 'pendiente',
          etiqueta: 'EN 10 DÍAS',
          mostrarAgendar: true,
        },
      ],
    },
    {
      grupo: '2025',
      esPendiente: false,
      dosis: [
        {
          id: 'dosis-202',
          titulo: 'Antigripal 2025',
          subtitulo: '15·MAY·2025 · CENTRO DE SALUD N°3',
          estado: 'aplicada',
          etiqueta: 'APLICADA',
          mostrarAgendar: false,
        },
      ],
    },
  ],

  'usr-3': [
    {
      grupo: '2026',
      esPendiente: false,
      dosis: [
        {
          id: 'dosis-301',
          titulo: 'Neumococo 23 valente',
          subtitulo: '10·ENE·2026 · HOSPITAL CENTRAL',
          estado: 'aplicada',
          etiqueta: 'APLICADA',
          mostrarAgendar: false,
        },
      ],
    },
  ],
}

export default function CarnetPage() {
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
    setFamiliares(MOCK_FAMILIARES_API)
    setCargando(false)
  }, [])

  useEffect(() => {
    if (familiares.length > 0) {
      const familiarSeleccionado = familiares[indexFamiliarActivo]
      if (familiarSeleccionado) {
        const dosisFamiliar = MOCK_DOSIS_POR_FAMILIAR_API[familiarSeleccionado.id ?? ''] || []
        setSeccionesHistorial(dosisFamiliar)
      }
    }
  }, [indexFamiliarActivo, familiares])

  const handleAgendar = (idDosis: string) => {
    console.log(`Agendar dosis con ID: ${idDosis}`)
  }

  const handleGuardarDosis = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    console.log('Guardar dosis:', formDosis)
    // Cerrar modal tras guardar
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
