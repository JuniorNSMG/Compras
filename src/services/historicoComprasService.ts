import { supabase } from '@/lib/supabase'

export interface HistoricoCompra {
  id: string
  user_id: string
  item_nome: string
  icon_name: string
  categoria: string
  purchase_count: number
  last_purchased_at: string
  created_at: string
}

class HistoricoComprasService {
  // Registrar uma compra (incrementa contador ou cria novo registro)
  async registrarCompra(
    userId: string,
    itemNome: string,
    iconName: string,
    categoria: string
  ): Promise<void> {
    // Verificar se já existe registro
    const { data: existing } = await supabase
      .from('historico_compras')
      .select('*')
      .eq('user_id', userId)
      .eq('item_nome', itemNome)
      .single()

    if (existing) {
      // Incrementar contador
      await supabase
        .from('historico_compras')
        .update({
          purchase_count: existing.purchase_count + 1,
          last_purchased_at: new Date().toISOString(),
          icon_name: iconName,
          categoria: categoria
        })
        .eq('id', existing.id)
    } else {
      // Criar novo registro
      await supabase
        .from('historico_compras')
        .insert({
          user_id: userId,
          item_nome: itemNome,
          icon_name: iconName,
          categoria: categoria,
          purchase_count: 1
        })
    }
  }

  // Buscar itens frequentemente comprados (ordenados por frequência e nome)
  async getFrequentementeComprados(userId: string, minCount = 1): Promise<HistoricoCompra[]> {
    const { data, error } = await supabase
      .from('historico_compras')
      .select('*')
      .eq('user_id', userId)
      .gte('purchase_count', minCount)
      .order('purchase_count', { ascending: false })
      .order('item_nome', { ascending: true })
      .limit(50)

    if (error) throw error
    return data || []
  }

  // Limpar histórico completo do usuário
  async limparHistorico(userId: string): Promise<void> {
    const { error } = await supabase
      .from('historico_compras')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
  }

  // Remover um item específico do histórico
  async removerItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('historico_compras')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export const historicoComprasService = new HistoricoComprasService()
