import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store/useStore'
import { Icon } from '@iconify/react'
import { ProductIcon } from './ProductIcon'
import './PesquisarItensModal.css'

interface PesquisarItensModalProps {
  onClose: () => void
}

export function PesquisarItensModal({ onClose }: PesquisarItensModalProps) {
  const { itens } = useStore()
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [resultados, setResultados] = useState(itens)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (termoPesquisa.trim() === '') {
      setResultados(itens)
    } else {
      const termo = termoPesquisa.toLowerCase()
      const filtrados = itens.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        item.categoria?.toLowerCase().includes(termo)
      )
      setResultados(filtrados)
    }
  }, [termoPesquisa, itens])

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  function scrollToItem(itemId: string) {
    onClose()
    // Pequeno delay para garantir que o modal fechou
    setTimeout(() => {
      const element = document.getElementById(`item-${itemId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Adicionar destaque temporário
        element.style.backgroundColor = 'rgba(202, 0, 19, 0.1)'
        setTimeout(() => {
          element.style.backgroundColor = ''
        }, 2000)
      }
    }, 100)
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-pesquisar">
        <div className="modal-header">
          <h2>Pesquisar Itens</h2>
          <button className="modal-close" onClick={onClose}>
            <Icon icon="ic:round-close" width={24} height={24} />
          </button>
        </div>

        <div className="search-input-container">
          <Icon icon="ic:round-search" width={20} height={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            placeholder="Digite o nome do item..."
            className="search-input"
          />
          {termoPesquisa && (
            <button
              className="clear-button"
              onClick={() => setTermoPesquisa('')}
            >
              <Icon icon="ic:round-close" width={18} height={18} />
            </button>
          )}
        </div>

        <div className="resultados-container">
          {resultados.length === 0 ? (
            <div className="empty-results">
              <Icon icon="ic:round-search-off" width={48} height={48} />
              <p>Nenhum item encontrado</p>
            </div>
          ) : (
            <>
              <div className="resultados-header">
                {resultados.length} {resultados.length === 1 ? 'item' : 'itens'}
              </div>
              <div className="resultados-list">
                {resultados.map(item => (
                  <div
                    key={item.id}
                    className="resultado-item"
                    onClick={() => scrollToItem(item.id)}
                  >
                    <div className="resultado-icon">
                      <ProductIcon icon={item.icon_name} size={32} />
                    </div>
                    <div className="resultado-info">
                      <div className="resultado-nome">{item.nome}</div>
                      <div className="resultado-meta">
                        {item.categoria && <span className="resultado-categoria">{item.categoria}</span>}
                        {item.comprado && <span className="resultado-status">✓ Comprado</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
