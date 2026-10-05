import { createContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";

interface Usuario {
    id: string;
    nombre: string;
}

interface UsuarioContextType {
    usuario: Usuario | null;
    token: string | null;
    cargando: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
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
        setUsuario(data);
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
