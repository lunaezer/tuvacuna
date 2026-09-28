import Input from "../Input/Input";
import Button from "../Button/Button";
import React from "react";
import { useState } from "react";


interface AgregarTurnoModalProps{
    handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AgregarTurnoModal({handleChange, handleSubmit}:AgregarTurnoModalProps ){
    
   
    
    return(
    <div>
        <h1>Agendar turno</h1>
        <form action="" onSubmit={handleSubmit}>
        <Input variant="large" placeholder="Ej: Antitetanica" name="vacuna" required label="¿Que vacuna?" onChange={handleChange}></Input>
        <Input variant="small" placeholder="14/08/26" name="fecha" required label="Fecha" onChange={handleChange} ></Input>
        <Input variant="small" placeholder="15:30" name="hora" required label="Hora" onChange={handleChange} ></Input>
        <Input variant="large" placeholder="Ej: Stambouliam" name="lugar" required label="Lugar" onChange={handleChange} ></Input>

        <Button text="cancelar" variant="primary"/>
        <Button variant="celeste" text="Confirmar turno" type="submit" ></Button>
        </form>
    </div>
    )
}