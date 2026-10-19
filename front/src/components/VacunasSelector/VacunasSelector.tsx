import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config";
import { useUsuario } from "../../context/UsuarioContext/useUsuario";
import "./VacunasSelector.css";

interface Vacuna {
  id_vacuna: number;
  nombre: string;
}

interface Props {
  value: string; // id_vacuna como string, "" si no eligió
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function VacunasSelector({ value, onChange }: Props) {
  const { token } = useUsuario();
  const [lista, setLista] = useState<Vacuna[]>([]);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/api/vacunas`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setLista)
      .catch(() => setError(true));
  }, [token]);

  // cierra el desplegable al hacer click afuera
  useEffect(() => {
    const cerrar = (e: MouseEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", cerrar);
    return () => document.removeEventListener("mousedown", cerrar);
  }, []);

  // el campo es obligatorio: sin vacuna elegida el form no se envía
  useEffect(() => {
    inputRef.current?.setCustomValidity(value ? "" : "Elegí una vacuna de la lista");
  }, [value]);

  const elegida = lista.find((v) => String(v.id_vacuna) === value);
  const filtradas = lista.filter((v) => v.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const elegir = (v: Vacuna) => {
    onChange({ target: { name: "idVacuna", value: String(v.id_vacuna) } });
    setBusqueda("");
    setAbierto(false);
  };

  const escribir = (texto: string) => {
    setBusqueda(texto);
    setAbierto(true);
    if (value) onChange({ target: { name: "idVacuna", value: "" } }); // al editar se deselecciona
  };

  return (
    <div className="input-label vacunas-selector" ref={contenedorRef}>
      Nombre
      <input
        ref={inputRef}
        type="text"
        className="input input--small"
        placeholder="Buscar vacuna"
        value={elegida ? elegida.nombre : busqueda}
        onChange={(e) => escribir(e.target.value)}
        onFocus={() => setAbierto(true)}
        autoComplete="off"
      />
      {abierto && (
        <ul className="vacunas-selector-lista">
          {filtradas.length === 0 && <li className="vacunas-selector-vacio">Sin resultados</li>}
          {filtradas.map((v) => (
            <li key={v.id_vacuna}>
              <button type="button" onClick={() => elegir(v)}>{v.nombre}</button>
            </li>
          ))}
        </ul>
      )}
      {error && <p>No se pudieron cargar las vacunas</p>}
    </div>
  );
}
