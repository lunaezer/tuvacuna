import { useReducedMotion } from 'framer-motion'

// Animaciones de la landing. Con "reducir movimiento" activado en el sistema no se anima nada
export const useAnimacionesHome = () => {
  const reducir = useReducedMotion()

  const aparecer = (delay = 0) =>
    reducir
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: 'easeOut' as const },
        }

  const enfocar = (delay = 0) =>
    reducir
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: 'blur(12px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.8, delay, ease: 'easeOut' as const },
        }

  const flotar = (delay = 0, alto = 14, duracion = 5, giro = 0) =>
    reducir
      ? {}
      : {
          animate: { y: [0, -alto, 0], rotate: [0, giro, 0] },
          transition: { duration: duracion, delay, repeat: Infinity, ease: 'easeInOut' as const },
        }

  const regla = reducir
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true },
        transition: { duration: 0.9, ease: 'easeOut' as const },
        style: { originX: 0 },
      }

  return { reducir, aparecer, enfocar, flotar, regla }
}
