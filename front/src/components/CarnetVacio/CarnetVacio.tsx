import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Camera, CreditCard } from 'lucide-react'
import Button from '../Button/Button'
import './CarnetVacio.css'

interface CarnetVacioProps {
  onSubirFoto: (archivo: File) => void
  onCargarManual: () => void
}

function CarnetVacio({ onSubirFoto, onCargarManual }: CarnetVacioProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (archivo) onSubirFoto(archivo)
    e.target.value = ''
  }

  return (
    <div className="carnet-vacio">
      <div className="carnet-vacio-icono">
        <CreditCard size={44} strokeWidth={1.75} />
      </div>

      <h2 className="carnet-vacio-titulo">Traé tu carnet</h2>
      <p className="carnet-vacio-texto">
        Sacale una foto a tu libreta y armamos el historial dosis por dosis. A partir de ahí
        TuVacuna calcula qué te corresponde según el Calendario Nacional.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        className="carnet-vacio-input"
        onChange={handleArchivo}
      />
      <button
        type="button"
        className="carnet-vacio-subir"
        onClick={() => inputRef.current?.click()}
      >
        <span className="carnet-vacio-camara">
          <Camera size={22} strokeWidth={1.75} />
        </span>
        Subí una foto de tu carnet
      </button>

      <hr className="carnet-vacio-linea" />

      <Button
        text="Cargar las vacunas a mano"
        icon={<span>+</span>}
        variant="outline"
        className="carnet-vacio-manual"
        onClick={onCargarManual}
      />
    </div>
  )
}

export default CarnetVacio
