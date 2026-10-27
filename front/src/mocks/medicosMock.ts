import type { Medico } from '../types'

// GET de médicos: los que ya aceptaron al paciente
export const medicosMock: Medico[] = [
  { id: 20, nombre: 'Carolina', apellido: 'Rivas', especialidad: 'Infectología', matricula: '112455', institucion: 'Hospital Regional' },
]

// Todos los médicos que "existen" en el back, con el mail que usa para identificarlos
export const medicosExistentesMock: (Medico & { mail: string })[] = [
  { ...medicosMock[0], mail: 'carolina.rivas@correo.com' },
  { id: 21, nombre: 'Joaquín', apellido: 'Baranek', especialidad: 'Pediatría', matricula: '043056', institucion: 'Hospital Stamboulian', mail: 'joaquin.baranek@correo.com' },
  { id: 22, nombre: 'Lucía', apellido: 'Méndez', especialidad: 'Clínica médica', matricula: '098321', institucion: 'Sanatorio Mater Dei', mail: 'lucia.mendez@correo.com' },
]
