import SwiftUI

struct QuickAddInputView: View {
    @EnvironmentObject var authService: AuthService
    @ObservedObject var viewModel: AppViewModel
    @State private var input = ""
    @State private var suggestions: [Item] = []
    @FocusState private var isFocused: Bool

    var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 10) {
                TextField("Adicionar item...", text: $input)
                    .padding(15)
                    .background(Color(.systemGray6))
                    .cornerRadius(25)
                    .overlay(
                        RoundedRectangle(cornerRadius: 25)
                            .stroke(isFocused ? Color(hex: "667eea") : Color(.systemGray4), lineWidth: 2)
                    )
                    .focused($isFocused)
                    .onChange(of: input) { _, newValue in
                        if newValue.count >= 2, let userId = authService.currentUser?.id {
                            loadSuggestions(userId: userId, query: newValue)
                        } else {
                            suggestions = []
                        }
                    }

                if !input.isEmpty {
                    Button(action: addItem) {
                        Text("➕")
                            .font(.system(size: 20))
                            .foregroundColor(.white)
                            .frame(width: 50, height: 50)
                            .background(
                                LinearGradient(
                                    colors: [Color(hex: "667eea"), Color(hex: "764ba2")],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .clipShape(Circle())
                    }
                }
            }
            .padding(15)

            if !suggestions.isEmpty {
                VStack(spacing: 0) {
                    ForEach(suggestions) { suggestion in
                        Button(action: { addItemFromSuggestion(suggestion) }) {
                            HStack(spacing: 15) {
                                Text(suggestion.iconName)
                                    .font(.system(size: 28))

                                Text(suggestion.nome)
                                    .font(.system(size: 16))
                                    .foregroundColor(.primary)

                                Spacer()
                            }
                            .padding(12)
                        }
                        .background(Color.white)

                        if suggestion.id != suggestions.last?.id {
                            Divider()
                        }
                    }
                }
                .background(Color.white)
                .cornerRadius(12)
                .shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
                .padding(.horizontal, 15)
            }
        }
        .background(Color.white)
        .shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }

    func addItem() {
        guard !input.trimmingCharacters(in: .whitespaces).isEmpty else { return }

        let parts = input.trimmingCharacters(in: .whitespaces).components(separatedBy: " ")
        var quantidade: Double?
        var unidade: String?
        var nome = input.trimmingCharacters(in: .whitespaces)

        if let lastPart = parts.last {
            let pattern = "^(\\d+)([a-zA-Z]+)?$"
            if let regex = try? NSRegularExpression(pattern: pattern),
               let match = regex.firstMatch(in: lastPart, range: NSRange(lastPart.startIndex..., in: lastPart)) {

                if let quantidadeRange = Range(match.range(at: 1), in: lastPart) {
                    quantidade = Double(lastPart[quantidadeRange])
                }

                if match.numberOfRanges > 2,
                   let unidadeRange = Range(match.range(at: 2), in: lastPart) {
                    unidade = String(lastPart[unidadeRange])
                }

                nome = parts.dropLast().joined(separator: " ")
            }
        }

        Task {
            await viewModel.addItem(nome: nome, quantidade: quantidade, unidade: unidade)
            input = ""
            suggestions = []
            isFocused = true
        }
    }

    func addItemFromSuggestion(_ suggestion: Item) {
        Task {
            await viewModel.addItem(
                nome: suggestion.nome,
                quantidade: suggestion.quantidade,
                unidade: suggestion.unidade
            )
            input = ""
            suggestions = []
            isFocused = true
        }
    }

    func loadSuggestions(userId: UUID, query: String) {
        Task {
            suggestions = await viewModel.searchHistorico(userId: userId, query: query)
        }
    }
}
