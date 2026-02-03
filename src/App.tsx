import { useEffect } from 'react'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { Login } from '@/components/Login'
import { ListView } from '@/components/ListView'

export function App() {
  const { user, setUser, loading, setLoading } = useStore()

  useEffect(() => {
    // Verificar sessão existente ao iniciar
    authService.getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = authService.onAuthStateChange(setUser)

    return () => {
      subscription.unsubscribe()
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

  if (!user) {
    return <Login />
  }

  return <ListView />
}
