import { useState, useEffect, useMemo } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import CarnetTimeline from '../../components/CarnetTimeline/CarnetTimeline'
import Button from '../../components/Button/Button'
import CarnetVacio from '../../components/CarnetVacio/CarnetVacio'
import { useFamilia } from '../../hooks/useFamilia'
import Modal from '../../components/Modal/Modal'
import Toast from '../../components/Toast/Toast'
import AgregarVacunaModal from '../../components/AgregarVacunaModal/AgregarVacunaModal'
import type { FormVacuna } from '../../components/AgregarVacunaModal/AgregarVacunaModal'
import type { Familiar, SeccionHistorial } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { familiaMock, carnetsMock } from '../../mocks/carnetMock'
import './CarnetPage.css'
import { API_URL } from "../../config";

// Poner en false para usar el back real
const USAR_MOCK = false

export default function CarnetPage() {
  const { token, usuario } = useUsuario()

  const { familiares: familiaReal, cargandoFamiliares, abrirModalAgregar } = useFamilia()
  const familiares: Familiar[] = useMemo(() => {
    if (USAR_MOCK) return familiaMock
    if (familiaReal.length > 0) return familiaReal
    // Sin grupo familiar (o no se pudo cargar): queda solo tu propio carnet
    if (!cargandoFamiliares && usuario) return [{ nombre: usuario.nombre, esVos: true }]
    return []
  }, [familiaReal, cargandoFamiliares, usuario])
  // Terminó de cargar la lista y no vino nadie (ni vos): no hay carnet que pedir
  const sinFamiliares = !USAR_MOCK && !cargandoFamiliares && familiares.length === 0
  const [indexFamiliarActivo, setIndexFamiliarActivo] = useState(0)
  const [seccionesHistorial, setSeccionesHistorial] = useState<SeccionHistorial[]>([])
  const [cargando, setCargando] = useState(true)

  // Estado para los modales (popups)
  const [modalCargarDosisAbierto, setModalCargarDosisAbierto] = useState(false)
  const [modalSubirFotoAbierto, setModalSubirFotoAbierto] = useState(false)

  // Campos del formulario Cargar Dosis
  const formVacio: FormVacuna = { idVacuna: '', lote: '', fecha: '', marca: '', lugar: '' }
  const [formDosis, setFormDosis] = useState<FormVacuna>(formVacio)
  const [errorDosis, setErrorDosis] = useState('')
  const [dosisAgregada, setDosisAgregada] = useState(false)

  async function cargarCarnet(idFamiliar?: string) {
    if (USAR_MOCK) {
      setSeccionesHistorial(carnetsMock[idFamiliar ?? 'yo'] ?? [])
      setCargando(false)
      return
    }
    setCargando(true)

    const url = idFamiliar
      ? `${API_URL}/api/carnet/${idFamiliar}`
      : `${API_URL}/api/carnet`

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setSeccionesHistorial(data)
    setCargando(false)
  }

  useEffect(() => {
    if (familiares.length === 0) return
    const familiarSeleccionado = familiares[indexFamiliarActivo]
    if (!familiarSeleccionado) return

    cargarCarnet(familiarSeleccionado.esVos ? undefined : familiarSeleccionado.id)
  }, [indexFamiliarActivo, familiares])

  const handleSubirFoto = async (archivo: File) => {
    if (USAR_MOCK) {
      console.log('Foto seleccionada:', archivo.name)
      return
    }
    const formData = new FormData()
    formData.append('imagen', archivo)

    await fetch(`${API_URL}/api/carnet/dosis`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    await cargarCarnet()
  }

  const handleAgendar = async (idDosis: string) => {
    await fetch(`${API_URL}/api/turnos`, {
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
    setErrorDosis('')

    try {
      // El back por ahora solo carga dosis al carnet propio (la cuenta sale del token)
      const response = await fetch(`${API_URL}/api/carnet/dosis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_vacuna: Number(formDosis.idVacuna),
          fecha_de_aplicacion: formDosis.fecha,
          lote: formDosis.lote,
          marca: formDosis.marca,
          lugar: formDosis.lugar,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setErrorDosis(data.mensaje || data.message || 'No se pudo guardar la dosis')
        return // el modal queda abierto
      }

      // Refresca el carnet para que aparezca la dosis recién cargada
      await cargarCarnet()

      setModalCargarDosisAbierto(false)
      setFormDosis(formVacio)
      setDosisAgregada(true)
    } catch {
      setErrorDosis('No se pudo conectar con el servidor')
    }
  }

  const familiarActivo = familiares[indexFamiliarActivo]
  // La pantalla "Traé tu carnet" es solo para el carnet propio: los familiares todavía no se pueden cargar
  const mostrarCarnetVacio =
    !cargando && seccionesHistorial.length === 0 && Boolean(familiarActivo?.esVos)

  return (
    <div className="contenedor-carnet">
      {/* Header */}
      <PageHeader
        titulo="Carnet"
      >
        {!mostrarCarnetVacio && <div className="carnet-header-acciones">
          
          <Button
            text="Cargar dosis"
            icon={<span>+</span>}
            variant="celeste"
            className="btn-cargar-dosis"
            onClick={() => setModalCargarDosisAbierto(true)}
          />
        </div>}
      </PageHeader>

      {/* Selector de familiares */}
      <FamilySelector
        familiares={familiares.map((f) =>
          f.esVos && usuario ? { ...f, nombre: usuario.nombre } : f
        )}
        activoIndex={indexFamiliarActivo}
        onSelect={setIndexFamiliarActivo}
        onAgregar={abrirModalAgregar}
      />

      {mostrarCarnetVacio && (
        <CarnetVacio
          onSubirFoto={handleSubirFoto}
          onCargarManual={() => setModalCargarDosisAbierto(true)}
        />
      )}

      {/* Línea de tiempo */}
      {!mostrarCarnetVacio && (
        <CarnetTimeline
          secciones={seccionesHistorial}
          cargando={cargando}
          error={sinFamiliares ? 'No pudimos cargar tus datos. Probá de nuevo más tarde.' : undefined}
          onAgendar={handleAgendar}
        />
      )}

      {/* PopUp 1: Agregar vacuna */}
      <AgregarVacunaModal
        isOpen={modalCargarDosisAbierto}
        onClose={() => {
          setModalCargarDosisAbierto(false)
          setErrorDosis('')
        }}
        form={formDosis}
        setForm={setFormDosis}
        handleSubmit={handleGuardarDosis}
        error={errorDosis}
      />

      <Toast
        isOpen={dosisAgregada}
        mensaje="Vacuna agregada con éxito"
        onClose={() => setDosisAgregada(false)}
      />

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
