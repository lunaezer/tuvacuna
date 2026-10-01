import Input from "../Input/Input";
import Button from "../Button/Button";
import React from "react";
import Modal from "../Modal/Modal";
import "./AgregarTurnoModal.css";

interface AgregarTurnoModalProps{
     isOpen: boolean
  onClose: () => void
    handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AgregarTurnoModal({isOpen, onClose, handleChange, handleSubmit}:AgregarTurnoModalProps ){
    return(
    <Modal isOpen={isOpen} onClose={onClose} >
        <h1 className="agregar-turno-titulo">Agendar turno</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
        <Input variant="large" placeholder="Ej: Antitetanica" name="vacuna" required label="¿Que vacuna?" onChange={handleChange}></Input>

        <div className="agregar-turno-fila">
          <Input variant="small" placeholder="14/08/2026" name="fecha" required label="Fecha" onChange={handleChange} />
          <Input variant="small" placeholder="09:00 Hs" name="hora" required label="Hora" onChange={handleChange} />
        </div>

        <Input variant="large" placeholder="Ej: Stamboulian" name="lugar" required label="¿Que hospital?" onChange={handleChange} ></Input>

        <div className="agregar-turno-acciones">
          <Button text="Cancelar" type="button" variant="primary" onClick={onClose}/>
          <Button variant="celeste" text="Confirmar turno" type="submit" ></Button>
        </div>
        </form>
    </Modal>
    )
}