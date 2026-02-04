/**
 * Formata texto para Title Case (Primeira Letra Maiúscula)
 * Exemplo: "coca cola" -> "Coca Cola"
 * Exemplo: "REFRIGERANTE" -> "Refrigerante"
 */
export function toTitleCase(text: string): string {
  if (!text) return ''

  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/**
 * Verifica se o texto é muito longo para o card
 * Considera longo se tiver mais de 12 caracteres ou palavra única com mais de 10
 */
export function isLongText(text: string): boolean {
  if (!text) return false

  const words = text.trim().split(' ')

  // Se tem apenas uma palavra e ela é longa (ex: "Refrigerante")
  if (words.length === 1 && text.length > 10) {
    return true
  }

  // Se o texto total é muito longo
  if (text.length > 15) {
    return true
  }

  return false
}
