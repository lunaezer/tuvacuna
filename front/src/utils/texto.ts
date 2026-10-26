// Pasa a minúsculas y saca las tildes: 'Sofía' -> 'sofia'. Sirve para comparar al buscar.
export function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}
