import { useState, useEffect } from 'react'
import { listService } from '@/services/listService'
import { compartilhamentoService } from '@/services/compartilhamentoService'
import { preferencesService } from '@/services/preferencesService'
import { CompartilharLista } from './CompartilharLista'
import type { Lista } from '@/types'
import './GerenciarListas.css'

interface GerenciarListasProps {
  listas: Lista[]
  userId: string
  currentListaId?: string
  onClose: () => void
  onListasUpdated: () => void
  onSelectLista?: (lista: Lista) => void
}

export function GerenciarListas({ listas, userId, currentListaId, onClose, onListasUpdated, onSelectLista }: GerenciarListasProps) {
  const [novoNome, setNovoNome] = useState('')
  const [codigo, setCodigo] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [nomeEdicao, setNomeEdicao] = useState('')
  const [salvando, setSalvando] = useState(false)
  const [listaCompartilhando, setListaCompartilhando] = useState<Lista | null>(null)
  const [listaPadraoId, setListaPadraoId] = useState<string | null>(null)

  // Carregar lista padrão ao montar o componente
  useEffect(() => {
    const defaultId = preferencesService.getDefaultListId(userId)
    setListaPadraoId(defaultId)
  }, [userId])

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

  async function handleUsarCodigo() {
    const codigoLimpo = codigo.trim().toUpperCase()
    if (!codigoLimpo) {
      alert('Digite um código válido')
      return
    }

    if (codigoLimpo.length !== 6) {
      alert('O código deve ter 6 caracteres')
      return
    }

    try {
      setSalvando(true)
      await compartilhamentoService.aceitarPorCodigo(codigoLimpo, userId)
      setCodigo('')
      alert('Lista adicionada com sucesso!')
      onListasUpdated()
      onClose()
    } catch (error: any) {
      console.error('Erro ao usar código:', error)
      alert(error.message || 'Código inválido ou expirado')
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

  function handleTogglePadrao(listaId: string) {
    if (listaPadraoId === listaId) {
      // Remover como padrão
      preferencesService.clearDefaultListId(userId)
      setListaPadraoId(null)
    } else {
      // Definir como padrão
      preferencesService.setDefaultListId(userId, listaId)
      setListaPadraoId(listaId)
    }
  }

  function handleSelectLista(lista: Lista) {
    if (onSelectLista) {
      onSelectLista(lista)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title">Gerenciar Listas</h2>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Fechar modal"
            type="button"
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          {/* Lista de listas existentes - PRIMEIRO */}
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
                        aria-label="Novo nome da lista"
                      />
                      <button
                        onClick={() => handleRenomear(lista.id)}
                        disabled={!nomeEdicao.trim() || salvando}
                        className="btn-success"
                        type="button"
                        aria-label="Confirmar renomeação"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => setEditandoId(null)}
                        disabled={salvando}
                        className="btn-cancel"
                        type="button"
                        aria-label="Cancelar renomeação"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <div
                        className="lista-info"
                        onClick={() => handleSelectLista(lista)}
                      >
                        <span className={`lista-nome ${currentListaId === lista.id ? 'lista-ativa' : ''}`}>
                          {lista.nome}
                        </span>
                        {(listaPadraoId === lista.id || currentListaId === lista.id) && (
                          <div className="lista-badges">
                            {listaPadraoId === lista.id && (
                              <span className="badge-padrao" title="Lista padrão">Padrão</span>
                            )}
                            {currentListaId === lista.id && (
                              <span className="badge-ativa" title="Lista atual">Ativa</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="lista-actions">
                        <button
                          onClick={() => handleTogglePadrao(lista.id)}
                          className={`btn-icon ${listaPadraoId === lista.id ? 'btn-padrao-ativo' : ''}`}
                          title={listaPadraoId === lista.id ? 'Remover como padrão' : 'Definir como padrão'}
                          type="button"
                          aria-label={`Definir ${lista.nome} como padrão`}
                        >
                          {listaPadraoId === lista.id ? '⭐' : '☆'}
                        </button>
                        <button
                          onClick={() => setListaCompartilhando(lista)}
                          className="btn-icon"
                          title="Compartilhar"
                          type="button"
                          aria-label={`Compartilhar ${lista.nome}`}
                        >
                          🔗
                        </button>
                        <button
                          onClick={() => iniciarEdicao(lista)}
                          className="btn-icon"
                          title="Renomear"
                          type="button"
                          aria-label={`Renomear ${lista.nome}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletar(lista)}
                          className="btn-icon"
                          title={listas.length === 1 ? 'Você precisa ter pelo menos uma lista' : 'Deletar'}
                          type="button"
                          disabled={listas.length === 1}
                          aria-label={`Deletar ${lista.nome}`}
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

          {/* Criar nova lista - SEGUNDO */}
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
                aria-label="Nome da nova lista"
              />
              <button
                onClick={handleCriar}
                disabled={!novoNome.trim() || salvando}
                className="btn-primary"
                type="button"
              >
                {salvando ? 'Criando...' : 'Criar'}
              </button>
            </div>
          </div>

          {/* Adicionar lista por código - TERCEIRO */}
          <div className="criar-lista-section codigo-section">
            <h3>Adicionar Lista por Código</h3>
            <div className="input-group">
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="Digite o código (6 caracteres)..."
                maxLength={6}
                onKeyDown={(e) => e.key === 'Enter' && handleUsarCodigo()}
                disabled={salvando}
                aria-label="Código de compartilhamento"
                style={{ fontFamily: 'monospace', letterSpacing: '2px' }}
              />
              <button
                onClick={handleUsarCodigo}
                disabled={codigo.trim().length !== 6 || salvando}
                className="btn-primary"
                type="button"
              >
                {salvando ? 'Adicionando...' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compartilhamento */}
      {listaCompartilhando && (
        <CompartilharLista
          lista={listaCompartilhando}
          onClose={() => setListaCompartilhando(null)}
        />
      )}
    </div>
  )
}
