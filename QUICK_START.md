# 🚀 Guia de Início Rápido

## Escolha sua plataforma

Este repositório contém duas versões do app:

### 📱 iOS (SwiftUI) - RECOMENDADO

Aplicativo nativo iOS com interface SwiftUI.

**Vantagens:**
- Performance nativa
- Integração total com iOS
- Animações suaves
- Experiência superior

**Como começar:**

1. Abra o Xcode
2. Navegue até `ComprasApp/`
3. Configure o Supabase em `Sources/Config/SupabaseClient.swift`
4. Execute no simulador ou dispositivo

📖 [Documentação completa do iOS](ComprasApp/README-iOS.md)

---

### 🌐 Web (React + PWA)

Progressive Web App que funciona em qualquer navegador.

**Vantagens:**
- Multiplataforma (iOS, Android, Desktop)
- Pode ser instalado como PWA
- Desenvolvimento mais rápido

**Como começar:**

1. Instale as dependências:
```bash
npm install
```

2. Configure o `.env`:
```bash
cp .env.example .env
# Edite .env com suas credenciais do Supabase
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:5173

📖 [Documentação completa da Web](README.md)

---

## ⚙️ Configurar Supabase (Necessário para ambas versões)

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em SQL Editor
4. Execute o script em `supabase-schema.sql`
5. Copie a URL e a chave anon do projeto:
   - Settings > API > Project URL
   - Settings > API > anon public

---

## 🎯 Próximos Passos

Após configurar:

1. Crie uma conta no app
2. Faça login
3. Adicione seu primeiro item
4. Teste marcar como comprado
5. Experimente as sugestões (digite 2+ caracteres)

---

## 🆘 Precisa de Ajuda?

- **iOS:** Leia [ComprasApp/README-iOS.md](ComprasApp/README-iOS.md)
- **Web:** Leia [README.md](README.md)
- **Supabase:** Execute o script `supabase-schema.sql`
- **Problemas:** Abra uma issue no GitHub

---

## 🎨 Interface Estilo Bring!

Ambas versões seguem o mesmo design minimalista:

- ✅ Ícones grandes e reconhecíveis
- ✅ Checkbox visual e imediato
- ✅ Input sempre visível no topo
- ✅ Itens comprados acinzentados
- ✅ Sugestões baseadas em histórico
- ✅ Zero configuração necessária

**Comece a usar agora!** 🛒
