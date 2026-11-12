import { useState, useEffect, useMemo } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import CarnetTimeline from '../../components/CarnetTimeline/CarnetTimeline'
import Button from '../../components/Button/Button'
import CarnetVacio from '../../components/CarnetVacio/CarnetVacio'
import { useFamilia } from '../../hooks/useFamilia'
import BotonSubirFoto from '../../components/BotonSubirFoto/BotonSubirFoto'
import RevisarCarnetModal from '../../components/RevisarCarnetModal/RevisarCarnetModal'
import Toast from '../../components/Toast/Toast'
import AgregarVacunaModal from '../../components/AgregarVacunaModal/AgregarVacunaModal'
import type { FormVacuna } from '../../components/AgregarVacunaModal/AgregarVacunaModal'
import type { Familiar, SeccionHistorial } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './CarnetPage.css'
import { API_URL } from "../../config";

export default function CarnetPage() {
  const { token, usuario } = useUsuario()
  const navigate = useNavigate()
  const location = useLocation()

  const { familiares: familiaReal, cargandoFamiliares, abrirModalAgregar } = useFamilia()
  const familiares: Familiar[] = useMemo(() => {
    if (familiaReal.length > 0) return familiaReal
    // Sin grupo familiar (o no se pudo cargar): queda solo tu propio carnet
    if (!cargandoFamiliares && usuario) return [{ nombre: usuario.nombre, esVos: true }]
    return []
  }, [familiaReal, cargandoFamiliares, usuario])
  // Terminó de cargar la lista y no vino nadie (ni vos): no hay carnet que pedir
  const sinFamiliares = !cargandoFamiliares && familiares.length === 0
  const [indexFamiliarActivo, setIndexFamiliarActivo] = useState(0)
  const [seccionesHistorial, setSeccionesHistorial] = useState<SeccionHistorial[]>([])
  const [cargando, setCargando] = useState(true)

  // Estado para los modales (popups)
  const [modalCargarDosisAbierto, setModalCargarDosisAbierto] = useState(false)
  const [archivoOcr, setArchivoOcr] = useState<File | null>(null) // la foto que se está leyendo

  // Campos del formulario Cargar Dosis
  const formVacio: FormVacuna = { idVacuna: '', lote: '', fecha: '', marca: '', lugar: '' }
  const [formDosis, setFormDosis] = useState<FormVacuna>(formVacio)
  const [errorDosis, setErrorDosis] = useState('')
  const [dosisAgregada, setDosisAgregada] = useState(false)

  async function cargarCarnet(idFamiliar?: number) {
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

  // Viene de "Cargar vacuna" en Inicio: se abre el formulario y se limpia el state del router
  useEffect(() => {
    if (location.state?.cargarDosis) {
      setModalCargarDosisAbierto(true)
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state?.cargarDosis, navigate])

  // El turno necesita fecha: se lleva a la persona al calendario con la vacuna ya elegida
  const handleAgendar = (idVacuna: number) => {
    navigate('/calendario', { state: { idVacuna } })
  }

  const handleGuardarDosis = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setErrorDosis('')

    try {
      // Sin familiar: el carnet propio (la cuenta sale del token). Con familiar: el suyo, si te dio acceso
      const url = idFamiliarActivo === undefined
        ? `${API_URL}/api/carnet/dosis`
        : `${API_URL}/api/carnet/${idFamiliarActivo}/dosis`
      const response = await fetch(url, {
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
      await cargarCarnet(idFamiliarActivo)

      setModalCargarDosisAbierto(false)
      setFormDosis(formVacio)
      setDosisAgregada(true)
    } catch {
      setErrorDosis('No se pudo conectar con el servidor')
    }
  }

  const familiarActivo = familiares[indexFamiliarActivo]
  // undefined = el carnet propio; si no, el id del familiar que se está mirando
  const idFamiliarActivo = familiarActivo?.esVos ? undefined : familiarActivo?.id
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
          <BotonSubirFoto onArchivo={setArchivoOcr} />
          <Button
            text="Cargar dosis"
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
          onSubirFoto={setArchivoOcr}
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

      {/* PopUp 2: leer la foto del carnet y revisar las dosis (se monta de nuevo con cada foto) */}
      {archivoOcr && (
        <RevisarCarnetModal
          archivo={archivoOcr}
          idFamiliar={idFamiliarActivo}
          onClose={() => setArchivoOcr(null)}
          onGuardado={() => cargarCarnet(idFamiliarActivo)}
          onCargarManual={() => {
            setArchivoOcr(null)
            setModalCargarDosisAbierto(true)
          }}
        />
      )}
    </div>
  )
}
