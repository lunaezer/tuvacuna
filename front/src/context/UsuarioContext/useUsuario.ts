import { useContext } from "react";
import { UsuarioContext } from "./UsuarioContext";

export const useUsuario = () => {
    const ctx = useContext(UsuarioContext);
    if (!ctx) throw new Error("useUsuario debe usarse dentro de <UsuarioProvider>");
    return ctx;
};
