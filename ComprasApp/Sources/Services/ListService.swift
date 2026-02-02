import Foundation
import Supabase

class ListService {
    private let supabase = SupabaseClient.shared.client

    func getListas(userId: UUID) async throws -> [Lista] {
        let response: [Lista] = try await supabase
            .from("listas")
            .select()
            .eq("user_id", value: userId.uuidString)
            .order("updated_at", ascending: false)
            .execute()
            .value

        return response
    }

    func createLista(userId: UUID, nome: String) async throws -> Lista {
        let newLista = [
            "user_id": userId.uuidString,
            "nome": nome
        ]

        let response: Lista = try await supabase
            .from("listas")
            .insert(newLista)
            .select()
            .single()
            .execute()
            .value

        return response
    }

    func updateLista(id: UUID, nome: String) async throws -> Lista {
        let updates = [
            "nome": nome,
            "updated_at": ISO8601DateFormatter().string(from: Date())
        ]

        let response: Lista = try await supabase
            .from("listas")
            .update(updates)
            .eq("id", value: id.uuidString)
            .select()
            .single()
            .execute()
            .value

        return response
    }

    func deleteLista(id: UUID) async throws {
        try await supabase
            .from("listas")
            .delete()
            .eq("id", value: id.uuidString)
            .execute()
    }
}
