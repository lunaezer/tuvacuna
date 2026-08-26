import Iniciales from '../Iniciales/Iniciales';
import type { Familiar } from '../../types';
import './FamilySelector.css';

interface FamilySelectorProps {
  familiares?: (string | Familiar)[]
  activoIndex?: number
  onSelect?: (index: number) => void
  onAgregar?: () => void
}

function FamilySelector({ familiares = [], activoIndex = 0, onSelect, onAgregar }: FamilySelectorProps) {
  return (
    <div className="family-selector">
      {familiares.map((familiar, index) => {
        // Soporta la estructura que enviará el backend ({ id, nombre, esVos, iniciales, colorBg }) o strings
        const esObjeto = typeof familiar === 'object' && familiar !== null
        const nombre = esObjeto ? familiar.nombre : familiar
        const esVos = esObjeto ? Boolean(familiar.esVos) : false
        const textoIniciales = esObjeto ? familiar.iniciales : undefined
        const colorBg = esObjeto ? familiar.colorBg : undefined

        const etiquetaMostrar = `${nombre}${esVos ? ' (vos)' : ''}`

        return (
          <button
            key={esObjeto && familiar.id ? familiar.id : index}
            className={`family-pill ${index === activoIndex ? 'family-pill-activo' : ''}`}
            onClick={() => onSelect && onSelect(index)}
          >
            <Iniciales nombre={nombre} texto={textoIniciales} colorBg={colorBg} size="medium" />
            <span className="family-pill-nombre">{etiquetaMostrar}</span>
          </button>
        )
      })}

      {onAgregar && (
        <button className="family-pill family-pill-agregar" onClick={onAgregar}>
          + Agregar familiar
        </button>
      )}
    </div>
  );
}

export default FamilySelector;
