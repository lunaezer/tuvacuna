import type { PacienteResumen } from '../types'

export const pacientesMock: PacienteResumen[] = [
  {
    id: 1, nombre: 'Sofía', apellido: 'Gómez', edad: 32, dni: '34.XXX.XXX',
    obraSocial: 'OSDE 310', comorbilidades: [],
    dosisAplicadas: 16, cobertura: 80,
    ultimaVacuna: '2026-04-03', estado: 'atrasada',
    detalleEstado: 'Antitetánica vencida hace 34 días',
  },
  {
    id: 2, nombre: 'Tomás', apellido: 'Gómez', edad: 8, dni: '52.XXX.XXX',
    obraSocial: 'OSDE 310', comorbilidades: [],
    dosisAplicadas: 12, cobertura: 90,
    ultimaVacuna: '2026-01-20', estado: 'proxima',
  },
  {
    id: 3, nombre: 'Marta', apellido: 'Rivas', edad: 61, dni: '18.XXX.XXX',
    obraSocial: 'PAMI', comorbilidades: ['Hipertensión'],
    dosisAplicadas: 20, cobertura: 100,
    ultimaVacuna: '2025-02-08', estado: 'al-dia',
  },
  {
    id: 4, nombre: 'Lucas', apellido: 'Paz', edad: 27, dni: '38.XXX.XXX',
    obraSocial: 'Swiss Medical', comorbilidades: [],
    dosisAplicadas: 15, cobertura: 95,
    ultimaVacuna: '2025-12-14', estado: 'al-dia',
  },
]
