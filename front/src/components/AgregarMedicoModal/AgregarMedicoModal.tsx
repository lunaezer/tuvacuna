import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import type { DatosMedico } from "../../types";
import "./AgregarMedicoModal.css";

interface AgregarMedicoModalProps {
  isOpen: boolean
  onClose: () => void
  onEnviar: (datos: DatosMedico) => Promise<void>
}

const formVacio: DatosMedico = { matricula: "", mail: "", nombre: "", apellido: "" }

export default function AgregarMedicoModal({ isOpen, onClose, onEnviar }: AgregarMedicoModalProps) {
  const [form, setForm] = useState<DatosMedico>(formVacio)
  const [errores, setErrores] = useState<Partial<Record<keyof DatosMedico, string>>>({})
  const [errorGeneral, setErrorGeneral] = useState("")
  const [enviando, setEnviando] = useState(false)

  // Al cerrar se limpia todo, así la próxima vez arranca vacío
  useEffect(() => {
    if (!isOpen) {
      setForm(formVacio)
      setErrores({})
      setErrorGeneral("")
      setEnviando(false)
    }
  }, [isOpen])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorGeneral("")

    // Los 4 datos son obligatorios
    const nuevos: typeof errores = {}
    if (!form.nombre.trim()) nuevos.nombre = "Ingresá el nombre"
    if (!form.apellido.trim()) nuevos.apellido = "Ingresá el apellido"
    if (!form.matricula.trim()) nuevos.matricula = "Ingresá la matrícula"
    if (!/^\S+@\S+\.\S+$/.test(form.mail.trim())) nuevos.mail = "Correo electrónico no válido"
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    setEnviando(true)
    try {
      await onEnviar({
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        matricula: form.matricula.trim(),
        mail: form.mail.trim(),
      })
      onClose()
    } catch (err) {
      setErrorGeneral(err instanceof Error ? err.message : "No se pudo enviar la solicitud")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-medico-titulo">Agregar médico</h1>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <div className="agregar-medico-fila">
          <Input variant="small" name="nombre" label="Nombre" placeholder="Carolina" required
            value={form.nombre} onChange={handleChange} error={errores.nombre} />
          <Input variant="small" name="apellido" label="Apellido" placeholder="Rivas" required
            value={form.apellido} onChange={handleChange} error={errores.apellido} />
        </div>

        <Input variant="large" name="matricula" label="Matrícula profesional" placeholder="112455" required
          value={form.matricula} onChange={handleChange} error={errores.matricula} />

        <Input variant="large" type="email" name="mail" label="Correo del médico" placeholder="medico@correo.com" required
          value={form.mail} onChange={handleChange} error={errores.mail} />

        {errorGeneral && <p className="agregar-medico-error">{errorGeneral}</p>}

        <div className="agregar-medico-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button text={enviando ? "Enviando..." : "Enviar solicitud"} type="submit" variant="celeste" disabled={enviando} />
        </div>
      </form>
    </Modal>
  );
}
