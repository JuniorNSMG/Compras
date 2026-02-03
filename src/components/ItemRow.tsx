import { useState, useRef } from 'react'
import { itemService } from '@/services/itemService'
import { useStore } from '@/store/useStore'
import { ItemOptions } from './ItemOptions'
import type { Item } from '@/types'
import './ItemRow.css'

interface ItemRowProps {
  item: Item
  animandoSaida?: boolean
  compacto?: boolean
}

export function ItemRow({ item, animandoSaida = false, compacto = false }: ItemRowProps) {
  const { updateItem } = useStore()
  const [showOptions, setShowOptions] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  async function handleToggle() {
    try {
      const updated = await itemService.toggleComprado(item.id, !item.comprado)
      updateItem(item.id, updated)
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
    }
  }

  const handleTouchStart = () => {
    if (!compacto) {
      longPressTimer.current = setTimeout(() => {
        setShowOptions(true)
      }, 500)
    }
  }

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const classNames = [
    'item-row',
    item.comprado && 'comprado',
    animandoSaida && 'animando-saida',
    compacto && 'compacto'
  ].filter(Boolean).join(' ')

  return (
    <>
      <div
        className={classNames}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <button
          onClick={handleToggle}
          className="checkbox-button"
          aria-label={item.comprado ? 'Marcar como não comprado' : 'Marcar como comprado'}
        >
          <div className={`checkbox ${item.comprado ? 'checked' : ''}`}>
            {item.comprado && <span className="checkmark">✓</span>}
          </div>
        </button>

        {!compacto && <div className="item-icon">{item.icon_name}</div>}

        <div className="item-content">
          <div className="item-nome">
            {compacto && <span className="item-icon-inline">{item.icon_name}</span>}
            {item.nome}
          </div>
          {!compacto && item.quantidade && (
            <div className="item-quantidade">
              {item.quantidade}{item.unidade || ''}
            </div>
          )}
        </div>
      </div>

      {showOptions && (
        <ItemOptions
          item={item}
          onClose={() => setShowOptions(false)}
        />
      )}
    </>
  )
}
