import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./InicioSesion1.css";

export default function InicioSesion1() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch("https://tu-backend.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Usuario o contraseña incorrectos");
                return;
            }

            console.log("Login correcto", data);
            // acá después: guardar el token, redirigir al panel, etc.
        } catch (err) {
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
        <div className="login-page">
            <div className="login-panel-left">
                <Link to="/" className="login-back-link">
                    <span className="login-back-icon">‹</span> Volver
                </Link>

                <div className="login-form-wrapper">
                    <h1 className="login-title">Hola de nuevo.</h1>
                    <p className="login-subtitle">
                        Ingresá para ver tu carnet y el de tu grupo familiar.
                    </p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            placeholder="nombre@correo.com"
                            variant="large"
                            label="Correo electrónico"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="**********"
                            variant="large"
                            label="Contraseña"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        {error && <p className="login-error">{error}</p>}

                        <Button variant="big">Ingresar →</Button>

                        <p className="login-register">
                            ¿No tenés cuenta? <Link to="/registro">REGISTRATE</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="login-panel-right">
                <span className="login-badge">
                    <span className="login-badge-dot" />
                    Calendario nacional
                </span>
                <h2 className="login-panel-title">Título principal acá</h2>
                <p className="login-panel-text">Texto descriptivo para completar acá.</p>
            </div>
        </div>
    );
}
