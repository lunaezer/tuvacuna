import type { PacienteDetalle } from '../types'

// '1993-05-14' -> 33 (se parte a mano para evitar líos de zona horaria)
export function calcularEdad(fechaNacimiento: string) {
  const [anio, mes, dia] = fechaNacimiento.split('-').map(Number)
  const hoy = new Date()
  let edad = hoy.getFullYear() - anio
  const yaCumplio =
    hoy.getMonth() + 1 > mes || (hoy.getMonth() + 1 === mes && hoy.getDate() >= dia)
  if (!yaCumplio) edad--
  return edad
}

export function resumirPaciente(detalle: PacienteDetalle) {
  const aplicadas = detalle.dosis.filter((d) => d.estado === 'aplicada').length
  const atrasadas = detalle.dosis.filter((d) => d.estado === 'atrasada')
  const debidas = aplicadas + atrasadas.length

  return {
    edad: calcularEdad(detalle.fechaNacimiento),
    dosisAplicadas: aplicadas,
    // de lo que ya debería tener, qué porcentaje tiene
    cobertura: debidas === 0 ? 100 : Math.round((aplicadas / debidas) * 100),
    detalleEstado:
      atrasadas.length === 0
        ? undefined
        : atrasadas.length === 1
          ? `${atrasadas[0].nombre} atrasada`
          : `${atrasadas.length} dosis atrasadas`,
  }
}
