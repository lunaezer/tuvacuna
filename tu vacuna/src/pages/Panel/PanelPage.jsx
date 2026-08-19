import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import FamilySelector from '../../components/FamilySelector/FamilySelector'
import Cards from '../../components/Cards/Cards'
import './PanelPage.css'

export default function PanelPage() {
  const [familiarActivo, setFamiliarActivo] = useState(0)

  // Datos de ejemplo — después se reemplaza con datos reales
  const familiares = ['Luna', 'Mamá', 'Papá']

  return (
    <div className="contenedor-panel">
      {/* Header: saludo + botón */}
      <PageHeader
        titulo={`Hola, ${familiares[familiarActivo]}!`}
        subtitulo="Revisá el estado de tus vacunas y próximos turnos."
      >
        <Button text="Botón" variant="celeste" />
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
