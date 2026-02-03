import { useState } from 'react'
import { itemService } from '@/services/itemService'
import { useStore } from '@/store/useStore'
import type { Item } from '@/types'
import './ItemOptions.css'

interface ItemOptionsProps {
  item: Item
  onClose: () => void
}

export function ItemOptions({ item, onClose }: ItemOptionsProps) {
  const { updateItem, removeItem } = useStore()
  const [quantidade, setQuantidade] = useState(item.quantidade?.toString() || '1')
  const [unidade, setUnidade] = useState(item.unidade || '')
  const [salvando, setSalvando] = useState(false)

  async function handleSalvar() {
    try {
      setSalvando(true)
      const qtd = parseFloat(quantidade) || 1
      const updated = await itemService.updateItem(item.id, {
        quantidade: qtd,
        unidade: unidade.trim() || null
      })
      updateItem(item.id, updated)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
      alert('Erro ao salvar')
    } finally {
      setSalvando(false)
    }
  }

  async function handleExcluir() {
    if (!confirm(`Excluir "${item.nome}"?`)) return

    try {
      setSalvando(true)
      await itemService.deleteItem(item.id, item.lista_id)
      removeItem(item.id)
      onClose()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="item-options-overlay" onClick={onClose}>
      <div className="item-options-content" onClick={(e) => e.stopPropagation()}>
        <div className="item-options-header">
          <div className="item-options-icon">{item.icon_name}</div>
          <div className="item-options-title">
            <h3>{item.nome}</h3>
            <p className="item-options-categoria">{item.categoria}</p>
          </div>
          <button onClick={onClose} className="item-options-close">✕</button>
        </div>

        <div className="item-options-body">
          <div className="input-section">
            <label>Quantidade</label>
            <div className="quantidade-input-group">
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="0.1"
                step="0.1"
                disabled={salvando}
                autoFocus
              />
              <input
                type="text"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
                placeholder="un, kg, L..."
                maxLength={10}
                disabled={salvando}
              />
            </div>
            <p className="hint">Exemplo: 2 kg, 6 un, 1 L</p>
          </div>

          <div className="item-options-actions">
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="btn-save"
            >
              💾 Salvar
            </button>
            <button
              onClick={handleExcluir}
              disabled={salvando}
              className="btn-delete"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
