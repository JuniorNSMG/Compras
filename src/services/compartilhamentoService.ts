import { supabase } from '@/lib/supabase'
import type { ListaCompartilhamento } from '@/types'

function generateShareToken(): string {
  // Gerar token aleatório único
  return crypto.randomUUID()
}

export const compartilhamentoService = {
  /**
   * Criar um link de compartilhamento para uma lista
   */
  async criarCompartilhamento(listaId: string, ownerId: string): Promise<{ token: string; url: string }> {
    const shareToken = generateShareToken()

    const { error } = await supabase
      .from('lista_compartilhamentos')
      .insert({
        lista_id: listaId,
        owner_id: ownerId,
        share_token: shareToken,
        accepted: false,
      })
      .select()
      .single()

    if (error) throw error

    // Gerar URL de compartilhamento
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}/compartilhar/${shareToken}`

    return {
      token: shareToken,
      url: shareUrl,
    }
  },

  /**
   * Aceitar convite de compartilhamento
   */
  async aceitarCompartilhamento(shareToken: string, userId: string): Promise<ListaCompartilhamento> {
    // Primeiro, buscar o compartilhamento pelo token
    const { data: compartilhamento, error: fetchError } = await supabase
      .from('lista_compartilhamentos')
      .select('*')
      .eq('share_token', shareToken)
      .single()

    if (fetchError) throw new Error('Link de compartilhamento inválido ou expirado')

    // Verificar se já foi aceito por outro usuário
    if (compartilhamento.accepted && compartilhamento.shared_user_id !== userId) {
      throw new Error('Este link já foi utilizado por outro usuário')
    }

    // Verificar se o usuário não é o dono da lista
    if (compartilhamento.owner_id === userId) {
      throw new Error('Você não pode aceitar compartilhamento da sua própria lista')
    }

    // Atualizar compartilhamento
    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .update({
        shared_user_id: userId,
        accepted: true,
        accepted_at: new Date().toISOString(),
      })
      .eq('id', compartilhamento.id)
      .select()
      .single()

    if (error) throw error

    return data
  },

  /**
   * Obter compartilhamentos de uma lista
   */
  async getCompartilhamentosDaLista(listaId: string): Promise<ListaCompartilhamento[]> {
    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .select('*')
      .eq('lista_id', listaId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  /**
   * Remover compartilhamento
   */
  async removerCompartilhamento(compartilhamentoId: string): Promise<void> {
    const { error } = await supabase
      .from('lista_compartilhamentos')
      .delete()
      .eq('id', compartilhamentoId)

    if (error) throw error
  },

  /**
   * Validar se um token de compartilhamento é válido
   */
  async validarToken(shareToken: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .select('id')
      .eq('share_token', shareToken)
      .single()

    return !error && !!data
  },

  /**
   * Obter informações do compartilhamento por token
   */
  async getCompartilhamentoPorToken(shareToken: string): Promise<ListaCompartilhamento | null> {
    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .select('*')
      .eq('share_token', shareToken)
      .single()

    if (error) return null
    return data
  },
}
