export type ButtonVariant = 'primary' | 'secondary' | 'celeste' | 'outline' | 'big'

export type CardVariant = 'white' | 'dark'

export interface Familiar {
  id?: string
  nombre: string
  esVos?: boolean
  iniciales?: string
  colorBg?: string
}

export type EstadoDosis = 'atrasada' | 'pendiente' | 'aplicada'

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

export type EstadoTurno = 'agendado' | 'sin-agendar' | 'atrasado'

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
  tipo: 'turno' | 'hoy' | 'atrasado'
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
}