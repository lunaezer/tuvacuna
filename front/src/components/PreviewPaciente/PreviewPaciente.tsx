import Iniciales from '../Iniciales/Iniciales'
import Button from '../Button/Button'
import EstadoPacienteBadge from '../EstadoPacienteBadge/EstadoPacienteBadge'
import type { PacienteResumen } from '../../types'
import './PreviewPaciente.css'

interface PreviewPacienteProps {
  paciente: PacienteResumen | null
  onVerCarnet: (id: number) => void
}

export default function PreviewPaciente({ paciente, onVerCarnet }: PreviewPacienteProps) {
  if (!paciente) {
    return <section className="preview-paciente preview-paciente--vacio">Seleccioná un paciente</section>
  }

  const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`

  return (
    <section className="preview-paciente">
      <div className="preview-paciente-identidad">
        <div className="preview-paciente-cabecera">
          <Iniciales nombre={nombreCompleto} size="large" />
          <div>
            <h3 className="preview-paciente-nombre">{nombreCompleto}</h3>
            <span className="preview-paciente-sub">
              {paciente.edad} AÑOS · DNI {paciente.dni}
            </span>
          </div>
        </div>
        <EstadoPacienteBadge estado={paciente.estado} />
      </div>

      <div className="preview-paciente-datos">
        <div>
          <span className="preview-paciente-etiqueta">Obra social</span>
          <strong>{paciente.obraSocial}</strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Comorbilidades</span>
          <strong>
            {paciente.comorbilidades.length === 0 ? 'Ninguna registrada' : paciente.comorbilidades.join(', ')}
          </strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Dosis aplicadas</span>
          <strong>{paciente.dosisAplicadas}</strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Cobertura</span>
          <strong className="preview-paciente-cobertura">{paciente.cobertura} %</strong>
        </div>
      </div>

      <div className="preview-paciente-accion">
        {paciente.detalleEstado && (
          <div className="preview-paciente-alerta">
            <span className="preview-paciente-alerta-etiqueta">REQUIERE ATENCIÓN</span>
            <strong>{paciente.detalleEstado}</strong>
          </div>
        )}
        <Button text="Ver carnet completo" variant="celeste" onClick={() => onVerCarnet(paciente.id)} />
      </div>
    </section>
  )
}
