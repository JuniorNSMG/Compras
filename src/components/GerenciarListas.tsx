import { useState } from 'react'
import { listService } from '@/services/listService'
import type { Lista } from '@/types'
import './GerenciarListas.css'

interface GerenciarListasProps {
  listas: Lista[]
  userId: string
  onClose: () => void
  onListasUpdated: () => void
}

export function GerenciarListas({ listas, userId, onClose, onListasUpdated }: GerenciarListasProps) {
  const [novoNome, setNovoNome] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function handleCriar() {
    if (!novoNome.trim()) return

    try {
      setSalvando(true)
      await listService.createLista(userId, novoNome.trim())
      setNovoNome('')
      onListasUpdated()
    } catch (error) {
      console.error('Erro ao criar lista:', error)
      alert('Erro ao criar lista')
    } finally {
      setSalvando(false)
    }
  }

  async function handleRenomear(listaId: string) {
    if (!nomeEdicao.trim()) return

    try {
      setSalvando(true)
      await listService.updateLista(listaId, nomeEdicao.trim())
      setEditandoId(null)
      setNomeEdicao('')
      onListasUpdated()
    } catch (error) {
      console.error('Erro ao renomear lista:', error)
      alert('Erro ao renomear lista')
    } finally {
      setSalvando(false)
    }
  }

  async function handleDeletar(lista: Lista) {
    if (listas.length === 1) {
      alert('Você precisa ter pelo menos uma lista!')
      return
    }

    if (!confirm(`Tem certeza que deseja deletar "${lista.nome}"?`)) return

    try {
      setSalvando(true)
      await listService.deleteLista(lista.id)
      onListasUpdated()
    } catch (error) {
      console.error('Erro ao deletar lista:', error)
      alert('Erro ao deletar lista')
    } finally {
      setSalvando(false)
    }
  }

  function iniciarEdicao(lista: Lista) {
    setEditandoId(lista.id)
    setNomeEdicao(lista.nome)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Gerenciar Listas</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </header>

        <div className="modal-body">
          {/* Criar nova lista */}
          <div className="criar-lista-section">
            <h3>Nova Lista</h3>
            <div className="input-group">
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Nome da lista..."
                onKeyDown={(e) => e.key === 'Enter' && handleCriar()}
                disabled={salvando}
              />
              <button
                onClick={handleCriar}
                disabled={!novoNome.trim() || salvando}
                className="btn-primary"
              >
                Criar
              </button>
            </div>
          </div>

          {/* Lista de listas existentes */}
          <div className="listas-existentes">
            <h3>Minhas Listas ({listas.length})</h3>
            <div className="listas-list">
              {listas.map(lista => (
                <div key={lista.id} className="lista-item">
                  {editandoId === lista.id ? (
                    <div className="input-group">
                      <input
                        type="text"
                        value={nomeEdicao}
                        onChange={(e) => setNomeEdicao(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenomear(lista.id)
                          if (e.key === 'Escape') setEditandoId(null)
                        }}
                        autoFocus
                        disabled={salvando}
                      />
                      <button
                        onClick={() => handleRenomear(lista.id)}
                        disabled={!nomeEdicao.trim() || salvando}
                        className="btn-success"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        disabled={salvando}
                        className="btn-cancel"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="lista-nome">{lista.nome}</span>
                      <div className="lista-actions">
                        <button
                          onClick={() => iniciarEdicao(lista)}
                          className="btn-icon"
                          title="Renomear"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletar(lista)}
                          className="btn-icon"
                          title="Deletar"
                          disabled={listas.length === 1}
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
