import { supabase } from '@/lib/supabase'
import type { ProdutoCustomizacao } from '@/types'

export const customizacaoService = {
  // Buscar customização por nome do produto
  async getCustomizacao(userId: string, nomeProduto: string): Promise<ProdutoCustomizacao | null> {
    const { data, error } = await supabase
      .from('produto_customizacoes')
      .select('*')
      .eq('user_id', userId)
      .eq('nome_produto', nomeProduto.toLowerCase())
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found - retorna null
        return null
      }
      throw error
    }

    return data
  },

  // Salvar ou atualizar customização
  async saveCustomizacao(
    userId: string,
    nomeProduto: string,
    categoria: string,
    iconName: string
  ): Promise<ProdutoCustomizacao> {
    const { data, error } = await supabase
      .from('produto_customizacoes')
      .upsert(
        {
          user_id: userId,
          nome_produto: nomeProduto.toLowerCase(),
          categoria,
          icon_name: iconName,
        },
        {
          onConflict: 'user_id,nome_produto',
        }
      )
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Buscar todas as customizações do usuário
  async getAllCustomizacoes(userId: string): Promise<ProdutoCustomizacao[]> {
    const { data, error } = await supabase
      .from('produto_customizacoes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Deletar customização
  async deleteCustomizacao(userId: string, nomeProduto: string): Promise<void> {
    const { error } = await supabase
      .from('produto_customizacoes')
      .delete()
      .eq('user_id', userId)
      .eq('nome_produto', nomeProduto.toLowerCase())

    if (error) throw error
  },
}
