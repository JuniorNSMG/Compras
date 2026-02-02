import { supabase } from '@/lib/supabase'
import type { Lista } from '@/types'

export const listService = {
  async getListas(userId: string): Promise<Lista[]> {
    const { data, error } = await supabase
      .from('listas')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createLista(userId: string, nome: string): Promise<Lista> {
    const { data, error } = await supabase
      .from('listas')
      .insert({
        user_id: userId,
        nome,
      })
      .select()
      .single()

    if (error) throw error
    return data
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
