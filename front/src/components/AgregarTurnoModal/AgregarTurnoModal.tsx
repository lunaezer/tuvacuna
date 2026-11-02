import Input from "../Input/Input";
import Button from "../Button/Button";
import React from "react";
import Modal from "../Modal/Modal";
import VacunasSelector from "../VacunasSelector/VacunasSelector";
import type { formDataTurno } from "../../types";
import "./AgregarTurnoModal.css";

interface AgregarTurnoModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: formDataTurno;
  error: string;
  editando: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  // el selector manda un objeto { target: { name, value } }, no un ChangeEvent
  handleChange: (e: { target: { name: string; value: string } }) => void;
}

export default function AgregarTurnoModal({ isOpen, onClose, formData, error, editando, handleChange, handleSubmit }: AgregarTurnoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-turno-titulo">{editando ? "Editar turno" : "Agendar turno"}</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <VacunasSelector value={formData.idVacuna} onChange={handleChange} />

        <div className="agregar-turno-fila">
          <Input variant="small" placeholder="14/08/2026" name="fecha" required label="Fecha" value={formData.fecha} onChange={handleChange} type="date" />
          <Input variant="small" placeholder="09:00 Hs" name="hora" label="Hora" value={formData.hora ?? ""} onChange={handleChange} type="time" />
        </div>

        <Input variant="large" placeholder="Ej: Stamboulian" name="lugar" label="¿Qué hospital?" value={formData.lugar} onChange={handleChange} />

        {error && <p className="modal-error">{error}</p>}

        <div className="agregar-turno-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button variant="celeste" text={editando ? "Guardar cambios" : "Confirmar turno"} type="submit" />
        </div>
      </form>
    </Modal>
  );
}
