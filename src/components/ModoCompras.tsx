import { useState, useEffect } from 'react'
import { itemService } from '@/services/itemService'
import { ItemRow } from './ItemRow'
import { ORDEM_CATEGORIAS } from '@/utils/productIcons'
import type { Lista, ItemComOrigem } from '@/types'
import './ModoCompras.css'

interface ModoComprasProps {
  listas: Lista[]
  onClose: () => void
  onListasUpdated: () => void
}

export function ModoCompras({ listas, onClose, onListasUpdated }: ModoComprasProps) {
  const [listasSelecionadas, setListasSelecionadas] = useState<Lista[]>(listas)
  const [itensAgregados, setItensAgregados] = useState<ItemComOrigem[]>([])
  const [loading, setLoading] = useState(false)
  const [mostrarSeletor, setMostrarSeletor] = useState(false)

  useEffect(() => {
    loadItens()
  }, [listasSelecionadas])

  async function loadItens() {
    if (listasSelecionadas.length === 0) {
      setItensAgregados([])
      return
    }

    try {
      setLoading(true)
      const promises = listasSelecionadas.map(lista =>
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
              listaOrigem: listasSelecionadas[idx]
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

  function toggleLista(lista: Lista) {
    setListasSelecionadas(prev => {
      const exists = prev.find(l => l.id === lista.id)
      if (exists) {
        // Remover - mas manter pelo menos 1 lista
        if (prev.length === 1) return prev
        return prev.filter(l => l.id !== lista.id)
      } else {
        // Adicionar
        return [...prev, lista]
      }
    })
  }

  function contarNaoComprados(lista: Lista): number {
    return itensAgregados.filter(item => item.listaOrigem.id === lista.id).length
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
  const totalItens = itensAgregados.length

  const nomesListas = listasSelecionadas.map(l => l.nome).join(', ')

  return (
    <div className="modo-compras-container">
      <header className="modo-compras-header">
        <button onClick={onClose} className="btn-voltar">
          ← Voltar
        </button>
        <div className="header-info">
          <h1 className="modo-compras-title">🛒 Modo Compras</h1>
          <p className="modo-compras-subtitle">
            {totalItens} {totalItens === 1 ? 'item' : 'itens'} de {listasSelecionadas.length} {listasSelecionadas.length === 1 ? 'lista' : 'listas'}: {nomesListas}
          </p>
        </div>
        <button
          onClick={() => setMostrarSeletor(!mostrarSeletor)}
          className="btn-filtrar"
          title="Filtrar listas"
        >
          ⚙️
        </button>
      </header>

      {mostrarSeletor && (
        <div className="seletor-compacto">
          {listas.map(lista => {
            const selecionada = listasSelecionadas.find(l => l.id === lista.id)
            const count = contarNaoComprados(lista)

            return (
              <label key={lista.id} className="lista-checkbox">
                <input
                  type="checkbox"
                  checked={!!selecionada}
                  onChange={() => toggleLista(lista)}
                  disabled={listasSelecionadas.length === 1 && !!selecionada}
                />
                <span>{lista.nome}</span>
                {selecionada && count > 0 && (
                  <span className="count">({count})</span>
                )}
              </label>
            )
          })}
        </div>
      )}

      <div className="modo-compras-content">
        {loading ? (
          <div className="loading-state">
            <p>Carregando itens...</p>
          </div>
        ) : totalItens === 0 ? (
          <div className="empty-state">
            <p>Todas as compras foram feitas! 🎉</p>
            <p className="empty-subtitle">Selecione outras listas ou adicione novos itens</p>
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
