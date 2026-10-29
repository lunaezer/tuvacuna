import { createContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";

export interface Comorbilidad {
    id: number;
    nombre: string;
}

export interface Usuario {
    id: string;
    nombre: string;
    rol?: "paciente" | "medico";
    apellido?: string;
    dni?: string;
    mail?: string;
    // solo pacientes
    fechaNacimiento?: string;
    obraSocial?: string;
    sexo?: string;
    // undefined = no se pudo cargar; [] = el paciente no tiene ninguna
    comorbilidades?: Comorbilidad[];
    // solo médicos
    matricula?: string;
    especialidad?: string;
    institucion?: string;
}

interface UsuarioContextType {
    usuario: Usuario | null;
    token: string | null;
    cargando: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

async function pedirComorbilidades(token: string): Promise<Comorbilidad[] | undefined> {
    try {
        const response = await fetch(`${API_URL}/api/perfil/comorbilidades`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return undefined;

        const lista: { id_comorbilidad: number; nombre: string }[] = await response.json();
        return lista.map((c) => ({ id: c.id_comorbilidad, nombre: c.nombre }));
    } catch {
        return undefined; // sin conexión o error: queda como "no cargadas"
    }
}

export const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));
    const [cargando, setCargando] = useState(true);

    async function obtenerUsuario(token: string) {
        const response = await fetch(`${API_URL}/api/usuario/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            alert("Hubo un problema en el inicio de sesión")
            logout();
            return;
        }

        const data = await response.json();
        // el back devuelve snake_case; el front usa camelCase
        const { obra_social, fecha_de_nacimiento, ...resto } = data;
        const comorbilidades = data.rol === "paciente" ? await pedirComorbilidades(token) : undefined;

        setUsuario({
            ...resto,
            obraSocial: obra_social,
            fechaNacimiento: fecha_de_nacimiento,
            comorbilidades: comorbilidades,
        });
    }

    async function login(nuevoToken: string) {
        sessionStorage.setItem("token", nuevoToken);
        setToken(nuevoToken);
        await obtenerUsuario(nuevoToken);
    }

    function logout() {
        sessionStorage.removeItem("token");
        setToken(null);
        setUsuario(null);
    }

    useEffect(() => {
        if (token) {
            obtenerUsuario(token).finally(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    return (
        <UsuarioContext.Provider value={{ usuario, token, cargando, login, logout }}>
            {children}
        </UsuarioContext.Provider>
    );
};
