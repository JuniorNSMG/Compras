import { useState, useEffect } from 'react'
import { compartilhamentoService } from '@/services/compartilhamentoService'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import './AceitarConvite.css'

interface AceitarConviteProps {
  shareToken: string
  onAceito: () => void
}

export function AceitarConvite({ shareToken, onAceito }: AceitarConviteProps) {
  const { user, setUser } = useStore()
  const [loading, setLoading] = useState(true)
  const [tokenValido, setTokenValido] = useState(false)
  const [aceitando, setAceitando] = useState(false)
  const [erro, setErro] = useState<string>('')

  useEffect(() => {
    validarToken()
  }, [shareToken])

  async function validarToken() {
    try {
      const valido = await compartilhamentoService.validarToken(shareToken)
      setTokenValido(valido)
      if (!valido) {
        setErro('Link de compartilhamento inválido ou expirado')
      }
    } catch (error) {
      console.error('Erro ao validar token:', error)
      setErro('Erro ao validar link de compartilhamento')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true)
      setErro('')
      const response = await authService.signIn(email, password)
      if (response.user) {
        setUser({
          id: response.user.id,
          email: response.user.email!,
        })
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      setErro(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  async function handleAceitar() {
    if (!user) {
      setErro('Você precisa estar logado para aceitar o convite')
      return
    }

    try {
      setAceitando(true)
      setErro('')
      await compartilhamentoService.aceitarCompartilhamento(shareToken, user.id)
      // Redirecionar para a lista normal
      window.history.pushState({}, '', '/')
      onAceito()
    } catch (error: any) {
      console.error('Erro ao aceitar convite:', error)
      setErro(error.message || 'Erro ao aceitar convite')
    } finally {
      setAceitando(false)
    }
  }

  if (loading) {
    return (
      <div className="aceitar-convite-container">
        <div className="aceitar-convite-card">
          <h2>Validando convite...</h2>
        </div>
      </div>
    )
  }

  if (!tokenValido) {
    return (
      <div className="aceitar-convite-container">
        <div className="aceitar-convite-card">
          <div className="erro-icon">❌</div>
          <h2>Convite Inválido</h2>
          <p className="erro-message">{erro}</p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/')
              onAceito()
            }}
            className="btn-primary"
          >
            Voltar para minhas listas
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="aceitar-convite-container">
        <div className="aceitar-convite-card">
          <h2>🔗 Convite de Compartilhamento</h2>
          <p>Você foi convidado para colaborar em uma lista de compras!</p>
          <p className="info-message">
            Faça login ou crie uma conta para aceitar o convite.
          </p>
          <LoginForm onLogin={handleLogin} loading={loading} />
          {erro && <p className="erro-message">{erro}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="aceitar-convite-container">
      <div className="aceitar-convite-card">
        <div className="sucesso-icon">🎉</div>
        <h2>Você foi convidado!</h2>
        <p>Deseja aceitar o convite para colaborar nesta lista de compras?</p>
        <p className="info-message">
          Você poderá adicionar, editar e remover itens da lista compartilhada.
        </p>
        {erro && <p className="erro-message">{erro}</p>}
        <div className="convite-actions">
          <button
            onClick={handleAceitar}
            disabled={aceitando}
            className="btn-primary"
          >
            {aceitando ? 'Aceitando...' : '✓ Aceitar Convite'}
          </button>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/')
              onAceito()
            }}
            className="btn-secondary"
            disabled={aceitando}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  loading: boolean
}

function LoginForm({ onLogin, loading }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onLogin(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
