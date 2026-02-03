import { supabase } from '@/lib/supabase'
import type { Item } from '@/types'
import { getProductIcon, getCategoriaFromNome } from '@/utils/productIcons'
import { customizacaoService } from './customizacaoService'

export const itemService = {
  async getItens(listaId: string): Promise<Item[]> {
    const { data, error } = await supabase
      .from('itens')
      .select('*')
      .eq('lista_id', listaId)
      .order('comprado', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createItem(
    listaId: string,
    nome: string,
    quantidade?: number,
    unidade?: string,
    userId?: string
  ): Promise<Item> {
    let categoria = getCategoriaFromNome(nome)
    let icon_name = getProductIcon(nome, categoria)

    // Verificar se existe customização salva para este produto
    if (userId) {
      try {
        const customizacao = await customizacaoService.getCustomizacao(userId, nome)
        if (customizacao) {
          categoria = customizacao.categoria
          icon_name = customizacao.icon_name
        }
      } catch (error) {
        console.error('Erro ao buscar customização:', error)
        // Continua com valores padrão
      }
    }

    const { data, error } = await supabase
      .from('itens')
      .insert({
        lista_id: listaId,
        nome,
        categoria,
        quantidade,
        unidade,
        icon_name,
        comprado: false,
      })
      .select()
      .single()

    if (error) throw error

    await this.updateListaTimestamp(listaId)
    return data
  },

  async updateItem(
    id: string,
    updates: Partial<Omit<Item, 'id' | 'lista_id' | 'created_at' | 'updated_at'>>
  ): Promise<Item> {
    const { data, error } = await supabase
      .from('itens')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    await this.updateListaTimestamp(data.lista_id)
    return data
  },

  async toggleComprado(id: string, comprado: boolean): Promise<Item> {
    return this.updateItem(id, { comprado })
  },

  async deleteItem(id: string, listaId: string): Promise<void> {
    const { error } = await supabase
      .from('itens')
      .delete()
      .eq('id', id)

    if (error) throw error

    await this.updateListaTimestamp(listaId)
  },

  async deleteComprados(listaId: string): Promise<void> {
    const { error } = await supabase
      .from('itens')
      .delete()
      .eq('lista_id', listaId)
      .eq('comprado', true)

    if (error) throw error

    await this.updateListaTimestamp(listaId)
  },

  async updateListaTimestamp(listaId: string): Promise<void> {
    await supabase
      .from('listas')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', listaId)
  },

  async searchHistorico(userId: string, query: string): Promise<Item[]> {
    const { data: listas } = await supabase
      .from('listas')
      .select('id')
      .eq('user_id', userId)

    if (!listas) return []

    const listaIds = listas.map(l => l.id)

    const { data, error } = await supabase
      .from('itens')
      .select('*')
      .in('lista_id', listaIds)
      .ilike('nome', `%${query}%`)
      .limit(5)

    if (error) return []
    return data || []
  },
}
