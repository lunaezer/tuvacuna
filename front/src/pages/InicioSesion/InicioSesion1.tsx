import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./InicioSesion1.css";
import { useUsuario } from "../../context/UsuarioContext/useUsuario";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import PerfilToggle, { type Perfil } from "../../components/PerfilToggle/PerfilToggle";

const CALENDARIO_ITEMS = [
    { edad: "Recien nacido", vacunas: "BCG · Hepatitis B" },
    { edad: "2 Meses", vacunas: "Pentavalente · Salk · Neumococo" },
    { edad: "12 Meses", vacunas: "Triple viral · Hepatitis A" },
    { edad: "11 Años", vacunas: "VPH · dTpa · Meningococo" },
    { edad: "65 Años", vacunas: "Antigripal · Neumococo" },
];

export default function InicioSesion1() {
    const [form, setForm] = useState<{ email: string; password: string; rol: Perfil }>({
        email: "",
        password: "",
        rol: "paciente",
    });
    const [errores, setErrores] = useState<{
        email?: string;
        password?: string;
        credenciales?: boolean;
        general?: string;
    }>({});
    const { login } = useUsuario();
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrores({});

        const nuevos: typeof errores = {};
        if (!/^\S+@\S+\.\S+$/.test(form.email)) nuevos.email = "Correo electronico no valido";
        if (!form.password) nuevos.password = "Contraseña no valida";
        if (nuevos.email || nuevos.password) {
            setErrores(nuevos);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mail: form.email,
                    password: form.password,
                    rol: form.rol,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setErrores({ credenciales: true });
                } else {
                    setErrores({ general: data.mensaje || data.message || "Ocurrió un error, probá de nuevo" });
                }
                return;
            }

            console.log("Login correcto", data);
            await login(data.token);
            navigate("/panel");
// acá después: redirigir al panel, ej. navigate("/panel")
            
        } catch (err) {
            setErrores({ general: "No se pudo conectar con el servidor" });
        }
    }

    return (
        <div className="login-page">
            <div className="login-panel-left">
                <Link to="/" className="login-back-link">
                    <span className="login-back-icon">‹</span> Volver
                </Link>

                <div className="login-form-wrapper">
                    <h1 className="login-title">¡Hola de nuevo!</h1>
                    <p className="login-subtitle">
                        Ingresá para ver tu carnet y el de tu grupo familiar.
                    </p>

                    <form className="login-form" onSubmit={handleSubmit} noValidate>
                        <Input
                            type="email"
                            placeholder="nombre@correo.com"
                            variant="large"
                            label="Correo electrónico"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            error={errores.email || errores.credenciales}
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
                            error={errores.password || (errores.credenciales ? "Mail o contraseña incorrectos" : undefined)}
                        />

                        <PerfilToggle
                            value={form.rol}
                            onChange={(rol) => setForm((prev) => ({ ...prev, rol }))}
                        />

                        {errores.general && <p className="login-error">{errores.general}</p>}

                        <Button variant="big">Ingresar →</Button>

                        <p className="login-register">
                            ¿No tenés cuenta? <Link to="/registrarse1">REGISTRATE</Link>
                        </p>
                    </form>
                </div>
            </div>

            <div className="login-panel-right">
                <span className="login-badge">
                    <span className="login-badge-dot" />
                    Calendario nacional
                </span>
                <h2 className="login-panel-title">
                    Gratuito y obligatorio, desde el primer día de vida hasta el ultimo.
                </h2>
                <p className="login-panel-text">
                    A partir de ahí TuVacuna calcula sola qué dosis te corresponden y
                    cuándo, según el Calendario Nacional.
                </p>

                <div className="login-calendario-card">
                    {CALENDARIO_ITEMS.map((item) => (
                        <div key={item.edad} className="login-calendario-row">
                            <span className="login-calendario-edad">{item.edad}</span>
                            <span className="login-calendario-vacunas">{item.vacunas}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
