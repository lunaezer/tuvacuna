import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./AgregarFamiliarModal.css";

interface AgregarFamiliarModalProps {
  isOpen: boolean
  onClose: () => void
  onEnviar: (email: string) => Promise<void>
}

export default function AgregarFamiliarModal({ isOpen, onClose, onEnviar }: AgregarFamiliarModalProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)

  // Al cerrar se limpia todo, así la próxima vez arranca vacío
  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setError("")
      setEnviando(false)
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setEnviando(true)
    try {
      await onEnviar(email.trim())
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
        <Input
          variant="large"
          type="email"
          name="email"
          label="Mail del familiar"
          placeholder="familiar@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <div className="agregar-familiar-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button
            text={enviando ? "Enviando..." : "Enviar solicitud"}
            type="submit"
            variant="celeste"
            disabled={enviando}
          />
        </div>
      </form>
    </Modal>
  )
}
