import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="contenedor-pie-pagina">
      <div className="contenido-pie-pagina">
        <Link to="/" className="logo-pie-pagina">LOGO TuVacuna</Link>
        <div className="texto-pie-pagina">Contactanos</div>
      </div>
    </footer>
  )
}
