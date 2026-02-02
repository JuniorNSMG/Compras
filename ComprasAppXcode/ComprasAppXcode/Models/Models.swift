import Foundation

struct Lista: Identifiable, Codable {
    let id: UUID
    let userId: UUID
    let nome: String
    let createdAt: Date
    let updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case userId = "user_id"
        case nome
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

struct Item: Identifiable, Codable {
    let id: UUID
    let listaId: UUID
    let nome: String
    let categoria: String
    let quantidade: Double?
    let unidade: String?
    let iconName: String
    var comprado: Bool
    let createdAt: Date
    let updatedAt: Date

    enum CodingKeys: String, CodingKey {
        case id
        case listaId = "lista_id"
        case nome
        case categoria
        case quantidade
        case unidade
        case iconName = "icon_name"
        case comprado
        case createdAt = "created_at"
        case updatedAt = "updated_at"
    }
}

struct User: Identifiable, Codable {
    let id: UUID
    let email: String
}
