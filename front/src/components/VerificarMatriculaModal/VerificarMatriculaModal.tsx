import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "../AgregarTurnoModal/AgregarTurnoModal.css";

interface VerificarMatriculaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmar: () => void;
}

export default function VerificarMatriculaModal({
  isOpen,
  onClose,
  onConfirmar,
}: VerificarMatriculaModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-turno-titulo">Verificá tus datos</h1>

      {/* TODO: mostrar los datos del OCR (solo lectura por ahora) */}

      <div className="agregar-turno-acciones">
        <Button text="Confirmar datos" type="button" variant="primary" onClick={onConfirmar} />
      </div>
    </Modal>
  );
}
