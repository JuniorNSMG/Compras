import { useState } from 'react'
import { itemService } from '@/services/itemService'
import { useStore } from '@/store/useStore'
import type { Item } from '@/types'
import './ItemRow.css'

interface ItemRowProps {
  item: Item
}

export function ItemRow({ item }: ItemRowProps) {
  const { updateItem, removeItem } = useStore()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleToggle() {
    try {
      const updated = await itemService.toggleComprado(item.id, !item.comprado)
      updateItem(item.id, updated)
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
    }
  }

  async function handleDelete() {
    if (!confirm(`Remover "${item.nome}"?`)) return

    setIsDeleting(true)
    try {
      await itemService.deleteItem(item.id, item.lista_id)
      removeItem(item.id)
    } catch (error) {
      console.error('Erro ao deletar item:', error)
      setIsDeleting(false)
    }
  }

  return (
    <div className={`item-row ${item.comprado ? 'comprado' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <button
        onClick={handleToggle}
        className="checkbox-button"
        aria-label={item.comprado ? 'Marcar como não comprado' : 'Marcar como comprado'}
      >
        <div className={`checkbox ${item.comprado ? 'checked' : ''}`}>
          {item.comprado && <span className="checkmark">✓</span>}
        </div>
      </button>

      <div className="item-icon">{item.icon_name}</div>

      <div className="item-content">
        <div className="item-nome">{item.nome}</div>
        {item.quantidade && (
          <div className="item-quantidade">
            {item.quantidade}{item.unidade || ''}
          </div>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
        aria-label="Remover item"
      >
        🗑️
      </button>
    </div>
  )
}
