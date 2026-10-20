import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "../AgregarTurnoModal/AgregarTurnoModal.css";
import "./VacunaAgregadaModal.css";

interface VacunaAgregadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgregarOtra: () => void;
  onContinuar: () => void;
}

export default function VacunaAgregadaModal({
  isOpen,
  onClose,
  onAgregarOtra,
  onContinuar,
}: VacunaAgregadaModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="vacuna-agregada">
        <span className="vacuna-agregada-icono">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h1 className="agregar-turno-titulo">Vacuna agregada con éxito</h1>
      </div>

      <div className="agregar-turno-acciones">
        <Button text="Agregar otra vacuna" type="button" variant="primary" onClick={onAgregarOtra} />
        <Button text="Ingresar" type="button" variant="celeste" onClick={onContinuar} />
      </div>
    </Modal>
  );
}
