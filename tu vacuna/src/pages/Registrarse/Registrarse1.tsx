import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Registrarse1Form from "../../components/RegistrarseForm1/RegistrarseForm1";
import type { RegistroData } from "../../types";
import RegistrarseForm2 from "../../components/RegistrarseForm2/RegistrarseForm2";
import RegistrarseForm3Paciente from "../../components/RegistrarseForm3Paciente/RegistrarseForm3Paciente";
import { useNavigate } from "react-router-dom";
import "./Registrarse1.css";

const PANEL_CONTENT: Record<number, { badge: string; title: string; text: string }> = {
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
    condiciones: "",
    matricula: "",
    especialidad: "",
    carnetPhoto: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((s) => s + 1);
    console.log(formData)
  };
  const goNext = () => setStep((s) => s + 1);

  const navigate = useNavigate();

  const goBack = () => {
  if (step === 1) {
    navigate("/");
  } else {
    setStep((s) => s - 1);
  }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) body.append(key, value as string | Blob);
      });

      const response = await fetch("https://tu-backend.com/api/registro", {
        method: "POST",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message || "Error al registrar");
        return;
      }

      console.log("Registro exitoso", data);
      // acá después: guardar el token, redirigir al panel, etc.
    } catch (err) {
      console.error("No se pudo conectar con el servidor");
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
            handleSubmit={handleNextStep}
          />
        )}

        {step === 3 && formData.profile === "paciente" && (
          <RegistrarseForm3Paciente
            formData={formData}
            setFormData={setFormData}
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
                index + 1 < step ? "is-completed" : index + 1 === step ? "is-active" : ""
              }`}
            >
              <span className="registro-steps-card-num">{item.num}</span>
              <span className="registro-steps-card-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Registrarse1;
