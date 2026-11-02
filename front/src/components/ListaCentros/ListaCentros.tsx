import { useCentros } from "../../hooks/useCentros";
import Button from "../Button/Button";
import "./ListaCentros.css";

export default function ListaCentros() {
  const { centros, cargando, error, seleccionado, setSeleccionado } = useCentros();

  if (cargando) return <p className="lista-centros-mensaje">Cargando centros...</p>;
  if (error) return <p className="lista-centros-mensaje">{error}</p>;
  if (centros.length === 0) return <p className="lista-centros-mensaje">No hay centros para mostrar.</p>;

  return (
    <ul className="lista-centros">
      {centros.map((c, i) => {
        const activo = seleccionado?.id === c.id;
        return (
          <li
            key={c.id}
            className={`centro-item ${activo ? "centro-item--activo" : ""}`}
            onClick={() => setSeleccionado(c)}
          >
            <span className="centro-item-numero">{i + 1}</span>
            <div className="centro-item-info">
              <strong>{c.nombre}</strong>
              <span>{c.direccion}</span>
            </div>
            {activo && <Button text="Agendar turno" />}
          </li>
        );
      })}
    </ul>
  );
}
