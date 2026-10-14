import { useEffect, useState } from "react";
import { API_URL } from "../../config";

interface Comorbilidad {
  id_comorbilidad: number;
  nombre: string;
}

interface Props {
  seleccionadas: number[];
  onChange: (ids: number[]) => void;
}

export default function ComorbilidadesSelector({ seleccionadas, onChange }: Props) {
  const [lista, setLista] = useState<Comorbilidad[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/comorbilidades`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setLista)
      .catch(() => setError(true));
  }, []);

  const toggle = (id: number) => {
    onChange(
      seleccionadas.includes(id)
        ? seleccionadas.filter((x) => x !== id)
        : [...seleccionadas, id],
    );
  };

  const filtradas = lista.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <div className="input-label">
      Condiciones a tener en cuenta
      <input
        type="search"
        className="input input--large"
        placeholder="Buscar (ej: asma)"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {error && <p>No se pudieron cargar las condiciones</p>}

      <div className="comorbilidades-lista">
        {filtradas.map((c) => (
          <label key={c.id_comorbilidad} className="comorbilidad-item">
            <input
              type="checkbox"
              checked={seleccionadas.includes(c.id_comorbilidad)}
              onChange={() => toggle(c.id_comorbilidad)}
            />
            {c.nombre}
          </label>
        ))}
      </div>
    </div>
  );
}
