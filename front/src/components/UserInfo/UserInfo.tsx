import { useNavigate } from "react-router-dom"
import Cards from "../Cards/Cards"
import Iniciales from "../Iniciales/Iniciales"
import Button from "../Button/Button"
import { useUsuario } from "../../context/UsuarioContext/useUsuario"
import "./UserInfo.css"

function calcularEdad(fechaNacimiento?: string) {
    if (!fechaNacimiento) return null
    const nac = new Date(fechaNacimiento)
    if (isNaN(nac.getTime())) return null
    const hoy = new Date()
    let edad = hoy.getFullYear() - nac.getFullYear()
    const yaCumplio =
        hoy.getMonth() > nac.getMonth() ||
        (hoy.getMonth() === nac.getMonth() && hoy.getDate() >= nac.getDate())
    if (!yaCumplio) edad--
    return edad
}

export default function UserInfo() {
    const { usuario } = useUsuario()
    const navigate = useNavigate()

    if (!usuario) return null

    const edad = calcularEdad(usuario.fechaNacimiento)
    const cantCondiciones = usuario.comorbilidades?.length ?? 0

    const detalles = [
        edad !== null ? `${edad} años` : null,
        usuario.obraSocial || null,
        cantCondiciones === 0
            ? "sin condiciones registradas"
            : `${cantCondiciones} condición${cantCondiciones > 1 ? "es" : ""} registrada${cantCondiciones > 1 ? "s" : ""}`,
    ].filter(Boolean)

    return (
        <Cards variant="compact" className="user-info">
            <div className="user-info__avatar">
                <Iniciales nombre={usuario.nombre} />
                <span className="user-info__estado" />
            </div>

            <div className="user-info__datos">
                <span className="user-info__label">TU PERFIL</span>
                <h2 className="user-info__nombre">{usuario.nombre}</h2>
                <p className="user-info__detalle">{detalles.join(" · ")}</p>
            </div>

            <Button variant="perfil" onClick={() => navigate("/perfil")}>
                Ver mi perfil ›
            </Button>
        </Cards>
    )
}
