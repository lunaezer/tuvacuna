import { createContext, useState} from "react";

interface Usuario {
  nombre: string;
  token: string;
}


interface UsuarioContextType {
  usuario: Usuario | null;
  setUsuario: (u: Usuario | null) => void;
}

