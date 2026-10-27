import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import PersonaFila from "../PersonaFila/PersonaFila";
import type { Medico } from "../../types";
import "./AgregarMedicoModal.css";

interface AgregarMedicoModalProps {
  isOpen: boolean
  onClose: () => void
  onBuscar: (texto: string) => Promise<Medico[]>
  onEnviar: (idMedico: number) => Promise<void>
  idsAgregados: number[] // médicos que ya atienden al paciente
}

export default function AgregarMedicoModal({ isOpen, onClose, onBuscar, onEnviar, idsAgregados }: AgregarMedicoModalProps) {
  const [texto, setTexto] = useState("")
  const [resultados, setResultados] = useState<Medico[]>([])
  const [buscando, setBuscando] = useState(false)
  const [error, setError] = useState("")
  const [enviandoId, setEnviandoId] = useState<number | null>(null)
  const [solicitados, setSolicitados] = useState<number[]>([]) // a quiénes ya se les mandó la solicitud

  const buscado = texto.trim()

  // Al cerrar se limpia todo, así la próxima vez arranca vacío
  useEffect(() => {
    if (!isOpen) {
      setTexto("")
      setResultados([])
      setBuscando(false)
      setError("")
      setEnviandoId(null)
      setSolicitados([])
    }
  }, [isOpen])

  // Busca mientras escribe, esperando 300 ms desde la última tecla
  useEffect(() => {
    setError("")
    if (buscado.length < 2) {
      setResultados([])
      return
    }

    let vigente = true // descarta respuestas viejas si ya se escribió otra cosa
    const timer = setTimeout(async () => {
      setBuscando(true)
      try {
        const medicos = await onBuscar(buscado)
        if (vigente) setResultados(medicos)
      } catch (err) {
        if (vigente) setError(err instanceof Error ? err.message : "No se pudo buscar médicos")
      } finally {
        if (vigente) setBuscando(false)
      }
    }, 300)

    return () => {
      vigente = false
      clearTimeout(timer)
    }
  }, [buscado])

  async function agregar(medico: Medico) {
    setError("")
    setEnviandoId(medico.id)
    try {
      await onEnviar(medico.id)
      setSolicitados((actuales) => [...actuales, medico.id])
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar la solicitud")
    } finally {
      setEnviandoId(null)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-medico-titulo">Agregar médico</h1>

      <div className="modal-form">
        <Input
          variant="large"
          name="busqueda"
          label="Buscar médico"
          placeholder="Nombre, apellido, especialidad u hospital"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        {error && <p className="agregar-medico-error">{error}</p>}

        {buscado.length < 2 ? (
          <p className="agregar-medico-ayuda">Escribí al menos 2 letras para buscar.</p>
        ) : buscando ? (
          <p className="agregar-medico-ayuda">Buscando...</p>
        ) : resultados.length === 0 ? (
          !error && <p className="agregar-medico-ayuda">No encontramos médicos con esa búsqueda.</p>
        ) : (
          <div className="agregar-medico-lista">
            {resultados.map((medico) => (
              <PersonaFila
                key={medico.id}
                nombre={`Dr. ${medico.nombre} ${medico.apellido}`}
                detalle={[medico.especialidad, medico.institucion, `MN ${medico.matricula}`].filter(Boolean).join(" · ")}
                variante="medico"
              >
                {idsAgregados.includes(medico.id) ? (
                  <span className="agregar-medico-ya">Ya te atiende</span>
                ) : solicitados.includes(medico.id) ? (
                  <Button text="Solicitado" variant="aceptar" disabled className="agregar-medico-solicitado" />
                ) : (
                  <Button
                    text={enviandoId === medico.id ? "Enviando..." : "Agregar"}
                    variant="aceptar"
                    disabled={enviandoId !== null}
                    onClick={() => agregar(medico)}
                  />
                )}
              </PersonaFila>
            ))}
          </div>
        )}

        <div className="agregar-medico-acciones">
          <Button text="Cerrar" type="button" variant="primary" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
}
