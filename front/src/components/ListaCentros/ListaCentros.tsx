import { useCentros } from "../../hooks/useCentros";
import Button from "../Button/Button";
import Buscador, { type OpcionFiltro } from "../Buscador/Buscador";
import type { FiltroCentros } from "../../types";
import "./ListaCentros.css";

const OPCIONES: OpcionFiltro<FiltroCentros>[] = [
  { valor: "todos", etiqueta: "Todos" },
  { valor: "publicos", etiqueta: "Públicos" },
  { valor: "privados", etiqueta: "Privados" },
];

export default function ListaCentros() {
  const {
    centros, busqueda, setBusqueda, filtro, setFiltro,
    cargando, error, seleccionado, setSeleccionado,
  } = useCentros();

  const mensaje = cargando
    ? "Cargando centros..."
    : error
      ? error
      : centros.length === 0
        ? "No hay centros para mostrar."
        : null;

  return (
    <div className="lista-centros-contenedor">
      <div className="lista-centros-buscador">
        <Buscador
          busqueda={busqueda}
          onBusqueda={setBusqueda}
          placeholder="Buscar por nombre o dirección"
          opciones={OPCIONES}
          filtro={filtro}
          onFiltro={setFiltro}
        />
      </div>

      {mensaje ? (
        <p className="lista-centros-mensaje">{mensaje}</p>
      ) : (
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
      )}
    </div>
  );
}
