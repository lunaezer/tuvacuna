import { createContext, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import type { MensajeChat } from "../../types";

interface AsistenteContextType {
    mensajes: MensajeChat[];
    enviando: boolean;
    error: string;
    enviar: (pregunta: string) => Promise<void>;
    nuevaConversacion: () => void;
    abierto: boolean;              // el panel flotante está a la vista
    abrirAsistente: () => void;
    cerrarAsistente: () => void;
}

export const AsistenteContext = createContext<AsistenteContextType | undefined>(undefined);

export const AsistenteProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useUsuario();
    const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");
    const [abierto, setAbierto] = useState(false);

    // Si cambia la sesión (otro usuario o cierre de sesión) la charla no se queda
    useEffect(() => {
        setMensajes([]);
        setError("");
        setAbierto(false);
    }, [token]);

    async function enviar(pregunta: string) {
        const contenido = pregunta.trim();
        if (!contenido || enviando) return;

        // el back no guarda la charla: se manda entera y el último mensaje es la pregunta nueva
        const conversacion: MensajeChat[] = [...mensajes, { role: "user", content: contenido }];
        setMensajes(conversacion);
        setError("");
        setEnviando(true);

        try {
            const response = await fetch(`${API_URL}/api/asistente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mensajes: conversacion }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setError(data?.mensaje ?? "El asistente no pudo responder. Probá de nuevo.");
                return;
            }

            const data: { respuesta: string } = await response.json();
            setMensajes([...conversacion, { role: "assistant", content: data.respuesta }]);
        } catch {
            setError("No se pudo conectar con el servidor");
        } finally {
            setEnviando(false);
        }
    }

    function nuevaConversacion() {
        setMensajes([]);
        setError("");
    }

    return (
        <AsistenteContext.Provider
            value={{
                mensajes, enviando, error, enviar, nuevaConversacion,
                abierto,
                abrirAsistente: () => setAbierto(true),
                cerrarAsistente: () => setAbierto(false),
            }}
        >
            {children}
        </AsistenteContext.Provider>
    );
};
