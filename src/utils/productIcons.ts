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

export const CATEGORIAS: Record<string, string[]> = {
  'Laticínios': ['leite', 'iogurte', 'queijo', 'manteiga', 'requeijão', 'cream cheese', 'nata', 'coalhada'],
  'Padaria': ['pão', 'pao', 'torrada', 'bolo', 'croissant', 'bisnaga', 'sonho', 'rosca'],
  'Carnes e Peixes': ['carne', 'frango', 'peixe', 'bacon', 'salsicha', 'linguiça', 'linguica', 'file', 'filé', 'costela', 'picanha'],
  'Frutas': ['maçã', 'maca', 'banana', 'laranja', 'uva', 'morango', 'melancia', 'abacaxi', 'limão', 'limao', 'manga', 'pera', 'pêssego', 'pessego', 'kiwi', 'melão', 'melao', 'mamão', 'mamao'],
  'Vegetais e Verduras': ['tomate', 'alface', 'cenoura', 'batata', 'cebola', 'alho', 'brócolis', 'brocolis', 'berinjela', 'pimentão', 'pimentao', 'pepino', 'couve', 'espinafre', 'repolho'],
  'Grãos e Massas': ['arroz', 'feijão', 'feijao', 'macarrão', 'macarrao', 'espaguete', 'lentilha', 'grão de bico', 'grao', 'farinha'],
  'Bebidas': ['café', 'cafe', 'chá', 'cha', 'suco', 'refrigerante', 'cerveja', 'vinho', 'água', 'agua', 'energético', 'energetico', 'isotônico', 'isotonico'],
  'Limpeza': ['detergente', 'sabão', 'sabao', 'desinfetante', 'amaciante', 'água sanitária', 'agua sanitaria', 'esponja', 'pano', 'alvejante'],
  'Higiene Pessoal': ['pasta de dente', 'escova de dente', 'sabonete', 'shampoo', 'condicionador', 'desodorante', 'papel higiênico', 'papel higienico', 'fio dental'],
  'Doces e Guloseimas': ['chocolate', 'bala', 'chiclete', 'sorvete', 'bombom', 'pirulito', 'brigadeiro', 'paçoca', 'pacoca', 'doce'],
  'Congelados': ['sorvete', 'pizza congelada', 'lasanha congelada', 'hambúrguer', 'hamburguer', 'nuggets', 'batata congelada'],
  'Temperos e Condimentos': ['sal', 'açúcar', 'acucar', 'óleo', 'oleo', 'azeite', 'vinagre', 'pimenta', 'orégano', 'oregano', 'cominho'],
  'Ovos': ['ovo', 'ovos'],
  'Biscoitos e Snacks': ['biscoito', 'bolacha', 'salgadinho', 'chips'],
}

export const ORDEM_CATEGORIAS = [
  'Frutas',
  'Vegetais e Verduras',
  'Laticínios',
  'Carnes e Peixes',
  'Ovos',
  'Padaria',
  'Grãos e Massas',
  'Doces e Guloseimas',
  'Biscoitos e Snacks',
  'Bebidas',
  'Congelados',
  'Temperos e Condimentos',
  'Limpeza',
  'Higiene Pessoal',
  'Outros'
]

export function getCategoriaFromNome(nome: string): string {
  const nomeLower = nome.toLowerCase()

  for (const [categoria, palavras] of Object.entries(CATEGORIAS)) {
    if (palavras.some(palavra => nomeLower.includes(palavra))) {
      return categoria
    }
  }

  return 'Outros'
}
