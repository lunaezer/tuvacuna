import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Select from "../Select/Select";

interface PacienteFieldsProps {
  formData: RegistroData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function FormPaciente({
  formData,
  handleChange,
}: PacienteFieldsProps) {
  return (
    <>
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
       <Select
      variant="large"
      label="Condiciones a tener en cuenta"
      name="condiciones"
      value={formData.condiciones}
      onChange={handleChange}
      options={[
        {value: "embarazo", label: "embarazo"},
        {value: "diabetes", label: "diabetes"},
      ]}
      />
    </>
  );
}
