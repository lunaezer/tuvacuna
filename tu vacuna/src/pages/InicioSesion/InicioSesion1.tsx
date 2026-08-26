import { useState } from "react";
import Input from "../../components/Input/Input";

export default function InicioSesion1() {
    const [form, setForm] = useState=({email: "", password: ""});
    function handleChange(event) // TENGO QUE SEGUIR DESDE ACA LA FUNCION LA EXPLIQEU DESDE CLAUDE

    return (
        <article>
            <h1>Hola de nuevo</h1>
            <h2>Ingresa para ver tu carnet y tu grupo familiar</h2>

            <form action="">
                <Input
                    type="email"
                    placeholder="nombre@correo.com"
                    variant="large"
                    label="Correo electronico"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                type="password"
                placeholder="***********"
                variant="large"
                label="Contraseña"
                name="password"
                value={password}
                onChange={}
                required
                
                />
            </form>
        </article>
    )
}