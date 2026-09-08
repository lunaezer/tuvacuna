import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Button from "../Button/Button";

interface RegistrarseForm3MedicoProps{
formData: RegistroData;
handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;


}

export default function RegistrarseForm3Medico ({handleChange, formData}:RegistrarseForm3MedicoProps) {

    return(
        <div>
            <h1>Tus pacientes</h1>
            <h2>Paso 2 de 3. Después te pedimos tu carnet asi que anda preparandolo.</h2>
            <Input 
            required
            label="Matricula"
            placeholder="MN 123.456"
            variant="small"
            onChange={handleChange}
            name="matricula"
            value={formData.matricula}
            />

            <Input 
            required
            label="Especialidad"
            placeholder="Pediatría"
            variant="small"
            onChange={handleChange}
            name="especialidad"
            value={formData.especialidad}
            />

            <Input 
            required
            label="Institucion donde atendes"
            placeholder="Hospital Mater day"
            variant="large"
            onChange={handleChange}
            name="institucion"
            value={formData.institucion}
            />

            <Button variant="big">Continuar</Button>
        </div>
    );
}