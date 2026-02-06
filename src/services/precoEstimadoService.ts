/**
 * Serviço de estimativas de preços para produtos brasileiros
 * Valores em R$ (Real Brasileiro) - Médias 2024/2025
 * Formato: { nome: { preco, unidade } }
 */

interface PrecoInfo {
  preco: number  // Preço por unidade
  unidade: string  // Unidade padrão (kg, L, un)
}

// Banco de dados de preços estimados por nome de produto (em reais)
const PRECOS_ESTIMADOS: Record<string, PrecoInfo> = {
  // Frutas (preço por kg)
  'maçã': { preco: 6.50, unidade: 'kg' },
  'banana': { preco: 5.00, unidade: 'kg' },
  'laranja': { preco: 4.50, unidade: 'kg' },
  'mamão': { preco: 7.00, unidade: 'kg' },
  'melancia': { preco: 3.00, unidade: 'kg' },
  'melão': { preco: 4.00, unidade: 'kg' },
  'uva': { preco: 12.00, unidade: 'kg' },
  'morango': { preco: 18.00, unidade: 'kg' },
  'abacaxi': { preco: 7.00, unidade: 'un' },
  'manga': { preco: 7.00, unidade: 'kg' },
  'pera': { preco: 8.00, unidade: 'kg' },
  'limão': { preco: 4.00, unidade: 'kg' },
  'abacate': { preco: 7.00, unidade: 'kg' },
  'kiwi': { preco: 15.00, unidade: 'kg' },
  'coco': { preco: 5.00, unidade: 'un' },
  'tangerina': { preco: 5.00, unidade: 'kg' },
  'mexerica': { preco: 5.00, unidade: 'kg' },

  // Vegetais e Verduras
  'alface': { preco: 3.50, unidade: 'un' },
  'tomate': { preco: 7.00, unidade: 'kg' },
  'cebola': { preco: 5.00, unidade: 'kg' },
  'alho': { preco: 30.00, unidade: 'kg' },
  'batata': { preco: 5.00, unidade: 'kg' },
  'cenoura': { preco: 4.00, unidade: 'kg' },
  'beterraba': { preco: 4.50, unidade: 'kg' },
  'repolho': { preco: 4.00, unidade: 'kg' },
  'brócolis': { preco: 8.00, unidade: 'kg' },
  'couve': { preco: 3.00, unidade: 'un' },
  'couve-flor': { preco: 7.00, unidade: 'kg' },
  'pimentão': { preco: 8.00, unidade: 'kg' },
  'abobrinha': { preco: 5.00, unidade: 'kg' },
  'berinjela': { preco: 6.00, unidade: 'kg' },
  'pepino': { preco: 4.00, unidade: 'kg' },
  'rúcula': { preco: 4.00, unidade: 'un' },
  'agrião': { preco: 4.00, unidade: 'un' },
  'espinafre': { preco: 5.00, unidade: 'kg' },
  'cheiro-verde': { preco: 2.50, unidade: 'un' },
  'salsinha': { preco: 2.50, unidade: 'un' },
  'cebolinha': { preco: 2.50, unidade: 'un' },
  'coentro': { preco: 2.50, unidade: 'un' },

  // Carnes e Proteínas (preço por kg)
  'frango': { preco: 12.00, unidade: 'kg' },
  'carne': { preco: 40.00, unidade: 'kg' },
  'carne moída': { preco: 28.00, unidade: 'kg' },
  'picanha': { preco: 65.00, unidade: 'kg' },
  'costela': { preco: 35.00, unidade: 'kg' },
  'linguiça': { preco: 22.00, unidade: 'kg' },
  'salsicha': { preco: 24.00, unidade: 'kg' },
  'bacon': { preco: 35.00, unidade: 'kg' },
  'presunto': { preco: 40.00, unidade: 'kg' },
  'mortadela': { preco: 18.00, unidade: 'kg' },
  'peito de peru': { preco: 60.00, unidade: 'kg' },
  'ovo': { preco: 18.00, unidade: 'dz' },
  'ovos': { preco: 18.00, unidade: 'dz' },
  'peixe': { preco: 30.00, unidade: 'kg' },
  'tilápia': { preco: 28.00, unidade: 'kg' },
  'salmão': { preco: 65.00, unidade: 'kg' },

  // Laticínios
  'leite': { preco: 5.50, unidade: 'L' },
  'queijo': { preco: 50.00, unidade: 'kg' },
  'queijo mussarela': { preco: 55.00, unidade: 'kg' },
  'queijo prato': { preco: 52.00, unidade: 'kg' },
  'requeijão': { preco: 12.00, unidade: 'un' },
  'manteiga': { preco: 36.00, unidade: 'kg' },
  'margarina': { preco: 16.00, unidade: 'kg' },
  'iogurte': { preco: 5.00, unidade: 'un' },
  'creme de leite': { preco: 4.50, unidade: 'un' },
  'leite condensado': { preco: 7.00, unidade: 'un' },

  // Grãos e Cereais (pacote padrão 1kg)
  'arroz': { preco: 25.00, unidade: 'kg' },
  'feijão': { preco: 8.00, unidade: 'kg' },
  'macarrão': { preco: 4.50, unidade: 'un' },
  'farinha de trigo': { preco: 5.00, unidade: 'kg' },
  'farinha de mandioca': { preco: 6.00, unidade: 'kg' },
  'fubá': { preco: 4.00, unidade: 'kg' },
  'aveia': { preco: 8.00, unidade: 'kg' },
  'grão de bico': { preco: 12.00, unidade: 'kg' },
  'lentilha': { preco: 10.00, unidade: 'kg' },

  // Óleos e Temperos
  'óleo': { preco: 8.00, unidade: 'L' },
  'azeite': { preco: 50.00, unidade: 'L' },
  'vinagre': { preco: 4.00, unidade: 'L' },
  'sal': { preco: 2.00, unidade: 'kg' },
  'açúcar': { preco: 4.00, unidade: 'kg' },
  'café': { preco: 30.00, unidade: 'kg' },
  'chá': { preco: 6.00, unidade: 'un' },

  // Pães e Massas (por kg ou unidade)
  'pão': { preco: 18.00, unidade: 'kg' },
  'pão de forma': { preco: 9.00, unidade: 'un' },
  'pão francês': { preco: 18.00, unidade: 'kg' },
  'bolacha': { preco: 5.00, unidade: 'un' },
  'biscoito': { preco: 5.00, unidade: 'un' },
  'torrada': { preco: 7.00, unidade: 'un' },

  // Bebidas
  'refrigerante': { preco: 6.00, unidade: 'L' },
  'suco': { preco: 7.00, unidade: 'L' },
  'água': { preco: 3.00, unidade: 'L' },
  'cerveja': { preco: 4.50, unidade: 'un' },
  'vinho': { preco: 30.00, unidade: 'un' },

  // Higiene e Limpeza
  'sabão em pó': { preco: 15.00, unidade: 'kg' },
  'sabonete': { preco: 3.00, unidade: 'un' },
  'shampoo': { preco: 24.00, unidade: 'L' },
  'condicionador': { preco: 24.00, unidade: 'L' },
  'pasta de dente': { preco: 7.00, unidade: 'un' },
  'papel higiênico': { preco: 20.00, unidade: 'un' },
  'detergente': { preco: 3.00, unidade: 'un' },
  'desinfetante': { preco: 8.00, unidade: 'L' },
  'água sanitária': { preco: 5.00, unidade: 'L' },
  'amaciante': { preco: 10.00, unidade: 'L' },
  'esponja': { preco: 4.00, unidade: 'un' },
  'sabão em barra': { preco: 6.00, unidade: 'kg' },
  'álcool': { preco: 12.00, unidade: 'L' },
  'escova de dente': { preco: 8.00, unidade: 'un' },

  // Outros
  'arroz integral': { preco: 12.00, unidade: 'kg' },
  'chocolate': { preco: 40.00, unidade: 'kg' },
  'sorvete': { preco: 18.00, unidade: 'L' },
  'pizza': { preco: 25.00, unidade: 'un' },
  'hambúrguer': { preco: 30.00, unidade: 'kg' },
}

