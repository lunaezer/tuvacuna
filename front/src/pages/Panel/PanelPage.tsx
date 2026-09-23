import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import Cards from '../../components/Cards/Cards'
import './PanelPage.css'
import type { Familiar } from '../../types'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'

export default function PanelPage() {
  const [familiarActivo, setFamiliarActivo] = useState(0)

  // Datos de ejemplo — después se reemplaza con datos reales
  const [familiares, setFamiliares] = useState<Familiar[]>([])
  const { token, usuario } = useUsuario()

  useEffect(() => {
    async function cargarFamiliares() {
    const response = await fetch("https://tu-backend.com/api/familia", {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setFamiliares(data)
  }
  cargarFamiliares()
  }, [] )

  return (
    <div className="contenedor-panel">
      {/* Header: saludo + botón */}
      <PageHeader
        titulo={`Hola, ${usuario?.nombre}!`}
        subtitulo="Revisá el estado de tus vacunas y próximos turnos."
      >
        <Button text="+ Agendar turno" variant="celeste" />
      </PageHeader>

      {/* Selector de familiares */}
      <FamilySelector
        familiares={familiares}
        activoIndex={familiarActivo}
        onSelect={setFamiliarActivo}
        onAgregar={() => console.log('Agregar familiar')} //funcion a modificar para agregar familiar
      />

      {/* Grid de cards */}
      <div className="panel-grid">
        <Cards title="Próximas vacunas" variant="white" />
        <Cards title="Historial" variant="dark" />
        <Cards title="Estado del carnet" variant="white" />
        <Cards title="Información" variant="white" />
      </div>
    </div>
  )
}
