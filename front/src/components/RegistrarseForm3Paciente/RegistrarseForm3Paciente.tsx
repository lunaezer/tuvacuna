import type React from "react";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

interface RegistrarseForm3PacienteProps {
  carnetPhoto: File | null;
  setCarnetPhoto: (file: File | null) => void;
  onAbrirModal: () => void;
  dosisCargadas: number;
}

export default function RegistrarseForm3Paciente({
  carnetPhoto,
  setCarnetPhoto,
  onAbrirModal,
  dosisCargadas,
}: RegistrarseForm3PacienteProps) {
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarnetPhoto(e.target.files?.[0] ?? null);
  };

  return (
    <div className="registro-form-wrapper">
      <h1 className="registro-title">Traé tu carnet.</h1>
      <p className="registro-subtitle">
        Paso 3 de 3. Sacale una foto a tu libreta y la leemos nosotros, o
        cargá las dosis a mano. Tambien podes hacerlo desde la página más adelante. 
      </p>

      <div className="registro-form">
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

        {carnetPhoto && (
          <p className="registro-file-name">{carnetPhoto.name}</p>
        )}

        <Button
          type="button"
          className="registro-manual-btn"
          onClick={onAbrirModal}
        >
          + Cargar las vacunas a mano
        </Button>

        {dosisCargadas > 0 && (
          <p className="registro-file-name">
            {dosisCargadas} {dosisCargadas === 1 ? "vacuna cargada" : "vacunas cargadas"}
          </p>
        )}

        <Button type="button" variant="big" onClick={() => navigate("/inicio", { state: { cuentaCreada: true } })}>
          Ingresar →
        </Button>
      </div>

        <Link to="/inicio" state={{ cuentaCreada: true }}>
      <button type="button" className="registro-skip-link" > 
        Prefiero completarlo después
      </button>
      </Link>
    </div>
  );
}
