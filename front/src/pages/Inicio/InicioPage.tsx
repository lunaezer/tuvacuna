import { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import Cards from '../../components/Cards/Cards'
import './InicioPage.css'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useFamilia } from '../../hooks/useFamilia'

export default function InicioPage() {
  const [familiarActivo, setFamiliarActivo] = useState(0)

  const { usuario } = useUsuario()
  const { familiares, abrirModalAgregar } = useFamilia()

  return (
    <div className="contenedor-inicio">
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
        onAgregar={abrirModalAgregar}
      />

      {/* Grid de cards */}
      <div className="inicio-grid">
        <Cards title="Próximas vacunas" variant="white" />
        <Cards title="Historial" variant="dark" />
        <Cards title="Estado del carnet" variant="white" />
        <Cards title="Información" variant="white" />
      </div>
    </div>
  )
}
