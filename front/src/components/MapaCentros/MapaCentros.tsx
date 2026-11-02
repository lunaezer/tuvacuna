import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Centro } from "../../types";
import { useCentros } from "../../hooks/useCentros";
import "./MapaCentros.css";

const CENTRO_CABA: [number, number] = [-34.6037, -58.3816];

// ícono propio: un círculo con el número de la lista
function crearIcono(numero: number, activo: boolean) {
  return L.divIcon({
    className: "marcador-centro-wrapper",
    html: `<span class="marcador-centro ${activo ? "marcador-centro--activo" : ""}">${numero}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// componente "invisible": mueve el mapa cuando cambia el centro elegido
function VolarA({ centro }: { centro?: Centro | null }) {
  const map = useMap();
  useEffect(() => {
    if (centro) map.flyTo([centro.lat, centro.lng], 15);
  }, [centro, map]);
  return null;
}

export default function MapaCentros() {
  const { centros, seleccionado, setSeleccionado } = useCentros();

  return (
    <MapContainer center={CENTRO_CABA} zoom={12} className="mapa-centros">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {centros.map((c, i) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lng]}
          icon={crearIcono(i + 1, seleccionado?.id === c.id)}
          eventHandlers={{ click: () => setSeleccionado(c) }}
        />
      ))}
      <VolarA centro={seleccionado} />
    </MapContainer>
  );
}
