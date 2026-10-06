import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import AgregarFamiliarModal from "../../components/AgregarFamiliarModal/AgregarFamiliarModal";
import type { Familiar } from "../../types";

interface FamiliaContextType {
    familiares: Familiar[];
    cargandoFamiliares: boolean;
    cargarFamiliares: () => Promise<void>;
    enviarSolicitud: (email: string) => Promise<void>;
    abrirModalAgregar: () => void;
}

export const FamiliaContext = createContext<FamiliaContextType | undefined>(undefined);

export const FamiliaProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useUsuario();
    const [familiares, setFamiliares] = useState<Familiar[]>([]);
    const [cargandoFamiliares, setCargandoFamiliares] = useState(true);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarFamiliares = useCallback(async () => {
        if (!token) {
            setFamiliares([]);
            setCargandoFamiliares(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/familia`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) setFamiliares(await response.json());
        } catch {
            // sin conexión: queda la lista como estaba
        } finally {
            setCargandoFamiliares(false);
        }
    }, [token]);

    async function enviarSolicitud(email: string) {
        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/familia/solicitud`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
            });
        } catch {
            // fetch solo lanza si no hay conexión con el servidor
            throw new Error("No se pudo conectar con el servidor");
        }

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.message ?? data?.mensaje ?? "No se pudo enviar la solicitud");
        }
    }

    useEffect(() => {
        cargarFamiliares();
    }, [cargarFamiliares]);

    return (
        <FamiliaContext.Provider
            value={{ familiares, cargandoFamiliares, cargarFamiliares, enviarSolicitud, abrirModalAgregar: () => setModalAbierto(true) }}
        >
            {children}
            <AgregarFamiliarModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onEnviar={enviarSolicitud}
            />
        </FamiliaContext.Provider>
    );
};
