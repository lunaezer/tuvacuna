import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import Cards from '../../components/Cards/Cards'
import './InicioPage.css'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useLocation, useNavigate } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'
import UserInfo from '../../components/UserInfo/UserInfo'
import DosisResumen from '../../components/DosisResumen/DosisResumen'
import ParaAgendar from '../../components/ParaAgendar/ParaAgendar'
import DondeVacunarte from '../../components/DondeVacunarte/DondeVacunarte'
import PreguntaAsistente from '../../components/PreguntaAsistente/PreguntaAsistente'
import AccesosRapidos from '../../components/AccesosRapidos/AccesosRapidos'

export default function InicioPage() {
  const { usuario } = useUsuario()
  const navigate = useNavigate()
  const location = useLocation()
  const [cuentaCreada, setCuentaCreada] = useState(
    Boolean(location.state?.cuentaCreada),
  )

  // limpia el state del router para que al recargar no vuelva a aparecer
  useEffect(() => {
    if (location.state?.cuentaCreada) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state?.cuentaCreada, navigate])

  const irAlCalendario = () => {
    navigate("/calendario")
  }

  // el formulario de cargar dosis vive en Mi carnet: se abre solo al llegar
  const irACargarVacuna = () => {
    navigate("/mi-carnet", { state: { cargarDosis: true } })
  }

  return (
    <div className="contenedor-inicio">
      <Toast
        isOpen={cuentaCreada}
        mensaje="Usuario creado con éxito"
        duracion={2500}
        onClose={() => setCuentaCreada(false)}
      />

      {/* Header: saludo + botón */}
      <PageHeader
        titulo={`Hola, ${usuario?.nombre}!`}
        subtitulo="Revisá el estado de tus vacunas y próximos turnos."
      >
        <div className="inicio-header-botones">
          <Button text="Cargar vacuna" variant="primary" onClick={irACargarVacuna} />
          <Button text="Agendar turno" variant="celeste" onClick={irAlCalendario} />
        </div>
      </PageHeader>

      <AccesosRapidos onAgendar={irAlCalendario} onCargar={irACargarVacuna} />

      <UserInfo />

      {/* Grid de cards */}
      <div className="inicio-grid">
        <Cards title="Tus dosis" variant="white" className="inicio-card inicio-card-dosis">
          <DosisResumen />
        </Cards>
        <Cards title="Donde vacunarte" variant="dark" className="inicio-card">
          <DondeVacunarte />
        </Cards>
        <Cards title="Para agendar en tu calendario" variant="white" className="inicio-card">
          <ParaAgendar />
        </Cards>
        <Cards title="Preguntale a TuVacuna" variant="white" className="inicio-card inicio-card-ajustada">
          <PreguntaAsistente />
        </Cards>
      </div>
    </div>
  )
}
