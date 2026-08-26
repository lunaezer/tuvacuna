import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import DashboardLayout from './components/DashboardLayout/DashboardLayout'

import HomePage from './pages/Home/HomePage'
import PanelPage from './pages/Panel/PanelPage'
import CarnetPage from './pages/Carnet/CarnetPage'
import CalendarioPage from './pages/Calendario/CalendarioPage'
import CentrosPage from './pages/Centros/CentrosPage'
import FamiliaPage from './pages/Familia/FamiliaPage'
import AsistentePage from './pages/Asistente/AsistentePage'

import './App.css'

function LayoutWrapper() {
  const location = useLocation()
  const esHome = location.pathname === '/'

  // Si estamos en la página principal (Home), renderiza Navbar + HomePage + Footer
  if (esHome) {
    return (
      <div className="contenedor-principal-pagina">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    )
  }

  // Mapeo automático de ruta a ítem activo en la Sidebar
  const mapaRutas = {
    '/panel': 'Panel',
    '/mi-carnet': 'Mi carnet',
    '/calendario': 'Calendario',
    '/centros': 'Centros',
    '/familia': 'Familia',
    '/asistente': 'Asistente',
  }
  const itemActivo = mapaRutas[location.pathname] || 'Panel'

  // Para el resto de las páginas: Sidebar a la izquierda y contenido a la derecha (sin Navbar ni Footer)
  return (
    <DashboardLayout activeItem={itemActivo}>
      <Routes>
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/mi-carnet" element={<CarnetPage />} />
        <Route path="/calendario" element={<CalendarioPage />} />
        <Route path="/centros" element={<CentrosPage />} />
        <Route path="/familia" element={<FamiliaPage />} />
        <Route path="/asistente" element={<AsistentePage />} />
      </Routes>
    </DashboardLayout>
  )
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  )
}

export default App
