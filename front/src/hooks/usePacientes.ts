import { useContext } from "react";
import { PacientesContext } from "../context/PacientesContext/PacientesContext";

export const usePacientes = () => {
    const ctx = useContext(PacientesContext);
    if (!ctx) throw new Error("usePacientes debe usarse dentro de <PacientesProvider>");
    return ctx;
};
