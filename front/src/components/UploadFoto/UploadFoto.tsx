import type React from "react";

type Variante = "carnet" | "matricula";

interface UploadFotoProps {
  variante: Variante;
  archivo: File | null;
  onChange: (file: File | null) => void;
}

const TEXTOS: Record<Variante, string> = {
  carnet: "Subi una foto de tu carnet",
  matricula: "Subi una foto de tu matricula",
};

export default function UploadFoto({ variante, archivo, onChange }: UploadFotoProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  return (
    <>
      <label className="registro-upload-box">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="registro-upload-input"
        />
        <span className="registro-upload-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </span>
        <span>{TEXTOS[variante]}</span>
      </label>

      {archivo && (
        <div className="registro-file-row">
          <p className="registro-file-name">{archivo.name}</p>
          <button
            type="button"
            className="registro-file-remove"
            onClick={() => onChange(null)}
            aria-label="Quitar foto"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
