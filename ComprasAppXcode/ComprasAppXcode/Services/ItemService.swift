import Foundation
import Supabase

class ItemService {
    private let supabase = SupabaseManager.shared.client

    func getItens(listaId: UUID) async throws -> [Item] {
        let response: [Item] = try await supabase
            .from("itens")
            .select()
            .eq("lista_id", value: listaId.uuidString)
            .order("comprado", ascending: true)
            .order("created_at", ascending: false)
            .execute()
            .value

        return response
    }

    func createItem(
        listaId: UUID,
        nome: String,
        quantidade: Double? = nil,
        unidade: String? = nil
    ) async throws -> Item {
        let categoria = ProductIcons.getCategoria(from: nome)
        let iconName = ProductIcons.getIcon(for: nome, categoria: categoria)

        var newItem: [String: Any] = [
            "lista_id": listaId.uuidString,
            "nome": nome,
            "categoria": categoria,
            "icon_name": iconName,
            "comprado": false
        ]

        if let quantidade = quantidade {
            newItem["quantidade"] = quantidade
        }

        if let unidade = unidade {
            newItem["unidade"] = unidade
        }

        let response: Item = try await supabase
            .from("itens")
            .insert(newItem)
            .select()
            .single()
            .execute()
            .value

        try await updateListaTimestamp(listaId: listaId)

        return response
    }

    func updateItem(id: UUID, comprado: Bool) async throws -> Item {
        let updates = [
            "comprado": comprado,
            "updated_at": ISO8601DateFormatter().string(from: Date())
        ]

        let response: Item = try await supabase
            .from("itens")
            .update(updates)
            .eq("id", value: id.uuidString)
            .select()
            .single()
            .execute()
            .value

        try await updateListaTimestamp(listaId: response.listaId)

        return response
    }

    func deleteItem(id: UUID, listaId: UUID) async throws {
        try await supabase
            .from("itens")
            .delete()
            .eq("id", value: id.uuidString)
            .execute()

        try await updateListaTimestamp(listaId: listaId)
    }

    func searchHistorico(userId: UUID, query: String) async throws -> [Item] {
        // Primeiro, buscar todas as listas do usuário
        let listas: [Lista] = try await supabase
            .from("listas")
            .select()
            .eq("user_id", value: userId.uuidString)
            .execute()
            .value

        let listaIds = listas.map { $0.id.uuidString }

        // Buscar itens que correspondem à query
        let response: [Item] = try await supabase
            .from("itens")
            .select()
            .in("lista_id", values: listaIds)
            .ilike("nome", pattern: "%\(query)%")
            .limit(5)
            .execute()
            .value

        return response
    }

    private func updateListaTimestamp(listaId: UUID) async throws {
        let updates = [
            "updated_at": ISO8601DateFormatter().string(from: Date())
        ]

        try await supabase
            .from("listas")
            .update(updates)
            .eq("id", value: listaId.uuidString)
            .execute()
    }
}
