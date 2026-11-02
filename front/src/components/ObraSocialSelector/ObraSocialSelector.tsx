import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { normalizar } from "../../utils/texto";

interface ObraSocial {
  id_obra_social: number;
  nombre: string;
}

interface Props {
  seleccionada: string;               // el id como texto, "" si no eligió
  onChange: (id: string) => void;
}

export default function ObraSocialSelector({ seleccionada, onChange }: Props) {
  const [lista, setLista] = useState<ObraSocial[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/obras-sociales`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setLista)
      .catch(() => setError(true));
  }, []);

  // la elegida siempre se queda en las opciones, aunque no coincida con la búsqueda
  const filtradas = lista.filter(
    (o) =>
      String(o.id_obra_social) === seleccionada ||
      normalizar(o.nombre).includes(normalizar(busqueda)),
  );

  return (
    <div className="input-label">
      Obra social o prepaga
      <input
        type="search"
        className="input input--large"
        placeholder="Buscar (ej: OSDE)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {error && <p>No se pudieron cargar las obras sociales</p>}

      <select
        className="input input--large"
        value={seleccionada}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Sin obra social</option>
        {filtradas.map((o) => (
          <option key={o.id_obra_social} value={o.id_obra_social}>
            {o.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
