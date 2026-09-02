import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Button from "../Button/Button";
import FormPaciente from "../FormPaciente/FormPaciente";
import FormMedico from "../FormMedico/FormMedico";

interface RegistrarseForm2Props {
  formData: RegistroData;
  setFormData: React.Dispatch<React.SetStateAction<RegistroData>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegistrarseForm2({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
}:RegistrarseForm2Props) {
  const selectProfile = (profile: "paciente" | "medico") => {
    setFormData((prev) => ({ ...prev, profile }));
    
  };

  return (
    <article>
        <h1>Tu perfil de salud</h1>
        <h2>
          Paso 2 de 3. Después te pedimos tu carnet asi que anda preparandolo.
        </h2>

      <form action="" onSubmit={handleSubmit} >
        <Button type="button" onClick={() => selectProfile("paciente")}> Paciente </Button>
        <Button type="button" onClick={() => selectProfile("medico")} >Medico</Button>
        
        {formData.profile === "paciente" && (
          <FormPaciente formData={formData} handleChange={handleChange} />
        )}

        {formData.profile === "medico" && (
          <FormMedico formData={formData} handleChange={handleChange} />
        )}

        <Button>Continuar</Button>

      </form>
    </article>
  );
}
