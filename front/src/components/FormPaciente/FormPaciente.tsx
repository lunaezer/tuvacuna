import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Select from "../Select/Select";
import ComorbilidadesSelector from "../ComorbilidadesSelector/ComorbilidadesSelector";

interface PacienteFieldsProps {
  formData: RegistroData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<RegistroData>>;
}

export default function FormPaciente({
  formData,
  handleChange,
  setFormData,
}: PacienteFieldsProps) {
  return (
    <>
      <div className="registro-grid-2">
        <Input
          variant="small"
          label="Fecha de nacimiento"
          name="birthDate"
          type="date"
          required
          value={formData.birthDate}
          onChange={handleChange}
          placeholder="18/07/1982"
        />
        <Select
          variant="small"
          label="Sexo"
          name="sex"
          required
          value={formData.sex}
          onChange={handleChange}
          options={[
            { value: "femenino", label: "Femenino" },
            { value: "masculino", label: "Masculino" },
          ]}
        />
      </div>
      <Select
      variant="large"
      label="Obra social o prepaga"
      name="obraSocial"
      value={formData.obraSocial}
      onChange={handleChange}
      options={[
        {value: "Swis medical", label: "swis medical"},
        {value: "escribanos", label: "escribanos"},
      ]}
      />
      <ComorbilidadesSelector
        seleccionadas={formData.comorbilidades}
        onChange={(ids) => setFormData((prev) => ({ ...prev, comorbilidades: ids }))}
      />
    </>
  );
}
