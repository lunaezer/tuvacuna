import { Search } from 'lucide-react'
import Button from '../Button/Button'
import './Buscador.css'

export interface OpcionFiltro<T extends string> {
  valor: T
  etiqueta: string
}

interface BuscadorProps<T extends string> {
  busqueda: string
  onBusqueda: (texto: string) => void
  placeholder: string
  opciones: OpcionFiltro<T>[]
  filtro: T
  onFiltro: (filtro: T) => void
}

export default function Buscador<T extends string>({
  busqueda,
  onBusqueda,
  placeholder,
  opciones,
  filtro,
  onFiltro,
}: BuscadorProps<T>) {
  return (
    <div className="buscador">
      <label className="buscador-input">
        <Search size={16} />
        <input
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder={placeholder}
        />
      </label>

      {/* chip activo = variante 'aceptar', chip inactivo = variante 'rechazar' */}
      {opciones.map((o) => (
        <Button
          key={o.valor}
          text={o.etiqueta}
          variant={filtro === o.valor ? 'aceptar' : 'rechazar'}
          className="buscador-chip"
          onClick={() => onFiltro(o.valor)}
        />
      ))}
    </div>
  )
}
