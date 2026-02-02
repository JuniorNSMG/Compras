# 📱 App de Lista de Compras

Aplicativo de lista de compras inspirado no Bring!, com interface minimalista e foco na experiência do usuário.

## 🎯 Duas Versões Disponíveis

Este projeto oferece duas implementações:

1. **📱 iOS (SwiftUI)** - App nativo iOS → [Ver documentação](ComprasApp/README-iOS.md)
2. **🌐 Web (React + PWA)** - Progressive Web App → (Você está aqui)

📖 **[Guia de Início Rápido](QUICK_START.md)** para começar rapidamente!

## 🎯 Características

- Interface limpa e minimalista no estilo Bring!
- Ícones grandes e reconhecíveis para cada produto
- Adição rápida de itens com sugestões baseadas em histórico
- Sincronização em tempo real com Supabase
- PWA otimizado para iOS
- Sistema de checkbox com feedback visual imediato
- Itens comprados ficam acinzentados e vão para o final da lista

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- Conta no Supabase

### Configuração do Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Execute o script SQL em `supabase-schema.sql` no SQL Editor do Supabase
3. Copie a URL e a chave anon do seu projeto

### Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Compras
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Acesse http://localhost:5173

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🎨 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Login.tsx       # Tela de autenticação
│   ├── ListView.tsx    # Lista principal
│   ├── ItemRow.tsx     # Linha de item
│   └── QuickAddInput.tsx # Input de adição rápida
├── services/           # Serviços de API
│   ├── authService.ts  # Autenticação
│   ├── listService.ts  # Gerenciamento de listas
│   └── itemService.ts  # Gerenciamento de itens
├── store/              # Estado global (Zustand)
│   └── useStore.ts
├── utils/              # Utilitários
│   └── productIcons.ts # Mapa de ícones
├── lib/                # Configurações
│   └── supabase.ts     # Cliente Supabase
├── types/              # Tipos TypeScript
│   └── index.ts
└── styles/             # Estilos globais
    └── global.css
```

## 🗄️ Banco de Dados

### Tabela `listas`
- `id`: UUID (primary key)
- `user_id`: UUID (foreign key para auth.users)
- `nome`: TEXT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Tabela `itens`
- `id`: UUID (primary key)
- `lista_id`: UUID (foreign key para listas)
- `nome`: TEXT
- `categoria`: TEXT
- `quantidade`: NUMERIC (opcional)
- `unidade`: TEXT (opcional)
- `icon_name`: TEXT
- `comprado`: BOOLEAN
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## 🔐 Segurança

O projeto utiliza Row Level Security (RLS) do Supabase para garantir que:
- Usuários só podem ver e modificar suas próprias listas
- Usuários só podem ver e modificar itens de suas próprias listas

## 🛒 Sistema de Ícones

O app detecta automaticamente o ícone apropriado baseado no nome do produto:
- Leite → 🥛
- Pão → 🍞
- Carne → 🥩
- Frutas → 🍎🍌🍊
- Vegetais → 🥕🍅🥬
- E muitos outros...

## 📱 PWA para iOS

O app é configurado como Progressive Web App e pode ser instalado na tela inicial do iPhone:
1. Abra o app no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT
