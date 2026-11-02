export type ButtonVariant = 'primary' | 'secondary' | 'celeste' | 'outline' | 'big' | 'medium' | 'perfil' | 'aceptar' | 'rechazar' | 'peligro'

export type CardVariant = 'white' | 'dark' | 'profile' | 'compact'

export interface Familiar {
  id?: number // id_paciente
  nombre: string
  apellido?: string
  esVos?: boolean
  iniciales?: string
  colorBg?: string // lo elige el front, el back no lo manda
  edad?: number
}

export interface Invitacion {
  id: number
  solicitante: { nombre: string; apellido: string; mail: string }
  fecha: string
}

// Alguien que puede ver mi carnet (GET /api/familia/acceso). El id es el del vínculo.
export interface AccesoFamiliar {
  id: number
  id_paciente: number
  nombre: string
  apellido: string
  mail: string
}

// Solicitud que mandé y todavía no contestaron (GET /api/familia/solicitudes/enviadas)
export interface SolicitudEnviada {
  id: number
  destinatario: { nombre: string; apellido: string; mail: string }
  estado: string
}

// Solicitud que un paciente le manda al médico (el id es el de la solicitud, no el del paciente)
export interface SolicitudPaciente {
  id: number
  nombre: string
  apellido: string
  edad?: number // el back todavía no la manda
  respuesta?: 'aceptada' | 'rechazada' // se marca al responder, para mostrar la confirmación un momento
}

// Un médico que ya atiende al paciente
export interface Medico {
  id: number
  nombre: string
  apellido: string
  especialidad: string
  matricula?: string                      // /api/perfil/medicos no la manda
  institucion?: string
  estado?: 'aceptado' | 'pendiente'       // solo viene en /api/perfil/medicos
  idVinculo?: number                      // para quitar al médico (DELETE)
}

// 'sin-evaluar': el back todavía no calcula las dosis atrasadas/próximas
export type EstadoPaciente = 'atrasada' | 'proxima' | 'al-dia' | 'sin-evaluar'

// GET /api/medico/pacientes: lo justo para la tabla
export interface PacienteLista {
  id: number
  nombre: string
  apellido: string
  dni: string
  ultimaVacuna: string | null // AAAA-MM-DD
  estado: EstadoPaciente
}

// GET /api/medico/pacientes/:id: datos crudos, el front calcula el resto
export interface PacienteDetalle {
  id: number
  fechaNacimiento: string // AAAA-MM-DD
  obraSocial: string
  comorbilidades: string[]
  dosis: Dosis[]
}

export type EstadoDosis = 'atrasada' | 'pendiente' | 'aplicada' | 'recomendada'

export interface Dosis {
  id: number
  id_vacuna?: number      // la vacuna a la que apunta la dosis; hace falta para agendar
  nombre: string
  dosis?: string          // cuál es y cuándo corresponde, ej: "2ª dosis (4 meses)"
  en_calendario?: boolean // false = fuera del Calendario Nacional
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

export type EstadoTurno = 'pendiente' | 'aplicada' | 'atrasada' | 'recomendada'

export interface Turno {
  id: number
  fecha: string // AAAA-MM-DD
  id_vacuna: number
  nombre: string
  dosis: string | null
  dia: number
  mes: number // 0-11, igual que Date
  anio: number
  lugar: string | null
  hora: string | null
  estado: EstadoTurno
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
  idVacuna: string;
  fecha: string;
  hora: string | null;
  lugar: string;

}
export type FiltroCentros = 'todos' | 'publicos' | 'privados'

export interface Centro {
  id: number
  nombre: string
  direccion: string
  lat: number
  lng: number
  tipo: 'publico' | 'privado'
}
