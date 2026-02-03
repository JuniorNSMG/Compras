import { useEffect, useState } from 'react'
import { itemService } from '@/services/itemService'
import { listService } from '@/services/listService'
import { authService } from '@/services/authService'
import { useStore } from '@/store/useStore'
import { QuickAddInput } from './QuickAddInput'
import { ItemRow } from './ItemRow'
import { GerenciarListas } from './GerenciarListas'
import { ORDEM_CATEGORIAS } from '@/utils/productIcons'
import type { Item } from '@/types'
import './ListView.css'

export function ListView() {
  const { user, currentLista, itens, setCurrentLista, setItens, setSyncing } = useStore()
  const [showListSelector, setShowListSelector] = useState(false)
  const [listas, setListas] = useState<any[]>([])
  const [itemsAnimandoSaida, setItemsAnimandoSaida] = useState<Set<string>>(new Set())
  const [compradosExpandido, setCompradosExpandido] = useState(false)
  const [mostrarGerenciarListas, setMostrarGerenciarListas] = useState(false)

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

  // Agrupar itens não comprados por categoria
  function agruparPorCategoria(items: Item[]) {
    const grupos: Record<string, Item[]> = {}

    items.forEach(item => {
      const categoria = item.categoria || 'Outros'
      if (!grupos[categoria]) {
        grupos[categoria] = []
      }
      grupos[categoria].push(item)
    })

    // Ordenar categorias pela ordem definida
    const ordenado: Record<string, Item[]> = {}
    ORDEM_CATEGORIAS.forEach(cat => {
      if (grupos[cat] && grupos[cat].length > 0) {
        ordenado[cat] = grupos[cat]
      }
    })

    // Adicionar categorias que não estão na ordem padrão
    Object.keys(grupos).forEach(cat => {
      if (!ordenado[cat]) {
        ordenado[cat] = grupos[cat]
      }
    })

    return ordenado
  }

  const itensAgrupadosPorCategoria = agruparPorCategoria(itensNaoComprados)

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
          <button
            onClick={() => {
              setShowListSelector(false)
              setMostrarGerenciarListas(true)
            }}
            className="list-option gerenciar"
          >
            ⚙️ Gerenciar Listas
          </button>
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
            {/* Itens não comprados agrupados por categoria */}
            {Object.entries(itensAgrupadosPorCategoria).map(([categoria, items]) => (
              <div key={categoria} className="categoria-section">
                <div className="categoria-header">
                  <h3>{categoria}</h3>
                  <span className="categoria-count">({items.length})</span>
                </div>
                <div className="items-section">
                  {items.map(item => (
                    <ItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}

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

      {/* Modal de Gerenciar Listas */}
      {mostrarGerenciarListas && user && (
        <GerenciarListas
          listas={listas}
          userId={user.id}
          onClose={() => setMostrarGerenciarListas(false)}
          onListasUpdated={loadListas}
        />
      )}
    </div>
  )
}
