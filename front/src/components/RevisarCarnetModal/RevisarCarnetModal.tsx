import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import FilaRevisionOcr, { type FilaOcr } from "../FilaRevisionOcr/FilaRevisionOcr";
import { API_URL } from "../../config";
import { useUsuario } from "../../context/UsuarioContext/useUsuario";
import { useLecturaOcr } from "../../hooks/useLecturaOcr";
import "../AgregarTurnoModal/AgregarTurnoModal.css";
import "./RevisarCarnetModal.css";

interface RevisarCarnetModalProps {
  archivo: File;                 // se monta al elegir la foto y se desmonta al cerrar
  idFamiliar?: number;           // de quién es el carnet; sin esto, el propio
  onClose: () => void;
  onGuardado: (guardadas: number) => void;   // cuántas dosis se guardaron en este intento
  onCargarManual: () => void;
}

export default function RevisarCarnetModal({ archivo, idFamiliar, onClose, onGuardado, onCargarManual }: RevisarCarnetModalProps) {
  const { token } = useUsuario();
  const { estado, etapa, registros, error, leer } = useLecturaOcr();
  const [filas, setFilas] = useState<FilaOcr[]>([]);
  const [guardando, setGuardando] = useState(false);
  const iniciada = useRef(false);

  // una sola lectura por foto (el modo estricto de React corre los efectos dos veces)
  useEffect(() => {
    if (iniciada.current) return;
    iniciada.current = true;
    leer(archivo);
  }, [archivo, leer]);

  // cuando el lector termina, una fila por registro con lo que sugirió
  useEffect(() => {
    if (estado !== "listo") return;
    setFilas(
      registros.map((registro, i) => ({
        clave: i,
        registro,
        idVacuna: registro.id_vacuna_sugerida ? String(registro.id_vacuna_sugerida) : "",
        fecha: registro.fecha_sugerida ?? "",
        lote: registro.lote ?? "",
        marca: registro.marca ?? "",
        lugar: "", // el lector nunca lo lee
        estado: "pendiente",
      })),
    );
  }, [estado, registros]);

  const cambiarFila = (clave: number, nombre: string, valor: string) =>
    setFilas((actuales) => actuales.map((f) => (f.clave === clave ? { ...f, [nombre]: valor } : f)));

  const quitarFila = (clave: number) =>
    setFilas((actuales) => actuales.filter((f) => f.clave !== clave));

  const marcar = (clave: number, cambios: Partial<FilaOcr>) =>
    setFilas((actuales) => actuales.map((f) => (f.clave === clave ? { ...f, ...cambios } : f)));

  const pendientes = filas.filter((f) => f.estado !== "guardada");

  // Guarda todas las filas juntas: el navegador no deja enviar si falta algún campo
  async function handleGuardar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuardando(true);
    let fallaron = 0;
    let guardadas = 0;
    const url = idFamiliar === undefined
      ? `${API_URL}/api/carnet/dosis`
      : `${API_URL}/api/carnet/${idFamiliar}/dosis`;

    for (const fila of pendientes) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_vacuna: Number(fila.idVacuna),
            fecha_de_aplicacion: fila.fecha,
            lote: fila.lote.trim(),
            marca: fila.marca.trim(),
            lugar: fila.lugar.trim(),
          }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          marcar(fila.clave, { estado: "error", error: data?.mensaje ?? "No se pudo guardar esta dosis" });
          fallaron++;
          continue;
        }
        marcar(fila.clave, { estado: "guardada", error: undefined });
        guardadas++;
      } catch {
        marcar(fila.clave, { estado: "error", error: "No se pudo conectar con el servidor" });
        fallaron++;
      }
    }

    setGuardando(false);
    onGuardado(guardadas);
    if (fallaron === 0) onClose();
  }

  const leyendo = estado === "inactivo" || estado === "subiendo" || estado === "leyendo";

  return (
    <Modal isOpen onClose={onClose} className="revisar-carnet">
      <h1 className="agregar-turno-titulo">Revisá tu carnet</h1>

      {leyendo && (
        <div className="revisar-carnet-estado">
          <p className="revisar-carnet-leyendo">Leyendo el carnet...</p>
          <p className="revisar-carnet-hint">{etapa || "Puede tardar hasta un minuto"}</p>
        </div>
      )}

      {estado === "error" && (
        <div className="revisar-carnet-estado">
          <p className="modal-error">{error}</p>
          <div className="agregar-turno-acciones">
            <Button text="Cerrar" type="button" variant="primary" onClick={onClose} />
            <Button text="Cargar a mano" type="button" variant="celeste" onClick={onCargarManual} />
          </div>
        </div>
      )}

      {estado === "listo" && filas.length === 0 && (
        <div className="revisar-carnet-estado">
          <p className="revisar-carnet-hint">No encontramos dosis en la foto.</p>
          <div className="agregar-turno-acciones">
            <Button text="Cerrar" type="button" variant="primary" onClick={onClose} />
            <Button text="Cargar a mano" type="button" variant="celeste" onClick={onCargarManual} />
          </div>
        </div>
      )}

      {estado === "listo" && filas.length > 0 && (
        <form className="modal-form" onSubmit={handleGuardar}>
          <p className="revisar-carnet-hint">
            Revisá que cada dosis coincida con tu carnet y completá lo que falte. Después las guardás todas juntas.
          </p>

          <div className="revisar-carnet-lista">
            {filas.map((fila) => (
              <FilaRevisionOcr
                key={fila.clave}
                fila={fila}
                onCambio={(nombre, valor) => cambiarFila(fila.clave, nombre, valor)}
                onQuitar={() => quitarFila(fila.clave)}
              />
            ))}
          </div>

          <div className="agregar-turno-acciones">
            <Button text="Cancelar" type="button" variant="primary" onClick={onClose} />
            <Button
              text={guardando ? "Guardando..." : pendientes.length === 1 ? "Guardar dosis" : `Guardar ${pendientes.length} dosis`}
              type="submit"
              variant="celeste"
              disabled={guardando || pendientes.length === 0}
            />
          </div>
        </form>
      )}
    </Modal>
  );
}
