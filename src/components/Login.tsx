import { useState } from 'react'
import { authService } from '@/services/authService'
import './Login.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await authService.signUp(email, password)
        setError('Conta criada! Verifique seu email.')
      } else {
        await authService.signIn(email, password)
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon" role="img" aria-label="Carrinho de compras">🛒</div>
          <h1>Lista de Compras</h1>
          <p className="login-subtitle">
            {isSignUp ? 'Crie sua conta para começar' : 'Entre para acessar suas listas'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email"
          />

          <input
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            aria-label="Senha"
          />

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="primary-button">
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
          }}
          className="toggle-button"
        >
          {isSignUp ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
        </button>
      </div>
    </div>
  )
}
