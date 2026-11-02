import { useContext } from "react";
import { CentrosContext } from "../context/CentrosContext/CentrosContext";

export const useCentros = () => {
    const ctx = useContext(CentrosContext);
    if (!ctx) throw new Error("useCentros debe usarse dentro de <CentrosProvider>");
    return ctx;
};
