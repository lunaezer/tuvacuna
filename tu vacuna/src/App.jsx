import { useState } from 'react'
import {
  Shield,
  Syringe,
  Calendar,
  MapPin,
  UserPlus,
  QrCode,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  X,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Award,
  Download
} from 'lucide-react'
import './App.css'

// Initial Mock Data
const INITIAL_FAMILY = [
  { id: '1', name: 'Juan', fullTitle: 'Juan (Tú)', role: 'Titular', age: 34, dni: '36.842.190' },
  { id: '2', name: 'María', fullTitle: 'María (Hija)', role: 'Hija', age: 6, dni: '52.114.908' },
  { id: '3', name: 'Carlos', fullTitle: 'Carlos (Hijo)', role: 'Hijo', age: 2, dni: '56.330.122' }
]

const INITIAL_VACCINES = {
  '1': { // Juan
    upcoming: [
      { id: 'u1', name: 'Antigripal 2026', dose: 'Dosis Anual', dueDate: '15 Sep 2026', type: 'Recomendada', urgent: false },
      { id: 'u2', name: 'Doble Adultos (dT)', dose: 'Refuerzo (10 años)', dueDate: '10 Oct 2026', type: 'Obligatoria', urgent: true }
    ],
    history: [
      { id: 'h1', name: 'Fiebre Amarilla', type: 'Viajeros / Endémica', dose: 'Única Dosis', date: '12 Ene 2024', lot: 'FA-90412', center: 'Hospital Central', status: 'Validada' },
      { id: 'h2', name: 'Hepatitis B', type: 'Adultos', dose: '3ª Dosis', date: '05 Mar 2023', lot: 'HB-77210', center: 'Vacunatorio N° 4', status: 'Validada' },
      { id: 'h3', name: 'Triple Viral', type: 'Adultos / Jóvenes', dose: '2ª Dosis', date: '18 Ago 2020', lot: 'TV-33109', center: 'Centro de Salud N° 12', status: 'Validada' },
      { id: 'h4', name: 'COVID-19 Bivalente', type: 'Refuerzo', dose: '4ª Dosis', date: '10 Nov 2023', lot: 'CV-88901', center: 'Estación Saludable', status: 'Validada' }
    ],
    statusText: 'Esquema Completo (2 Refuerzos pendientes)'
  },
  '2': { // María (6 años)
    upcoming: [
      { id: 'u3', name: 'Triple Viral (SRP)', dose: '2ª Dosis (Ingreso Escolar)', dueDate: '30 Ago 2026', type: 'Calendario Escolar', urgent: true },
      { id: 'u4', name: 'Polio (IPV)', dose: '2° Refuerzo', dueDate: '15 Sep 2026', type: 'Obligatoria', urgent: false }
    ],
    history: [
      { id: 'h5', name: 'Varicela', type: 'Niños', dose: '2ª Dosis', date: '14 Feb 2025', lot: 'VAR-1102', center: 'Hospital de Niños', status: 'Validada' },
      { id: 'h6', name: 'Triple Bacteriana Celular', type: 'Ingreso Escolar', dose: '1er Refuerzo', date: '10 Mar 2025', lot: 'TBC-8812', center: 'Centro Sanitario 3', status: 'Validada' },
      { id: 'h7', name: 'Neumococo Conjugada', type: 'Infantil', dose: 'Refuerzo', date: '04 Jun 2021', lot: 'NEU-4411', center: 'Hospital de Niños', status: 'Validada' }
    ],
    statusText: 'Atención: Próximas vacunas de ingreso escolar'
  },
  '3': { // Carlos (2 años)
    upcoming: [
      { id: 'u5', name: 'Fiebre Amarilla', dose: '1ª Dosis', dueDate: '01 Nov 2026', type: 'Recomendada', urgent: false }
    ],
    history: [
      { id: 'h8', name: 'Rotavirus', type: 'Lactantes', dose: '2ª Dosis', date: '12 May 2024', lot: 'ROT-0091', center: 'Clínica Infantil', status: 'Validada' },
      { id: 'h9', name: 'Meningococo (ACWY)', type: 'Infantil', dose: '3ª Dosis', date: '15 Ene 2025', lot: 'MEN-3329', center: 'Hospital de Niños', status: 'Validada' },
      { id: 'h10', name: 'Hepatitis A', type: 'Infantil', dose: 'Única Dosis', date: '20 Ago 2024', lot: 'HA-44102', center: 'Clínica Infantil', status: 'Validada' }
    ],
    statusText: 'Esquema Infantil Al Día'
  }
}

