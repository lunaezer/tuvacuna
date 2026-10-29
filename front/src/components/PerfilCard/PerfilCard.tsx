import { useNavigate } from 'react-router-dom'
import Iniciales from '../Iniciales/Iniciales'
import Button from '../Button/Button'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { useDosis } from '../../hooks/useDosis'
import { nombreEspecialidad } from '../DatosUsuario/DatosUsuario'
import { calcularEdad } from '../UserInfo/UserInfo'
import './PerfilMedicoCard.css'

interface PerfilMedicoCardProps {
  // en /perfil el botón "Editar perfil" activa el modo edición en vez de navegar
  onEditar?: () => void
}

export default function PerfilMedicoCard({ onEditar }: PerfilMedicoCardProps) {
  const { usuario } = useUsuario()
  const { conteo } = useDosis()
  const navigate = useNavigate()

  if (!usuario) return null

  const esMedico = usuario.rol === 'medico'
  const nombreCompleto = [usuario.nombre, usuario.apellido].filter(Boolean).join(' ')
  const editar = onEditar ?? (() => navigate('/perfil'))

  const edad = calcularEdad(usuario.fechaNacimiento)
  const detalle = esMedico
    ? [
        usuario.especialidad ? nombreEspecialidad(usuario.especialidad) : null,
        usuario.matricula ? `MN ${usuario.matricula}` : null,
        usuario.institucion || null,
      ]
    : [
        edad !== null ? `${edad} años` : null,
        usuario.dni ? `DNI ${usuario.dni}` : null,
      ]

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
            <h2 className="perfil-medico-card-nombre">{esMedico ? 'Dr. ' : ''}{nombreCompleto}</h2>
            <p className="perfil-medico-card-detalle">{detalle.filter(Boolean).join(' · ')}</p>
          </div>
        </div>

        {!esMedico && (
          <div className="perfil-medico-card-chips">
            <span className="perfil-medico-card-chip"><b>{conteo.aplicadas}</b> Vacunas en tu carnet</span>
            <span className="perfil-medico-card-chip"><b className="chip-amarillo">{conteo.recomendadas}</b> Próximas</span>
            <span className="perfil-medico-card-chip"><b className="chip-rojo">{conteo.atrasadas}</b> Atrasadas</span>
          </div>
        )}
      </div>

      <div className="perfil-medico-card-acciones">
        {esMedico ? (
          <Button text="Ver mis pacientes" variant="celeste" onClick={() => navigate('/pacientes')} />
        ) : (
          <Button text="Ver historial" variant="celeste" onClick={() => navigate('/mi-carnet')} />
        )}
        <Button text="Editar perfil" variant="outline" onClick={editar} />
      </div>
    </section>
  )
}
