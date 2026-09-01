import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Registrarse1Form from "../../components/RegistrarseForm1/RegistrarseForm1";

function Registrarse1 (){

     const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        id: "",
        password: ""
    });
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };


    return(
        <Registrarse1Form 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
    )
}

export default Registrarse1