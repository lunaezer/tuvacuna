import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { normalizar } from "../../utils/texto";
import type { Centro, FiltroCentros } from "../../types";

interface CentrosContextType {
    centros: Centro[];             // ya filtrados por la búsqueda y el filtro
    busqueda: string;
    setBusqueda: (texto: string) => void;
    filtro: FiltroCentros;
    setFiltro: (filtro: FiltroCentros) => void;
    cargando: boolean;
    error: string;
    seleccionado: Centro | null;   // el centro elegido (null si no hay ninguno)
    setSeleccionado: (centro: Centro | null) => void;
    cargarCentros: () => Promise<void>;
}

export const CentrosContext = createContext<CentrosContextType | undefined>(undefined);

export const CentrosProvider = ({ children }: { children: ReactNode }) => {
    const [centros, setCentros] = useState<Centro[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtro, setFiltro] = useState<FiltroCentros>("todos");
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

    const centrosFiltrados = useMemo(() => {
        const texto = normalizar(busqueda);
        return centros.filter((c) => {
            const coincideTexto =
                normalizar(c.nombre).includes(texto) || normalizar(c.direccion).includes(texto);
            const coincideFiltro =
                filtro === "todos" ||
                (filtro === "publicos" && c.tipo === "publico") ||
                (filtro === "privados" && c.tipo === "privado");
            return coincideTexto && coincideFiltro;
        });
    }, [centros, busqueda, filtro]);

    const seleccionado = useMemo(
        () => centrosFiltrados.find((c) => c.id === seleccionadoId) ?? null,
        [centrosFiltrados, seleccionadoId],
    );

    const setSeleccionado = useCallback((centro: Centro | null) => {
        setSeleccionadoId(centro?.id ?? null);
    }, []);

    return (
        <CentrosContext.Provider
            value={{
                centros: centrosFiltrados,
                busqueda, setBusqueda, filtro, setFiltro,
                cargando, error, seleccionado, setSeleccionado, cargarCentros,
            }}
        >
            {children}
        </CentrosContext.Provider>
    );
};
