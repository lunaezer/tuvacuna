import { useNavigate } from 'react-router-dom'
import Iniciales from '../Iniciales/Iniciales'
import Button from '../Button/Button'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { nombreEspecialidad } from '../DatosMedico/DatosMedico'
import './PerfilMedicoCard.css'

export default function PerfilMedicoCard() {
  const { usuario } = useUsuario()
  const navigate = useNavigate()

  if (!usuario) return null

  const nombreCompleto = [usuario.nombre, usuario.apellido].filter(Boolean).join(' ')
  const detalle = [
    usuario.especialidad ? nombreEspecialidad(usuario.especialidad) : null,
    usuario.matricula ? `MN ${usuario.matricula}` : null,
    usuario.institucion || null,
  ].filter(Boolean)

  return (
    <section className="perfil-medico-card">
      <div className="perfil-medico-card-info">
        <span className="perfil-medico-card-label">MI PERFIL</span>

        <div className="perfil-medico-card-identidad">
          <div className="perfil-medico-card-avatar">
            <Iniciales nombre={nombreCompleto} size="large" />
            <span className="perfil-medico-card-estado" />
          </div>

          <div>
            <h2 className="perfil-medico-card-nombre">Dr. {nombreCompleto}</h2>
            <p className="perfil-medico-card-detalle">{detalle.join(' · ')}</p>
          </div>
        </div>
      </div>

      <div className="perfil-medico-card-acciones">
        <Button text="Ver mis pacientes" variant="celeste" onClick={() => navigate('/pacientes')} />
        <Button text="Editar perfil" variant="outline" onClick={() => navigate('/perfil')} />
      </div>
    </section>
  )
}
