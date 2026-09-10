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
    <div className="registro-form-wrapper">
        <h1 className="registro-title">Tu perfil de salud.</h1>
        <p className="registro-subtitle">
          Paso 2 de 3. Después te pedimos tu carnet asi que anda preparandolo.
        </p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <p className="registro-perfil-label">¿Que perfil vas a usar?</p>
        <div className="registro-perfil-toggle">
          <Button
            type="button"
            className={`registro-perfil-btn ${formData.profile === "paciente" ? "is-active" : ""}`}
            onClick={() => selectProfile("paciente")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
              </svg>
            }
          >
            Paciente
          </Button>
          <Button
            type="button"
            variant="perfil"
            className={`registro-perfil-btn ${formData.profile === "medico" ? "is-active" : ""}`}
            onClick={() => selectProfile("medico")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 3v6a4 4 0 0 0 8 0V3" />
                <path d="M10 15v1a4 4 0 0 0 8 0v-1a5 5 0 0 0-5-5" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            }
          >
            Medico
          </Button>
        </div>

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
