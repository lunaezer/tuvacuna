import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Button from "../Button/Button";
import FormPaciente from "../FormPaciente/FormPaciente";
import FormMedico from "../FormMedico/FormMedico";
import PerfilToggle from "../PerfilToggle/PerfilToggle";

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
    <div className="registro-form-wrapper">
        <h1 className="registro-title">Tu perfil de salud.</h1>
        <p className="registro-subtitle">
          Paso 2 de 3. Después te pedimos tu carnet asi que anda preparandolo.
        </p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <PerfilToggle value={formData.profile} onChange={selectProfile} />

        {formData.profile === "paciente" && (
          <FormPaciente formData={formData} handleChange={handleChange} />
        )}

        {formData.profile === "medico" && (
          <FormMedico formData={formData} handleChange={handleChange} />
        )}

        <Button type="submit" variant="big">
          Continuar →
        </Button>

      </form>
    </div>
  );
}
