import { useEffect, useState } from 'react'
import { User, Check, Shield } from 'lucide-react'
import { useUsuario } from '../../context/UsuarioContext/useUsuario'
import { API_URL } from '../../config'
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
  const { usuario, token } = useUsuario()
  // null mientras carga o si falló; lista (posiblemente vacía) si cargó bien
  const [comorbilidades, setComorbilidades] = useState<string[] | null>(null)

  const esPaciente = usuario?.rol === 'paciente'

  useEffect(() => {
    if (!esPaciente || !token) return
    fetch(`${API_URL}/api/perfil/comorbilidades`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((lista: { nombre: string }[]) => setComorbilidades(lista.map((c) => c.nombre)))
      .catch(() => setComorbilidades(null))
  }, [esPaciente, token])

  if (!usuario) return null

  const esMedico = usuario.rol === 'medico'

  let textoComorbilidades = '—'
  if (comorbilidades) {
    if (comorbilidades.length === 0) {
      textoComorbilidades = 'Ninguna'
    } else if (comorbilidades.length <= MAX_COMORBILIDADES_VISIBLES) {
      textoComorbilidades = comorbilidades.join(', ')
    } else {
      const visibles = comorbilidades.slice(0, MAX_COMORBILIDADES_VISIBLES).join(', ')
      textoComorbilidades = `${visibles} +${comorbilidades.length - MAX_COMORBILIDADES_VISIBLES}`
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
              <span className="datos-usuario-valor" title={comorbilidades?.join(', ')}>
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
