import React from 'react';
import './FamilySelector.css';

function FamilySelector({ familiares = [], activoIndex = 0, onSelect, onAgregar }) {
  return (
    <div className="family-selector">
      {familiares.map((nombre, index) => (
        <button
          key={index}
          className={`family-pill ${index === activoIndex ? 'family-pill-activo' : ''}`}
          onClick={() => onSelect && onSelect(index)}
        >
          {nombre}
        </button>
      ))}
      <button className="family-pill family-pill-agregar" onClick={onAgregar}>
        + Agregar familiar
      </button>
    </div>
  );
}

export default FamilySelector;
