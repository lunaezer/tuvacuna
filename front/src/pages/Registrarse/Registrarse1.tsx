import { useState } from "react";
import Registrarse1Form from "../../components/RegistrarseForm1/RegistrarseForm1";
import type { RegistroData } from "../../types";
import RegistrarseForm2 from "../../components/RegistrarseForm2/RegistrarseForm2";
import RegistrarseForm3Paciente from "../../components/RegistrarseForm3Paciente/RegistrarseForm3Paciente";
import { useNavigate } from "react-router-dom";
import "./Registrarse1.css";
import RegistrarseForm3Medico from "../../components/RegistrarseForm3Medico/RegistrarseForm3Medico";
import { useUsuario } from "../../context/UsuarioContext/useUsuario";
import { API_URL } from "../../config";
import AgregarVacunaModal from "../../components/AgregarVacunaModal/AgregarVacunaModal";
import VacunaAgregadaModal from "../../components/VacunaAgregadaModal/VacunaAgregadaModal";
import type { FormVacuna } from "../../components/AgregarVacunaModal/AgregarVacunaModal";

const PANEL_CONTENT: Record<
  number,
  { badge: string; title: string; text: string }
> = {
  1: {
    badge: "Tres Pasos",
    title: "Cuenta, datos de salud, carnet cargado y listo.",
    text: "A partir de ahí TuVacuna calcula sola qué dosis te corresponden y cuándo, según el Calendario Nacional.",
  },
  2: {
    badge: "Paso 2 de 3",
    title: "Dos personas de la misma edad no necesitan las mismas vacunas.",
    text: "El Calendario Nacional contempla refuerzos y dosis extra según embarazo, condiciones crónicas y ocupación. Por eso te preguntamos.",
  },
  3: {
    badge: "Ultimo paso",
    title: "Cuenta, datos de salud, carnet cargado y listo.",
    text: "A partir de ahí TuVacuna calcula sola qué dosis te corresponden y cuándo, según el Calendario Nacional.",
  },
};

const formVacio: FormVacuna = { idVacuna: "", lote: "", fecha: "", marca: "", lugar: "" };

