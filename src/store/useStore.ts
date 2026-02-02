import { create } from 'zustand'
import type { User, Lista, Item } from '@/types'

interface AppState {
  user: User | null
  currentLista: Lista | null
  itens: Item[]
  loading: boolean
  syncing: boolean

  setUser: (user: User | null) => void
  setCurrentLista: (lista: Lista | null) => void
  setItens: (itens: Item[]) => void
  addItem: (item: Item) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  removeItem: (id: string) => void
  setLoading: (loading: boolean) => void
  setSyncing: (syncing: boolean) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  currentLista: null,
  itens: [],
  loading: true,
  syncing: false,

  setUser: (user) => set({ user }),
  setCurrentLista: (lista) => set({ currentLista: lista }),
  setItens: (itens) => set({ itens }),
  addItem: (item) => set((state) => ({ itens: [item, ...state.itens] })),
  updateItem: (id, updates) =>
    set((state) => ({
      itens: state.itens.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      itens: state.itens.filter((item) => item.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setSyncing: (syncing) => set({ syncing }),
}))
