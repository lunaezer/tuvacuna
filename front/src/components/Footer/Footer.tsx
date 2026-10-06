import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="contenedor-pie-pagina">
      <div className="contenido-pie-pagina">
        <Link to="/" className="logo-pie-pagina">LOGO TuVacuna</Link>
        <p className="texto-pie-pagina">
          Basado en el Calendario Nacional de Vacunación de la República Argentina.
          <br />
          TuVacuna no reemplaza la consulta ni la indicación de un profesional de la salud.
        </p>
      </div>
    </footer>
  )
}
