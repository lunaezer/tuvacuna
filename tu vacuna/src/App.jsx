import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

import HomePage from './pages/Home/HomePage'
import ComoFuncionaPage from './pages/ComoFunciona/ComoFuncionaPage'
import FuncionesPage from './pages/Funciones/FuncionesPage'
import MapaDeCentrosPage from './pages/MapaDeCentros/MapaDeCentrosPage'
import VacunasPage from './pages/Vacunas/VacunasPage'

import './App.css'

function App() {
  return (
    <Router>
      <div className="contenedor-principal-pagina">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/funciones" element={<FuncionesPage />} />
          <Route path="/mapa-de-centros" element={<MapaDeCentrosPage />} />
          <Route path="/vacunas" element={<VacunasPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
