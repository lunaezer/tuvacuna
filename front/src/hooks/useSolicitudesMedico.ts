import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config";
import { useUsuario } from "../context/UsuarioContext/useUsuario";
import { solicitudesMock } from "../mocks/solicitudesMock";
import type { SolicitudPaciente } from "../types";

// Poner en false para usar el back real
const USAR_MOCK = false;

export const useSolicitudesMedico = () => {
    const { token } = useUsuario();
    const [solicitudes, setSolicitudes] = useState<SolicitudPaciente[]>([]);

    const cargar = useCallback(async () => {
        if (USAR_MOCK) {
            setSolicitudes(solicitudesMock);
            return;
        }
        if (!token) {
            setSolicitudes([]);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/medico/solicitudes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // acá se adapta la forma de la respuesta si el back devuelve otra cosa
            if (response.ok) setSolicitudes(await response.json());
        } catch {
            // sin conexión: queda la lista como estaba
        }
    }, [token]);

    async function responder(id: number, accion: "aceptar" | "rechazar") {
        if (!USAR_MOCK) {
            let response: Response;
            try {
                response = await fetch(`${API_URL}/api/medico/solicitudes/${id}/${accion}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch {
                throw new Error("No se pudo conectar con el servidor");
            }

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message ?? data?.mensaje ?? "No se pudo responder la solicitud");
            }
        }

        // Ya la respondí: queda marcada un momento (para mostrar la confirmación) y después sale de la lista
        const respuesta: SolicitudPaciente["respuesta"] = accion === "aceptar" ? "aceptada" : "rechazada";
        setSolicitudes((actuales) =>
            actuales.map((solicitud) => (solicitud.id === id ? { ...solicitud, respuesta } : solicitud)),
        );
        setTimeout(() => {
            setSolicitudes((actuales) => actuales.filter((solicitud) => solicitud.id !== id));
        }, 2500);
    }

    useEffect(() => {
        cargar();
    }, [cargar]);

    return {
        solicitudes,
        aceptar: (id: number) => responder(id, "aceptar"),
        rechazar: (id: number) => responder(id, "rechazar"),
    };
};
