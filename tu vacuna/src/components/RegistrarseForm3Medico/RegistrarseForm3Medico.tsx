import Input from "../Input/Input";
import type { RegistroData } from "../../types";
import Button from "../Button/Button";

interface RegistrarseForm3MedicoProps{
formData: RegistroData;
handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;


}

export default function RegistrarseForm3Medico ({handleChange, formData, handleSubmit}:RegistrarseForm3MedicoProps) {

    return(
        <div>
            <h1>Tus pacientes</h1>
            <h2>Paso 3 de 3. Cada invitación le llega a la persona, que decide si te da acceso a su carnet.</h2>
           <form action="" onSubmit={handleSubmit}>
            <form action="">
            <Input 
            required
            label="Correo electronico"
            placeholder="Paciente@gmail.com"
            variant="small"
            onChange={handleChange}
            name="matricula"
            value={formData.pacientes}
            />
            <Button variant="medium" >Invitar</Button>
            </form>
            

            

            <Button variant="big">Continuar</Button>
            </form>
        </div>
    );
}