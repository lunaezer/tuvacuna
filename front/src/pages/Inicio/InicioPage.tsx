import { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader/PageHeader'
import Button from '../../components/Button/Button'
import Cards from '../../components/Cards/Cards'
import './InicioPage.css'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useLocation, useNavigate } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'
import UserInfo from '../../components/UserInfo/UserInfo'

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
  }, [])

  const irAlCalendario = () => {
    navigate("/calendario")
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
        <Button text="+ Agendar turno" variant="celeste" onClick={irAlCalendario}/>
      </PageHeader>

      <UserInfo />

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
