import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Registrarse1Form from "../../components/RegistrarseForm1/RegistrarseForm1";

function Registrarse1() {
  type RegistroData = {
    // paso 1
    name: string;
    surname: string;
    email: string;
    id: string;
    password: string;
    // paso 2
    profile: "paciente" | "medico" | "";
    birthDate: string;
    sex: string;
    // paso 3
    carnetPhoto: File | null;
  };
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
    carnetPhoto: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <form action="" onSubmit={handleSubmit}>
    <Registrarse1Form
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleNextStep}
    />
    </form>
  );
}

export default Registrarse1;
