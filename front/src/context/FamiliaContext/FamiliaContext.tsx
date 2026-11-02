import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import AgregarFamiliarModal from "../../components/AgregarFamiliarModal/AgregarFamiliarModal";
import type { AccesoFamiliar, Familiar, Invitacion, SolicitudEnviada } from "../../types";

interface DatosSolicitud {
    mail: string;
    nombre: string;
    apellido: string;
}

interface FamiliaContextType {
    familiares: Familiar[];
    invitaciones: Invitacion[];
    aceptarInvitacion: (id: number) => Promise<void>;
    rechazarInvitacion: (id: number) => Promise<void>;
    cargandoFamiliares: boolean;
    cargarFamiliares: () => Promise<void>;
    enviarSolicitud: (datos: DatosSolicitud) => Promise<void>;
    accesos: AccesoFamiliar[];            // quién puede ver mi carnet
    enviadas: SolicitudEnviada[];         // solicitudes que mandé y siguen pendientes
    quitarAcceso: (id: number) => Promise<void>;   // tira un Error si falla
    abrirModalAgregar: () => void;
}

export const FamiliaContext = createContext<FamiliaContextType | undefined>(undefined);

export const FamiliaProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useUsuario();
    const [familiares, setFamiliares] = useState<Familiar[]>([]);
    const [invitaciones, setInvitaciones] = useState<Invitacion[]>([]);
    const [accesos, setAccesos] = useState<AccesoFamiliar[]>([]);
    const [enviadas, setEnviadas] = useState<SolicitudEnviada[]>([]);
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

    const cargarAccesosYEnviadas = useCallback(async () => {
        if (!token) {
            setAccesos([]);
            setEnviadas([]);
            return;
        }
        const headers = { Authorization: `Bearer ${token}` };
        try {
            const [resAcceso, resEnviadas] = await Promise.all([
                fetch(`${API_URL}/api/familia/acceso`, { headers }),
                fetch(`${API_URL}/api/familia/solicitudes/enviadas`, { headers }),
            ]);
            if (resAcceso.ok) setAccesos(await resAcceso.json());
            if (resEnviadas.ok) setEnviadas(await resEnviadas.json());
        } catch {
            // sin conexión: quedan las listas como estaban
        }
    }, [token]);

    async function responderInvitacion(id: number, accion: "aceptar" | "rechazar") {
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
            throw new Error(data?.mensaje ?? "No se pudo responder la invitación");
        }

        // Ya la respondí: sale de la lista de pendientes
        setInvitaciones((actuales) => actuales.filter((invitacion) => invitacion.id !== id));
        if (accion === "aceptar") cargarFamiliares();   // ahora hay un familiar nuevo
    }

    async function enviarSolicitud(datos: DatosSolicitud) {
        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/familia/solicitudes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(datos),
            });
        } catch {
            // fetch solo lanza si no hay conexión con el servidor
            throw new Error("No se pudo conectar con el servidor");
        }

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudo enviar la solicitud");
        }

        cargarAccesosYEnviadas();   // la solicitud nueva aparece en "enviadas"
    }

    async function quitarAcceso(id: number) {
        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/familia/acceso/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch {
            throw new Error("No se pudo conectar con el servidor");
        }

        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudo quitar el acceso");
        }

        setAccesos((actuales) => actuales.filter((a) => a.id !== id));
    }

    useEffect(() => {
        cargarFamiliares();
    }, [cargarFamiliares]);

    useEffect(() => {
        cargarAccesosYEnviadas();
    }, [cargarAccesosYEnviadas]);

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
                accesos,
                enviadas,
                quitarAcceso,
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
