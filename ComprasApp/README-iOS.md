# 📱 App de Lista de Compras - iOS (SwiftUI)

Aplicativo nativo iOS de lista de compras inspirado no Bring!, desenvolvido com SwiftUI e Supabase.

## 🎯 Características

- Interface minimalista no estilo Bring!
- Desenvolvido 100% em SwiftUI
- Ícones grandes e reconhecíveis para cada produto (🥛🍞🥩🍎)
- Adição rápida de itens com sugestões baseadas em histórico
- Sincronização em tempo real com Supabase
- Sistema de checkbox com feedback visual imediato
- Animações suaves e nativas do iOS
- Itens comprados ficam acinzentados e vão para o final da lista

## 🛠️ Tecnologias

- **SwiftUI** - Framework de interface
- **Supabase Swift SDK** - Backend e autenticação
- **Combine** - Programação reativa
- **Swift Concurrency** - async/await

## 📋 Pré-requisitos

- Xcode 15.0+
- iOS 16.0+
- Conta no Supabase
- Swift 5.9+

## 🚀 Configuração

### 1. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute o script SQL em `/supabase-schema.sql`
3. Copie a URL e a chave anon do projeto

### 2. Configurar o Projeto

1. Abra o Xcode
2. Abra o arquivo `ComprasApp/Sources/Config/SupabaseClient.swift`
3. Substitua as credenciais:

```swift
let supabaseURL = URL(string: "SUA_URL_DO_SUPABASE")!
let supabaseKey = "SUA_CHAVE_ANON_DO_SUPABASE"
```

### 3. Instalar Dependências

O projeto usa Swift Package Manager. As dependências serão instaladas automaticamente quando você abrir o projeto no Xcode.

Dependências:
- `supabase-swift` (2.0.0+)

### 4. Executar

1. Abra o projeto no Xcode
2. Selecione um simulador ou dispositivo iOS
3. Pressione `Cmd + R` para executar

## 📁 Estrutura do Projeto

```
ComprasApp/
├── Sources/
│   ├── ComprasApp.swift          # App principal
│   ├── Models/
│   │   └── Models.swift          # Lista, Item, User
│   ├── Services/
│   │   ├── AuthService.swift     # Autenticação
│   │   ├── ListService.swift     # Gerenciamento de listas
│   │   └── ItemService.swift     # Gerenciamento de itens
│   ├── ViewModels/
│   │   └── AppViewModel.swift    # Estado global
│   ├── Views/
│   │   ├── LoginView.swift       # Tela de login
│   │   ├── ListView.swift        # Lista principal
│   │   ├── ItemRowView.swift     # Linha de item
│   │   └── QuickAddInputView.swift # Input de adição rápida
│   ├── Utils/
│   │   └── ProductIcons.swift    # Mapa de ícones
│   └── Config/
│       └── SupabaseClient.swift  # Cliente Supabase
├── Package.swift                 # Dependências
└── Info.plist                    # Configurações do app
```

## 🎨 Design

### Paleta de Cores

- **Primary Gradient**: #667eea → #764ba2
- **Background**: Sistema iOS (adaptável a Dark Mode)
- **Text**: Sistema iOS
- **Dividers**: systemGray4

### Componentes Principais

#### LoginView
- Gradiente sutil no background
- Campos arredondados com bordas suaves
- Botão com gradiente principal

#### ListView
- Header fixo com nome da lista
- Input de adição sempre visível no topo
- Lista de itens dividida em: não comprados e comprados
- Empty state quando não há itens

#### ItemRowView
- Checkbox grande (28x28) à esquerda
- Ícone emoji grande (42pt) ao lado do checkbox
- Nome do item em destaque
- Quantidade pequena abaixo do nome
- Botão de deletar à direita

#### QuickAddInputView
- Campo de texto arredondado sempre visível
- Botão circular de adicionar (quando há texto)
- Sugestões baseadas em histórico (aparece ao digitar)

## 🛒 Sistema de Ícones

O app detecta automaticamente o ícone baseado no nome:

```swift
"leite" → 🥛
"pão" → 🍞
"carne" → 🥩
"banana" → 🍌
"tomate" → 🍅
// ... e muitos outros
```

Para adicionar novos ícones, edite `ProductIcons.swift`:

```swift
static let productIconMap: [String: String] = [
    "novo_produto": "🆕",
    // ...
]
```

## 📱 Funcionalidades

### Adicionar Item

Digite no campo de input:
- `Arroz` - Adiciona "Arroz" sem quantidade
- `Leite 2` - Adiciona "Leite" com quantidade 2
- `Banana 1kg` - Adiciona "Banana" com quantidade 1 e unidade "kg"

### Marcar como Comprado

- Toque no checkbox para marcar/desmarcar
- Item marcado fica acinzentado e vai para o final
- Animação suave de reordenação

### Deletar Item

- Toque no ícone da lixeira
- Confirmação antes de deletar

### Sugestões

- Digite 2+ caracteres
- App busca no histórico de todas as suas listas
- Mostra até 5 sugestões
- Toque em uma sugestão para adicionar rapidamente

## 🔐 Segurança

- Row Level Security (RLS) no Supabase
- Usuários só veem suas próprias listas e itens
- Autenticação via Supabase Auth
- Tokens gerenciados automaticamente

## 🧪 Testing

Para testar o app:

1. Crie uma conta de teste
2. Adicione itens variados
3. Teste marcar/desmarcar
4. Teste deletar
5. Teste sugestões (adicione itens similares)
6. Teste sair e entrar novamente

## 📦 Build para Produção

1. Configure o Bundle Identifier em `Info.plist`
2. Configure certificados e provisioning profiles
3. Archive: `Product > Archive`
4. Distribua via TestFlight ou App Store

## 🐛 Troubleshooting

### Erro de autenticação
- Verifique as credenciais do Supabase em `SupabaseClient.swift`
- Verifique se o projeto Supabase está ativo

### Itens não aparecem
- Verifique se as tabelas foram criadas corretamente
- Verifique as políticas RLS no Supabase

### Sugestões não funcionam
- Certifique-se de ter itens no histórico
- Digite pelo menos 2 caracteres

## 🤝 Contribuindo

Pull requests são bem-vindos! Para mudanças maiores, abra uma issue primeiro.

## 📄 Licença

MIT

## 🎯 Roadmap

- [ ] Dark Mode completo
- [ ] Compartilhamento de listas
- [ ] Widgets iOS
- [ ] Apple Watch companion app
- [ ] Localização (EN, ES, PT)
- [ ] Categorias customizáveis
- [ ] Ordenação por categoria
- [ ] Export/Import de listas
