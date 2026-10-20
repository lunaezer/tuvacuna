import type { FormEvent } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import VacunasSelector from "../VacunasSelector/VacunasSelector";
import "../AgregarTurnoModal/AgregarTurnoModal.css";

export interface FormVacuna {
  idVacuna: string;
  lote: string;
  fecha: string;
  marca: string;
  lugar: string;
}

interface AgregarVacunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormVacuna;
  setForm: (form: FormVacuna) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error?: string;
}

export default function AgregarVacunaModal({ isOpen, onClose, form, setForm, handleSubmit, error }: AgregarVacunaModalProps) {
  const handleChange = (e: { target: { name: string; value: string } }) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-turno-titulo">Agregar vacuna</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="agregar-turno-fila">
          <VacunasSelector value={form.idVacuna} onChange={handleChange} />
          <Input variant="small" name="lote" label="Lote" placeholder="1ra dosis" value={form.lote} onChange={handleChange} required />
        </div>

        <div className="agregar-turno-fila">
          <Input variant="small" name="fecha" label="Fecha" placeholder="14/08/2026" type="date" value={form.fecha} onChange={handleChange} required />
          <Input variant="small" name="marca" label="Marca" placeholder="Ej: Pzifer" value={form.marca} onChange={handleChange} required />
        </div>

        <Input variant="large" name="lugar" label="Lugar" placeholder="Ej: Stamboulian" value={form.lugar} onChange={handleChange} required />

        {error && <p className="modal-error">{error}</p>}

        <div className="agregar-turno-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button text="Confirmar Vacuna" type="submit" variant="celeste" />
        </div>
      </form>
    </Modal>
  );
}
