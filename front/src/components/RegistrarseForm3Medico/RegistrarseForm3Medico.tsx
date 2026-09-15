import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Button from "../Button/Button";

interface RegistrarseForm3MedicoProps {
  pacienteInput: string;
  handlePacienteInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPaciente: () => void;
  pacientes: string[];
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegistrarseForm3Medico ({pacienteInput,
  handlePacienteInputChange,
  handleAddPaciente,
  pacientes,
  handleSubmit,}:RegistrarseForm3MedicoProps) {

    return(
        <div className="registro-form-wrapper">
            <h1 className="registro-title">Tus pacientes</h1>
            <p className="registro-subtitle">Paso 3 de 3. Cada invitación le llega a la persona, que decide si te da acceso a su carnet.</p>
           <form className="registro-form" onSubmit={handleSubmit}>
            <Input
            label="Correo electronico"
            placeholder="Paciente@gmail.com"
            variant="large"
            onChange={handlePacienteInputChange}
            name="pacienteInput"
            value={pacienteInput}
            />
            <Button variant="medium" type="button" onClick={handleAddPaciente}>Invitar</Button>

            {pacientes.length > 0 && (
              <ul className="registro-pacientes-list">
                {pacientes.map((email, i) => (
                  <li key={i} className="registro-pacientes-chip">{email}</li>
                ))}
              </ul>
            )}

            <Button variant="big">Continuar →</Button>
            <p className="registro-skip-link" onClick={handleSubmit}>Prefiero completarlo despues</p>
            </form>
        </div>
    );
}