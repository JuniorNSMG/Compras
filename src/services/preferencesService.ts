/**
 * Serviço para gerenciar preferências do usuário
 */

const STORAGE_KEY = 'compras-preferences'

interface Preferences {
  defaultListId?: string
}

function getPreferences(userId: string): Preferences {
  const key = `${STORAGE_KEY}-${userId}`
  const stored = localStorage.getItem(key)
  if (!stored) return {}

  try {
    return JSON.parse(stored)
  } catch {
    return {}
  }
}

function setPreferences(userId: string, preferences: Preferences): void {
  const key = `${STORAGE_KEY}-${userId}`
  localStorage.setItem(key, JSON.stringify(preferences))
}

export const preferencesService = {
  /**
   * Obter ID da lista padrão
   */
  getDefaultListId(userId: string): string | null {
    const prefs = getPreferences(userId)
    return prefs.defaultListId || null
  },

  /**
   * Definir lista padrão
   */
  setDefaultListId(userId: string, listId: string): void {
    const prefs = getPreferences(userId)
    prefs.defaultListId = listId
    setPreferences(userId, prefs)
    console.log('⭐ Lista padrão definida:', listId)
  },

  /**
   * Remover lista padrão
   */
  clearDefaultListId(userId: string): void {
    const prefs = getPreferences(userId)
    delete prefs.defaultListId
    setPreferences(userId, prefs)
    console.log('🔄 Lista padrão removida')
  },
}
