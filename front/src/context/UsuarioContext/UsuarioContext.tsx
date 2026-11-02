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
    idObraSocial?: number | null;
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
    guardarComorbilidades: (ids: number[]) => Promise<void>;   // tira un Error si falla
}

function aComorbilidades(lista: { id_comorbilidad: number; nombre: string }[]): Comorbilidad[] {
    return lista.map((c) => ({ id: c.id_comorbilidad, nombre: c.nombre }));
}

async function pedirComorbilidades(token: string): Promise<Comorbilidad[] | undefined> {
    try {
        const response = await fetch(`${API_URL}/api/perfil/comorbilidades`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return undefined;

        return aComorbilidades(await response.json());
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
        const { obra_social, id_obra_social, fecha_de_nacimiento, ...resto } = data;
        const comorbilidades = data.rol === "paciente" ? await pedirComorbilidades(token) : undefined;

        setUsuario({
            ...resto,
            obraSocial: obra_social,
            idObraSocial: id_obra_social,
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

    // Reemplaza toda la lista (el back pide el estado completo). Tira un Error si falla
    async function guardarComorbilidades(ids: number[]) {
        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/perfil/comorbilidades`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comorbilidades: ids }),
            });
        } catch {
            throw new Error("No se pudo conectar con el servidor");
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudieron guardar las comorbilidades");
        }
        // el back devuelve la lista ya actualizada
        const lista = await response.json();
        setUsuario((actual) => actual && { ...actual, comorbilidades: aComorbilidades(lista) });
    }

    useEffect(() => {
        if (token) {
            obtenerUsuario(token).finally(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    return (
        <UsuarioContext.Provider value={{ usuario, token, cargando, login, logout, guardarComorbilidades }}>
            {children}
        </UsuarioContext.Provider>
    );
};
