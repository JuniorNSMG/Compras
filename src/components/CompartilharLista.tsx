import { useState, useEffect } from 'react'
import { compartilhamentoService } from '@/services/compartilhamentoService'
import type { Lista } from '@/types'
import './CompartilharLista.css'

interface CompartilharListaProps {
  lista: Lista
  onClose: () => void
}

export function CompartilharLista({ lista, onClose }: CompartilharListaProps) {
  const [shareCode, setShareCode] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usuarios, setUsuarios] = useState<any[]>([])

  useEffect(() => {
    carregarCompartilhamento()
    carregarUsuarios()
  }, [])

  async function carregarCompartilhamento() {
    try {
      const codigo = await compartilhamentoService.getCodigo(lista.id)
      if (codigo) {
        setShareCode(codigo)
      }
    } catch (error) {
      console.error('Erro ao carregar código:', error)
    }
  }

  async function carregarUsuarios() {
    try {
      const users = await compartilhamentoService.getUsuariosDaLista(lista.id)
      setUsuarios(users)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    }
  }

  async function handleGerarCodigo() {
    try {
      setLoading(true)
      const codigo = await compartilhamentoService.criarCodigo(lista.id, lista.user_id)
      setShareCode(codigo)
    } catch (error) {
      console.error('Erro ao gerar código:', error)
      alert('Erro ao gerar código de compartilhamento')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopiarCodigo() {
    try {
      await navigator.clipboard.writeText(shareCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
      alert('Erro ao copiar código')
    }
  }

  async function handleRemoverCodigo() {
    if (!confirm('Deseja remover o código de compartilhamento? Ninguém mais poderá usar este código.')) return

    try {
      await compartilhamentoService.removerCodigo(lista.id)
      setShareCode('')
    } catch (error) {
      console.error('Erro ao remover código:', error)
      alert('Erro ao remover código')
    }
  }

  async function handleRemoverUsuario(userId: string) {
    if (!confirm('Deseja remover o acesso deste usuário?')) return

    try {
      await compartilhamentoService.removerUsuario(lista.id, userId)
      await carregarUsuarios()
    } catch (error) {
      console.error('Erro ao remover usuário:', error)
      alert('Erro ao remover usuário')
    }
  }

  const usuariosCompartilhados = usuarios.filter(u => !u.is_owner)

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
              Gere um código de 6 caracteres para compartilhar esta lista.
              Qualquer pessoa com o código poderá acessar e editar a lista.
            </p>

            {!shareCode ? (
              <button
                onClick={handleGerarCodigo}
                disabled={loading}
                className="btn-primary btn-gerar-link"
              >
                {loading ? 'Gerando...' : '🔗 Gerar Código'}
              </button>
            ) : (
              <div className="link-gerado">
                <div className="codigo-container">
                  <div className="codigo-display">{shareCode}</div>
                  <button
                    onClick={handleCopiarCodigo}
                    className="btn-copiar"
                    title="Copiar código"
                  >
                    {copied ? '✓' : '📋'}
                  </button>
                  <button
                    onClick={handleRemoverCodigo}
                    className="btn-remover-codigo"
                    title="Remover código"
                  >
                    🗑️
                  </button>
                </div>
                <p className="link-aviso">
                  ⚠️ Compartilhe este código apenas com pessoas de confiança
                </p>
              </div>
            )}
          </div>

          {usuariosCompartilhados.length > 0 && (
            <div className="compartilhamentos-ativos">
              <h3>Usuários com Acesso ({usuariosCompartilhados.length})</h3>
              <div className="compartilhamentos-list">
                {usuariosCompartilhados.map(user => (
                  <div key={user.user_id} className="compartilhamento-item">
                    <div className="compartilhamento-info">
                      <span className="compartilhamento-status">
                        👤 Usuário Compartilhado
                      </span>
                      <span className="compartilhamento-data">
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoverUsuario(user.user_id)}
                      className="btn-icon btn-remover"
                      title="Remover acesso"
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
