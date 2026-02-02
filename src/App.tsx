import { useEffect } from 'react'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { Login } from '@/components/Login'
import { ListView } from '@/components/ListView'

export function App() {
  const { user, setUser, setLoading } = useStore()

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = authService.onAuthStateChange(setUser)

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setLoading])

  if (!user) {
    return <Login />
  }

  return <ListView />
}
