# 🚀 Como Usar o Script de Sincronização

## 📥 Primeira Vez - Baixar o Projeto

1. Abra o **Terminal** no seu macOS

2. Navegue até a pasta Downloads:
```bash
cd /Users/walterjunior/Downloads
```

3. Baixe o script:
```bash
curl -O https://raw.githubusercontent.com/JuniorNSMG/Compras/claude/shopping-list-app-DCnag/sync-projeto.sh
chmod +x sync-projeto.sh
```

4. Execute o script:
```bash
./sync-projeto.sh
```

5. Escolha a opção **1) Clonar repositório**

**Pronto!** O projeto completo será baixado para `/Users/walterjunior/Downloads/Compras`

---

## 🔄 Uso Diário

### Modo Interativo (Menu)
```bash
cd /Users/walterjunior/Downloads
./sync-projeto.sh
```

Você verá um menu com opções:
- **1) Clonar** - Baixar repositório pela primeira vez
- **2) Atualizar** - Baixar últimas mudanças (pull)
- **3) Commit** - Salvar suas mudanças locais
- **4) Push** - Enviar mudanças para GitHub
- **5) Abrir no Finder** - Ver arquivos
- **6) Sair**

### Modo Direto (Comandos)

```bash
# Clonar repositório
./sync-projeto.sh clone

# Atualizar (baixar mudanças)
./sync-projeto.sh pull

# Fazer commit das suas mudanças
./sync-projeto.sh commit

# Fazer push (enviar para GitHub)
./sync-projeto.sh push

# Abrir pasta no Finder
./sync-projeto.sh open
```

---

## 💡 Fluxo de Trabalho Recomendado

### Quando for trabalhar:
```bash
./sync-projeto.sh pull    # Baixa últimas mudanças
```

### Depois de fazer alterações:
```bash
./sync-projeto.sh commit  # Salva suas mudanças
```

### Quando terminar:
```bash
./sync-projeto.sh push    # Envia para GitHub
```

---

## 🎯 Atalho Rápido (Opcional)

Para não precisar navegar até Downloads toda vez, adicione ao seu `~/.zshrc` ou `~/.bash_profile`:

```bash
alias compras='cd /Users/walterjunior/Downloads && ./sync-projeto.sh'
```

Depois, basta digitar no terminal:
```bash
compras
```

---

## 📂 Localização dos Arquivos

Tudo ficará em:
```
/Users/walterjunior/Downloads/Compras/
├── supabase-schema.sql      ← SQL do banco
├── ComprasApp/              ← App iOS (SwiftUI)
├── src/                     ← App Web (React)
├── README.md
└── ...
```

---

## ⚠️ Problemas Comuns

### "Permission denied"
```bash
chmod +x sync-projeto.sh
```

### "Repository not found"
Verifique se você tem acesso ao repositório GitHub.

### Conflitos de merge
```bash
cd /Users/walterjunior/Downloads/Compras
git status
git stash  # Salva suas mudanças temporariamente
./sync-projeto.sh pull
git stash pop  # Restaura suas mudanças
```

---

## 📞 Ajuda

Se tiver problemas, execute no Terminal:
```bash
cd /Users/walterjunior/Downloads/Compras
git status  # Ver estado atual
git log --oneline -5  # Ver últimos commits
```
