import Button from "../Button/Button";
import "./PerfilToggle.css";

export type Perfil = "paciente" | "medico";

interface PerfilToggleProps {
  value: Perfil | "";
  onChange: (perfil: Perfil) => void;
}

export default function PerfilToggle({ value, onChange }: PerfilToggleProps) {
  return (
    <>
      <p className="perfil-label">¿Que perfil vas a usar?</p>
      <div className="perfil-toggle">
        <Button
          type="button"
          variant="perfil"
          className={`perfil-btn ${value === "paciente" ? "is-active" : ""}`}
          onClick={() => onChange("paciente")}
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
          className={`perfil-btn ${value === "medico" ? "is-active" : ""}`}
          onClick={() => onChange("medico")}
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
    </>
  );
}
