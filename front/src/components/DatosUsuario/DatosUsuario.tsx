import { User, Check, Shield } from 'lucide-react'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import './DatosUsuario.css'

const MAX_COMORBILIDADES_VISIBLES = 2

const ESPECIALIDADES: Record<string, string> = {
  clinica: 'Clínica médica',
  pediatria: 'Pediatría',
  vacunatorio: 'Vacunatorio',
}

const SEXOS: Record<string, string> = {
  F: 'Femenino',
  M: 'Masculino',
}

export function nombreEspecialidad(valor: string) {
  return ESPECIALIDADES[valor] ?? valor
}

export default function DatosUsuario() {
  const { usuario } = useUsuario()

  if (!usuario) return null

  const esMedico = usuario.rol === 'medico'

  const nombres = usuario.comorbilidades?.map((c) => c.nombre)
  let textoComorbilidades = '—'
  if (nombres) {
    if (nombres.length === 0) {
      textoComorbilidades = 'Ninguna'
    } else if (nombres.length <= MAX_COMORBILIDADES_VISIBLES) {
      textoComorbilidades = nombres.join(', ')
    } else {
      const visibles = nombres.slice(0, MAX_COMORBILIDADES_VISIBLES).join(', ')
      textoComorbilidades = `${visibles} +${nombres.length - MAX_COMORBILIDADES_VISIBLES}`
    }
  }

  return (
    <section className="datos-usuario">
      <h2 className="datos-usuario-titulo">Tus datos</h2>

      <div className="datos-usuario-grid">
        {esMedico ? (
          <>
            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono"><User size={16} /></span>
              <span className="datos-usuario-etiqueta">ESPECIALIDAD</span>
              <span className="datos-usuario-valor">
                {usuario.especialidad ? nombreEspecialidad(usuario.especialidad) : '—'}
              </span>
            </div>

            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono datos-usuario-icono--verde"><Check size={16} /></span>
              <span className="datos-usuario-etiqueta">MATRÍCULA</span>
              <span className="datos-usuario-valor">{usuario.matricula ? `MN ${usuario.matricula}` : '—'}</span>
            </div>

            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono"><Shield size={16} /></span>
              <span className="datos-usuario-etiqueta">HOSPITAL</span>
              <span className="datos-usuario-valor">{usuario.institucion || '—'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono"><User size={16} /></span>
              <span className="datos-usuario-etiqueta">SEXO AL NACER</span>
              <span className="datos-usuario-valor">
                {usuario.sexo ? (SEXOS[usuario.sexo] ?? usuario.sexo) : '—'}
              </span>
            </div>

            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono"><Shield size={16} /></span>
              <span className="datos-usuario-etiqueta">OBRA SOCIAL</span>
              <span className="datos-usuario-valor">{usuario.obraSocial || '—'}</span>
            </div>

            <div className="datos-usuario-dato">
              <span className="datos-usuario-icono datos-usuario-icono--verde"><Check size={16} /></span>
              <span className="datos-usuario-etiqueta">COMORBILIDADES</span>
              <span className="datos-usuario-valor" title={nombres?.join(', ')}>
                {textoComorbilidades}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="datos-usuario-dato datos-usuario-dato--fila">
        <span className="datos-usuario-etiqueta">DOCUMENTO</span>
        <span className="datos-usuario-valor">{usuario.dni || '—'}</span>
      </div>

      <div className="datos-usuario-dato datos-usuario-dato--fila">
        <span className="datos-usuario-etiqueta">CORREO ELECTRÓNICO</span>
        <span className="datos-usuario-valor">{usuario.mail || '—'}</span>
      </div>
    </section>
  )
}
