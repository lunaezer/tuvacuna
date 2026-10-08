import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import AgregarFamiliarModal from "../../components/AgregarFamiliarModal/AgregarFamiliarModal";
import { invitacionesMock } from "../../mocks/carnetMock";
import type { Familiar, Invitacion } from "../../types";

// Poner en false para usar el back real
const USAR_MOCK = true;

interface FamiliaContextType {
    familiares: Familiar[];
    invitaciones: Invitacion[];
    aceptarInvitacion: (id: string) => Promise<void>;
    rechazarInvitacion: (id: string) => Promise<void>;
    cargandoFamiliares: boolean;
    cargarFamiliares: () => Promise<void>;
    enviarSolicitud: (email: string) => Promise<void>;
    abrirModalAgregar: () => void;
}

export const FamiliaContext = createContext<FamiliaContextType | undefined>(undefined);

export const FamiliaProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useUsuario();
    const [familiares, setFamiliares] = useState<Familiar[]>([]);
    const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);
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

    const cargarInvitaciones = useCallback(async () => {
        if (USAR_MOCK) {
            setInvitaciones(invitacionesMock);
            return;
        }
        if (!token) {
            setInvitaciones([]);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/familia/solicitudes/recibidas`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) setInvitaciones(await response.json());
        } catch {
            // sin conexión: queda la lista como estaba
        }
    }, [token]);

    async function responderInvitacion(id: string, accion: "aceptar" | "rechazar") {
        if (!USAR_MOCK) {
            let response: Response;
            try {
                response = await fetch(`${API_URL}/api/familia/solicitudes/${id}/${accion}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch {
                throw new Error("No se pudo conectar con el servidor");
            }

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message ?? data?.mensaje ?? "No se pudo responder la invitación");
            }
        }

        // Ya la respondí: sale de la lista de pendientes
        setInvitaciones((actuales) => actuales.filter((invitacion) => invitacion.id !== id));
    }

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

    useEffect(() => {
        cargarInvitaciones();
    }, [cargarInvitaciones]);

    return (
        <FamiliaContext.Provider
            value={{
                familiares,
                invitaciones,
                aceptarInvitacion: (id) => responderInvitacion(id, "aceptar"),
                rechazarInvitacion: (id) => responderInvitacion(id, "rechazar"),
                cargandoFamiliares,
                cargarFamiliares,
                enviarSolicitud,
                abrirModalAgregar: () => setModalAbierto(true),
            }}
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
