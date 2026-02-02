export const PRODUCT_ICONS: Record<string, string> = {
  // Laticínios
  'leite': '🥛',
  'iogurte': '🥛',
  'queijo': '🧀',
  'manteiga': '🧈',
  'requeijão': '🧈',

  // Padaria
  'pão': '🍞',
  'pao': '🍞',
  'torrada': '🍞',
  'bolo': '🎂',
  'croissant': '🥐',

  // Carnes
  'carne': '🥩',
  'frango': '🍗',
  'peixe': '🐟',
  'bacon': '🥓',
  'salsicha': '🌭',
  'linguiça': '🌭',
  'linguica': '🌭',

  // Frutas
  'maçã': '🍎',
  'maca': '🍎',
  'banana': '🍌',
  'laranja': '🍊',
  'uva': '🍇',
  'morango': '🍓',
  'melancia': '🍉',
  'abacaxi': '🍍',
  'limão': '🍋',
  'limao': '🍋',
  'manga': '🥭',
  'pera': '🍐',
  'pêssego': '🍑',
  'pessego': '🍑',

  // Vegetais
  'tomate': '🍅',
  'alface': '🥬',
  'cenoura': '🥕',
  'batata': '🥔',
  'cebola': '🧅',
  'alho': '🧄',
  'brócolis': '🥦',
  'brocolis': '🥦',
  'berinjela': '🍆',
  'pimentão': '🫑',
  'pimentao': '🫑',
  'pepino': '🥒',

  // Grãos e massas
  'arroz': '🍚',
  'feijão': '🫘',
  'feijao': '🫘',
  'macarrão': '🍝',
  'macarrao': '🍝',
  'espaguete': '🍝',

  // Bebidas
  'café': '☕',
  'cafe': '☕',
  'chá': '🍵',
  'cha': '🍵',
  'suco': '🧃',
  'refrigerante': '🥤',
  'cerveja': '🍺',
  'vinho': '🍷',
  'água': '💧',
  'agua': '💧',

  // Limpeza
  'detergente': '🧴',
  'sabão': '🧼',
  'sabao': '🧼',
  'desinfetante': '🧴',
  'amaciante': '🧴',
  'sabonete': '🧼',
  'shampoo': '🧴',
  'condicionador': '🧴',
  'pasta de dente': '🦷',
  'escova de dente': '🪥',

  // Outros
  'ovo': '🥚',
  'ovos': '🥚',
  'chocolate': '🍫',
  'biscoito': '🍪',
  'açúcar': '🧂',
  'acucar': '🧂',
  'sal': '🧂',
  'óleo': '🛢️',
  'oleo': '🛢️',
  'azeite': '🫒',
}

export const DEFAULT_ICON = '🛒'

export function getProductIcon(nome: string, categoria?: string): string {
  const nomeLower = nome.toLowerCase()

  for (const [key, icon] of Object.entries(PRODUCT_ICONS)) {
    if (nomeLower.includes(key)) {
      return icon
    }
  }

  if (categoria) {
    const categoriaLower = categoria.toLowerCase()
    for (const [key, icon] of Object.entries(PRODUCT_ICONS)) {
      if (categoriaLower.includes(key)) {
        return icon
      }
    }
  }

  return DEFAULT_ICON
}

export function getCategoriaFromNome(nome: string): string {
  const nomeLower = nome.toLowerCase()

  const categorias: Record<string, string[]> = {
    'Laticínios': ['leite', 'iogurte', 'queijo', 'manteiga', 'requeijão'],
    'Padaria': ['pão', 'pao', 'torrada', 'bolo', 'croissant'],
    'Carnes': ['carne', 'frango', 'peixe', 'bacon', 'salsicha', 'linguiça', 'linguica'],
    'Frutas': ['maçã', 'maca', 'banana', 'laranja', 'uva', 'morango', 'melancia', 'abacaxi', 'limão', 'limao', 'manga', 'pera', 'pêssego', 'pessego'],
    'Vegetais': ['tomate', 'alface', 'cenoura', 'batata', 'cebola', 'alho', 'brócolis', 'brocolis', 'berinjela', 'pimentão', 'pimentao', 'pepino'],
    'Grãos': ['arroz', 'feijão', 'feijao', 'macarrão', 'macarrao', 'espaguete'],
    'Bebidas': ['café', 'cafe', 'chá', 'cha', 'suco', 'refrigerante', 'cerveja', 'vinho', 'água', 'agua'],
    'Limpeza': ['detergente', 'sabão', 'sabao', 'desinfetante', 'amaciante', 'sabonete', 'shampoo', 'condicionador'],
    'Higiene': ['pasta de dente', 'escova de dente', 'sabonete', 'shampoo', 'condicionador'],
  }

  for (const [categoria, palavras] of Object.entries(categorias)) {
    if (palavras.some(palavra => nomeLower.includes(palavra))) {
      return categoria
    }
  }

  return 'Outros'
}
