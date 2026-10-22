export type ButtonVariant = 'primary' | 'secondary' | 'celeste' | 'outline' | 'big' | 'medium' | 'perfil' | 'aceptar' | 'rechazar'

export type CardVariant = 'white' | 'dark' | 'profile' | 'compact'

export interface Familiar {
  id?: string
  nombre: string
  esVos?: boolean
  iniciales?: string
  colorBg?: string
  edad?: number
}

export type RolInvitacion = 'medico' | 'familiar'

export interface Invitacion {
  id: string
  nombre: string
  apellido: string
  rol: RolInvitacion
}

// Solicitud que un paciente le manda al médico (el id es el de la solicitud, no el del paciente)
export interface SolicitudPaciente {
  id: number
  nombre: string
  apellido: string
  edad?: number // el back todavía no la manda
}

export type EstadoPaciente = 'atrasada' | 'proxima' | 'al-dia'

export interface PacienteResumen {
  id: number
  nombre: string
  apellido: string
  edad: number
  dni: string
  obraSocial: string
  comorbilidades: string[]
  dosisAplicadas: number
  cobertura: number // porcentaje
  ultimaVacuna: string // AAAA-MM-DD
  estado: EstadoPaciente
  detalleEstado?: string // ej: "Antitetánica vencida hace 34 días"
}

export type EstadoDosis = 'atrasada' | 'pendiente' | 'aplicada' | 'recomendada'

export interface Dosis {
  id: number
  nombre: string
  estado: EstadoDosis
  fecha_de_aplicacion?: string // solo en las aplicadas (AAAA-MM-DD)
  lote?: string
  marca?: string
  lugar?: string
}

export interface SeccionHistorial {
  grupo: string
  esPendiente: boolean
  dosis: Dosis[]
}

export type EstadoTurno = 'agendado' | 'sin-agendar' | 'atrasado' | 'recomendado'

export interface Turno {
  dia: string
  mes: string
  titulo: string
  lugar: string | null
  hora: string | null
  estado: EstadoTurno
  etiqueta?: string
}

export interface DiaMarcado {
  dia: number
  mes: number
  anio: number
  tipo: 'turno' | 'hoy' | 'atrasado' | 'recomendado'
}

export interface RegistroData {
    name: string;
    surname: string;
    email: string;
    id: string;
    password: string;
    profile: "paciente" | "medico" | "";
    birthDate: string;
    sex: string;
    obraSocial: string;
    comorbilidades: number[];
    matricula: string;
    especialidad: string;
    institucion: string;
}

export interface formDataTurno {
  vacuna: string;
  fecha: string;
  hora: string | null;
  lugar: string;

}