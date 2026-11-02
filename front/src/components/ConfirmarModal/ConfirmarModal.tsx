import type { ReactNode } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "./ConfirmarModal.css";

interface ConfirmarModalProps {
  isOpen: boolean;
  titulo: string;
  mensaje: ReactNode;      // qué se va a hacer y a quién (se puede usar <strong>)
  textoConfirmar: string;  // texto del botón que confirma
  onClose: () => void;
  onConfirmar: () => void;
}

export default function ConfirmarModal({ isOpen, titulo, mensaje, textoConfirmar, onClose, onConfirmar }: ConfirmarModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="confirmar-titulo">{titulo}</h1>
      <p className="confirmar-texto">{mensaje}</p>
      <div className="confirmar-acciones">
        <Button text="Volver" type="button" variant="primary" onClick={onClose} />
        <Button text={textoConfirmar} type="button" variant="celeste" onClick={onConfirmar} />
      </div>
    </Modal>
  );
}
