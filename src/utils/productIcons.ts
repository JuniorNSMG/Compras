// Ícones usando @iconify/react
// Formato: "conjunto:nome-do-icone"
export const PRODUCT_ICONS: Record<string, string> = {
  // Laticínios
  'leite': 'fluent-emoji:glass-of-milk',
  'iogurte': 'fluent-emoji:cup-with-straw',
  'queijo': 'fluent-emoji:cheese-wedge',
  'manteiga': 'fluent-emoji:butter',
  'requeijão': 'fluent-emoji:butter',

  // Padaria
  'pão': 'fluent-emoji:bread',
  'pao': 'fluent-emoji:bread',
  'torrada': 'fluent-emoji:bread',
  'bolo': 'fluent-emoji:birthday-cake',
  'croissant': 'fluent-emoji:croissant',

  // Carnes
  'carne': 'fluent-emoji:cut-of-meat',
  'frango': 'fluent-emoji:poultry-leg',
  'peixe': 'fluent-emoji:fish',
  'bacon': 'fluent-emoji:bacon',
  'salsicha': 'fluent-emoji:hot-dog',
  'linguiça': 'fluent-emoji:hot-dog',
  'linguica': 'fluent-emoji:hot-dog',

  // Frutas
  'maçã': 'fluent-emoji:red-apple',
  'maca': 'fluent-emoji:red-apple',
  'banana': 'fluent-emoji:banana',
  'laranja': 'fluent-emoji:tangerine',
  'uva': 'fluent-emoji:grapes',
  'morango': 'fluent-emoji:strawberry',
  'melancia': 'fluent-emoji:watermelon',
  'abacaxi': 'fluent-emoji:pineapple',
  'limão': 'fluent-emoji:lemon',
  'limao': 'fluent-emoji:lemon',
  'manga': 'fluent-emoji:mango',
  'pera': 'fluent-emoji:pear',
  'pêssego': 'fluent-emoji:peach',
  'pessego': 'fluent-emoji:peach',

  // Vegetais
  'tomate': 'fluent-emoji:tomato',
  'alface': 'fluent-emoji:leafy-green',
  'cenoura': 'fluent-emoji:carrot',
  'batata': 'fluent-emoji:potato',
  'cebola': 'fluent-emoji:onion',
  'alho': 'fluent-emoji:garlic',
  'brócolis': 'fluent-emoji:broccoli',
  'brocolis': 'fluent-emoji:broccoli',
  'berinjela': 'fluent-emoji:eggplant',
  'pimentão': 'fluent-emoji:bell-pepper',
  'pimentao': 'fluent-emoji:bell-pepper',
  'pepino': 'fluent-emoji:cucumber',

  // Grãos e massas
  'arroz': 'fluent-emoji:cooked-rice',
  'feijão': 'fluent-emoji:beans',
  'feijao': 'fluent-emoji:beans',
  'macarrão': 'fluent-emoji:spaghetti',
  'macarrao': 'fluent-emoji:spaghetti',
  'espaguete': 'fluent-emoji:spaghetti',

  // Bebidas
  'café': 'fluent-emoji:hot-beverage',
  'cafe': 'fluent-emoji:hot-beverage',
  'chá': 'fluent-emoji:teacup-without-handle',
  'cha': 'fluent-emoji:teacup-without-handle',
  'suco': 'fluent-emoji:beverage-box',
  'refrigerante': 'fluent-emoji:cup-with-straw',
  'cerveja': 'fluent-emoji:beer-mug',
  'vinho': 'fluent-emoji:wine-glass',
  'água': 'fluent-emoji:potable-water',
  'agua': 'fluent-emoji:potable-water',

  // Limpeza
  'detergente': 'fluent-emoji:soap',
  'sabão': 'fluent-emoji:soap',
  'sabao': 'fluent-emoji:soap',
  'desinfetante': 'fluent-emoji:soap',
  'amaciante': 'fluent-emoji:soap',
  'sabonete': 'fluent-emoji:soap',
  'shampoo': 'fluent-emoji:soap',
  'condicionador': 'fluent-emoji:soap',
  'pasta de dente': 'fluent-emoji:toothbrush',
  'escova de dente': 'fluent-emoji:toothbrush',

  // Outros
  'ovo': 'fluent-emoji:egg',
  'ovos': 'fluent-emoji:egg',
  'chocolate': 'fluent-emoji:chocolate-bar',
  'biscoito': 'fluent-emoji:cookie',
  'açúcar': 'fluent-emoji:salt',
  'acucar': 'fluent-emoji:salt',
  'sal': 'fluent-emoji:salt',
  'óleo': 'fluent-emoji:olive-oil',
  'oleo': 'fluent-emoji:olive-oil',
  'azeite': 'fluent-emoji:olive',
}

export const DEFAULT_ICON = 'fluent-emoji:shopping-cart'

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
