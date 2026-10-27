import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import { pacientesListaMock, pacientesDetalleMock } from "../../mocks/pacientesMock";
import type { PacienteDetalle, PacienteLista } from "../../types";

// Poner en false para usar el back real
const USAR_MOCK = true;

interface PacientesContextType {
    pacientes: PacienteLista[];
    cargandoLista: boolean;
    errorLista: string;
    seleccionadoId: number | null;
    detalle: PacienteDetalle | null;   // el detalle del seleccionado (null si todavía no llegó)
    cargandoDetalle: boolean;
    errorDetalle: string;
    seleccionar: (id: number) => Promise<void>;
    cargarLista: () => Promise<void>;
}

export const PacientesContext = createContext<PacientesContextType | undefined>(undefined);

export const PacientesProvider = ({ children }: { children: ReactNode }) => {
    const { token, usuario } = useUsuario();
    const esMedico = usuario?.rol === "medico";

    const [pacientes, setPacientes] = useState<PacienteLista[]>([]);
    const [cargandoLista, setCargandoLista] = useState(true);
    const [errorLista, setErrorLista] = useState("");
    const [seleccionadoId, setSeleccionadoId] = useState<number | null>(null);
    const [detalles, setDetalles] = useState<Record<number, PacienteDetalle>>({}); // cache por id
    const [errorDetalle, setErrorDetalle] = useState("");

    // Pide la lista de pacientes. Se expone para poder volver a pedirla (ej: al aceptar una solicitud)
    const cargarLista = useCallback(async () => {
        if (!esMedico) return; // solo los médicos tienen pacientes
        setCargandoLista(true);
        setErrorLista("");

        if (USAR_MOCK) {
            setPacientes(pacientesListaMock);
            setCargandoLista(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/medico/pacientes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setErrorLista(data?.mensaje ?? "No se pudieron cargar los pacientes");
                return;
            }
            setPacientes(await response.json());
        } catch {
            setErrorLista("No se pudo conectar con el servidor");
        } finally {
            setCargandoLista(false);
        }
    }, [esMedico, token]);

    // La lista solo se pide si quien está logueado es médico
    useEffect(() => {
        if (!esMedico) {
            setPacientes([]);
            setSeleccionadoId(null);
            setDetalles({});
            setErrorLista("");
            setErrorDetalle("");
            setCargandoLista(false);
            return;
        }
        cargarLista();
    }, [esMedico, cargarLista]);

    // Detalle del paciente: se pide al seleccionarlo y se guarda en el cache
    const seleccionar = useCallback(async (id: number) => {
        setSeleccionadoId(id);
        setErrorDetalle("");
        if (detalles[id]) return; // ya lo tengo, no repito el pedido

        if (USAR_MOCK) {
            setDetalles((actuales) => ({ ...actuales, [id]: pacientesDetalleMock[id] }));
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/medico/pacientes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setErrorDetalle(data?.mensaje ?? "No se pudo cargar la información del paciente");
                return;
            }
            const data: PacienteDetalle = await response.json();
            setDetalles((actuales) => ({ ...actuales, [id]: data }));
        } catch {
            setErrorDetalle("No se pudo conectar con el servidor");
        }
    }, [detalles, token]);

    // Al llegar la lista, queda seleccionado el primero (como en el diseño)
    useEffect(() => {
        if (seleccionadoId === null && pacientes.length > 0) {
            seleccionar(pacientes[0].id);
        }
    }, [pacientes]);

    const detalle = seleccionadoId !== null ? detalles[seleccionadoId] ?? null : null;
    const cargandoDetalle = seleccionadoId !== null && !detalle && !errorDetalle;

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                cargandoLista,
                errorLista,
                seleccionadoId,
                detalle,
                cargandoDetalle,
                errorDetalle,
                seleccionar,
                cargarLista,
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};
