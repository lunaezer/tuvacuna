export type ButtonVariant = 'primary' | 'secondary' | 'celeste' | 'outline' | 'big' | 'medium' | 'perfil' | 'aceptar' | 'rechazar'

export type CardVariant = 'white' | 'dark'

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

export type EstadoDosis = 'atrasada' | 'pendiente' | 'aplicada' | 'recomendada'

export interface Dosis {
  id: string
  titulo: string
  subtitulo: string
  estado: EstadoDosis
  etiqueta: string
  mostrarAgendar: boolean
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
    condiciones: string;
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