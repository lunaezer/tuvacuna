import Button from "../Button/Button";
import UploadFoto from "../UploadFoto/UploadFoto";
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

  return (
    <div className="registro-form-wrapper is-upload">
      <h1 className="registro-title">Traé tu carnet.</h1>
      <p className="registro-subtitle">
        Paso 3 de 3. Sacale una foto a tu libreta y la leemos nosotros, o
        cargá las dosis a mano. Tambien podes hacerlo desde la página más adelante. 
      </p>

      <div className="registro-form">
        <UploadFoto variante="carnet" archivo={carnetPhoto} onChange={setCarnetPhoto} />

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
