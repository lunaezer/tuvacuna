import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import { medicosMock, medicosExistentesMock } from "../../mocks/medicosMock";
import { normalizar } from "../../utils/texto";
import AgregarMedicoModal from "../../components/AgregarMedicoModal/AgregarMedicoModal";
import type { Medico } from "../../types";

// Poner en false para usar el back real
const USAR_MOCK = false;

// Como los manda el back (el id viene como id_medico)
interface MedicoBack {
    id?: number;
    id_medico?: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    institucion?: string;
    matricula?: string | number;
    estado?: "aceptado" | "pendiente";
}

function aMedico(m: MedicoBack): Medico {
    return {
        id: (m.id_medico ?? m.id) as number,
        nombre: m.nombre,
        apellido: m.apellido,
        especialidad: m.especialidad,
        institucion: m.institucion,
        matricula: m.matricula != null ? String(m.matricula) : undefined,
        estado: m.estado,
        idVinculo: m.estado ? m.id : undefined, // solo en /api/perfil/medicos, ahí id es el del vínculo
    };
}

interface MedicosContextType {
    medicos: Medico[];                                       // los que ya me atienden
    cargandoMedicos: boolean;
    errorMedicos: string;
    cargarMedicos: () => Promise<void>;
    buscarMedicos: (texto: string) => Promise<Medico[]>;     // tira un Error si falla
    enviarSolicitud: (idMedico: number) => Promise<void>;    // tira un Error si falla
    abrirModalAgregarMedico: () => void;
}

export const MedicosContext = createContext<MedicosContextType | undefined>(undefined);

export const MedicosProvider = ({ children }: { children: ReactNode }) => {
    const { token, usuario } = useUsuario();
    const esPaciente = usuario?.rol === "paciente";

    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [cargandoMedicos, setCargandoMedicos] = useState(true);
    const [errorMedicos, setErrorMedicos] = useState("");
    const solicitudesMock = useRef(new Set<number>()); // solo para simular el 409 con el mock
    const [modalAbierto, setModalAbierto] = useState(false);

    // Médicos que ya aceptaron al paciente
    const cargarMedicos = useCallback(async () => {
        if (!esPaciente) return; // solo los pacientes tienen "mis médicos"
        setCargandoMedicos(true);
        setErrorMedicos("");

        if (USAR_MOCK) {
            setMedicos(medicosMock);
            setCargandoMedicos(false);
            return;
        }

        // Trae aceptados y pendientes (cada fila trae su estado)
        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/perfil/medicos`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch {
            setErrorMedicos("No se pudo conectar con el servidor");
            setCargandoMedicos(false);
            return;
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            setErrorMedicos(data?.mensaje ?? "No se pudieron cargar tus médicos");
            setCargandoMedicos(false);
            return;
        }
        const filas: MedicoBack[] = await response.json();
        setMedicos(filas.map(aMedico));
        setCargandoMedicos(false);
    }, [esPaciente, token]);

    useEffect(() => {
        if (!esPaciente) {
            setMedicos([]);
            setErrorMedicos("");
            setCargandoMedicos(false);
            return;
        }
        cargarMedicos();
    }, [esPaciente, cargarMedicos]);

    // Busca médicos por nombre, apellido, especialidad o institución (mínimo 2 caracteres).
    // Tira un Error si falla (lo muestra el modal)
    async function buscarMedicos(texto: string): Promise<Medico[]> {
        if (USAR_MOCK) {
            // simula al back: cada palabra tiene que aparecer en alguno de los 4 campos
            if (texto.trim().length < 2) throw new Error("La búsqueda debe tener al menos 2 caracteres");
            const palabras = normalizar(texto.trim()).split(/\s+/).slice(0, 5);
            return medicosExistentesMock
                .filter((m) => {
                    const campos = normalizar(`${m.nombre} ${m.apellido} ${m.especialidad} ${m.institucion ?? ""}`);
                    return palabras.every((p) => campos.includes(p));
                })
                .sort((a, b) => a.apellido.localeCompare(b.apellido) || a.nombre.localeCompare(b.nombre))
                .slice(0, 20);
        }

        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/medicos?busqueda=${encodeURIComponent(texto.trim())}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch {
            throw new Error("No se pudo conectar con el servidor");
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudo buscar médicos");
        }
        const filas: MedicoBack[] = await response.json();
        return filas.map(aMedico);
    }

    // Manda la solicitud al médico elegido. Tira un Error si falla (lo muestra el modal)
    async function enviarSolicitud(idMedico: number) {
        if (USAR_MOCK) {
            if (medicos.some((m) => m.id === idMedico) || solicitudesMock.current.has(idMedico)) {
                throw new Error("Ya enviaste una solicitud a este médico o ya te atiende");
            }
            solicitudesMock.current.add(idMedico);
            return;
        }

        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/medicos/${idMedico}/solicitud`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch {
            throw new Error("No se pudo conectar con el servidor");
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudo enviar la solicitud");
        }
        await cargarMedicos(); // para que el pendiente aparezca al instante
    }

    return (
        <MedicosContext.Provider
            value={{
                medicos,
                cargandoMedicos,
                errorMedicos,
                cargarMedicos,
                buscarMedicos,
                enviarSolicitud,
                abrirModalAgregarMedico: () => setModalAbierto(true),
            }}
        >
            {children}
            <AgregarMedicoModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onBuscar={buscarMedicos}
                onEnviar={enviarSolicitud}
                idsAgregados={medicos.map((m) => m.id)}
            />
        </MedicosContext.Provider>
    );
};
