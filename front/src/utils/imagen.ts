const MAX_BYTES = 4 * 1024 * 1024 // el lector no acepta más de 4 MB
const TIPOS = ['image/jpeg', 'image/png', 'image/webp']

// Si la foto ya sirve se manda tal cual; si no, se achica con un canvas
export async function achicarSiHaceFalta(archivo: File): Promise<Blob> {
  if (archivo.size <= MAX_BYTES && TIPOS.includes(archivo.type)) return archivo

  const bitmap = await createImageBitmap(archivo)
  let escala = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height))

  for (let intento = 0; intento < 4; intento++) {
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * escala)
    canvas.height = Math.round(bitmap.height * escala)
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

    const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, 'image/jpeg', 0.85))
    if (blob && blob.size <= MAX_BYTES) return blob
    escala *= 0.7
  }
  throw new Error('La foto es demasiado pesada')
}
