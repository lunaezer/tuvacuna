import { useContext } from "react";
import { MedicosContext } from "../context/MedicosContext/MedicosContext";

export const useMedicos = () => {
    const ctx = useContext(MedicosContext);
    if (!ctx) throw new Error("useMedicos debe usarse dentro de <MedicosProvider>");
    return ctx;
};
