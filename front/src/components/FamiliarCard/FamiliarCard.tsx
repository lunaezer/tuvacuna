import Iniciales from '../Iniciales/Iniciales'
import Button from '../Button/Button'
import type { Familiar } from '../../types'
import './FamiliarCard.css'

interface FamiliarCardProps {
  familiar: Familiar
  onVerCarnet?: () => void
}

export default function FamiliarCard({ familiar, onVerCarnet }: FamiliarCardProps) {
  return (
    <div className="familiar-card">
      <div className="familiar-card-header">
        <Iniciales nombre={familiar.nombre} texto={familiar.iniciales} colorBg={familiar.colorBg} size="large" />
        <div className="familiar-card-info">
          <span className="familiar-card-nombre">{familiar.nombre}</span>
          {familiar.edad !== undefined && (
            <span className="familiar-card-edad">
              {familiar.edad === 1 ? '1 año' : `${familiar.edad} años`}
            </span>
          )}
        </div>
      </div>
      <Button text="Ver carnet" variant="outline" onClick={onVerCarnet} className="familiar-card-boton" />
    </div>
  )
}
