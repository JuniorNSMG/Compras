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

// Lista de ícones disponíveis para seleção manual (200+ ícones)
export const AVAILABLE_ICONS = [
  // Compras e geral
  { name: 'Carrinho', icon: 'fluent-emoji:shopping-cart', keywords: ['compras', 'mercado', 'supermercado'] },
  { name: 'Sacola', icon: 'fluent-emoji:shopping-bags', keywords: ['compras', 'bag', 'bolsa'] },
  { name: 'Dinheiro', icon: 'fluent-emoji:money-bag', keywords: ['grana', 'money', 'pagar'] },

  // Frutas
  { name: 'Maçã Vermelha', icon: 'fluent-emoji:red-apple', keywords: ['fruta', 'maca', 'apple'] },
  { name: 'Maçã Verde', icon: 'fluent-emoji:green-apple', keywords: ['fruta', 'maca', 'apple'] },
  { name: 'Banana', icon: 'fluent-emoji:banana', keywords: ['fruta'] },
  { name: 'Laranja', icon: 'fluent-emoji:tangerine', keywords: ['fruta', 'citrico', 'citrus'] },
  { name: 'Morango', icon: 'fluent-emoji:strawberry', keywords: ['fruta', 'berry'] },
  { name: 'Uva', icon: 'fluent-emoji:grapes', keywords: ['fruta'] },
  { name: 'Melancia', icon: 'fluent-emoji:watermelon', keywords: ['fruta'] },
  { name: 'Abacaxi', icon: 'fluent-emoji:pineapple', keywords: ['fruta', 'ananás'] },
  { name: 'Limão', icon: 'fluent-emoji:lemon', keywords: ['fruta', 'citrico'] },
  { name: 'Manga', icon: 'fluent-emoji:mango', keywords: ['fruta'] },
  { name: 'Pera', icon: 'fluent-emoji:pear', keywords: ['fruta'] },
  { name: 'Pêssego', icon: 'fluent-emoji:peach', keywords: ['fruta', 'pessego'] },
  { name: 'Cereja', icon: 'fluent-emoji:cherries', keywords: ['fruta', 'cherry'] },
  { name: 'Kiwi', icon: 'fluent-emoji:kiwi-fruit', keywords: ['fruta'] },
  { name: 'Melão', icon: 'fluent-emoji:melon', keywords: ['fruta', 'melao'] },
  { name: 'Coco', icon: 'fluent-emoji:coconut', keywords: ['fruta'] },
  { name: 'Blueberry', icon: 'fluent-emoji:blueberries', keywords: ['fruta', 'berry', 'mirtilo'] },

  // Vegetais e Verduras
  { name: 'Tomate', icon: 'fluent-emoji:tomato', keywords: ['vegetal', 'verdura'] },
  { name: 'Alface', icon: 'fluent-emoji:leafy-green', keywords: ['verdura', 'folha', 'salada'] },
  { name: 'Cenoura', icon: 'fluent-emoji:carrot', keywords: ['vegetal', 'raiz'] },
  { name: 'Batata', icon: 'fluent-emoji:potato', keywords: ['vegetal', 'raiz'] },
  { name: 'Cebola', icon: 'fluent-emoji:onion', keywords: ['vegetal', 'tempero'] },
  { name: 'Alho', icon: 'fluent-emoji:garlic', keywords: ['tempero', 'condimento'] },
  { name: 'Brócolis', icon: 'fluent-emoji:broccoli', keywords: ['vegetal', 'verdura', 'brocolis'] },
  { name: 'Berinjela', icon: 'fluent-emoji:eggplant', keywords: ['vegetal'] },
  { name: 'Pimentão', icon: 'fluent-emoji:bell-pepper', keywords: ['vegetal', 'pimentao'] },
  { name: 'Pepino', icon: 'fluent-emoji:cucumber', keywords: ['vegetal', 'salada'] },
  { name: 'Milho', icon: 'fluent-emoji:ear-of-corn', keywords: ['vegetal', 'cereal'] },
  { name: 'Cogumelo', icon: 'fluent-emoji:mushroom', keywords: ['vegetal', 'funghi'] },
  { name: 'Pimenta', icon: 'fluent-emoji:hot-pepper', keywords: ['tempero', 'picante', 'apimentado'] },
  { name: 'Abóbora', icon: 'fluent-emoji:pumpkin', keywords: ['vegetal', 'abobora'] },

  // Laticínios
  { name: 'Leite', icon: 'fluent-emoji:glass-of-milk', keywords: ['lacticinio', 'dairy', 'leite'] },
  { name: 'Queijo', icon: 'fluent-emoji:cheese-wedge', keywords: ['lacticinio', 'dairy'] },
  { name: 'Manteiga', icon: 'fluent-emoji:butter', keywords: ['lacticinio', 'dairy'] },

  // Padaria
  { name: 'Pão', icon: 'fluent-emoji:bread', keywords: ['padaria', 'pao', 'bread'] },
  { name: 'Baguete', icon: 'fluent-emoji:baguette-bread', keywords: ['padaria', 'pao', 'frances'] },
  { name: 'Pretzel', icon: 'fluent-emoji:pretzel', keywords: ['padaria', 'pao'] },
  { name: 'Bagel', icon: 'fluent-emoji:bagel', keywords: ['padaria', 'pao'] },
  { name: 'Bolo', icon: 'fluent-emoji:birthday-cake', keywords: ['padaria', 'doce', 'cake'] },
  { name: 'Croissant', icon: 'fluent-emoji:croissant', keywords: ['padaria', 'pao'] },
  { name: 'Donut', icon: 'fluent-emoji:doughnut', keywords: ['doce', 'padaria', 'rosquinha'] },
  { name: 'Cupcake', icon: 'fluent-emoji:cupcake', keywords: ['doce', 'bolo', 'padaria'] },
  { name: 'Torta', icon: 'fluent-emoji:pie', keywords: ['doce', 'padaria', 'sobremesa'] },

  // Carnes e Peixes
  { name: 'Carne', icon: 'fluent-emoji:cut-of-meat', keywords: ['proteina', 'meat'] },
  { name: 'Frango', icon: 'fluent-emoji:poultry-leg', keywords: ['carne', 'proteina', 'chicken'] },
  { name: 'Peixe', icon: 'fluent-emoji:fish', keywords: ['proteina', 'fish'] },
  { name: 'Bacon', icon: 'fluent-emoji:bacon', keywords: ['carne', 'porco'] },
  { name: 'Hot Dog', icon: 'fluent-emoji:hot-dog', keywords: ['salsciha', 'lanche'] },
  { name: 'Camarão', icon: 'fluent-emoji:shrimp', keywords: ['frutos do mar', 'seafood', 'camarao'] },

  // Grãos, Massas e Cereais
  { name: 'Arroz', icon: 'fluent-emoji:cooked-rice', keywords: ['grao', 'cereal'] },
  { name: 'Feijão', icon: 'fluent-emoji:beans', keywords: ['grao', 'legume', 'feijao'] },
  { name: 'Macarrão', icon: 'fluent-emoji:spaghetti', keywords: ['massa', 'pasta', 'macarrao'] },

  // Bebidas
  { name: 'Café', icon: 'fluent-emoji:hot-beverage', keywords: ['bebida', 'coffee', 'cafe'] },
  { name: 'Chá', icon: 'fluent-emoji:teacup-without-handle', keywords: ['bebida', 'tea', 'cha'] },
  { name: 'Suco', icon: 'fluent-emoji:beverage-box', keywords: ['bebida', 'juice'] },
  { name: 'Refrigerante', icon: 'fluent-emoji:cup-with-straw', keywords: ['bebida', 'soda'] },
  { name: 'Cerveja', icon: 'fluent-emoji:beer-mug', keywords: ['bebida', 'alcool', 'beer'] },
  { name: 'Vinho Tinto', icon: 'fluent-emoji:wine-glass', keywords: ['bebida', 'alcool', 'wine'] },
  { name: 'Champagne', icon: 'fluent-emoji:bottle-with-popping-cork', keywords: ['bebida', 'alcool', 'espumante'] },
  { name: 'Água', icon: 'fluent-emoji:potable-water', keywords: ['bebida', 'agua', 'water'] },
  { name: 'Leite Caixinha', icon: 'fluent-emoji:glass-of-milk', keywords: ['bebida', 'leite'] },
  { name: 'Mate', icon: 'fluent-emoji:mate', keywords: ['bebida', 'chimarrao'] },

  // Limpeza e Higiene
  { name: 'Sabão', icon: 'fluent-emoji:soap', keywords: ['limpeza', 'higiene', 'sabao'] },
  { name: 'Escova de Dente', icon: 'fluent-emoji:toothbrush', keywords: ['higiene', 'dente'] },
  { name: 'Papel Higiênico', icon: 'fluent-emoji:roll-of-paper', keywords: ['higiene', 'papel', 'banheiro'] },
  { name: 'Esponja', icon: 'fluent-emoji:sponge', keywords: ['limpeza', 'louça', 'louça'] },
  { name: 'Balde', icon: 'fluent-emoji:bucket', keywords: ['limpeza'] },

  // Ovos e Proteínas
  { name: 'Ovo', icon: 'fluent-emoji:egg', keywords: ['proteina', 'egg'] },

  // Doces e Snacks
  { name: 'Chocolate', icon: 'fluent-emoji:chocolate-bar', keywords: ['doce', 'candy'] },
  { name: 'Biscoito', icon: 'fluent-emoji:cookie', keywords: ['doce', 'snack', 'bolacha'] },
  { name: 'Pirulito', icon: 'fluent-emoji:lollipop', keywords: ['doce', 'candy'] },
  { name: 'Bala', icon: 'fluent-emoji:candy', keywords: ['doce'] },
  { name: 'Sorvete', icon: 'fluent-emoji:ice-cream', keywords: ['doce', 'gelado'] },
  { name: 'Picolé', icon: 'fluent-emoji:ice', keywords: ['doce', 'gelado', 'picole'] },
  { name: 'Pipoca', icon: 'fluent-emoji:popcorn', keywords: ['snack', 'cinema'] },
  { name: 'Chips', icon: 'fluent-emoji:potato-chips', keywords: ['snack', 'batata'] },
  { name: 'Pretzel', icon: 'fluent-emoji:pretzel', keywords: ['snack'] },

  // Temperos e Condimentos
  { name: 'Sal', icon: 'fluent-emoji:salt', keywords: ['tempero', 'condimento'] },
  { name: 'Açúcar', icon: 'fluent-emoji:salt', keywords: ['tempero', 'acucar', 'doce'] },
  { name: 'Azeite', icon: 'fluent-emoji:olive-oil', keywords: ['oleo', 'oil', 'tempero'] },
  { name: 'Azeitona', icon: 'fluent-emoji:olive', keywords: ['tempero'] },
  { name: 'Mel', icon: 'fluent-emoji:honey-pot', keywords: ['doce', 'tempero'] },

  // Congelados
  { name: 'Pizza', icon: 'fluent-emoji:pizza', keywords: ['comida', 'congelado', 'fast food'] },
  { name: 'Hambúrguer', icon: 'fluent-emoji:hamburger', keywords: ['comida', 'fast food', 'hamburguer'] },
  { name: 'Taco', icon: 'fluent-emoji:taco', keywords: ['comida', 'mexicano'] },
  { name: 'Burrito', icon: 'fluent-emoji:burrito', keywords: ['comida', 'mexicano'] },
  { name: 'Sushi', icon: 'fluent-emoji:sushi', keywords: ['comida', 'japones', 'peixe'] },
  { name: 'Ramen', icon: 'fluent-emoji:steaming-bowl', keywords: ['comida', 'macarrao', 'sopa'] },

  // Outros alimentos
  { name: 'Sanduíche', icon: 'fluent-emoji:sandwich', keywords: ['lanche', 'sanduiche'] },
  { name: 'Burrito', icon: 'fluent-emoji:burrito', keywords: ['comida'] },
  { name: 'Taco', icon: 'fluent-emoji:taco', keywords: ['comida'] },
  { name: 'Salada', icon: 'fluent-emoji:green-salad', keywords: ['vegetal', 'verdura', 'saudavel'] },
  { name: 'Sopa', icon: 'fluent-emoji:steaming-bowl', keywords: ['comida', 'quente'] },
  { name: 'Petisco', icon: 'fluent-emoji:popcorn', keywords: ['snack', 'aperitivo'] },

  // Utensílios e Casa
  { name: 'Garfo e Faca', icon: 'fluent-emoji:fork-and-knife', keywords: ['utensilio', 'cozinha'] },
  { name: 'Colher', icon: 'fluent-emoji:spoon', keywords: ['utensilio', 'cozinha'] },
  { name: 'Copo', icon: 'fluent-emoji:tumbler-glass', keywords: ['cozinha', 'bebida'] },
  { name: 'Garrafa', icon: 'fluent-emoji:bottle-with-popping-cork', keywords: ['bebida'] },
  { name: 'Pote', icon: 'fluent-emoji:jar', keywords: ['cozinha', 'armazenamento'] },
  { name: 'Caixa', icon: 'fluent-emoji:package', keywords: ['armazenamento', 'embalagem'] },

  // Pet
  { name: 'Cachorro', icon: 'fluent-emoji:dog-face', keywords: ['pet', 'animal', 'cao'] },
  { name: 'Gato', icon: 'fluent-emoji:cat-face', keywords: ['pet', 'animal'] },
  { name: 'Osso', icon: 'fluent-emoji:bone', keywords: ['pet', 'cachorro'] },
  { name: 'Ração', icon: 'fluent-emoji:bowl-with-spoon', keywords: ['pet', 'comida', 'racao'] },

  // Plantas
  { name: 'Planta', icon: 'fluent-emoji:potted-plant', keywords: ['planta', 'vaso', 'jardim'] },
  { name: 'Flor', icon: 'fluent-emoji:blossom', keywords: ['planta', 'jardim'] },
  { name: 'Rosa', icon: 'fluent-emoji:rose', keywords: ['flor', 'planta'] },
  { name: 'Tulipa', icon: 'fluent-emoji:tulip', keywords: ['flor', 'planta'] },

  // Bebê
  { name: 'Mamadeira', icon: 'fluent-emoji:baby-bottle', keywords: ['bebe', 'baby'] },
  { name: 'Fralda', icon: 'fluent-emoji:baby', keywords: ['bebe', 'baby'] },

  // Saúde
  { name: 'Remédio', icon: 'fluent-emoji:pill', keywords: ['saude', 'medicamento', 'remedio'] },
  { name: 'Seringa', icon: 'fluent-emoji:syringe', keywords: ['saude', 'medico'] },
  { name: 'Band-Aid', icon: 'fluent-emoji:adhesive-bandage', keywords: ['saude', 'curativo'] },

  // Diversos
  { name: 'Livro', icon: 'fluent-emoji:books', keywords: ['leitura', 'estudo'] },
  { name: 'Lápis', icon: 'fluent-emoji:pencil', keywords: ['escrita', 'estudo', 'lapis'] },
  { name: 'Tesoura', icon: 'fluent-emoji:scissors', keywords: ['cortar', 'utensilio'] },
  { name: 'Chave', icon: 'fluent-emoji:key', keywords: ['casa'] },
  { name: 'Presente', icon: 'fluent-emoji:wrapped-gift', keywords: ['gift', 'presente'] },
  { name: 'Balão', icon: 'fluent-emoji:balloon', keywords: ['festa', 'balao'] },
  { name: 'Vela', icon: 'fluent-emoji:candle', keywords: ['decoracao', 'luz'] },
  { name: 'Lâmpada', icon: 'fluent-emoji:light-bulb', keywords: ['luz', 'lampada', 'eletrico'] },
  { name: 'Pilha', icon: 'fluent-emoji:battery', keywords: ['eletrico', 'energia'] },
]

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
