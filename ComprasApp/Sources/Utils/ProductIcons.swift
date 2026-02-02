import Foundation

struct ProductIcons {
    static let productIconMap: [String: String] = [
        // Laticínios
        "leite": "🥛",
        "iogurte": "🥛",
        "queijo": "🧀",
        "manteiga": "🧈",
        "requeijão": "🧈",
        "requeijao": "🧈",

        // Padaria
        "pão": "🍞",
        "pao": "🍞",
        "torrada": "🍞",
        "bolo": "🎂",
        "croissant": "🥐",

        // Carnes
        "carne": "🥩",
        "frango": "🍗",
        "peixe": "🐟",
        "bacon": "🥓",
        "salsicha": "🌭",
        "linguiça": "🌭",
        "linguica": "🌭",

        // Frutas
        "maçã": "🍎",
        "maca": "🍎",
        "banana": "🍌",
        "laranja": "🍊",
        "uva": "🍇",
        "morango": "🍓",
        "melancia": "🍉",
        "abacaxi": "🍍",
        "limão": "🍋",
        "limao": "🍋",
        "manga": "🥭",
        "pera": "🍐",
        "pêssego": "🍑",
        "pessego": "🍑",

        // Vegetais
        "tomate": "🍅",
        "alface": "🥬",
        "cenoura": "🥕",
        "batata": "🥔",
        "cebola": "🧅",
        "alho": "🧄",
        "brócolis": "🥦",
        "brocolis": "🥦",
        "berinjela": "🍆",
        "pimentão": "🫑",
        "pimentao": "🫑",
        "pepino": "🥒",

        // Grãos e massas
        "arroz": "🍚",
        "feijão": "🫘",
        "feijao": "🫘",
        "macarrão": "🍝",
        "macarrao": "🍝",
        "espaguete": "🍝",

        // Bebidas
        "café": "☕",
        "cafe": "☕",
        "chá": "🍵",
        "cha": "🍵",
        "suco": "🧃",
        "refrigerante": "🥤",
        "cerveja": "🍺",
        "vinho": "🍷",
        "água": "💧",
        "agua": "💧",

        // Limpeza
        "detergente": "🧴",
        "sabão": "🧼",
        "sabao": "🧼",
        "desinfetante": "🧴",
        "amaciante": "🧴",
        "sabonete": "🧼",
        "shampoo": "🧴",
        "condicionador": "🧴",

        // Outros
        "ovo": "🥚",
        "ovos": "🥚",
        "chocolate": "🍫",
        "biscoito": "🍪",
        "açúcar": "🧂",
        "acucar": "🧂",
        "sal": "🧂",
        "óleo": "🛢️",
        "oleo": "🛢️",
        "azeite": "🫒",
    ]

    static let defaultIcon = "🛒"

    static func getIcon(for nome: String, categoria: String? = nil) -> String {
        let nomeLower = nome.lowercased()

        for (key, icon) in productIconMap {
            if nomeLower.contains(key) {
                return icon
            }
        }

        if let categoria = categoria {
            let categoriaLower = categoria.lowercased()
            for (key, icon) in productIconMap {
                if categoriaLower.contains(key) {
                    return icon
                }
            }
        }

        return defaultIcon
    }

    static func getCategoria(from nome: String) -> String {
        let nomeLower = nome.lowercased()

        let categorias: [String: [String]] = [
            "Laticínios": ["leite", "iogurte", "queijo", "manteiga", "requeijão", "requeijao"],
            "Padaria": ["pão", "pao", "torrada", "bolo", "croissant"],
            "Carnes": ["carne", "frango", "peixe", "bacon", "salsicha", "linguiça", "linguica"],
            "Frutas": ["maçã", "maca", "banana", "laranja", "uva", "morango", "melancia", "abacaxi", "limão", "limao", "manga", "pera", "pêssego", "pessego"],
            "Vegetais": ["tomate", "alface", "cenoura", "batata", "cebola", "alho", "brócolis", "brocolis", "berinjela", "pimentão", "pimentao", "pepino"],
            "Grãos": ["arroz", "feijão", "feijao", "macarrão", "macarrao", "espaguete"],
            "Bebidas": ["café", "cafe", "chá", "cha", "suco", "refrigerante", "cerveja", "vinho", "água", "agua"],
            "Limpeza": ["detergente", "sabão", "sabao", "desinfetante", "amaciante", "sabonete", "shampoo", "condicionador"],
            "Higiene": ["pasta de dente", "escova de dente", "sabonete", "shampoo", "condicionador"]
        ]

        for (categoria, palavras) in categorias {
            if palavras.contains(where: { nomeLower.contains($0) }) {
                return categoria
            }
        }

        return "Outros"
    }
}
