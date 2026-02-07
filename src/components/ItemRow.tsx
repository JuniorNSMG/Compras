import { useState, useRef } from 'react'
import { itemService } from '@/services/itemService'
import { historicoComprasService } from '@/services/historicoComprasService'
import { calcularPrecoTotal, formatarPrecoCompacto } from '@/services/precoEstimadoService'
import { isLongText } from '@/utils/textUtils'
import { useStore } from '@/store/useStore'
import { ItemOptions } from './ItemOptions'
import { ProductIcon } from './ProductIcon'
import type { Item } from '@/types'
import './ItemRow.css'

interface ItemRowProps {
  item: Item
  animandoSaida?: boolean
  compacto?: boolean
  badge?: string
  mostrarPreco?: boolean
  onUpdated?: () => void
}

export function ItemRow({ item, animandoSaida = false, compacto = false, badge, mostrarPreco = false, onUpdated }: ItemRowProps) {
  const { user, updateItem } = useStore()
  const [showOptions, setShowOptions] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  // Calcular preço total (quantidade * preço unitário)
  const precoTotal = mostrarPreco
    ? calcularPrecoTotal(item.preco_estimado, item.quantidade, item.unidade, item.nome)
    : null

  async function handleToggle() {
    // Atualização otimista - atualiza localmente primeiro para resposta instantânea
    const novoEstado = !item.comprado
    updateItem(item.id, { ...item, comprado: novoEstado })

    // Sincroniza com o banco em background
    try {
      await itemService.toggleComprado(item.id, novoEstado)

      // Se está marcando como comprado, registrar no histórico
      if (novoEstado && user) {
        await historicoComprasService.registrarCompra(
          user.id,
          item.nome,
          item.icon_name,
          item.categoria
        )
      }

      // Notificar componente pai se fornecido
      if (onUpdated) {
        onUpdated()
      }
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
      // Reverte em caso de erro
      updateItem(item.id, { ...item, comprado: !novoEstado })
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

  const handleContextMenu = (e: React.MouseEvent) => {
    // Prevenir menu padrão do browser
    e.preventDefault()
    // Abrir modal de opções
    if (!compacto) {
      setShowOptions(true)
    }
  }

  const classNames = [
    'item-card',
    item.comprado && 'comprado',
    animandoSaida && 'animando-saida',
    compacto && 'compacto'
  ].filter(Boolean).join(' ')

  // Versão compacta (para seção de comprados)
  if (compacto) {
    return (
      <>
        <div
          className="item-row-compacto"
          onClick={handleToggle}
          onContextMenu={handleContextMenu}
        >
          <div className="item-icon-inline">
            <ProductIcon icon={item.icon_name} size={20} />
          </div>
          <div className="item-nome">{item.nome}</div>
          {item.quantidade && (
            <div className="item-quantidade-compacto">
              {item.quantidade}{item.unidade || ''}
            </div>
          )}
        </div>
      </>
    )
  }

  // Versão card (para itens não comprados)
  return (
    <>
      <div
        className={classNames}
        onClick={handleToggle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onContextMenu={handleContextMenu}
      >
        <div className="card-icon">
          <ProductIcon icon={item.icon_name} size={48} />
          {badge && (
            <span className="card-badge-overlay">{badge}</span>
          )}
        </div>
        <div className={`card-nome ${isLongText(item.nome) ? 'long-text' : ''}`}>
          {item.nome}
        </div>
        {item.quantidade && (
          <div className="card-quantidade">
            {item.quantidade}{item.unidade ? ` ${item.unidade}` : ''}
          </div>
        )}
        {precoTotal !== null && (
          <div className="card-preco">
            {formatarPrecoCompacto(precoTotal)}
          </div>
        )}
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
