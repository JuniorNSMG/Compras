import { supabase } from '@/lib/supabase'
import type { Lista } from '@/types'

export const listService = {
  async getListas(userId: string): Promise<Lista[]> {
    console.log('📚 Buscando listas para usuário:', userId)

    // Buscar IDs de listas onde o usuário tem acesso (próprias + compartilhadas)
    const { data: acessos, error: acessosError } = await supabase
      .from('lista_usuarios')
      .select('lista_id')
      .eq('user_id', userId)

    console.log('📦 Acessos encontrados:', { acessos, acessosError })

    if (acessosError) {
      console.error('❌ Erro ao buscar acessos:', acessosError)
      throw acessosError
    }

    if (!acessos || acessos.length === 0) {
      console.warn('⚠️ Nenhum acesso encontrado em lista_usuarios')
      console.log('💡 Pode ser necessário migrar listas antigas')
      return []
    }

    // Buscar as listas completas
    const listaIds = acessos.map(a => a.lista_id)
    console.log('🔍 Buscando listas com IDs:', listaIds)

    const { data, error } = await supabase
      .from('listas')
      .select('*')
      .in('id', listaIds)
      .order('updated_at', { ascending: false })

    console.log('📋 Listas encontradas:', { data, error })

    if (error) {
      console.error('❌ Erro ao buscar listas:', error)
      throw error
    }

    console.log('✅ Retornando', data?.length || 0, 'listas')
    return data || []
  },

  async createLista(userId: string, nome: string): Promise<Lista> {
    console.log('➕ Criando lista:', nome, 'para usuário:', userId)

    // Criar a lista
    const { data: lista, error: listaError } = await supabase
      .from('listas')
      .insert({
        user_id: userId,
        nome,
      })
      .select()
      .single()

    if (listaError) {
      console.error('❌ Erro ao criar lista:', listaError)
      throw listaError
    }

    console.log('✅ Lista criada:', lista.id)

    // Adicionar o criador como dono na tabela lista_usuarios
    console.log('👤 Adicionando usuário como dono...')
    const { error: usuarioError } = await supabase
      .from('lista_usuarios')
      .insert({
        lista_id: lista.id,
        user_id: userId,
        is_owner: true,
      })

    if (usuarioError) {
      console.error('❌ Erro ao adicionar usuário:', usuarioError)
      throw usuarioError
    }

    console.log('✅ Usuário adicionado como dono')
    return lista
  },

  async updateLista(id: string, nome: string): Promise<Lista> {
    const { data, error } = await supabase
      .from('listas')
      .update({
        nome,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteLista(id: string): Promise<void> {
    const { error } = await supabase
      .from('listas')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
