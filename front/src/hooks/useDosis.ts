import { useContext } from "react";
import { DosisContext } from "../context/DosisContext/DosisContext";

export const useDosis = () => {
    const ctx = useContext(DosisContext);
    if (!ctx) throw new Error("useDosis debe usarse dentro de <DosisProvider>");
    return ctx;
};
