import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import UploadFoto from "../UploadFoto/UploadFoto";

interface RegistrarseForm3MedicoProps {
  matriculaPhoto: File | null;
  setMatriculaPhoto: (file: File | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegistrarseForm3Medico({
  matriculaPhoto,
  setMatriculaPhoto,
  handleSubmit,
}: RegistrarseForm3MedicoProps) {
  const navigate = useNavigate();

  return (
    <div className="registro-form-wrapper">
      <h1 className="registro-title">Traé tu matrícula.</h1>
      <p className="registro-subtitle">
        Paso 3 de 3. Subí una foto a tu matrícula y la leemos nosotros para
        comprobar si sos médico.
      </p>

      <form className="registro-form" onSubmit={handleSubmit}>
        <UploadFoto
          variante="matricula"
          archivo={matriculaPhoto}
          onChange={setMatriculaPhoto}
        />

        <Button variant="big">Ingresar →</Button>
        <p className="registro-skip-link" onClick={() => navigate("/inicio")}>
          Prefiero completarlo después
        </p>
      </form>
    </div>
  );
}
