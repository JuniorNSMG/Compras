import { useState } from 'react'
import { itemService } from '@/services/itemService'
import { customizacaoService } from '@/services/customizacaoService'
import { buscarPrecoEstimado } from '@/services/precoEstimadoService'
import { formatarParaInput, converterParaNumero, aplicarMascaraMoeda } from '@/utils/moneyUtils'
import { useStore } from '@/store/useStore'
import { ProductIcon } from './ProductIcon'
import { ORDEM_CATEGORIAS, AVAILABLE_ICONS } from '@/utils/productIcons'
import type { Item } from '@/types'
import './ItemOptions.css'

interface ItemOptionsProps {
  item: Item
  onClose: () => void
}

export function ItemOptions({ item, onClose }: ItemOptionsProps) {
  const { user, updateItem, removeItem } = useStore()
  const [quantidade, setQuantidade] = useState(item.quantidade?.toString() || '1')
  const [unidade, setUnidade] = useState(item.unidade || '')
  const [categoria, setCategoria] = useState(item.categoria)
  const [iconName, setIconName] = useState(item.icon_name)
  const precoInicial = item.preco_estimado || buscarPrecoEstimado(item.nome)?.preco
  const [precoEstimado, setPrecoEstimado] = useState(formatarParaInput(precoInicial))
  const [salvando, setSalvando] = useState(false)
  const [mostrarIcones, setMostrarIcones] = useState(false)
  const [buscaIcone, setBuscaIcone] = useState('')

  // Filtrar ícones baseado na busca
  const iconesFiltrados = AVAILABLE_ICONS.filter((iconOption) => {
    if (!buscaIcone) return true
    const search = buscaIcone.toLowerCase().trim()

    // Extrair nome do ícone do formato "fluent-emoji:nome-do-icone"
    const iconNameOnly = iconOption.icon.split(':')[1] || ''

    const matchName = iconOption.name.toLowerCase().includes(search)
    const matchKeywords = iconOption.keywords.some((keyword) => keyword.toLowerCase().includes(search))
    const matchIconName = iconNameOnly.toLowerCase().includes(search)

    return matchName || matchKeywords || matchIconName
  })

  async function handleSalvar() {
    if (!user) return

    try {
      setSalvando(true)
      const qtd = parseFloat(quantidade) || 1
      const preco = converterParaNumero(precoEstimado)

      // Atualizar o item
      const updated = await itemService.updateItem(item.id, {
        quantidade: qtd,
        unidade: unidade.trim() || undefined,
        categoria,
        icon_name: iconName,
        preco_estimado: preco,
      })
      updateItem(item.id, updated)

      // Salvar customização para uso futuro
      await customizacaoService.saveCustomizacao(
        user.id,
        item.nome,
        categoria,
        iconName
      )

      onClose()
    } catch (error) {
      console.error('Erro ao atualizar:', error)
      alert('Erro ao salvar')
    } finally {
      setSalvando(false)
    }
  }

  async function handleExcluir() {
    if (!confirm(`Excluir "${item.nome}"?`)) return

    try {
      setSalvando(true)
      await itemService.deleteItem(item.id, item.lista_id)
      removeItem(item.id)
      onClose()
    } catch (error) {
      console.error('Erro ao excluir:', error)
      alert('Erro ao excluir')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="item-options-overlay" onClick={onClose}>
      <div className="item-options-content" onClick={(e) => e.stopPropagation()}>
        <div className="item-options-header">
          <div className="item-options-icon">
            <ProductIcon icon={iconName} size={48} />
          </div>
          <div className="item-options-title">
            <h3>{item.nome}</h3>
            <p className="item-options-categoria">{categoria}</p>
          </div>
          <button onClick={onClose} className="item-options-close">✕</button>
        </div>

        <div className="item-options-body">
          {/* Quantidade */}
          <div className="input-section">
            <label>Quantidade</label>
            <div className="quantidade-input-group">
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="0.1"
                step="0.1"
                disabled={salvando}
              />
              <input
                type="text"
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
                placeholder="un, kg, L..."
                maxLength={10}
                disabled={salvando}
              />
            </div>
            <p className="hint">Exemplo: 2 kg, 6 un, 1 L</p>
          </div>

          {/* Categoria */}
          <div className="input-section">
            <label>Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              disabled={salvando}
              className="categoria-select"
            >
              {ORDEM_CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Ícone */}
          <div className="input-section">
            <label>Ícone</label>
            <button
              onClick={() => setMostrarIcones(!mostrarIcones)}
              disabled={salvando}
              className="icon-selector-button"
            >
              <ProductIcon icon={iconName} size={32} />
              <span>Selecionar ícone</span>
            </button>

            {mostrarIcones && (
              <>
                <input
                  type="text"
                  value={buscaIcone}
                  onChange={(e) => setBuscaIcone(e.target.value)}
                  placeholder="Buscar ícone... (ex: martelo, hammer, tool, car)"
                  className="icon-search-input"
                  disabled={salvando}
                />
                <div className="icon-grid">
                  {iconesFiltrados.length > 0 ? (
                    iconesFiltrados.map((iconOption) => (
                      <button
                        key={iconOption.icon}
                        onClick={() => {
                          setIconName(iconOption.icon)
                          setMostrarIcones(false)
                          setBuscaIcone('')
                        }}
                        className={`icon-option ${iconName === iconOption.icon ? 'selected' : ''}`}
                        title={iconOption.name}
                      >
                        <ProductIcon icon={iconOption.icon} size={32} />
                      </button>
                    ))
                  ) : (
                    <p className="no-icons-message">Nenhum ícone encontrado para "{buscaIcone}"</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Preço Estimado */}
          <div className="input-section">
            <label>Preço estimado (R$)</label>
            <input
              type="text"
              inputMode="decimal"
              value={precoEstimado}
              onChange={(e) => setPrecoEstimado(aplicarMascaraMoeda(e.target.value))}
              placeholder="0,00"
              disabled={salvando}
              className="preco-input"
            />
            <p className="hint">Preço por {unidade || 'unidade'}. Deixe vazio para usar estimativa automática.</p>
          </div>

          <div className="item-options-actions">
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="btn-save"
            >
              💾 Salvar
            </button>
            <button
              onClick={handleExcluir}
              disabled={salvando}
              className="btn-delete"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
