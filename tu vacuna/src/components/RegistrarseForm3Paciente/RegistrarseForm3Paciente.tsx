import { useState } from "react";
import type React from "react";
import Button from "../Button/Button";
import type { RegistroData } from "../../types";

interface RegistrarseForm3PacienteProps {
  formData: RegistroData;
  setFormData: React.Dispatch<React.SetStateAction<RegistroData>>;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegistrarseForm3Paciente({
  formData,
  setFormData,
  handleSubmit,
}: RegistrarseForm3PacienteProps) {
  const [modoManual, setModoManual] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, carnetPhoto: e.target.files?.[0] ?? null }));
  };

  const puedeEnviar = formData.carnetPhoto !== null || modoManual;

  return (
    <div className="registro-form-wrapper">
      <h1 className="registro-title">Traé tu carnet.</h1>
      <p className="registro-subtitle">
        Paso 3 de 3. Sacale una foto a tu libreta y la leemos nosotros, o
        cargá las dosis a mano.
      </p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <label className="registro-upload-box">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="registro-upload-input"
          />
          <span className="registro-upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </span>
          <span>Subi una foto de tu carnet</span>
        </label>

        {formData.carnetPhoto && (
          <p className="registro-file-name">{formData.carnetPhoto.name}</p>
        )}

        <Button
          type="button"
          className="registro-manual-btn"
          onClick={() => setModoManual((prev) => !prev)}
        >
          + Cargar las vacunas a mano
        </Button>

        {modoManual && (
          <div className="registro-manual-placeholder">
            {/* TODO: campos para cargar las dosis a mano, todavía sin definir */}
          </div>
        )}

        <Button type="submit" variant="big" disabled={!puedeEnviar}>
          Ingresar →
        </Button>
      </form>

      <button type="button" className="registro-skip-link">
        Prefiero completarlo después
      </button>
    </div>
  );
}
