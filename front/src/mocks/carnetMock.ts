import type { Familiar, SeccionHistorial } from '../types'

// Respuesta hardcodeada de GET /api/familia
export const familiaMock: Familiar[] = [
  { id: '1', nombre: 'Sofi', esVos: true, iniciales: 'SG', colorBg: '#38bdf8' },
  { id: '2', nombre: 'Tomi', iniciales: 'TG', colorBg: '#fbbf24' },
  { id: '3', nombre: 'Maru', iniciales: 'MG', colorBg: '#34d399' },
]

// Respuesta hardcodeada de GET /api/carnet/:id
export const carnetMock: SeccionHistorial[] = [
  {
    grupo: 'Pendientes',
    esPendiente: true,
    dosis: [
      { id: 'd1', titulo: 'Antitetanica — Refuerzo', subtitulo: 'Venció el 20 de Jul de 2026', estado: 'atrasada', etiqueta: 'Atrasada', mostrarAgendar: true },
      { id: 'd2', titulo: 'HPV — Segunda dosis', subtitulo: '', estado: 'recomendada', etiqueta: 'Recomendada', mostrarAgendar: true },
    ],
  },
  {
    grupo: '2026',
    esPendiente: false,
    dosis: [
      { id: 'd3', titulo: 'Antigripal', subtitulo: '1 de agosto de 2026', estado: 'aplicada', etiqueta: 'Aplicada', mostrarAgendar: false },
      { id: 'd4', titulo: 'Triple viral — Segunda dosis', subtitulo: '15 de mayo de 2026', estado: 'aplicada', etiqueta: 'Aplicada', mostrarAgendar: false },
    ],
  },
  {
    grupo: '2019',
    esPendiente: false,
    dosis: [
      { id: 'd5', titulo: 'Vacuna covid', subtitulo: '3 de febrero de 2021', estado: 'aplicada', etiqueta: 'Aplicada', mostrarAgendar: false },
      { id: 'd6', titulo: 'VPH — Primera dosis', subtitulo: '2 de septiembre de 2020', estado: 'aplicada', etiqueta: 'Aplicada', mostrarAgendar: false },
    ],
  },
  {
    grupo: '2012-2009',
    esPendiente: false,
    dosis: [
      { id: 'd7', titulo: 'Esquema completo de la infancia', subtitulo: '', estado: 'aplicada', etiqueta: 'Aplicada', mostrarAgendar: false },
    ],
  },
]
