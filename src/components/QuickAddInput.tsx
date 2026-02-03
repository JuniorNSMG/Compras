import { useState, useRef, useEffect } from 'react'
import { itemService } from '@/services/itemService'
import { searchCacheService, type SearchCacheItem } from '@/services/searchCacheService'
import { useStore } from '@/store/useStore'
import { ProductIcon } from './ProductIcon'
import './QuickAddInput.css'

export function QuickAddInput() {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<SearchCacheItem[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
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
    // Busca instantânea no cache local
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

    try {
      const newItem = await itemService.createItem(
        currentLista.id,
        nome,
        quantidade,
        unidade,
        user?.id
      )
      addItem(newItem)

      // Adicionar ao cache de busca
      if (user) {
        searchCacheService.addToCache({
          nome: newItem.nome,
          icon_name: newItem.icon_name,
          categoria: newItem.categoria
        }, user.id)
      }

      setInput('')
      setShowSuggestions(false)
      inputRef.current?.focus()
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  function handleSuggestionClick(suggestion: SearchCacheItem) {
    addItemFromInput(suggestion.nome)
  }

  return (
    <div className="quick-add-container">
      <form onSubmit={handleSubmit} className="quick-add-form">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Adicionar item..."
          className="quick-add-input"
          autoComplete="off"
        />
        {input && (
          <button type="submit" className="add-button">
            ➕
          </button>
        )}
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.nome}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              <span className="suggestion-icon">
                <ProductIcon icon={suggestion.icon_name} size={28} />
              </span>
              <span className="suggestion-text">{suggestion.nome}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
