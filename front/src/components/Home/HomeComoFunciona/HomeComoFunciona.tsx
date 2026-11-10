import HomeSeccionClara from '../HomeSeccionClara/HomeSeccionClara'
import HomeTarjeta from '../HomeTarjeta/HomeTarjeta'
import './HomeComoFunciona.css'

const pasos = [
  {
    etiqueta: '01 · CARGA',
    titulo: 'Subí tu carnet',
    texto:
      'Sacale una foto o cargá las dosis con preguntas guiadas. Sirve igual para tus hijos, tus padres o cualquier familiar a cargo.',
  },
  {
    etiqueta: '02 · ANÁLISIS',
    titulo: 'Cruzamos tu perfil',
    texto:
      'Edad, sexo al nacer, comorbilidades, embarazo y época del año se cruzan con el Calendario Nacional para saber qué te falta.',
  },
  {
    etiqueta: '03 · SEGUIMIENTO',
    titulo: 'Te avisamos a tiempo',
    texto:
      'Recordatorios automáticos antes de cada dosis, turnos agendados y el vacunatorio más cercano a mano.',
  },
]

export default function HomeComoFunciona() {
  return (
    <HomeSeccionClara
      id="como-funciona"
      etiqueta="CÓMO FUNCIONA"
      titulo="Del papel arrugado a un registro que te avisa solo"
      bajada="Tres pasos, una sola vez. Después TuVacuna trabaja en segundo plano"
    >
      <div className="home-rejilla">
        {pasos.map((p, i) => (
          <HomeTarjeta key={p.etiqueta} delay={i * 0.12} titulo={p.titulo} texto={p.texto}>
            <span className="home-pildora">{p.etiqueta}</span>
          </HomeTarjeta>
        ))}
      </div>
    </HomeSeccionClara>
  )
}
