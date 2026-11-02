import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import type { Centro } from "../../types";

interface CentrosContextType {
    centros: Centro[];
    cargando: boolean;
    error: string;
    seleccionado: Centro | null;   // el centro elegido (null si no hay ninguno)
    setSeleccionado: (centro: Centro | null) => void;
    cargarCentros: () => Promise<void>;
}

export const CentrosContext = createContext<CentrosContextType | undefined>(undefined);

export const CentrosProvider = ({ children }: { children: ReactNode }) => {
    const [centros, setCentros] = useState<Centro[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    // guardo solo el id: así el seleccionado siempre es un centro de la lista actual
    const [seleccionadoId, setSeleccionadoId] = useState<number | null>(null);

    const cargarCentros = useCallback(async () => {
        setCargando(true);
        setError("");
        try {
            // TODO: confirmar con el back el nombre de la ruta y los campos que manda
            const response = await fetch(`${API_URL}/api/centros`);
            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setError(data?.mensaje ?? "No se pudieron cargar los centros");
                return;
            }
            const data: Centro[] = await response.json();
            setCentros(data);
        } catch {
            setError("No se pudo conectar con el servidor");
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarCentros();
    }, [cargarCentros]);

    const seleccionado = useMemo(
        () => centros.find((c) => c.id === seleccionadoId) ?? null,
        [centros, seleccionadoId],
    );

    const setSeleccionado = useCallback((centro: Centro | null) => {
        setSeleccionadoId(centro?.id ?? null);
    }, []);

    return (
        <CentrosContext.Provider
            value={{ centros, cargando, error, seleccionado, setSeleccionado, cargarCentros }}
        >
            {children}
        </CentrosContext.Provider>
    );
};
