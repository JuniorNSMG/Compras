import SwiftUI

struct ListView: View {
    @EnvironmentObject var authService: AuthService
    @StateObject private var viewModel = AppViewModel()
    @State private var showListSelector = false
    @State private var showDeleteConfirmation = false
    @State private var itemToDelete: Item?

    var body: some View {
        VStack(spacing: 0) {
            header

            if showListSelector {
                listSelector
            }

            QuickAddInputView(viewModel: viewModel)

            ScrollView {
                if viewModel.itens.isEmpty {
                    emptyState
                } else {
                    itemsList
                }
            }
        }
        .background(Color(.systemGroupedBackground))
        .task {
            if let userId = authService.currentUser?.id {
                await viewModel.loadListas(userId: userId)
            }
        }
        .alert("Remover item", isPresented: $showDeleteConfirmation) {
            Button("Cancelar", role: .cancel) {}
            Button("Remover", role: .destructive) {
                if let item = itemToDelete {
                    Task {
                        await viewModel.deleteItem(item)
                    }
                }
            }
        } message: {
            if let item = itemToDelete {
                Text("Deseja remover \"\(item.nome)\"?")
            }
        }
    }

    var header: some View {
        HStack {
            Button(action: { showListSelector.toggle() }) {
                HStack(spacing: 8) {
                    Text(viewModel.currentLista?.nome ?? "Carregando...")
                        .font(.system(size: 24, weight: .semibold))
                        .foregroundColor(.primary)

                    Text(showListSelector ? "▲" : "▼")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                }
            }
            .buttonStyle(PlainButtonStyle())

            Spacer()

            Button(action: {
                Task {
                    try? await authService.signOut()
                }
            }) {
                Text("Sair")
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                    .background(Color(.systemGray6))
                    .cornerRadius(8)
            }
        }
        .padding(15)
        .background(Color.white)
        .shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }

    var listSelector: some View {
        VStack(spacing: 5) {
            ForEach(viewModel.listas) { lista in
                Button(action: {
                    viewModel.currentLista = lista
                    showListSelector = false
                    Task {
                        await viewModel.loadItens(listaId: lista.id)
                    }
                }) {
                    Text(lista.nome)
                        .font(.system(size: 16))
                        .foregroundColor(lista.id == viewModel.currentLista?.id ? Color(hex: "667eea") : .primary)
                        .fontWeight(lista.id == viewModel.currentLista?.id ? .semibold : .regular)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(12)
                        .background(
                            lista.id == viewModel.currentLista?.id
                                ? Color(hex: "e8eaf6")
                                : Color.white
                        )
                        .cornerRadius(8)
                }
                .buttonStyle(PlainButtonStyle())
            }
        }
        .padding(10)
        .background(Color.white)
        .shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }

    var emptyState: some View {
        VStack(spacing: 20) {
            Text("🛒")
                .font(.system(size: 80))
                .opacity(0.3)

            Text("Adicione seu primeiro item")
                .font(.system(size: 18))
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity)
        .padding(60)
    }

    var itemsList: some View {
        VStack(spacing: 0) {
            if !viewModel.itensNaoComprados.isEmpty {
                ForEach(viewModel.itensNaoComprados) { item in
                    ItemRowView(
                        item: item,
                        onToggle: {
                            Task {
                                await viewModel.toggleItem(item)
                            }
                        },
                        onDelete: {
                            itemToDelete = item
                            showDeleteConfirmation = true
                        }
                    )

                    if item.id != viewModel.itensNaoComprados.last?.id {
                        Divider()
                            .padding(.leading, 60)
                    }
                }
            }

            if !viewModel.itensComprados.isEmpty {
                Rectangle()
                    .fill(Color(.systemGray5))
                    .frame(height: 2)
                    .padding(.vertical, 10)

                ForEach(viewModel.itensComprados) { item in
                    ItemRowView(
                        item: item,
                        onToggle: {
                            Task {
                                await viewModel.toggleItem(item)
                            }
                        },
                        onDelete: {
                            itemToDelete = item
                            showDeleteConfirmation = true
                        }
                    )

                    if item.id != viewModel.itensComprados.last?.id {
                        Divider()
                            .padding(.leading, 60)
                    }
                }
            }
        }
        .background(Color.white)
        .cornerRadius(12)
        .padding()
    }
}
