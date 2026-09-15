import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";

interface Registrarse1FormProps {
  
  formData: {
    name: string;
    surname: string;
    email: string;
    id: string;
    password: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Registrarse1Form({
  handleSubmit,
  formData,
  handleChange,
  
}: Registrarse1FormProps) {
  return (
    <div className="registro-form-wrapper">
      <div>
        <h1 className="registro-title">Creá tu cuenta.</h1>
        <p className="registro-subtitle">
          Paso 1 de 3. Después te pedimos tus datos de salud para personalizar
          las recomendaciones.
        </p>
      </div>
      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="registro-grid-2">
          <Input
            variant="small"
            placeholder="Sofia"
            label="Nombre"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            variant="small"
            placeholder="Gomez"
            label="Apellido"
            name="surname"
            required
            value={formData.surname}
            onChange={handleChange}
          />
        </div>
        <div className="registro-grid-2">
          <Input
            variant="small"
            placeholder="nombre@gmail.com"
            label="Correo electronico"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            variant="small"
            placeholder="12.345.678"
            label="DNI"
            name="id"
            required
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <Input
          variant="large"
          placeholder="Minimo 8 caracteres"
          label="Contraseña"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="big">
          Continuar →
        </Button>
      </form>
      <p className="registro-footer-link">
        ¿Ya tenes cuenta? <Link to="/inicio-sesion">INGRESAR</Link>
      </p>
    </div>
  );
}