const HEALTH_CENTERS = [
  { name: 'Hospital Central Dr. Ramón Carrillo', address: 'Av. Libertador 2450', dist: '0.8 km', hours: 'Lun a Vie 08:00 - 18:00', status: 'Abierto' },
  { name: 'Centro de Salud N° 4 "San Martín"', address: 'Calle Belgrano 1120', dist: '1.4 km', hours: 'Lun a Sab 08:00 - 20:00', status: 'Abierto' },
  { name: 'Vacunatorio Municipal Integrado', address: 'Av. Mitre 550', dist: '2.1 km', hours: 'Lun a Vie 07:30 - 16:30', status: 'Cierra 16:30' }
]

function App() {
  const [family, setFamily] = useState(INITIAL_FAMILY)
  const [selectedMemberId, setSelectedMemberId] = useState('1')
  const [vaccineData, setVaccineData] = useState(INITIAL_VACCINES)
  const [activeNav, setActiveNav] = useState('dashboard')

  // Modals state
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false)
  const [showAddVaccineModal, setShowAddVaccineModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')

  // Form states
  const [newMember, setNewMember] = useState({ name: '', role: 'Hijo', age: '', dni: '' })
  const [newVaccine, setNewVaccine] = useState({
    memberId: '1',
    name: '',
    dose: '1ª Dosis',
    date: new Date().toISOString().split('T')[0],
    lot: '',
    center: ''
  })

  // Active family member reference
  const currentMember = family.find((m) => m.id === selectedMemberId) || family[0]
  const currentVaccines = vaccineData[currentMember.id] || { upcoming: [], history: [], statusText: 'Esquema sin datos' }

  // Filtered history
  const filteredHistory = currentVaccines.history.filter((v) =>
    v.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    v.type.toLowerCase().includes(searchFilter.toLowerCase()) ||
    v.center.toLowerCase().includes(searchFilter.toLowerCase())
  )

  // Handle Add Family Member
  const handleAddMemberSubmit = (e) => {
    e.preventDefault()
    if (!newMember.name.trim()) return

    const newId = String(Date.now())
    const createdMember = {
      id: newId,
      name: newMember.name.trim(),
      fullTitle: `${newMember.name.trim()} (${newMember.role})`,
      role: newMember.role,
      age: Number(newMember.age) || 0,
      dni: newMember.dni || 'Sin especificar'
    }

    setFamily([...family, createdMember])
    setVaccineData({
      ...vaccineData,
      [newId]: {
        upcoming: [
          { id: `u_${Date.now()}`, name: 'Chequeo de Esquema Inicial', dose: 'Evaluación', dueDate: 'Próximos 30 días', type: 'Recomendada', urgent: false }
        ],
        history: [],
        statusText: 'Nuevo registro ingresado'
      }
    })
    setSelectedMemberId(newId)
    setNewMember({ name: '', role: 'Hijo', age: '', dni: '' })
    setShowAddFamilyModal(false)
  }

  // Handle Add Vaccine Record
  const handleAddVaccineSubmit = (e) => {
    e.preventDefault()
    if (!newVaccine.name.trim()) return

    const targetMemberId = newVaccine.memberId || selectedMemberId
    const newRecord = {
      id: `h_${Date.now()}`,
      name: newVaccine.name,
      type: 'Registrada manualmente',
      dose: newVaccine.dose,
      date: newVaccine.date,
      lot: newVaccine.lot || 'N/A',
      center: newVaccine.center || 'Centro Declarado',
      status: 'Validada'
    }

    const memberData = vaccineData[targetMemberId] || { upcoming: [], history: [], statusText: '' }
    setVaccineData({
      ...vaccineData,
      [targetMemberId]: {
        ...memberData,
        history: [newRecord, ...memberData.history]
      }
    })

    setNewVaccine({
      memberId: selectedMemberId,
      name: '',
      dose: '1ª Dosis',
      date: new Date().toISOString().split('T')[0],
      lot: '',
      center: ''
    })
    setShowAddVaccineModal(false)
  }

  // Mark upcoming vaccine as applied
  const markAsApplied = (upcomingItem) => {
    const newHistoryItem = {
      id: `h_${Date.now()}`,
      name: upcomingItem.name,
      type: upcomingItem.type,
      dose: upcomingItem.dose,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      lot: `LT-${Math.floor(1000 + Math.random() * 9000)}`,
      center: 'Hospital Central Dr. Ramón Carrillo',
      status: 'Validada'
    }

    const updatedUpcoming = currentVaccines.upcoming.filter((u) => u.id !== upcomingItem.id)
    const updatedHistory = [newHistoryItem, ...currentVaccines.history]

    setVaccineData({
      ...vaccineData,
      [currentMember.id]: {
        ...currentVaccines,
        upcoming: updatedUpcoming,
        history: updatedHistory
      }
    })
  }

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR (Dark Navy Bar matching Mockup) */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-icon-wrapper">
              <Shield size={24} />
            </div>
            <div>
              <span className="brand-title">TuVacuna</span>
              <span className="brand-subtitle">Portal Oficial de Salud</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              <Shield size={18} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeNav === 'carnet' ? 'active' : ''}`}
              onClick={() => setShowQRModal(true)}
            >
              <QrCode size={18} />
              <span>Carnet Digital QR</span>
            </button>
            <button
              className={`nav-item ${activeNav === 'calendario' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              <Calendar size={18} />
              <span>Calendario Nacional</span>
            </button>
            <button
              className={`nav-item ${activeNav === 'centros' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              <MapPin size={18} />
              <span>Vacunatorios</span>
            </button>
            <button
              className={`nav-item ${activeNav === 'historial' ? 'active' : ''}`}
              onClick={() => setActiveNav('dashboard')}
            >
              <FileText size={18} />
              <span>Historial e Informes</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="user-profile-mini">
            <div className="avatar-circle">JP</div>
            <div className="user-info">
              <span className="user-name">Juan Pérez</span>
              <span className="user-role">Cuenta Familiar</span>
            </div>
          </div>
          <button className="logout-btn" title="Ajustes de cuenta">
            <Settings size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-wrapper">
        {/* TOP HEADER */}
        <header className="top-header">
          <div className="header-text">
            <h1>Hola, {currentMember.name}! 👋</h1>
            <p className="header-subtitle">
              {currentVaccines.statusText || 'Gestión y control de vacunas para tu grupo familiar.'}
            </p>
          </div>
          <button
            className="btn-cyan-pill"
            onClick={() => {
              setNewVaccine((prev) => ({ ...prev, memberId: selectedMemberId }))
              setShowAddVaccineModal(true)
            }}
          >
            <Plus size={18} />
            <span>Registrar Vacuna</span>
          </button>
        </header>

        {/* FAMILY MEMBER CHIPS (Exact mockup layout matching Nombre / Nombre / Nombre / Agregar familiar) */}
        <nav className="family-nav-row" aria-label="Selección de familiar">
          {family.map((member) => {
            const isActive = member.id === selectedMemberId
            return (
              <button
                key={member.id}
                className={`family-pill ${isActive ? 'active' : 'inactive'}`}
                onClick={() => setSelectedMemberId(member.id)}
              >
                <span>{member.name}</span>
              </button>
            )
          })}
          <button
            className="family-pill add-btn"
            onClick={() => setShowAddFamilyModal(true)}
          >
            <UserPlus size={16} />
            <span>Agregar familiar</span>
          </button>
        </nav>

        {/* DASHBOARD 2x2 GRID (Matching Mockup Wireframe) */}
        <div className="dashboard-grid">
          {/* CARD 1 (Top Left - White Card): Próximas Vacunas */}
          <section className="card card-white">
            <div className="card-header">
              <h2 className="card-title">
                <Clock size={20} color="#34b3e6" />
                <span>Próximas Vacunas</span>
              </h2>
              <span className="card-badge badge-warning">
                {currentVaccines.upcoming.length} Pendientes
              </span>
            </div>

            <div className="upcoming-list">
              {currentVaccines.upcoming.length > 0 ? (
                currentVaccines.upcoming.map((v) => (
                  <div
                    key={v.id}
                    className={`upcoming-item ${v.urgent ? 'urgent' : ''}`}
                  >
                    <div className="upcoming-info">
                      <h4>{v.name}</h4>
                      <p>
                        {v.dose} • Estimada: <strong>{v.dueDate}</strong>
                      </p>
                    </div>
                    <button
                      className="btn-sm-action"
                      onClick={() => markAsApplied(v)}
                    >
                      Aplicada
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                  <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, color: '#0f172a' }}>¡Esquema al día!</p>
                  <p style={{ fontSize: '13px' }}>No hay dosis pendientes programadas por ahora.</p>
                </div>
              )}
            </div>
          </section>

          {/* CARD 2 (Top Right - Dark Navy Card): Credencial & Estado QR */}
          <section className="card card-dark">
            <div className="dark-banner-content">
              <div className="card-header">
                <h2 className="card-title">
                  <Shield size={20} color="#38bdf8" />
                  <span>Carnet Digital Oficial</span>
                </h2>
                <span className="card-badge badge-cyan">Verificado</span>
              </div>

              <div className="dark-banner-info">
                <h3>{currentMember.fullTitle || currentMember.name}</h3>
                <p>
                  DNI: <strong>{currentMember.dni}</strong> • Estado:{' '}
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Al Día 🛡️</span>
                </p>
              </div>

              <div className="qr-mini-box">
                <div className="qr-placeholder">
                  <QrCode size={36} />
                </div>
                <div className="qr-text-info">
                  <h5>Código QR de Verificación</h5>
                  <p>Escaneable por personal de salud e ingreso escolar</p>
                </div>
              </div>

              <button
                className="btn-dark-card"
                onClick={() => setShowQRModal(true)}
              >
                <QrCode size={16} />
                <span>Ver Credencial Completa</span>
              </button>
            </div>
          </section>

          {/* CARD 3 (Bottom Left - White Card): Historial de Vacunas Aplicadas */}
          <section className="card card-white">
            <div className="card-header">
              <h2 className="card-title">
                <Syringe size={20} color="#34b3e6" />
                <span>Historial de Vacunas</span>
              </h2>
              <div style={{ position: 'relative', width: '180px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Buscar vacuna..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '30px',
                    paddingRight: '10px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px'
                  }}
                />
              </div>
            </div>

            <div className="table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Vacuna</th>
                    <th>Dosis</th>
                    <th>Fecha</th>
                    <th>Establecimiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="vaccine-name-cell">{item.name}</span>
                          <span className="vaccine-type">{item.type}</span>
                        </td>
                        <td>{item.dose}</td>
                        <td>{item.date}</td>
                        <td>{item.center}</td>
                        <td>
                          <span className="status-pill status-applied">
                            <CheckCircle2 size={12} />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textCenter: 'center', padding: '24px', color: '#94a3b8' }}>
                        No se encontraron registros de vacunas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* CARD 4 (Bottom Right - White Card): Centros de Vacunación */}
          <section className="card card-white">
            <div className="card-header">
              <h2 className="card-title">
                <MapPin size={20} color="#34b3e6" />
                <span>Vacunatorios Cercanos</span>
              </h2>
              <span className="card-badge badge-success">Cerca de ti</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {HEALTH_CENTERS.map((c, idx) => (
                <div key={idx} className="center-item">
                  <div className="center-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="center-details">
                    <h5>{c.name}</h5>
                    <p>{c.address} ({c.dist})</p>
                    <div className="center-meta">
                      <span>🕒 {c.hours}</span>
                      <span style={{ color: '#16a34a', fontWeight: 600 }}>• {c.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* MODAL 1: AGREGAR FAMILIAR */}
      {showAddFamilyModal && (
        <div className="modal-overlay" onClick={() => setShowAddFamilyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Nuevo Familiar</h3>
              <button className="close-btn" onClick={() => setShowAddFamilyModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Nombre o apodo</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Sofia, Lucas, Abuela..."
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Parentesco / Relación</label>
                <select
                  className="form-select"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  <option value="Hijo">Hijo / Hija</option>
                  <option value="Cónyuge">Cónyuge / Pareja</option>
                  <option value="Padre/Madre">Padre / Madre</option>
                  <option value="Hermano/a">Hermano / Hermana</option>
                  <option value="Otro">Otro familiar</option>
                </select>
              </div>

              <div className="form-group">
                <label>Edad (Años)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ej: 5"
                  value={newMember.age}
                  onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>DNI / Documento</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: 45.123.890"
                  value={newMember.dni}
                  onChange={(e) => setNewMember({ ...newMember, dni: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddFamilyModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-cyan-pill" style={{ padding: '10px 24px' }}>
                  Guardar Familiar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REGISTRAR VACUNA */}
      {showAddVaccineModal && (
        <div className="modal-overlay" onClick={() => setShowAddVaccineModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registrar Aplicación de Vacuna</h3>
              <button className="close-btn" onClick={() => setShowAddVaccineModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddVaccineSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Familiar</label>
                <select
                  className="form-select"
                  value={newVaccine.memberId}
                  onChange={(e) => setNewVaccine({ ...newVaccine, memberId: e.target.value })}
                >
                  {family.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.fullTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Nombre de la Vacuna</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Antigripal, Triple Viral, Neumococo..."
                  required
                  value={newVaccine.name}
                  onChange={(e) => setNewVaccine({ ...newVaccine, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Dosis</label>
                  <select
                    className="form-select"
                    value={newVaccine.dose}
                    onChange={(e) => setNewVaccine({ ...newVaccine, dose: e.target.value })}
                  >
                    <option value="1ª Dosis">1ª Dosis</option>
                    <option value="2ª Dosis">2ª Dosis</option>
                    <option value="3ª Dosis">3ª Dosis</option>
                    <option value="Dosis Anual">Dosis Anual</option>
                    <option value="Refuerzo">Refuerzo</option>
                    <option value="Única Dosis">Única Dosis</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Fecha de Aplicación</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newVaccine.date}
                    onChange={(e) => setNewVaccine({ ...newVaccine, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Lote (Opcional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: LT-90812"
                  value={newVaccine.lot}
                  onChange={(e) => setNewVaccine({ ...newVaccine, lot: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Centro de Salud / Hospital</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Hospital Central, Centro N° 4"
                  value={newVaccine.center}
                  onChange={(e) => setNewVaccine({ ...newVaccine, center: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddVaccineModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-cyan-pill" style={{ padding: '10px 24px' }}>
                  Guardar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CARNET DIGITAL QR CREDENTIAL */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Credencial Digital de Vacunación</h3>
              <button className="close-btn" onClick={() => setShowQRModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="carnet-card">
              <div className="carnet-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={20} color="#38bdf8" />
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>TuVacuna Oficial</span>
                </div>
                <Award size={20} color="#f59e0b" />
              </div>

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '22px', fontWeight: 800 }}>{currentMember.name}</h4>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>DNI: {currentMember.dni}</p>
                <p style={{ fontSize: '12px', color: '#34d399', marginTop: '4px', fontWeight: 600 }}>
                  ✅ REGISTRO NACIONAL DE VACUNACIÓN
                </p>
              </div>

              <div className="carnet-qr-big">
                {/* SVG QR Code Simulation */}
                <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#0d202c" strokeWidth="1.5">
                  <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3z" fill="#0d202c" />
                  <rect x="14" y="14" width="3" height="3" fill="#0d202c" />
                  <rect x="18" y="14" width="3" height="3" fill="#0d202c" />
                  <rect x="14" y="18" width="3" height="3" fill="#0d202c" />
                  <rect x="18" y="18" width="3" height="3" fill="#0d202c" />
                </svg>
              </div>

              <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
                Válido para trámites sanitarios, viajes e ingreso escolar.
              </p>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'center' }}>
              <button
                className="btn-cyan-pill"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('Descargando Credencial Oficial TuVacuna en PDF...')}
              >
                <Download size={18} />
                <span>Descargar Carnet PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
