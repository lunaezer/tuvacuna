import type { ChangeEvent, FormEvent } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { useFamilia } from "../../hooks/useFamilia";
import "../AgregarTurnoModal/AgregarTurnoModal.css";

export interface FormVacuna {
  nombre: string;
  lote: string;
  fecha: string;
  marca: string;
  lugar: string;
  paraQuien: string; // id del familiar, o "yo"
}

interface AgregarVacunaModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormVacuna;
  setForm: (form: FormVacuna) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function AgregarVacunaModal({ isOpen, onClose, form, setForm, handleSubmit }: AgregarVacunaModalProps) {
  const { familiares } = useFamilia();

  const opciones = familiares.map((f) => ({
    value: f.esVos ? "yo" : f.id ?? "",
    label: f.esVos ? `${f.nombre} (vos)` : f.nombre,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="agregar-turno-titulo">Agregar vacuna</h1>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="agregar-turno-fila">
          <Input variant="small" name="nombre" label="Nombre" placeholder="Varisela" value={form.nombre} onChange={handleChange} required />
          <Input variant="small" name="lote" label="Lote" placeholder="1ra dosis" value={form.lote} onChange={handleChange} />
        </div>

        <div className="agregar-turno-fila">
          <Input variant="small" name="fecha" label="Fecha" placeholder="14/08/2026" type="date" value={form.fecha} onChange={handleChange} required />
          <Input variant="small" name="marca" label="Marca" placeholder="Ej: Pzifer" value={form.marca} onChange={handleChange} />
        </div>

        <Input variant="large" name="lugar" label="Lugar" placeholder="Ej: Stamboulian" value={form.lugar} onChange={handleChange} />

        <Select variant="large" name="paraQuien" label="¿Para quien?" value={form.paraQuien} options={opciones} onChange={handleChange} />

        <div className="agregar-turno-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
          <Button text="Confirmar Vacuna" type="submit" variant="celeste" />
        </div>
      </form>
    </Modal>
  );
}
