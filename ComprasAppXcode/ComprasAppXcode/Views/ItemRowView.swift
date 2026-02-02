import SwiftUI

struct ItemRowView: View {
    let item: Item
    let onToggle: () -> Void
    let onDelete: () -> Void

    var body: some View {
        HStack(spacing: 15) {
            Button(action: onToggle) {
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(item.comprado ? Color(hex: "667eea") : Color(.systemGray4), lineWidth: 2)
                        .frame(width: 28, height: 28)

                    if item.comprado {
                        RoundedRectangle(cornerRadius: 8)
                            .fill(
                                LinearGradient(
                                    colors: [Color(hex: "667eea"), Color(hex: "764ba2")],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 28, height: 28)

                        Text("✓")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundColor(.white)
                    }
                }
            }
            .buttonStyle(PlainButtonStyle())

            Text(item.iconName)
                .font(.system(size: 42))
                .frame(width: 50, height: 50)

            VStack(alignment: .leading, spacing: 2) {
                Text(item.nome)
                    .font(.system(size: 18, weight: .medium))
                    .foregroundColor(item.comprado ? .gray : .primary)
                    .strikethrough(item.comprado)

                if let quantidade = item.quantidade {
                    Text("\(Int(quantidade))\(item.unidade ?? "")")
                        .font(.system(size: 14))
                        .foregroundColor(.gray)
                }
            }

            Spacer()

            Button(action: onDelete) {
                Text("🗑️")
                    .font(.system(size: 20))
                    .opacity(0.4)
            }
            .buttonStyle(PlainButtonStyle())
        }
        .padding(15)
        .background(Color.white)
        .opacity(item.comprado ? 0.5 : 1.0)
    }
}
