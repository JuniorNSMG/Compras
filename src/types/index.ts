export interface Lista {
  id: string
  user_id: string
  nome: string
  created_at: string
  updated_at: string
}

export interface Item {
  id: string
  lista_id: string
  nome: string
  categoria: string
  quantidade?: number
  unidade?: string
  icon_name: string
  comprado: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
}

export interface ProdutoCustomizacao {
  id: string
  user_id: string
  nome_produto: string
  categoria: string
  icon_name: string
  created_at: string
  updated_at: string
}

export interface ItemComOrigem extends Item {
  listaOrigem: Lista
}
