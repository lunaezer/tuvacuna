import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Registrarse1Form from "../../components/RegistrarseForm1/RegistrarseForm1";
import type { RegistroData } from "../../types";
import RegistrarseForm2 from "../../components/RegistrarseForm2/RegistrarseForm2";

function Registrarse1() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<RegistroData>({
    name: "",
    surname: "",
    email: "",
    id: "",
    password: "",
    profile: "",
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
  const goBack = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // aca va el post para mandarle al back despues
  };

  return (
    <>
    <button type="button" onClick={goBack}>‹ Volver</button>
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
  </>
  );
}

export default Registrarse1;