/**
 * Busca informações de preço estimado para um produto
 * Retorna null se não encontrar estimativa
 */
export function buscarPrecoEstimado(nomeProduto: string): PrecoInfo | null {
  const nomeNormalizado = nomeProduto.toLowerCase().trim()

  // Busca exata
  if (PRECOS_ESTIMADOS[nomeNormalizado]) {
    return PRECOS_ESTIMADOS[nomeNormalizado]
  }

  // Busca parcial (primeira palavra que bater)
  for (const [chave, info] of Object.entries(PRECOS_ESTIMADOS)) {
    if (nomeNormalizado.includes(chave) || chave.includes(nomeNormalizado)) {
      return info
    }
  }

  return null
}

/**
 * Calcula preço total considerando quantidade e unidade
 * Se o item não tem unidade ou é diferente da padrão, retorna preco_estimado direto
 */
export function calcularPrecoTotal(
  preco_estimado: number | undefined,
  quantidade: number | undefined,
  unidade: string | undefined,
  nomeProduto: string
): number | null {
  // Se tem preço customizado pelo usuário, usar ele
  if (preco_estimado !== undefined && preco_estimado !== null) {
    const qtd = quantidade || 1
    return preco_estimado * qtd
  }

  // Buscar preço estimado padrão
  const info = buscarPrecoEstimado(nomeProduto)
  if (!info) return null

  const qtd = quantidade || 1

  // Se a unidade coincide com a padrão, multiplicar
  if (unidade && unidade.toLowerCase() === info.unidade.toLowerCase()) {
    return info.preco * qtd
  }

  // Se não tem unidade ou é diferente, assumir que o preço é unitário
  return info.preco * qtd
}

/**
 * Formata preço em reais brasileiro
 */
export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco)
}

/**
 * Formata preço curto (sem símbolo R$, apenas com cifrão)
 */
export function formatarPrecoCompacto(preco: number): string {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`
}
