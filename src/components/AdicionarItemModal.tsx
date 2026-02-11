import { useState, useRef, useEffect } from 'react'
import { itemService } from '@/services/itemService'
import { searchCacheService, type SearchCacheItem } from '@/services/searchCacheService'
import { toTitleCase } from '@/utils/textUtils'
import { useStore } from '@/store/useStore'
import { ProductIcon } from './ProductIcon'
import { Icon } from '@iconify/react'
import './AdicionarItemModal.css'

interface AdicionarItemModalProps {
  onClose: () => void
}

export function AdicionarItemModal({ onClose }: AdicionarItemModalProps) {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<SearchCacheItem[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [itemAdicionado, setItemAdicionado] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentLista, addItem, user } = useStore()

  useEffect(() => {
    if (input.length >= 1) {
      loadSuggestions()
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [input])

  function loadSuggestions() {
    const results = searchCacheService.search(input)
    setSuggestions(results)
    setShowSuggestions(results.length > 0)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await addItemFromInput(input)
  }

  async function addItemFromInput(text: string) {
    if (!text.trim() || !currentLista) return

    const parts = text.trim().split(/\s+/)
    let quantidade: number | undefined
    let unidade: string | undefined
    let nome = text.trim()

    const lastPart = parts[parts.length - 1]
    const numMatch = lastPart.match(/^(\d+)([a-zA-Z]+)?$/)

    if (numMatch) {
      quantidade = parseInt(numMatch[1])
      unidade = numMatch[2] || undefined
      nome = parts.slice(0, -1).join(' ')
    }

    nome = toTitleCase(nome)

    try {
      const newItem = await itemService.createItem(
        currentLista.id,
        nome,
        quantidade,
        unidade,
        user?.id
      )
      addItem(newItem)

      if (user) {
        searchCacheService.addToCache({
          nome: newItem.nome,
          icon_name: newItem.icon_name,
          categoria: newItem.categoria
        }, user.id)
      }

      // Mostrar notificação de sucesso
      setItemAdicionado(newItem.nome)
      setTimeout(() => {
        setItemAdicionado(null)
      }, 2000)

      setInput('')
      setShowSuggestions(false)
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  function handleSuggestionClick(suggestion: SearchCacheItem) {
    addItemFromInput(suggestion.nome)
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={handleBackdropClick}>
        <div className="modal-adicionar">
          <div className="modal-header">
            <h2>Adicionar Item</h2>
            <button className="modal-close" onClick={onClose}>
              <Icon icon="ic:round-close" width={24} height={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="modal-form">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite o nome do item..."
              className="modal-input"
              autoComplete="off"
            />

            {input && (
              <button type="submit" className="modal-submit">
                Adicionar
              </button>
            )}
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="modal-suggestions">
              <div className="suggestions-label">Sugestões</div>
              <div className="suggestions-grid">
                {suggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={`${suggestion.nome}-${index}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-card"
                  >
                    <div className="suggestion-icon">
                      <ProductIcon icon={suggestion.icon_name} size={32} />
                    </div>
                    <span className="suggestion-name">{suggestion.nome}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notificação de item adicionado */}
      {itemAdicionado && (
        <div className="toast-notification">
          <div className="toast-icon">
            <Icon icon="ic:round-check-circle" width={20} height={20} />
          </div>
          <div className="toast-content">
            <span className="toast-label">Item adicionado</span>
            <span className="toast-item-name">{itemAdicionado}</span>
          </div>
        </div>
      )}
    </>
  )
}
