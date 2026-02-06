import { useState, useEffect } from 'react'
import { itemService } from '@/services/itemService'
import { ItemRow } from './ItemRow'
import { ORDEM_CATEGORIAS } from '@/utils/productIcons'
import type { Lista, ItemComOrigem } from '@/types'
import './ListView.css'

interface ModoComprasProps {
  listas: Lista[]
  onClose: () => void
  onListasUpdated: () => void
}

export function ModoCompras({ listas, onClose, onListasUpdated }: ModoComprasProps) {
  const [itensAgregados, setItensAgregados] = useState<ItemComOrigem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadItens()
  }, [listas])

  async function loadItens() {
    if (listas.length === 0) {
      setItensAgregados([])
      return
    }

    try {
      setLoading(true)
      const promises = listas.map(lista =>
        itemService.getItens(lista.id)
      )
      const results = await Promise.all(promises)

      // Mesclar itens não comprados + adicionar origem
      const merged: ItemComOrigem[] = []
      results.forEach((itens, idx) => {
        itens
          .filter(item => !item.comprado)
          .forEach(item => {
            merged.push({
              ...item,
              listaOrigem: listas[idx]
            })
          })
      })

      setItensAgregados(merged)
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
    } finally {
      setLoading(false)
    }
  }

  function agruparPorCategoria(items: ItemComOrigem[]) {
    const grupos: Record<string, ItemComOrigem[]> = {}

    items.forEach(item => {
      const categoria = item.categoria || 'Outros'
      if (!grupos[categoria]) {
        grupos[categoria] = []
      }
      grupos[categoria].push(item)
    })

    // Ordenar categorias pela ordem definida
    const ordenado: Record<string, ItemComOrigem[]> = {}
    ORDEM_CATEGORIAS.forEach(cat => {
      if (grupos[cat] && grupos[cat].length > 0) {
        ordenado[cat] = grupos[cat]
      }
    })

    // Adicionar categorias que não estão na ordem padrão
    Object.keys(grupos).forEach(cat => {
      if (!ordenado[cat]) {
        ordenado[cat] = grupos[cat]
      }
    })

    return ordenado
  }

  const itensAgrupados = agruparPorCategoria(itensAgregados)
  const nomesListas = listas.map(l => l.nome).join(', ')

  return (
    <div className="list-view-container container">
      <header className="list-header safe-area-top">
        <button onClick={onClose} className="list-title-button">
          <h1>{nomesListas}</h1>
        </button>
        <button onClick={onClose} className="signout-button">
          Voltar
        </button>
      </header>

      <div className="items-container safe-area-bottom">
        {loading ? (
          <div className="empty-state">
            <p>Carregando itens...</p>
          </div>
        ) : itensAgregados.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum item para comprar</p>
          </div>
        ) : (
          Object.entries(itensAgrupados).map(([categoria, items]) => (
            <div key={categoria} className="categoria-section">
              <div className="categoria-header">
                <h3>{categoria}</h3>
                <span className="categoria-count">({items.length})</span>
              </div>
              <div className="items-section">
                {items.map(item => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    badge={item.listaOrigem.nome}
                    onUpdated={() => {
                      loadItens()
                      onListasUpdated()
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
