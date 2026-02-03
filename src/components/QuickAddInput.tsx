import { useState, useRef, useEffect } from 'react'
import { itemService } from '@/services/itemService'
import { useStore } from '@/store/useStore'
import { ProductIcon } from './ProductIcon'
import type { Item } from '@/types'
import './QuickAddInput.css'

export function QuickAddInput() {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<Item[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { currentLista, addItem, user } = useStore()

  useEffect(() => {
    if (input.length >= 2 && user) {
      loadSuggestions()
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [input, user])

  async function loadSuggestions() {
    if (!user) return
    try {
      const items = await itemService.searchHistorico(user.id, input)
      setSuggestions(items.slice(0, 5))
      setShowSuggestions(items.length > 0)
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error)
    }
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
      setInput('')
      setShowSuggestions(false)
      inputRef.current?.focus()
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    }
  }

  function handleSuggestionClick(suggestion: Item) {
    const text = suggestion.quantidade
      ? `${suggestion.nome} ${suggestion.quantidade}${suggestion.unidade || ''}`
      : suggestion.nome
    addItemFromInput(text)
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
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
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
