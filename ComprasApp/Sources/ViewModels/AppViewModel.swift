import Foundation
import SwiftUI

@MainActor
class AppViewModel: ObservableObject {
    @Published var currentLista: Lista?
    @Published var listas: [Lista] = []
    @Published var itens: [Item] = []
    @Published var isLoading = false
    @Published var isSyncing = false
    @Published var errorMessage: String?

    private let listService = ListService()
    private let itemService = ItemService()

    var itensNaoComprados: [Item] {
        itens.filter { !$0.comprado }
    }

    var itensComprados: [Item] {
        itens.filter { $0.comprado }
    }

    func loadListas(userId: UUID) async {
        isLoading = true
        defer { isLoading = false }

        do {
            listas = try await listService.getListas(userId: userId)

            if listas.isEmpty {
                let newLista = try await listService.createLista(
                    userId: userId,
                    nome: "Minha Lista"
                )
                listas = [newLista]
                currentLista = newLista
            } else {
                currentLista = listas.first
            }

            if let currentLista = currentLista {
                await loadItens(listaId: currentLista.id)
            }
        } catch {
            errorMessage = "Erro ao carregar listas: \(error.localizedDescription)"
        }
    }

    func loadItens(listaId: UUID) async {
        isSyncing = true
        defer { isSyncing = false }

        do {
            itens = try await itemService.getItens(listaId: listaId)
        } catch {
            errorMessage = "Erro ao carregar itens: \(error.localizedDescription)"
        }
    }

    func addItem(nome: String, quantidade: Double? = nil, unidade: String? = nil) async {
        guard let currentLista = currentLista else { return }

        do {
            let newItem = try await itemService.createItem(
                listaId: currentLista.id,
                nome: nome,
                quantidade: quantidade,
                unidade: unidade
            )

            itens.insert(newItem, at: 0)
        } catch {
            errorMessage = "Erro ao adicionar item: \(error.localizedDescription)"
        }
    }

    func toggleItem(_ item: Item) async {
        do {
            let updatedItem = try await itemService.updateItem(
                id: item.id,
                comprado: !item.comprado
            )

            if let index = itens.firstIndex(where: { $0.id == item.id }) {
                itens[index] = updatedItem
            }

            // Reordenar: não comprados primeiro
            itens.sort { (!$0.comprado && $1.comprado) }
        } catch {
            errorMessage = "Erro ao atualizar item: \(error.localizedDescription)"
        }
    }

    func deleteItem(_ item: Item) async {
        do {
            try await itemService.deleteItem(
                id: item.id,
                listaId: item.listaId
            )

            itens.removeAll { $0.id == item.id }
        } catch {
            errorMessage = "Erro ao deletar item: \(error.localizedDescription)"
        }
    }

    func searchHistorico(userId: UUID, query: String) async -> [Item] {
        do {
            return try await itemService.searchHistorico(
                userId: userId,
                query: query
            )
        } catch {
            return []
        }
    }
}
