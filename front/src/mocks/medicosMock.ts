import type { Medico } from '../types'

// GET de médicos: los que ya aceptaron al paciente
export const medicosMock: Medico[] = [
  { id: 20, nombre: 'Carolina', apellido: 'Rivas', especialidad: 'Infectología', matricula: '112455', institucion: 'Hospital Regional' },
]

// Todos los médicos que "existen" en el back: de acá "busca" el mock
export const medicosExistentesMock: Medico[] = [
  ...medicosMock,
  { id: 21, nombre: 'Joaquín', apellido: 'Baranek', especialidad: 'Pediatría', matricula: '043056', institucion: 'Hospital Stamboulian' },
  { id: 22, nombre: 'Lucía', apellido: 'Méndez', especialidad: 'Clínica médica', matricula: '098321', institucion: 'Sanatorio Mater Dei' },
]
