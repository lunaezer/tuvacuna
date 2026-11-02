import { X } from 'lucide-react'
import Input from '../Input/Input'
import Select from '../Select/Select'
import type { RegistroOcr } from '../../types'
import './FilaRevisionOcr.css'

export interface FilaOcr {
  clave: number
  registro: RegistroOcr
  idVacuna: string
  fecha: string
  lote: string
  marca: string
  lugar: string
  estado: 'pendiente' | 'guardada' | 'error'
  error?: string
}

interface FilaRevisionOcrProps {
  fila: FilaOcr
  onCambio: (nombre: string, valor: string) => void
  onQuitar: () => void
}

// Una dosis que leyó el lector, para que la persona la revise y complete antes de guardarla
export default function FilaRevisionOcr({ fila, onCambio, onQuitar }: FilaRevisionOcrProps) {
  const { registro } = fila
  const guardada = fila.estado === 'guardada'
  const leido = [registro.vacuna_ocr, registro.dosis_ocr, registro.fecha_ocr].filter(Boolean).join(' · ')

  const handleChange = (e: { target: { name: string; value: string } }) =>
    onCambio(e.target.name, e.target.value)

  return (
    <fieldset className={`fila-ocr fila-ocr--${fila.estado}`} disabled={guardada}>
      <div className="fila-ocr-encabezado">
        <p className="fila-ocr-leido">
          <span>Leído en la foto</span> {leido}
        </p>
        {guardada ? (
          <span className="fila-ocr-etiqueta">Guardada</span>
        ) : (
          <button type="button" className="fila-ocr-quitar" onClick={onQuitar} aria-label="Quitar esta dosis">
            <X size={16} />
          </button>
        )}
      </div>

      {registro.candidatas.length === 0 ? (
        <p className="fila-ocr-aviso">
          No reconocimos esta vacuna. Quitala y cargala a mano.
        </p>
      ) : (
        <>
          <Select
            variant="small"
            label="Vacuna"
            name="idVacuna"
            required
            value={fila.idVacuna}
            onChange={handleChange}
            options={registro.candidatas.map((c) => ({
              value: String(c.id_vacuna),
              label: `${c.nombre} — ${c.dosis}`,
            }))}
          />

          <div className="fila-ocr-grilla">
            <Input variant="small" name="fecha" label="Fecha" placeholder="" type="date" required value={fila.fecha} onChange={handleChange} />
            <Input variant="small" name="lote" label="Lote" placeholder="12345" required value={fila.lote} onChange={handleChange} />
            <Input variant="small" name="marca" label="Marca" placeholder="Ej: Pzifer" required value={fila.marca} onChange={handleChange} />
            <Input variant="small" name="lugar" label="Lugar" placeholder="Ej: Stamboulian" required value={fila.lugar} onChange={handleChange} />
          </div>
        </>
      )}

      {fila.error && <p className="fila-ocr-error">{fila.error}</p>}
    </fieldset>
  )
}
