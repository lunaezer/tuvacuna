import { useEffect, useRef } from "react";
import "./Toast.css";

interface ToastProps {
  isOpen: boolean;
  mensaje: string;
  onClose: () => void;
  variante?: "exito" | "error";
  duracion?: number; // ms, 0 = no se cierra solo
}

export default function Toast({
  isOpen,
  mensaje,
  onClose,
  variante = "exito",
  duracion = 4000,
}: ToastProps) {
  // guardo onClose en un ref para que un callback inline del padre
  // no reinicie el timer en cada render
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || duracion === 0) return;
    const t = setTimeout(() => onCloseRef.current(), duracion);
    return () => clearTimeout(t);
  }, [isOpen, duracion]);

  if (!isOpen) return null;

  return (
    <div className={`toast toast--${variante}`} role="status">
      <span className="toast-icono">{variante === "exito" ? "✓" : "!"}</span>
      <span className="toast-mensaje">{mensaje}</span>
      <button type="button" className="toast-cerrar" onClick={onClose} aria-label="Cerrar aviso">
        &times;
      </button>
    </div>
  );
}
