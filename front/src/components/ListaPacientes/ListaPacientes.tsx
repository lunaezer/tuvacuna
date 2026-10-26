import { ChevronRight } from 'lucide-react'
import Iniciales from '../Iniciales/Iniciales'
import EstadoPacienteBadge from '../EstadoPacienteBadge/EstadoPacienteBadge'
import type { PacienteLista } from '../../types'
import './ListaPacientes.css'

interface ListaPacientesProps {
  pacientes: PacienteLista[]
  seleccionadoId: number | null
  onSeleccionar: (id: number) => void
}

const MESES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']

// '2026-04-03' -> '03·ABR·2026' (se parte a mano para evitar líos de zona horaria)
function formatearFecha(iso: string | null) {
  if (!iso) return '—'
  const [anio, mes, dia] = iso.split('-')
  return `${dia}·${MESES[Number(mes) - 1]}·${anio}`
}

export default function ListaPacientes({ pacientes, seleccionadoId, onSeleccionar }: ListaPacientesProps) {
  return (
    <div className="lista-pacientes">
      <div className="lista-pacientes-encabezado">
        <span>Paciente</span>
        <span>Última vacuna</span>
        <span>Estado</span>
        <span />
      </div>

      {pacientes.length === 0 ? (
        <p className="lista-pacientes-vacia">No se encontraron pacientes.</p>
      ) : (
        <ul className="lista-pacientes-filas">
          {pacientes.map((p) => (
            <li
              key={p.id}
              className={`lista-pacientes-fila ${p.id === seleccionadoId ? 'lista-pacientes-fila--activa' : ''}`}
              onClick={() => onSeleccionar(p.id)}
            >
              <span className="lista-pacientes-nombre">
                <Iniciales nombre={`${p.nombre} ${p.apellido}`} size="small" />
                {p.nombre} {p.apellido}
              </span>
              <span className="lista-pacientes-fecha">{formatearFecha(p.ultimaVacuna)}</span>
              <EstadoPacienteBadge estado={p.estado} />
              <ChevronRight size={16} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
