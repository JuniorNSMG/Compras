import { useEffect, useState } from 'react'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { Login } from '@/components/Login'
import { ListView } from '@/components/ListView'
import { AceitarConvite } from '@/components/AceitarConvite'

export function App() {
  const { user, setUser, loading, setLoading } = useStore()
  const [shareToken, setShareToken] = useState<string | null>(null)

  useEffect(() => {
    // Verificar se é uma rota de compartilhamento
    const path = window.location.pathname
    const match = path.match(/^\/compartilhar\/([a-zA-Z0-9-]+)$/)
    if (match) {
      setShareToken(match[1])
    }

    // Verificar sessão existente ao iniciar
    authService.getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = authService.onAuthStateChange(setUser)

    // Ouvir mudanças de rota (popstate)
    const handlePopState = () => {
      const path = window.location.pathname
      const match = path.match(/^\/compartilhar\/([a-zA-Z0-9-]+)$/)
      setShareToken(match ? match[1] : null)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('popstate', handlePopState)
    }
  }, [setUser, setLoading])

  // Mostrar loading enquanto verifica a sessão
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Carregando...
      </div>
    )
  }

  // Se tem shareToken, mostrar tela de aceitar convite
  if (shareToken) {
    return (
      <AceitarConvite
        shareToken={shareToken}
        onAceito={() => setShareToken(null)}
      />
    )
  }

  if (!user) {
    return <Login />
  }

  return <ListView />
}
