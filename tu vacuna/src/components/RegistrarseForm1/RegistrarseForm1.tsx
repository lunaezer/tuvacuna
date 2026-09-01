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
    <article>
      <div>
        <h1>Crea tu cuenta</h1>
        <h2>
          Paso 1 de 3. Después te pedimos tus datos de salud para personalizar
          las recomendaciones.
        </h2>
      </div>
      <form action="" onSubmit={handleSubmit}>
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
        <Button>Siguiente</Button>
      </form>
    </article>
  );
}
