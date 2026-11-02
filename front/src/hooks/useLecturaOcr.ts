import { useCallback, useEffect, useRef, useState } from 'react'
import { API_URL } from '../config'
import { useUsuario } from '../context/UsuarioContext/useUsuario'
import { achicarSiHaceFalta } from '../utils/imagen'
import type { RegistroOcr } from '../types'

export type EstadoLectura = 'inactivo' | 'subiendo' | 'leyendo' | 'listo' | 'error'

const CADA_MS = 2500
const MAX_ESPERA_MS = 3 * 60 * 1000 // el back avisa que puede tardar más de un minuto

const esperar = (ms: number) => new Promise((ok) => setTimeout(ok, ms))

// Sube la foto del carnet y consulta cada 2,5 segundos hasta que el lector termina
export function useLecturaOcr() {
  const { token } = useUsuario()
  const [estado, setEstado] = useState<EstadoLectura>('inactivo')
  const [etapa, setEtapa] = useState('') // por ejemplo "Leyendo tabla"
  const [registros, setRegistros] = useState<RegistroOcr[]>([])
  const [error, setError] = useState('')
  const montado = useRef(true)

  // al desmontar (se cerró el modal) deja de consultar
  useEffect(() => {
    montado.current = true
    return () => { montado.current = false }
  }, [])

  const fallar = (mensaje: string) => {
    setError(mensaje)
    setEstado('error')
  }

  const leer = useCallback(async (archivo: File) => {
    setEstado('subiendo')
    setError('')
    try {
      const imagen = await achicarSiHaceFalta(archivo)
      const res = await fetch(`${API_URL}/api/ocr/lecturas`, {
        method: 'POST',
        headers: { 'Content-Type': imagen.type, Authorization: `Bearer ${token}` },
        body: imagen, // la foto tal cual, no JSON
      })
      if (!res.ok) {
        if (res.status === 429) return fallar('El lector está ocupado, probá en un momento')
        if (res.status === 502) return fallar('El lector no está disponible, cargá las dosis a mano')
        const data = await res.json().catch(() => null)
        return fallar(data?.mensaje ?? 'No se pudo subir la foto')
      }

      const { lectura_id } = await res.json()
      setEstado('leyendo')

      const inicio = Date.now()
      while (montado.current) {
        if (Date.now() - inicio > MAX_ESPERA_MS) return fallar('El lector tardó demasiado, probá de nuevo')
        await esperar(CADA_MS)
        if (!montado.current) return

        const r = await fetch(`${API_URL}/api/ocr/lecturas/${lectura_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (r.status === 422) return fallar('El lector no pudo leer la foto. Probá con una más nítida')
        if (r.status === 502) return fallar('El lector no está disponible, cargá las dosis a mano')
        if (!r.ok) return fallar('No se pudo leer el carnet')

        const data = await r.json()
        if (data.estado === 'listo') {
          // la lectura se cierra: una consulta más daría 404
          setRegistros(data.registros)
          setEstado('listo')
          return
        }
        setEtapa(data.etapa ?? '')
      }
    } catch (e) {
      fallar(e instanceof Error && e.message ? e.message : 'No se pudo conectar con el servidor')
    }
  }, [token])

  return { estado, etapa, registros, error, leer }
}
