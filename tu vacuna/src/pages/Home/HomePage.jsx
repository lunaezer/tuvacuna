import React from 'react'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="pagina-inicio">
      {/* Sección Héroe (Encabezado Oscuro) */}
      <section className="seccion-principal-heroe">
        <div className="contenido-seccion-heroe">
          <div className="etiqueta-insignia-destacada">texto</div>
          <h1 className="titulo-principal-heroe">Tu Vacuna</h1>
          <p className="subtitulo-seccion-heroe">Texto</p>

          <div className="grupo-botones-accion">
            <button className="boton-redondeado-blanco">Boton</button>
            <button className="boton-redondeado-blanco">Boton</button>
          </div>

          <div className="grupo-subtextos-inferiores">
            <span className="elemento-subtexto-inferior">Texto</span>
            <span className="elemento-subtexto-inferior">Texto</span>
            <span className="elemento-subtexto-inferior">Texto</span>
          </div>
        </div>
      </section>

      {/* Sección de Muestra y Maqueta */}
      <section className="seccion-muestra-maqueta">
        <span className="etiqueta-seccion-oscura">Texto</span>
        <h2 className="titulo-seccion-oscura">Texto</h2>
        <p className="subtitulo-seccion-oscura">Texto</p>

        <div className="marco-tarjeta-maqueta">
          <div className="texto-indicador-maqueta">
            MOCKUP DEL PANEL DE INICIO, CON MOVIMIENTO DE SCROLLING
          </div>
        </div>
      </section>

      {/* Sección de Texto Informativo 1 (Fondo Claro) */}
      <section className="seccion-texto-informativo">
        <span className="etiqueta-seccion-clara">Texto</span>
        <h2 className="titulo-seccion-clara">Texto</h2>
        <p className="subtitulo-seccion-clara">Texto</p>
      </section>

      {/* Sección de Texto Informativo 2 (Fondo Claro) */}
      <section className="seccion-texto-informativo" style={{ paddingTop: '20px' }}>
        <span className="etiqueta-seccion-clara">Texto</span>
        <h2 className="titulo-seccion-clara">Texto</h2>
        <p className="subtitulo-seccion-clara">Texto</p>
      </section>

      {/* Sección Grilla de Tarjetas */}
      <section className="seccion-grilla-tarjetas">
        <div className="contenedor-grilla-tarjetas">
          <div className="linea-divisoria-seccion"></div>
          
          <div className="encabezado-seccion-tarjetas">
            <span className="etiqueta-seccion-clara">Texto</span>
            <h2 className="titulo-seccion-clara" style={{ textAlign: 'left' }}>Texto</h2>
          </div>

          <div className="grilla-tarjetas-contenido">
            <div className="tarjeta-blanca-individual"></div>
            <div className="tarjeta-blanca-individual"></div>
            <div className="tarjeta-blanca-individual"></div>
            <div className="tarjeta-blanca-individual"></div>
            <div className="tarjeta-blanca-individual"></div>
            <div className="tarjeta-blanca-individual"></div>
          </div>
        </div>
      </section>

      {/* Sección Llamado a la Acción (CTA) */}
      <section className="seccion-llamado-accion">
        <span className="etiqueta-seccion-clara">Texto</span>
        <h2 className="titulo-llamado-accion">Texto</h2>
        <p className="subtitulo-llamado-accion">Texto</p>

        <div className="grupo-botones-llamado-accion">
          <button className="boton-redondeado-secundario">Boton</button>
          <button className="boton-redondeado-secundario">Boton</button>
        </div>

        <div className="linea-divisoria-inferior-cta"></div>
      </section>
    </div>
  )
}
