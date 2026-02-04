import { useState, useEffect } from 'react'
import { compartilhamentoService } from '@/services/compartilhamentoService'
import type { Lista, ListaCompartilhamento } from '@/types'
import './CompartilharLista.css'

interface CompartilharListaProps {
  lista: Lista
  onClose: () => void
}

export function CompartilharLista({ lista, onClose }: CompartilharListaProps) {
  const [shareUrl, setShareUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [compartilhamentos, setCompartilhamentos] = useState<ListaCompartilhamento[]>([])

  useEffect(() => {
    carregarCompartilhamentos()
  }, [])

  async function carregarCompartilhamentos() {
    try {
      const data = await compartilhamentoService.getCompartilhamentosDaLista(lista.id)
      setCompartilhamentos(data)

      // Se já existe um compartilhamento não aceito, usar esse link
      const pendente = data.find(c => !c.accepted)
      if (pendente) {
        const baseUrl = window.location.origin
        setShareUrl(`${baseUrl}/compartilhar/${pendente.share_token}`)
      }
    } catch (error) {
      console.error('Erro ao carregar compartilhamentos:', error)
    }
  }

  async function handleGerarLink() {
    try {
      setLoading(true)
      const { url } = await compartilhamentoService.criarCompartilhamento(lista.id, lista.user_id)
      setShareUrl(url)
      await carregarCompartilhamentos()
    } catch (error) {
      console.error('Erro ao gerar link:', error)
      alert('Erro ao gerar link de compartilhamento')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopiarLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
      alert('Erro ao copiar link')
    }
  }

  async function handleRemoverCompartilhamento(compartilhamentoId: string) {
    if (!confirm('Deseja remover este compartilhamento?')) return

    try {
      await compartilhamentoService.removerCompartilhamento(compartilhamentoId)
      await carregarCompartilhamentos()
      setShareUrl('')
    } catch (error) {
      console.error('Erro ao remover compartilhamento:', error)
      alert('Erro ao remover compartilhamento')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content compartilhar-modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Compartilhar "{lista.nome}"</h2>
          <button onClick={onClose} className="close-button" aria-label="Fechar">
            ✕
          </button>
        </header>

        <div className="modal-body">
          <div className="compartilhar-section">
            <p className="compartilhar-descricao">
              Gere um link para compartilhar esta lista. Qualquer pessoa com o link poderá
              adicionar, editar e remover itens da lista em tempo real.
            </p>

            {!shareUrl ? (
              <button
                onClick={handleGerarLink}
                disabled={loading}
                className="btn-primary btn-gerar-link"
              >
                {loading ? 'Gerando...' : '🔗 Gerar Link de Compartilhamento'}
              </button>
            ) : (
              <div className="link-gerado">
                <div className="link-container">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="link-input"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={handleCopiarLink}
                    className="btn-copiar"
                    title="Copiar link"
                  >
                    {copied ? '✓ Copiado!' : '📋 Copiar'}
                  </button>
                </div>
                <p className="link-aviso">
                  ⚠️ Qualquer pessoa com este link poderá acessar e editar a lista
                </p>
              </div>
            )}
          </div>

          {compartilhamentos.length > 0 && (
            <div className="compartilhamentos-ativos">
              <h3>Compartilhamentos</h3>
              <div className="compartilhamentos-list">
                {compartilhamentos.map(comp => (
                  <div key={comp.id} className="compartilhamento-item">
                    <div className="compartilhamento-info">
                      <span className="compartilhamento-status">
                        {comp.accepted ? '✓ Aceito' : '⏳ Pendente'}
                      </span>
                      {comp.accepted && comp.accepted_at && (
                        <span className="compartilhamento-data">
                          {new Date(comp.accepted_at).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoverCompartilhamento(comp.id)}
                      className="btn-icon btn-remover"
                      title="Remover compartilhamento"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
