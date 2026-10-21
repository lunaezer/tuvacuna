import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import { carnetsMock } from "../../mocks/carnetMock";
import type { Dosis, SeccionHistorial } from "../../types";

// Poner en false para usar el back real
const USAR_MOCK = true;

interface ConteoDosis {
    aplicadas: number;
    recomendadas: number;
    atrasadas: number;
}

interface DosisContextType {
    conteo: ConteoDosis;
    paraAgendar: Dosis[];
    cargandoDosis: boolean;
    cargarDosis: () => Promise<void>;
}

export const DosisContext = createContext<DosisContextType | undefined>(undefined);

export const DosisProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useUsuario();
    const [secciones, setSecciones] = useState<SeccionHistorial[]>([]);
    const [cargandoDosis, setCargandoDosis] = useState(true);

    const cargarDosis = useCallback(async () => {
        if (USAR_MOCK) {
            setSecciones(carnetsMock["yo"] ?? []);
            setCargandoDosis(false);
            return;
        }
        if (!token) {
            setSecciones([]);
            setCargandoDosis(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/carnet`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) setSecciones(await response.json());
        } catch {
            // sin conexión: queda la lista como estaba
        } finally {
            setCargandoDosis(false);
        }
    }, [token]);

    // Todas las dosis del carnet en una sola lista
    const dosis = secciones.flatMap((seccion) => seccion.dosis);

    const conteo: ConteoDosis = {
        aplicadas: dosis.filter((d) => d.estado === "aplicada").length,
        recomendadas: dosis.filter((d) => d.estado === "recomendada").length,
        atrasadas: dosis.filter((d) => d.estado === "atrasada").length,
    };

    const paraAgendar = dosis.filter((d) => d.estado !== "aplicada");

    useEffect(() => {
        cargarDosis();
    }, [cargarDosis]);

    return (
        <DosisContext.Provider value={{ conteo, paraAgendar, cargandoDosis, cargarDosis }}>
            {children}
        </DosisContext.Provider>
    );
};
