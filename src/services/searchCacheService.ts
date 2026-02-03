import { supabase } from '@/lib/supabase'
import { historicoComprasService } from './historicoComprasService'

export interface SearchCacheItem {
  nome: string
  icon_name: string
  categoria: string
  frequency?: number
}

class SearchCacheService {
  private cache: SearchCacheItem[] = []
  private lastUpdate: number = 0
  private updateInterval: number = 5 * 60 * 1000 // 5 minutos
  private isLoading: boolean = false

  // Inicializar cache ao carregar o app
  async initializeCache(userId: string): Promise<void> {
    if (this.isLoading) return

    try {
      this.isLoading = true

      // Carregar do localStorage primeiro (cache persistente)
      const cached = localStorage.getItem(`search_cache_${userId}`)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          this.cache = parsed.items || []
          this.lastUpdate = parsed.timestamp || 0
        } catch (e) {
          console.error('Erro ao carregar cache:', e)
        }
      }

      // Se o cache está desatualizado, atualizar em background
      const now = Date.now()
      if (now - this.lastUpdate > this.updateInterval) {
        this.updateCache(userId)
      }
    } finally {
      this.isLoading = false
    }
  }

  // Atualizar cache com dados do banco
  async updateCache(userId: string): Promise<void> {
    try {
      const items: SearchCacheItem[] = []
      const uniqueNames = new Set<string>()

      // 1. Buscar histórico de compras (mais relevante)
      const historico = await historicoComprasService.getFrequentementeComprados(userId, 1)
      historico.forEach(h => {
        const nameLower = h.item_nome.toLowerCase()
        if (!uniqueNames.has(nameLower)) {
          uniqueNames.add(nameLower)
          items.push({
            nome: h.item_nome,
            icon_name: h.icon_name,
            categoria: h.categoria,
            frequency: h.purchase_count
          })
        }
      })

      // 2. Buscar todas as listas do usuário
      const { data: listas } = await supabase
        .from('listas')
        .select('id')
        .eq('user_id', userId)

      if (listas && listas.length > 0) {
        const listaIds = listas.map(l => l.id)

        // 3. Buscar todos os itens únicos das listas
        const { data: itens } = await supabase
          .from('itens')
          .select('nome, icon_name, categoria')
          .in('lista_id', listaIds)
          .order('created_at', { ascending: false })
          .limit(200)

        itens?.forEach(item => {
          const nameLower = item.nome.toLowerCase()
          if (!uniqueNames.has(nameLower)) {
            uniqueNames.add(nameLower)
            items.push({
              nome: item.nome,
              icon_name: item.icon_name,
              categoria: item.categoria
            })
          }
        })
      }

      // Atualizar cache em memória e localStorage
      this.cache = items
      this.lastUpdate = Date.now()

      localStorage.setItem(`search_cache_${userId}`, JSON.stringify({
        items: this.cache,
        timestamp: this.lastUpdate
      }))
    } catch (error) {
      console.error('Erro ao atualizar cache de busca:', error)
    }
  }

  // Busca instantânea no cache local (substring match)
  search(query: string): SearchCacheItem[] {
    if (!query || query.length < 1) return []

    const searchLower = query.toLowerCase().trim()

    // Buscar por substring no nome
    const results = this.cache.filter(item =>
      item.nome.toLowerCase().includes(searchLower)
    )

    // Ordenar por relevância:
    // 1. Itens que começam com o termo buscado
    // 2. Itens com maior frequência de compra
    // 3. Alfabeticamente
    return results.sort((a, b) => {
      const aLower = a.nome.toLowerCase()
      const bLower = b.nome.toLowerCase()

      const aStarts = aLower.startsWith(searchLower)
      const bStarts = bLower.startsWith(searchLower)

      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1

      // Se ambos começam ou nenhum começa, ordenar por frequência
      const aFreq = a.frequency || 0
      const bFreq = b.frequency || 0

      if (aFreq !== bFreq) return bFreq - aFreq

      // Finalmente, alfabético
      return aLower.localeCompare(bLower)
    }).slice(0, 10) // Limitar a 10 resultados
  }

  // Adicionar item ao cache quando criado
  addToCache(item: SearchCacheItem, userId: string): void {
    const nameLower = item.nome.toLowerCase()
    const exists = this.cache.some(i => i.nome.toLowerCase() === nameLower)

    if (!exists) {
      this.cache.unshift(item)

      // Salvar no localStorage
      localStorage.setItem(`search_cache_${userId}`, JSON.stringify({
        items: this.cache,
        timestamp: this.lastUpdate
      }))
    }
  }

  // Limpar cache
  clearCache(userId: string): void {
    this.cache = []
    this.lastUpdate = 0
    localStorage.removeItem(`search_cache_${userId}`)
  }
}

export const searchCacheService = new SearchCacheService()
