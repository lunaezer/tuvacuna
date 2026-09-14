import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Select from "../Select/Select";

interface MedicoFieldsProps {
  formData: RegistroData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function FormMedico({
  formData,
  handleChange,
}: MedicoFieldsProps) {
  return (
    <>
      <div className="registro-grid-2">
        <Input
          variant="small"
          label="Matricula profesional"
          name="matricula"
          required
          value={formData.matricula}
          onChange={handleChange}
          placeholder="12345"
        />
        <Select
          variant="small"
          label="Especialidad"
          name="especialidad"
          required
          value={formData.especialidad}
          onChange={handleChange}
          options={[
            { value: "clinica", label: "Clinica medica" },
            { value: "pediatria", label: "Pediatria" },
            { value: "vacunatorio", label: "Vacunatorio" },
          ]}
        />
        </div>
        <div>
        <Input 
          variant="large"
          label="Institucion donde atendes"
          name="institucion"
          required
          placeholder="Hospital Mater Day"
          onChange={handleChange}
          value={formData.institucion}
        />
      </div>
    </>
  );
}
