import Button from "../Button/Button";
import UploadFoto from "../UploadFoto/UploadFoto";

interface RegistrarseForm3MedicoProps {
  matriculaPhoto: File | null;
  setMatriculaPhoto: (file: File | null) => void;
  onIngresar: () => void;
}

export default function RegistrarseForm3Medico({
  matriculaPhoto,
  setMatriculaPhoto,
  onIngresar,
}: RegistrarseForm3MedicoProps) {
  return (
    <div className="registro-form-wrapper is-upload">
      <h1 className="registro-title">Traé tu matrícula.</h1>
      <p className="registro-subtitle">
        Paso 3 de 3. Subí una foto a tu matrícula y la leemos nosotros para
        comprobar si sos médico.
      </p>

      <div className="registro-form">
        <UploadFoto
          variante="matricula"
          archivo={matriculaPhoto}
          onChange={setMatriculaPhoto}
        />

        <Button
          variant="big"
          type="button"
          disabled={!matriculaPhoto}
          onClick={onIngresar}
        >
          Ingresar →
        </Button>
      </div>
    </div>
  );
}
