import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ComorbilidadesSelector from "../ComorbilidadesSelector/ComorbilidadesSelector";
import { useUsuario } from "../../context/UsuarioContext/useUsuario";
import "./EditarPerfilModal.css";

interface EditarPerfilModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EditarPerfilModal({ isOpen, onClose }: EditarPerfilModalProps) {
  const { usuario, guardarComorbilidades } = useUsuario()
  const [ids, setIds] = useState<number[]>([])
  const [error, setError] = useState("")
  const [guardando, setGuardando] = useState(false)

  // Al abrir arranca con lo que el paciente tiene hoy
  useEffect(() => {
    if (isOpen) {
      setIds(usuario?.comorbilidades?.map((c) => c.id) ?? [])
      setError("")
      setGuardando(false)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setGuardando(true)
    try {
      await guardarComorbilidades(ids) // manda la lista completa, no solo lo que cambió
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron guardar los cambios")
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="editar-perfil-titulo">Editar perfil</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="editar-perfil-nombres">
          <Input
            variant="large"
            name="nombre"
            label="Nombre"
            placeholder=""
            disabled
            value={usuario?.nombre ?? ""}
          />
          <Input
            variant="large"
            name="apellido"
            label="Apellido"
            placeholder=""
            disabled
            value={usuario?.apellido ?? ""}
          />
        </div>

        {/* pendiente (back): todavía no hay endpoint para cambiar la obra social */}
        <Input
          variant="large"
          name="obraSocial"
          label="Obra social"
          placeholder="Sin obra social"
          disabled
          value={usuario?.obraSocial ?? ""}
        />

        <ComorbilidadesSelector seleccionadas={ids} onChange={setIds} />

        {error && <p className="editar-perfil-error">{error}</p>}

        <div className="editar-perfil-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button
            text={guardando ? "Guardando..." : "Guardar cambios"}
            type="submit"
            variant="celeste"
            disabled={guardando}
          />
        </div>
      </form>
    </Modal>
  )
}
