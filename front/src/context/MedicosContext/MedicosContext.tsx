import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../UsuarioContext/useUsuario";
import { medicosMock, medicosExistentesMock } from "../../mocks/medicosMock";
import { normalizar } from "../../utils/texto";
import AgregarMedicoModal from "../../components/AgregarMedicoModal/AgregarMedicoModal";
import Toast from "../../components/Toast/Toast";
import type { DatosMedico, Medico } from "../../types";

// Poner en false para usar el back real
const USAR_MOCK = true;

interface MedicosContextType {
    medicos: Medico[];                                       // los que ya me atienden
    cargandoMedicos: boolean;
    errorMedicos: string;
    cargarMedicos: () => Promise<void>;
    enviarSolicitud: (datos: DatosMedico) => Promise<void>;  // tira un Error si falla
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
    const [solicitudEnviada, setSolicitudEnviada] = useState(false);

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
        try {
            const response = await fetch(`${API_URL}/api/medicos`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
                const data = await response.json().catch(() => null);
                setErrorMedicos(data?.mensaje ?? "No se pudieron cargar tus médicos");
                return;
            }
            setMedicos(await response.json());
        } catch {
            setErrorMedicos("No se pudo conectar con el servidor");
        } finally {
            setCargandoMedicos(false);
        }
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

    // Manda los datos del médico y el back busca cuál coincide para crearle la solicitud.
    // Tira un Error si falla (lo muestra el modal). Ej: "Médico no encontrado"
    async function enviarSolicitud(datos: DatosMedico) {
        if (USAR_MOCK) {
            // simula la búsqueda del back: tienen que coincidir los 4 datos
            const encontrado = medicosExistentesMock.find(
                (m) =>
                    normalizar(m.matricula) === normalizar(datos.matricula.trim()) &&
                    normalizar(m.mail) === normalizar(datos.mail.trim()) &&
                    normalizar(m.nombre) === normalizar(datos.nombre.trim()) &&
                    normalizar(m.apellido) === normalizar(datos.apellido.trim()),
            );
            if (!encontrado) throw new Error("Médico no encontrado");
            if (medicos.some((m) => m.id === encontrado.id) || solicitudesMock.current.has(encontrado.id)) {
                throw new Error("Ya enviaste una solicitud a este médico o ya te atiende");
            }
            solicitudesMock.current.add(encontrado.id);
            return;
        }

        let response: Response;
        try {
            response = await fetch(`${API_URL}/api/medicos/solicitud`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(datos),
            });
        } catch {
            throw new Error("No se pudo conectar con el servidor");
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null);
            throw new Error(data?.mensaje ?? "No se pudo enviar la solicitud");
        }
    }

    return (
        <MedicosContext.Provider
            value={{
                medicos,
                cargandoMedicos,
                errorMedicos,
                cargarMedicos,
                enviarSolicitud,
                abrirModalAgregarMedico: () => setModalAbierto(true),
            }}
        >
            {children}
            <AgregarMedicoModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onEnviar={async (datos) => {
                    await enviarSolicitud(datos);
                    setSolicitudEnviada(true); // solo llega acá si salió bien
                }}
            />
            <Toast
                isOpen={solicitudEnviada}
                mensaje="Solicitud enviada al médico"
                duracion={2500}
                onClose={() => setSolicitudEnviada(false)}
            />
        </MedicosContext.Provider>
    );
};
