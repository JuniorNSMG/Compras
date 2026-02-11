import { useState } from 'react'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { Icon } from '@iconify/react'
import './ConfiguracoesModal.css'

interface ConfiguracoesModalProps {
  onClose: () => void
  mostrarPrecos: boolean
  onTogglePrecos: () => void
  onModoCompras: () => void
}

export function ConfiguracoesModal({ onClose, mostrarPrecos, onTogglePrecos, onModoCompras }: ConfiguracoesModalProps) {
  const { user } = useStore()
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  async function handleSignOut() {
    setMostrarConfirmacao(false)
    onClose()
    await authService.signOut()
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-configuracoes">
        <div className="modal-header">
          <h2>Configurações</h2>
          <button className="modal-close" onClick={onClose}>
            <Icon icon="ic:round-close" width={24} height={24} />
          </button>
        </div>

        <div className="config-section">
          <div className="config-user-info">
            <div className="user-avatar">
              <Icon icon="ic:round-person" width={40} height={40} />
            </div>
            <div className="user-details">
              <div className="user-email">{user?.email || 'Usuário'}</div>
              <div className="user-status">Conta ativa</div>
            </div>
          </div>
        </div>

        <div className="config-divider"></div>

        <div className="config-section">
          <h3>Preferências</h3>

          <div className="config-option">
            <div className="config-option-info">
              <div className="config-option-label">
                <Icon icon="ic:round-attach-money" width={20} height={20} />
                Mostrar valores estimados
              </div>
              <div className="config-option-description">
                Exibe o preço estimado dos itens
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={mostrarPrecos}
                onChange={onTogglePrecos}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="config-divider"></div>

        <div className="config-section">
          <h3>Compras</h3>

          <button
            className="config-option config-option-button"
            onClick={() => {
              onModoCompras()
              onClose()
            }}
          >
            <div className="config-option-info">
              <div className="config-option-label">
                <Icon icon="ic:round-shopping-cart" width={20} height={20} />
                Modo Compras
              </div>
              <div className="config-option-description">
                Visualize itens de todas as suas listas
              </div>
            </div>
            <Icon icon="ic:round-chevron-right" width={20} height={20} />
          </button>
        </div>

        <div className="config-divider"></div>

        <div className="config-section">
          <button
            className="btn-sair"
            onClick={() => setMostrarConfirmacao(true)}
          >
            <Icon icon="ic:round-logout" width={20} height={20} />
            Sair da conta
          </button>
        </div>

        {/* Confirmação de saída */}
        {mostrarConfirmacao && (
          <div className="confirmacao-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="confirmacao-card">
              <h3>Deseja sair?</h3>
              <p>Você precisará fazer login novamente</p>
              <div className="confirmacao-actions">
                <button
                  className="btn-cancelar"
                  onClick={() => setMostrarConfirmacao(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn-confirmar"
                  onClick={handleSignOut}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
