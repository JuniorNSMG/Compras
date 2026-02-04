import { supabase } from '@/lib/supabase'
import type { Lista } from '@/types'

export const listService = {
  async getListas(userId: string): Promise<Lista[]> {
    // Buscar IDs de listas onde o usuário tem acesso (próprias + compartilhadas)
    const { data: acessos, error: acessosError } = await supabase
      .from('lista_usuarios')
      .select('lista_id')
      .eq('user_id', userId)

    if (acessosError) throw acessosError

    if (!acessos || acessos.length === 0) {
      return []
    }

    // Buscar as listas completas
    const listaIds = acessos.map(a => a.lista_id)
    const { data, error } = await supabase
      .from('listas')
      .select('*')
      .in('id', listaIds)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createLista(userId: string, nome: string): Promise<Lista> {
    // Criar a lista
    const { data: lista, error: listaError } = await supabase
      .from('listas')
      .insert({
        user_id: userId,
        nome,
      })
      .select()
      .single()

    if (listaError) throw listaError

    // Adicionar o criador como dono na tabela lista_usuarios
    const { error: usuarioError } = await supabase
      .from('lista_usuarios')
      .insert({
        lista_id: lista.id,
        user_id: userId,
        is_owner: true,
      })

    if (usuarioError) throw usuarioError

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
