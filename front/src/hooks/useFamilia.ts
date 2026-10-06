import { useContext } from "react";
import { FamiliaContext } from "../context/FamiliaContext/FamiliaContext";

export const useFamilia = () => {
    const ctx = useContext(FamiliaContext);
    if (!ctx) throw new Error("useFamilia debe usarse dentro de <FamiliaProvider>");
    return ctx;
};
