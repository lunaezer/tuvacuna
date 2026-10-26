import Iniciales from '../Iniciales/Iniciales'
import Button from '../Button/Button'
import EstadoPacienteBadge from '../EstadoPacienteBadge/EstadoPacienteBadge'
import { resumirPaciente } from '../../utils/pacientes'
import type { PacienteDetalle, PacienteLista } from '../../types'
import './PreviewPaciente.css'

interface PreviewPacienteProps {
  paciente: PacienteLista | null
  detalle: PacienteDetalle | null
  cargando: boolean
  error: string
  onVerCarnet: (id: number) => void
}

export default function PreviewPaciente({ paciente, detalle, cargando, error, onVerCarnet }: PreviewPacienteProps) {
  if (!paciente) {
    return <section className="preview-paciente preview-paciente--vacio">Seleccioná un paciente</section>
  }
  if (error) {
    return <section className="preview-paciente preview-paciente--vacio">{error}</section>
  }
  if (cargando || !detalle) {
    return <section className="preview-paciente preview-paciente--vacio">Cargando información del paciente...</section>
  }

  const resumen = resumirPaciente(detalle)
  const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`

  return (
    <section className="preview-paciente">
      <div className="preview-paciente-identidad">
        <div className="preview-paciente-cabecera">
          <Iniciales nombre={nombreCompleto} size="large" />
          <div>
            <h3 className="preview-paciente-nombre">{nombreCompleto}</h3>
            <span className="preview-paciente-sub">
              {resumen.edad} AÑOS · DNI {paciente.dni}
            </span>
          </div>
        </div>
        <EstadoPacienteBadge estado={paciente.estado} />
      </div>

      <div className="preview-paciente-datos">
        <div>
          <span className="preview-paciente-etiqueta">Obra social</span>
          <strong>{detalle.obraSocial}</strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Comorbilidades</span>
          <strong>
            {detalle.comorbilidades.length === 0 ? 'Ninguna registrada' : detalle.comorbilidades.join(', ')}
          </strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Dosis aplicadas</span>
          <strong>{resumen.dosisAplicadas}</strong>
        </div>
        <div>
          <span className="preview-paciente-etiqueta">Cobertura</span>
          <strong className="preview-paciente-cobertura">{resumen.cobertura} %</strong>
        </div>
      </div>

      <div className="preview-paciente-accion">
        {resumen.detalleEstado && (
          <div className="preview-paciente-alerta">
            <span className="preview-paciente-alerta-etiqueta">REQUIERE ATENCIÓN</span>
            <strong>{resumen.detalleEstado}</strong>
          </div>
        )}
        <Button text="Ver carnet completo" variant="celeste" onClick={() => onVerCarnet(paciente.id)} />
      </div>
    </section>
  )
}
