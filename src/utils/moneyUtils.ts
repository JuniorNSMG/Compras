/**
 * Formata valor para exibição no input (com vírgula)
 * Exemplo: 12.50 -> "12,50"
 */
export function formatarParaInput(valor: string | number | undefined): string {
  if (!valor && valor !== 0) return ''

  const numStr = typeof valor === 'number' ? valor.toString() : valor

  // Remove tudo que não é número ou vírgula/ponto
  const cleaned = numStr.replace(/[^\d,\.]/g, '')

  // Substitui ponto por vírgula
  const withComma = cleaned.replace('.', ',')

  return withComma
}

/**
 * Converte string do input para número
 * Exemplo: "12,50" -> 12.50
 */
export function converterParaNumero(valor: string): number | undefined {
  if (!valor) return undefined

  // Remove espaços e substitui vírgula por ponto
  const cleaned = valor.trim().replace(',', '.')

  // Tenta converter para número
  const num = parseFloat(cleaned)

  return isNaN(num) ? undefined : num
}

/**
 * Máscara de input monetário
 * Permite apenas números, vírgula e até 2 casas decimais
 */
export function aplicarMascaraMoeda(valor: string): string {
  // Remove tudo que não é número ou vírgula
  let cleaned = valor.replace(/[^\d,]/g, '')

  // Permite apenas uma vírgula
  const parts = cleaned.split(',')
  if (parts.length > 2) {
    cleaned = parts[0] + ',' + parts.slice(1).join('')
  }

  // Limita a 2 casas decimais após a vírgula
  if (parts.length === 2 && parts[1].length > 2) {
    cleaned = parts[0] + ',' + parts[1].substring(0, 2)
  }

  return cleaned
}
