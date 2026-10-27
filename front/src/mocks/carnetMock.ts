import type { Familiar, Invitacion, SeccionHistorial } from '../types'

// Respuesta hardcodeada de GET /api/familia/solicitudes/recibidas
export const invitacionesMock: Invitacion[] = [
  { id: 'i1', nombre: 'Juliana', apellido: 'Pane' },
]

// Respuesta hardcodeada de GET /api/familia
export const familiaMock: Familiar[] = [
  { id: '1', nombre: 'Sofi', esVos: true, iniciales: 'SG', colorBg: '#38bdf8', edad: 32 },
  { id: '2', nombre: 'Tomi', iniciales: 'TG', colorBg: '#fbbf24', edad: 7 },
  { id: '3', nombre: 'Maru', iniciales: 'MG', colorBg: '#34d399', edad: 68 },
]

// Respuesta hardcodeada de GET /api/carnet/:id (carnet propio)
const carnetPropio: SeccionHistorial[] = [
  {
    grupo: 'Pendientes',
    esPendiente: true,
    dosis: [
      { id: 1, nombre: 'Antitetanica — Refuerzo', estado: 'atrasada' },
      { id: 2, nombre: 'HPV — Segunda dosis', estado: 'recomendada' },
    ],
  },
  {
    grupo: '2026',
    esPendiente: false,
    dosis: [
      { id: 3, nombre: 'Antigripal', estado: 'aplicada', fecha_de_aplicacion: '2026-08-01' },
      { id: 4, nombre: 'Triple viral — Segunda dosis', estado: 'aplicada', fecha_de_aplicacion: '2026-05-15' },
    ],
  },
  {
    grupo: '2019',
    esPendiente: false,
    dosis: [
      { id: 5, nombre: 'Vacuna covid', estado: 'aplicada', fecha_de_aplicacion: '2021-02-03' },
      { id: 6, nombre: 'VPH — Primera dosis', estado: 'aplicada', fecha_de_aplicacion: '2020-09-02' },
    ],
  },
  {
    grupo: '2012-2009',
    esPendiente: false,
    dosis: [
      { id: 7, nombre: 'Esquema completo de la infancia', estado: 'aplicada' },
    ],
  },
]

// GET /api/carnet/:id/:idFamiliar
const carnetTomi: SeccionHistorial[] = [
  {
    grupo: 'Pendientes',
    esPendiente: true,
    dosis: [
      { id: 8, nombre: 'Triple viral — Refuerzo', estado: 'recomendada' },
    ],
  },
  {
    grupo: '2024',
    esPendiente: false,
    dosis: [
      { id: 9, nombre: 'Antigripal', estado: 'aplicada', fecha_de_aplicacion: '2024-04-12' },
    ],
  },
]

const carnetMaru: SeccionHistorial[] = [
  {
    grupo: '2025',
    esPendiente: false,
    dosis: [
      { id: 10, nombre: 'Doble adultos', estado: 'aplicada', fecha_de_aplicacion: '2025-03-03' },
      { id: 11, nombre: 'Hepatitis B — Tercera dosis', estado: 'aplicada', fecha_de_aplicacion: '2025-01-20' },
    ],
  },
]

// Poner en true para ver la pantalla "Traé tu carnet"
const YO_SIN_VACUNAS = true

// Clave: id del familiar, o 'yo' para el carnet propio
export const carnetsMock: Record<string, SeccionHistorial[]> = {
  yo: YO_SIN_VACUNAS ? [] : carnetPropio,
  '2': carnetTomi,
  '3': carnetMaru,
}
