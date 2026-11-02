import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AgregarFamiliarModal.css";

interface AgregarFamiliarModalProps {
  isOpen: boolean
  onClose: () => void
  onEnviar: (datos: { mail: string; nombre: string; apellido: string }) => Promise<void>
}

export default function AgregarFamiliarModal({ isOpen, onClose, onEnviar }: AgregarFamiliarModalProps) {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [mail, setMail] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)

  // Al cerrar se limpia todo, así la próxima vez arranca vacío
  useEffect(() => {
    if (!isOpen) {
      setNombre("")
      setApellido("")
      setMail("")
      setError("")
      setEnviando(false)
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setEnviando(true)
    try {
      await onEnviar({ mail: mail.trim(), nombre: nombre.trim(), apellido: apellido.trim() })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar la solicitud")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-familiar-titulo">Agregar familiar</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="agregar-familiar-nombres">
          <Input
            variant="large"
            name="nombre"
            label="Nombre"
            placeholder="Ej: Joaquin"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            variant="large"
            name="apellido"
            label="Apellido"
            placeholder="Ej: Baranek"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <Input
          variant="large"
          type="email"
          name="mail"
          label="Mail"
          placeholder="Ej: paciente@gmail.com"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          error={error}
        />
        <div className="agregar-familiar-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button
            text={enviando ? "Enviando..." : "Añadir"}
            type="submit"
            variant="celeste"
            disabled={enviando}
          />
        </div>
      </form>
    </Modal>
  )
}
