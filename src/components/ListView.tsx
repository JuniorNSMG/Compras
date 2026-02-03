import { useEffect, useState } from 'react'
import { itemService } from '@/services/itemService'
import { listService } from '@/services/listService'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { QuickAddInput } from './QuickAddInput'
import { ItemRow } from './ItemRow'
import './ListView.css'

export function ListView() {
  const { user, currentLista, itens, setCurrentLista, setItens, setSyncing } = useStore()
  const [showListSelector, setShowListSelector] = useState(false)
  const [listas, setListas] = useState<any[]>([])
  const [itemsAnimandoSaida, setItemsAnimandoSaida] = useState<Set<string>>(new Set())
  const [compradosExpandido, setCompradosExpandido] = useState(false)

  useEffect(() => {
    if (user) {
      loadListas()
    }
  }, [user])

  useEffect(() => {
    if (currentLista) {
      loadItens()
    }
  }, [currentLista])

  async function loadListas() {
    if (!user) return
    try {
      const data = await listService.getListas(user.id)
      setListas(data)

      if (data.length === 0) {
        const newLista = await listService.createLista(user.id, 'Minha Lista')
        setListas([newLista])
        setCurrentLista(newLista)
      } else {
        setCurrentLista(data[0])
      }
    } catch (error) {
      console.error('Erro ao carregar listas:', error)
    }
  }

  async function loadItens() {
    if (!currentLista) return
    try {
      setSyncing(true)
      const data = await itemService.getItens(currentLista.id)
      setItens(data)
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
    } finally {
      setSyncing(false)
    }
  }

  async function handleSignOut() {
    if (confirm('Deseja sair?')) {
      await authService.signOut()
    }
  }

  // Detectar quando item é marcado como comprado para iniciar animação
  useEffect(() => {
    const novosComprados = itens.filter(item =>
      item.comprado && !itemsAnimandoSaida.has(item.id)
    )

    novosComprados.forEach(item => {
      setItemsAnimandoSaida(prev => new Set(prev).add(item.id))

      // Após 5 segundos, remove da lista de animação
      setTimeout(() => {
        setItemsAnimandoSaida(prev => {
          const next = new Set(prev)
          next.delete(item.id)
          return next
        })
      }, 5000)
    })
  }, [itens])

  // Separar itens em: não comprados, animando saída, e comprados (escondidos)
  const itensNaoComprados = itens.filter(item => !item.comprado)
  const itensAnimando = itens.filter(item => item.comprado && itemsAnimandoSaida.has(item.id))
  const itensComprados = itens.filter(item => item.comprado && !itemsAnimandoSaida.has(item.id))

  return (
    <div className="list-view-container container">
      <header className="list-header safe-area-top">
        <button onClick={() => setShowListSelector(!showListSelector)} className="list-title-button">
          <h1>{currentLista?.nome || 'Carregando...'}</h1>
          <span className="dropdown-icon">{showListSelector ? '▲' : '▼'}</span>
        </button>
        <button onClick={handleSignOut} className="signout-button">
          Sair
        </button>
      </header>

      {showListSelector && (
        <div className="list-selector">
          {listas.map(lista => (
            <button
              key={lista.id}
              onClick={() => {
                setCurrentLista(lista)
                setShowListSelector(false)
              }}
              className={`list-option ${lista.id === currentLista?.id ? 'active' : ''}`}
            >
              {lista.nome}
            </button>
          ))}
        </div>
      )}

      <QuickAddInput />

      <div className="items-container safe-area-bottom">
        {itens.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <p>Adicione seu primeiro item</p>
          </div>
        ) : (
          <>
            {/* Itens não comprados */}
            {itensNaoComprados.length > 0 && (
              <div className="items-section">
                {itensNaoComprados.map(item => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </div>
            )}

            {/* Itens animando saída (5 segundos riscados) */}
            {itensAnimando.length > 0 && (
              <div className="items-section">
                {itensAnimando.map(item => (
                  <ItemRow key={item.id} item={item} animandoSaida />
                ))}
              </div>
            )}

            {/* Seção de comprados (colapsável) */}
            {itensComprados.length > 0 && (
              <div className="comprados-section">
                <button
                  className="comprados-header"
                  onClick={() => setCompradosExpandido(!compradosExpandido)}
                >
                  <span className="comprados-title">
                    ✓ Comprados ({itensComprados.length})
                  </span>
                  <span className="dropdown-icon">
                    {compradosExpandido ? '▲' : '▼'}
                  </span>
                </button>

                {compradosExpandido && (
                  <div className="comprados-list">
                    {itensComprados.map(item => (
                      <ItemRow key={item.id} item={item} compacto />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
