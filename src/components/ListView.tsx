import { useEffect, useState, useRef } from 'react'
import { itemService } from '@/services/itemService'
import { listService } from '@/services/listService'
import { authService } from '@/services/authService'
import { historicoComprasService, type HistoricoCompra } from '@/services/historicoComprasService'
import { searchCacheService } from '@/services/searchCacheService'
import { preferencesService } from '@/services/preferencesService'
import { useStore } from '@/store/useStore'
import { QuickAddInput } from './QuickAddInput'
import { ItemRow } from './ItemRow'
import { GerenciarListas } from './GerenciarListas'
import { ProductIcon } from './ProductIcon'
import { ORDEM_CATEGORIAS, DEFAULT_ICON } from '@/utils/productIcons'
import type { Item } from '@/types'
import './ListView.css'

export function ListView() {
  const { user, currentLista, itens, setCurrentLista, setItens, setSyncing } = useStore()
  const [showListSelector, setShowListSelector] = useState(false)
  const [listas, setListas] = useState<any[]>([])
  const [itemsAnimandoSaida, setItemsAnimandoSaida] = useState<Set<string>>(new Set())
  const [compradosExpandido, setCompradosExpandido] = useState(false)
  const [frequentesExpandido, setFrequentesExpandido] = useState(false)
  const [mostrarGerenciarListas, setMostrarGerenciarListas] = useState(false)
  const [frequentementeComprados, setFrequentementeComprados] = useState<HistoricoCompra[]>([])
  const [toastMessage, setToastMessage] = useState<string>('')
  const previousItensRef = useRef<Map<string, boolean>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef<number>(0)
  const frequentesSectionRef = useRef<HTMLDivElement>(null)
  const compradosSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      loadListas()
      loadFrequentementeComprados()
      // Inicializar cache de busca (carrega do localStorage instantaneamente)
      // Funciona tanto no login quanto ao recarregar página já logado
      searchCacheService.initializeCache(user.id)
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
        // Tentar usar a lista padrão, senão usar a primeira
        const defaultListId = preferencesService.getDefaultListId(user.id)
        const defaultLista = data.find(l => l.id === defaultListId)

        if (defaultLista) {
          console.log('⭐ Carregando lista padrão:', defaultLista.nome)
          setCurrentLista(defaultLista)
        } else {
          console.log('📋 Carregando primeira lista:', data[0].nome)
          setCurrentLista(data[0])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar listas:', error)
    }
  }

  async function loadFrequentementeComprados() {
    if (!user) return
    try {
      const data = await historicoComprasService.getFrequentementeComprados(user.id)
      setFrequentementeComprados(data)
    } catch (error) {
      console.error('Erro ao carregar frequentemente comprados:', error)
    }
  }

  async function loadItens() {
    if (!currentLista) return

    // Carregar do cache local primeiro
    const cacheKey = `itens_${currentLista.id}`
    const cached = localStorage.getItem(cacheKey)
    if (cached) {
      try {
        const cachedItens = JSON.parse(cached)
        setItens(cachedItens)
        // Inicializar previousItensRef com o estado do cache
        previousItensRef.current = new Map(
          cachedItens.map((item: Item) => [item.id, item.comprado])
        )
      } catch (e) {
        console.error('Erro ao carregar cache:', e)
      }
    }

    // Sincronizar com o banco em background
    try {
      setSyncing(true)
      const data = await itemService.getItens(currentLista.id)
      setItens(data)
      // Salvar no cache
      localStorage.setItem(cacheKey, JSON.stringify(data))
      // Atualizar previousItensRef apenas se não foi inicializado
      if (previousItensRef.current.size === 0) {
        previousItensRef.current = new Map(
          data.map((item: Item) => [item.id, item.comprado])
        )
      }
      // Recarregar frequentemente comprados para refletir mudanças
      await loadFrequentementeComprados()
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

  async function handleLimparComprados() {
    if (!currentLista) return

    if (confirm(`Deseja remover todos os ${itensComprados.length} itens comprados?`)) {
      try {
        setSyncing(true)
        await itemService.deleteComprados(currentLista.id)
        await loadItens()
      } catch (error) {
        console.error('Erro ao limpar itens comprados:', error)
        alert('Erro ao limpar itens. Tente novamente.')
      } finally {
        setSyncing(false)
      }
    }
  }

  async function handleAdicionarFrequente(historico: HistoricoCompra) {
    if (!currentLista || !user) return

    // Verificar se o item já existe na lista (não comprados)
    const itemExiste = itens.some(
      item => item.nome.toLowerCase() === historico.item_nome.toLowerCase() && !item.comprado
    )

    if (itemExiste) {
      setToastMessage('Item já está na lista')
      setTimeout(() => setToastMessage(''), 2000)
      return
    }

    try {
      setSyncing(true)
      // Criar novo item na lista atual com os dados do histórico
      await itemService.createItem(
        currentLista.id,
        historico.item_nome,
        1, // quantidade padrão
        undefined, // sem unidade
        user.id
      )
      await loadItens()
      // Recarregar histórico para atualizar contadores se necessário
      await loadFrequentementeComprados()

      // Mostrar mensagem de sucesso
      setToastMessage(`${historico.item_nome} adicionado`)
      setTimeout(() => setToastMessage(''), 2000)
    } catch (error) {
      console.error('Erro ao adicionar item frequente:', error)
      setToastMessage('Erro ao adicionar item')
      setTimeout(() => setToastMessage(''), 2000)
    } finally {
      setSyncing(false)
    }
  }

  // Salvar no cache sempre que itens mudar
  useEffect(() => {
    if (currentLista && itens.length > 0) {
      const cacheKey = `itens_${currentLista.id}`
      localStorage.setItem(cacheKey, JSON.stringify(itens))
    }
  }, [itens, currentLista])

  // Auto-scroll para seção de frequentes quando expandir
  useEffect(() => {
    if (frequentesExpandido && frequentesSectionRef.current) {
      // Pequeno delay para garantir que o conteúdo foi renderizado antes de rolar
      setTimeout(() => {
        frequentesSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }, [frequentesExpandido])

  // Auto-scroll para seção de comprados quando expandir
  useEffect(() => {
    if (compradosExpandido && compradosSectionRef.current) {
      // Pequeno delay para garantir que o conteúdo foi renderizado antes de rolar
      setTimeout(() => {
        compradosSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }, [compradosExpandido])

  // Detectar quando item MUDA de não comprado para comprado (não todos os comprados)
  useEffect(() => {
    const recemComprados: Item[] = []

    itens.forEach(item => {
      const previousComprado = previousItensRef.current.get(item.id)

      // Se o item MUDOU de false para true (recém comprado)
      if (item.comprado && previousComprado === false) {
        recemComprados.push(item)
      }

      // Atualizar o estado anterior
      previousItensRef.current.set(item.id, item.comprado)
    })

    // Animar apenas os recém comprados
    recemComprados.forEach(item => {
      setItemsAnimandoSaida(prev => new Set(prev).add(item.id))

      // Após 5 segundos, remove da lista de animação
      setTimeout(() => {
        // Salvar posição do scroll antes de remover
        if (containerRef.current) {
          scrollPositionRef.current = containerRef.current.scrollTop
        }

        setItemsAnimandoSaida(prev => {
          const next = new Set(prev)
          next.delete(item.id)
          return next
        })

        // Restaurar posição do scroll após o próximo render
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = scrollPositionRef.current
          }
        })
      }, 5000)
    })
  }, [itens])

  // Separar itens: não comprados + animando (permanecem na categoria), e comprados (vão para seção inferior)
  // Durante animação, item permanece na categoria original
  const itensNaoComprados = itens.filter(item => !item.comprado || itemsAnimandoSaida.has(item.id))
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

      <div ref={containerRef} className="items-container safe-area-bottom">
        {itens.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <ProductIcon icon={DEFAULT_ICON} size={80} />
            </div>
            <p>Adicione seu primeiro item</p>
          </div>
        ) : (
          <>
            {/* Itens não comprados agrupados por categoria (inclui itens animando) */}
            {Object.entries(itensAgrupadosPorCategoria).map(([categoria, items]) => (
              <div key={categoria} className="categoria-section">
                <div className="categoria-header">
                  <h3>{categoria}</h3>
                  <span className="categoria-count">({items.length})</span>
                </div>
                <div className="items-section">
                  {items.map(item => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      animandoSaida={itemsAnimandoSaida.has(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Seção de comprados (colapsável) */}
            {itensComprados.length > 0 && (
              <div ref={compradosSectionRef} className="comprados-section">
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
                  <>
                    <button
                      className="limpar-comprados-button"
                      onClick={handleLimparComprados}
                    >
                      🗑️ Limpar itens comprados
                    </button>
                    <div className="comprados-list">
                      {itensComprados.map(item => (
                        <ItemRow key={item.id} item={item} compacto />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Seção de Frequentemente Comprado (sempre visível) */}
            <div ref={frequentesSectionRef} className="frequentes-section">
              <button
                className="frequentes-header"
                onClick={() => setFrequentesExpandido(!frequentesExpandido)}
              >
                <span className="frequentes-title">
                  ⭐ Frequentemente Comprado ({frequentementeComprados.length})
                </span>
                <span className="dropdown-icon">
                  {frequentesExpandido ? '▲' : '▼'}
                </span>
              </button>

              {frequentesExpandido && (
                <div className="frequentes-list">
                  {frequentementeComprados.length === 0 ? (
                    <div className="frequentes-empty">
                      <p>Seus itens mais comprados aparecerão aqui</p>
                    </div>
                  ) : (
                    frequentementeComprados.map(historico => (
                      <div
                        key={historico.id}
                        className="frequente-item"
                        onClick={() => handleAdicionarFrequente(historico)}
                      >
                        <div className="frequente-icon">
                          <ProductIcon icon={historico.icon_name} size={20} />
                        </div>
                        <div className="frequente-info">
                          <div className="frequente-nome">{historico.item_nome}</div>
                          <div className="frequente-stats">
                            {historico.purchase_count}x comprado
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
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

      {/* Toast de notificação */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  )
}
