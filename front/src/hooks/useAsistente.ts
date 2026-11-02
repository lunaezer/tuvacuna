import { useContext } from "react";
import { AsistenteContext } from "../context/AsistenteContext/AsistenteContext";

export const useAsistente = () => {
    const ctx = useContext(AsistenteContext);
    if (!ctx) throw new Error("useAsistente debe usarse dentro de <AsistenteProvider>");
    return ctx;
};
