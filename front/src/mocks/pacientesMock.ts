import type { Dosis, PacienteDetalle, PacienteLista, SeccionHistorial } from '../types'

// ---------------------------------------------------------------------------
// Mock de lo que mandaría el back:
//   GET /api/medico/pacientes      -> pacientesListaMock
//   GET /api/medico/pacientes/:id  -> pacientesDetalleMock[id]
// ---------------------------------------------------------------------------

const aplicada = (id: number, nombre: string, fecha: string): Dosis => ({
  id, nombre, estado: 'aplicada', fecha_de_aplicacion: fecha,
})

export const pacientesListaMock: PacienteLista[] = [
  { id: 1, nombre: 'Sofía', apellido: 'Gómez', dni: '34.XXX.XXX', ultimaVacuna: '2026-04-03', estado: 'atrasada' },
  { id: 2, nombre: 'Tomás', apellido: 'Gómez', dni: '52.XXX.XXX', ultimaVacuna: '2026-01-20', estado: 'proxima' },
  { id: 3, nombre: 'Marta', apellido: 'Rivas', dni: '18.XXX.XXX', ultimaVacuna: '2025-02-08', estado: 'al-dia' },
  { id: 4, nombre: 'Lucas', apellido: 'Paz', dni: '38.XXX.XXX', ultimaVacuna: '2025-12-14', estado: 'al-dia' },
]

export const pacientesDetalleMock: Record<number, PacienteDetalle> = {
  1: {
    id: 1,
    fechaNacimiento: '1993-05-14',
    obraSocial: 'OSDE 310',
    comorbilidades: [],
    dosis: [
      aplicada(1, 'Hepatitis B', '2011-06-02'),
      aplicada(2, 'Triple viral — Segunda dosis', '2018-05-10'),
      aplicada(3, 'Vacuna covid', '2021-02-03'),
      aplicada(4, 'Antigripal', '2026-04-03'),
      { id: 5, nombre: 'Antitetánica — Refuerzo', estado: 'atrasada' },
      { id: 6, nombre: 'HPV — Segunda dosis', estado: 'recomendada' },
    ],
  },
  2: {
    id: 2,
    fechaNacimiento: '2018-03-22',
    obraSocial: 'OSDE 310',
    comorbilidades: [],
    dosis: [
      aplicada(1, 'Hepatitis B', '2018-03-25'),
      aplicada(2, 'Quíntuple — Primera dosis', '2018-06-01'),
      aplicada(3, 'Triple viral — Primera dosis', '2019-03-30'),
      aplicada(4, 'Antigripal', '2026-01-20'),
      { id: 5, nombre: 'Refuerzo de ingreso escolar', estado: 'recomendada' },
    ],
  },
  3: {
    id: 3,
    fechaNacimiento: '1965-08-30',
    obraSocial: 'PAMI',
    comorbilidades: ['Hipertensión'],
    dosis: [
      aplicada(1, 'Doble bacteriana', '2019-05-12'),
      aplicada(2, 'Neumococo', '2024-04-18'),
      aplicada(3, 'Antigripal', '2025-02-08'),
    ],
  },
  4: {
    id: 4,
    fechaNacimiento: '1998-11-04',
    obraSocial: 'Swiss Medical',
    comorbilidades: [],
    dosis: [
      aplicada(1, 'Triple viral — Segunda dosis', '2015-04-20'),
      aplicada(2, 'Vacuna covid', '2021-07-15'),
      aplicada(3, 'Antigripal', '2025-12-14'),
    ],
  },
}

// GET /api/carnet/:idPaciente -> las mismas dosis del detalle, agrupadas como las manda el back:
// primero "Pendientes" y después un grupo por año, del más nuevo al más viejo
function armarCarnet(dosis: Dosis[]): SeccionHistorial[] {
  const pendientes = dosis.filter((d) => d.estado !== 'aplicada')
  const aplicadas = dosis
    .filter((d) => d.estado === 'aplicada')
    .sort((a, b) => (b.fecha_de_aplicacion ?? '').localeCompare(a.fecha_de_aplicacion ?? ''))

  const porAnio = new Map<string, Dosis[]>()
  aplicadas.forEach((d) => {
    const anio = (d.fecha_de_aplicacion ?? '').slice(0, 4)
    porAnio.set(anio, [...(porAnio.get(anio) ?? []), d])
  })

  return [
    ...(pendientes.length > 0 ? [{ grupo: 'Pendientes', esPendiente: true, dosis: pendientes }] : []),
    ...[...porAnio].map(([grupo, dosisDelAnio]) => ({ grupo, esPendiente: false, dosis: dosisDelAnio })),
  ]
}

export const carnetsPacientesMock: Record<number, SeccionHistorial[]> = Object.fromEntries(
  Object.entries(pacientesDetalleMock).map(([id, detalle]) => [Number(id), armarCarnet(detalle.dosis)]),
)
