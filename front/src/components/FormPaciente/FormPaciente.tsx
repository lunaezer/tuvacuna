import React from "react";
import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Select from "../Select/Select";
import ComorbilidadesSelector from "../ComorbilidadesSelector/ComorbilidadesSelector";
import ObraSocialSelector from "../ObraSocialSelector/ObraSocialSelector";

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
          max={new Date().toISOString().split("T")[0]}
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
      <ObraSocialSelector
        seleccionada={formData.obraSocial}
        onChange={(id) => setFormData((prev) => ({ ...prev, obraSocial: id }))}
      />
      <ComorbilidadesSelector
        seleccionadas={formData.comorbilidades}
        onChange={(ids) => setFormData((prev) => ({ ...prev, comorbilidades: ids }))}
      />
    </>
  );
}
