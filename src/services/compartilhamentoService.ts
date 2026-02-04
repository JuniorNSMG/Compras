import { supabase } from '@/lib/supabase'

function generateShareCode(): string {
  // Gerar código de 6 caracteres alfanuméricos
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Remove caracteres confusos
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export const compartilhamentoService = {
  /**
   * Criar código de compartilhamento para uma lista
   */
  async criarCodigo(listaId: string, ownerId: string): Promise<string> {
    const shareCode = generateShareCode()
    console.log('🔐 Gerando código:', shareCode)
    console.log('📋 Lista ID:', listaId)
    console.log('👤 Owner ID:', ownerId)

    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .insert({
        lista_id: listaId,
        owner_id: ownerId,
        share_code: shareCode,
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Erro ao criar código:', error)
      throw error
    }

    console.log('✅ Código criado com sucesso:', data)
    return shareCode
  },

  /**
   * Obter código de compartilhamento de uma lista
   */
  async getCodigo(listaId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('lista_compartilhamentos')
      .select('share_code')
      .eq('lista_id', listaId)
      .single()

    if (error) return null
    return data?.share_code || null
  },

  /**
   * Aceitar compartilhamento usando código
   */
  async aceitarPorCodigo(shareCode: string, userId: string): Promise<void> {
    console.log('🔍 Buscando código:', shareCode.toUpperCase())
    console.log('🔍 User ID:', userId)

    // Buscar lista pelo código
    const { data: compartilhamento, error: fetchError } = await supabase
      .from('lista_compartilhamentos')
      .select('lista_id, owner_id')
      .eq('share_code', shareCode.toUpperCase())
      .single()

    console.log('📦 Resultado da busca:', { compartilhamento, fetchError })

    if (fetchError) {
      console.error('❌ Erro ao buscar código:', fetchError)
      if (fetchError.code === 'PGRST116') {
        throw new Error('Código não encontrado ou inválido')
      }
      throw new Error(`Erro ao buscar código: ${fetchError.message}`)
    }

    if (!compartilhamento) {
      console.error('❌ Compartilhamento não encontrado')
      throw new Error('Código inválido')
    }

    console.log('✅ Código encontrado! Lista ID:', compartilhamento.lista_id)

    // Verificar se usuário não é o dono
    if (compartilhamento.owner_id === userId) {
      console.warn('⚠️ Usuário tentou usar código da própria lista')
      throw new Error('Você não pode usar o código da sua própria lista')
    }

    // Adicionar usuário à lista
    console.log('➕ Adicionando usuário à lista...')
    const { error: insertError } = await supabase
      .from('lista_usuarios')
      .insert({
        lista_id: compartilhamento.lista_id,
        user_id: userId,
        is_owner: false,
      })

    if (insertError) {
      console.error('❌ Erro ao adicionar usuário:', insertError)
      // Se erro for de duplicata, significa que já está compartilhado
      if (insertError.code === '23505') {
        throw new Error('Você já tem acesso a esta lista')
      }
      throw new Error(`Erro ao adicionar acesso: ${insertError.message}`)
    }

    console.log('✅ Usuário adicionado com sucesso!')
  },

  /**
   * Remover código de compartilhamento
   */
  async removerCodigo(listaId: string): Promise<void> {
    const { error } = await supabase
      .from('lista_compartilhamentos')
      .delete()
      .eq('lista_id', listaId)

    if (error) throw error
  },

  /**
   * Obter usuários com acesso a uma lista
   */
  async getUsuariosDaLista(listaId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('lista_usuarios')
      .select('user_id, is_owner, created_at')
      .eq('lista_id', listaId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * Remover usuário de uma lista compartilhada
   */
  async removerUsuario(listaId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('lista_usuarios')
      .delete()
      .eq('lista_id', listaId)
      .eq('user_id', userId)
      .eq('is_owner', false) // Não pode remover o dono

    if (error) throw error
  },
}
