import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "./CancelarTurnoModal.css";

interface CancelarTurnoModalProps {
  isOpen: boolean;
  nombre: string; // vacuna del turno que se va a cancelar
  onClose: () => void;
  onConfirmar: () => void;
}

export default function CancelarTurnoModal({ isOpen, nombre, onClose, onConfirmar }: CancelarTurnoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="cancelar-turno-titulo">Cancelar turno</h1>
      <p className="cancelar-turno-texto">
        ¿Seguro que querés cancelar el turno de <strong>{nombre}</strong>? Esta acción no se puede deshacer.
      </p>
      <div className="cancelar-turno-acciones">
        <Button text="Volver" type="button" variant="primary" onClick={onClose} />
        <Button text="Cancelar turno" type="button" variant="celeste" onClick={onConfirmar} />
      </div>
    </Modal>
  );
}
