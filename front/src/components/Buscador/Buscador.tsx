import { Search } from 'lucide-react'
import './BuscadorPacientes.css'

export type FiltroPacientes = 'todos' | 'atrasados'

interface BuscadorPacientesProps {
  busqueda: string
  onBusqueda: (texto: string) => void
  filtro: FiltroPacientes
  onFiltro: (filtro: FiltroPacientes) => void
  total: number
  atrasados: number
}

export default function BuscadorPacientes({
  busqueda,
  onBusqueda,
  filtro,
  onFiltro,
  total,
  atrasados,
}: BuscadorPacientesProps) {
  return (
    <div className="buscador-pacientes">
      <label className="buscador-pacientes-input">
        <Search size={16} />
        <input
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar por nombre o documento"
        />
      </label>

      <button
        type="button"
        className={`buscador-pacientes-chip ${filtro === 'todos' ? 'buscador-pacientes-chip--activo' : ''}`}
        onClick={() => onFiltro('todos')}
      >
        Todos — {total}
      </button>
      <button
        type="button"
        className={`buscador-pacientes-chip ${filtro === 'atrasados' ? 'buscador-pacientes-chip--activo' : ''}`}
        onClick={() => onFiltro('atrasados')}
      >
        Con atrasos — {atrasados}
      </button>
    </div>
  )
}
