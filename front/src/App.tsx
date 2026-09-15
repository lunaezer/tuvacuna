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
import InicioSesion1 from './pages/InicioSesion/InicioSesion1'
import Registrarse1 from './pages/Registrarse/Registrarse1'

import './App.css'

function LayoutWrapper() {
  const location = useLocation()
  const esHome = location.pathname === '/'
  const esInicioSesion = location.pathname === '/inicio-sesion'
  const esRegistrarse1 = location.pathname === '/registrarse1'

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

  // La página de inicio de sesión no lleva Sidebar ni Navbar/Footer
  if (esInicioSesion) {
    return (
      <Routes>
        <Route path="/inicio-sesion" element={<InicioSesion1 />} />
      </Routes>
    )
  }
  if (esRegistrarse1) {
    return (
      <Routes>
        <Route path='/registrarse1' element={<Registrarse1 />} />
      </Routes>
    )
  }

  // Mapeo automático de ruta a ítem activo en la Sidebar
  const mapaRutas: Record<string, string> = {
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
