import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { Camera } from 'lucide-react'
import Button from '../Button/Button'
import './BotonSubirFoto.css'

interface BotonSubirFotoProps {
  onArchivo: (archivo: File) => void
  text?: string
}

// Botón que abre el selector de fotos; solo JPG, PNG o WebP (lo que lee el lector de carnets)
export default function BotonSubirFoto({ onArchivo, text = 'Subir foto del carnet' }: BotonSubirFotoProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (archivo) onArchivo(archivo)
    e.target.value = '' // permite elegir la misma foto otra vez
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="boton-subir-foto-input"
        onChange={handleArchivo}
      />
      <Button
        text={text}
        icon={<Camera size={18} />}
        variant="primary"
        onClick={() => inputRef.current?.click()}
      />
    </>
  )
}