function Registrarse1() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<RegistroData>({
    name: "",
    surname: "",
    email: "",
    id: "",
    password: "",
    profile: "paciente",
    birthDate: "",
    sex: "",
    obraSocial: "",
    comorbilidades: [],
    matricula: "",
    especialidad: "",
    institucion: "",
  });

  const [error, setError] = useState("");

  // Paso 3
  const [carnetPhoto, setCarnetPhoto] = useState<File | null>(null);
  const [pacientes, setPacientes] = useState<string[]>([]);
  const [pacienteInput, setPacienteInput] = useState("");

  // Carga manual de vacunas (paso 3)
  const [modalVacunaAbierto, setModalVacunaAbierto] = useState(false);
  const [formDosis, setFormDosis] = useState<FormVacuna>(formVacio);
  const [errorDosis, setErrorDosis] = useState("");
  const [dosisCargadas, setDosisCargadas] = useState(0);
  const [modalExitoAbierto, setModalExitoAbierto] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePacienteInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPacienteInput(e.target.value);
  };

  const handleAddPaciente = () => {
    const email = pacienteInput.trim();
    if (!email || pacientes.includes(email)) return;
    setPacientes((prev) => [...prev, email]);
    setPacienteInput("");
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const navigate = useNavigate();
  const { login, token } = useUsuario();

  const goBack = () => {
    if (step === 1) {
      navigate("/");
    } else {
      setStep((s) => s - 1);
    }
  };
  const handleCrearCuenta = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const body = {
      rol: formData.profile,
      nombre: formData.name,
      apellido: formData.surname,
      mail: formData.email,
      dni: formData.id,
      password: formData.password,
      fecha_de_nacimiento: formData.birthDate,
      sexo: formData.sex,
      obra_social: formData.obraSocial,
      comorbilidades: formData.comorbilidades,
      matricula: formData.matricula,
      especialidad: formData.especialidad,
      institucion: formData.institucion,
    };

    try {
      const response = await fetch(`${API_URL}/api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.mensaje || data.message || "Error al registrar");
        return;
      }

      await login(data.token);
      setStep(3);
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  };

  const handleGuardarDosis = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorDosis("");

    try {
      const response = await fetch(`${API_URL}/api/carnet/dosis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_vacuna: Number(formDosis.idVacuna),
          fecha_de_aplicacion: formDosis.fecha,
          lote: formDosis.lote,
          marca: formDosis.marca,
          lugar: formDosis.lugar,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorDosis(
          data.mensaje || data.message || "No se pudo guardar la dosis",
        );
        return;
      }

      setDosisCargadas((n) => n + 1);
      setFormDosis(formVacio);
      setModalVacunaAbierto(false);
      setModalExitoAbierto(true);
    } catch {
      setErrorDosis("No se pudo conectar con el servidor");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const body = new FormData();
    if (formData.profile === "paciente") {
      if (carnetPhoto) body.append("carnetPhoto", carnetPhoto);
    } else {
      pacientes.forEach((p) => body.append("pacientes", p));
    }

    try {
      // TODO: reemplazar por el endpoint real del paso 3
      const response = await fetch(`${API_URL}/api/ENDPOINT_PASO_3`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.mensaje || data.message || "Error al guardar");
        return;
      }

      navigate("/inicio");
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  };

  const panelContent = PANEL_CONTENT[step] ?? PANEL_CONTENT[1];

  const stepsCard = [
    { num: "01", label: "Tus Datos" },
    { num: "02", label: "Perfil de salud" },
    {
      num: "03",
      label:
        step === 1
          ? "Tu Carnet / Tus pacientes"
          : formData.profile === "medico"
            ? "Tus pacientes"
            : "Tu Carnet",
    },
  ];

  return (
    <div className="registro-page">
      <div className="registro-panel-left">
        <button type="button" className="registro-volver" onClick={goBack}>
          ‹ Volver
        </button>

        <div className="registro-stepper">
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`registro-stepper-segment ${
                n < step ? "is-completed" : n === step ? "is-active" : ""
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <Registrarse1Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleNextStep}
          />
        )}

        {step === 2 && (
          <RegistrarseForm2
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleSubmit={handleCrearCuenta}
          />
        )}

        {error && <p className="registro-error">{error}</p>}

        {step === 3 && formData.profile === "paciente" && (
          <RegistrarseForm3Paciente
            carnetPhoto={carnetPhoto}
            setCarnetPhoto={setCarnetPhoto}
            onAbrirModal={() => setModalVacunaAbierto(true)}
            dosisCargadas={dosisCargadas}
          />
        )}

        {step === 3 && formData.profile === "medico" && (
          <RegistrarseForm3Medico
            pacienteInput={pacienteInput}
            handlePacienteInputChange={handlePacienteInputChange}
            handleAddPaciente={handleAddPaciente}
            pacientes={pacientes}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="registro-panel-right">
        <span className="registro-badge">
          <span className="registro-badge-dot" />
          {panelContent.badge}
        </span>
        <h2 className="registro-panel-title">{panelContent.title}</h2>
        <p className="registro-panel-text">{panelContent.text}</p>

        <div className="registro-steps-card">
          {stepsCard.map((item, index) => (
            <div
              key={item.num}
              className={`registro-steps-card-row ${
                index + 1 < step
                  ? "is-completed"
                  : index + 1 === step
                    ? "is-active"
                    : ""
              }`}
            >
              <span className="registro-steps-card-num">{item.num}</span>
              <span className="registro-steps-card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <AgregarVacunaModal
        isOpen={modalVacunaAbierto}
        onClose={() => {
          setModalVacunaAbierto(false);
          setErrorDosis("");
        }}
        form={formDosis}
        setForm={setFormDosis}
        handleSubmit={handleGuardarDosis}
        error={errorDosis}
      />

      <VacunaAgregadaModal
        isOpen={modalExitoAbierto}
        onClose={() => setModalExitoAbierto(false)}
        onAgregarOtra={() => {
          setModalExitoAbierto(false);
          setModalVacunaAbierto(true);
        }}
        onContinuar={() => navigate("/inicio", { state: { cuentaCreada: true } })}
      />
    </div>
  );
}

export default Registrarse1;
