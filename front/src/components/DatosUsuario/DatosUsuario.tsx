import { User, Check, Shield } from 'lucide-react'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './DatosMedico.css'

const ESPECIALIDADES: Record<string, string> = {
  clinica: 'Clínica médica',
  pediatria: 'Pediatría',
  vacunatorio: 'Vacunatorio',
}

export function nombreEspecialidad(valor: string) {
  return ESPECIALIDADES[valor] ?? valor
}

export default function DatosMedico() {
  const { usuario } = useUsuario()

  if (!usuario) return null

  return (
    <section className="datos-medico">
      <h2 className="datos-medico-titulo">Tus datos</h2>

      <div className="datos-medico-grid">
        <div className="datos-medico-dato">
          <span className="datos-medico-icono"><User size={16} /></span>
          <span className="datos-medico-etiqueta">ESPECIALIDAD</span>
          <span className="datos-medico-valor">
            {usuario.especialidad ? nombreEspecialidad(usuario.especialidad) : '—'}
          </span>
        </div>

        <div className="datos-medico-dato">
          <span className="datos-medico-icono datos-medico-icono--verde"><Check size={16} /></span>
          <span className="datos-medico-etiqueta">MATRÍCULA</span>
          <span className="datos-medico-valor">{usuario.matricula ? `MN ${usuario.matricula}` : '—'}</span>
        </div>

        <div className="datos-medico-dato">
          <span className="datos-medico-icono"><Shield size={16} /></span>
          <span className="datos-medico-etiqueta">HOSPITAL</span>
          <span className="datos-medico-valor">{usuario.institucion || '—'}</span>
        </div>
      </div>

      <div className="datos-medico-dato datos-medico-dato--fila">
        <span className="datos-medico-etiqueta">DOCUMENTO</span>
        <span className="datos-medico-valor">{usuario.dni || '—'}</span>
      </div>

      <div className="datos-medico-dato datos-medico-dato--fila">
        <span className="datos-medico-etiqueta">CORREO ELECTRÓNICO</span>
        <span className="datos-medico-valor">{usuario.mail || '—'}</span>
      </div>
    </section>
  )
}
