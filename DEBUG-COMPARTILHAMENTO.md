# Debug do Compartilhamento por Código

## Problema Relatado
Código gerado aparece como "inválido" quando digitado em outra conta.

## Passos para Diagnosticar

### 1. Verificar Tabelas no Supabase

Execute o arquivo `verificar-compartilhamento.sql` no Supabase SQL Editor:

1. Abra seu projeto no Supabase
2. Vá em "SQL Editor"
3. Copie e cole o conteúdo de `verificar-compartilhamento.sql`
4. Execute

**Resultado Esperado:**
- As tabelas `lista_compartilhamentos` e `lista_usuarios` devem existir
- Deve haver políticas RLS criadas para ambas as tabelas

**Se as tabelas não existirem:**
- Execute o arquivo `supabase-compartilhamento-codigo.sql` completamente

### 2. Verificar Logs do Console do Navegador

Adicionei logs detalhados. Para ver:

1. Abra o navegador (Chrome/Firefox)
2. Pressione F12 para abrir DevTools
3. Vá na aba "Console"
4. Limpe o console (botão 🚫)

**Ao GERAR um código:**
Você deve ver:
```
🔐 Gerando código: ABCD12
📋 Lista ID: uuid-da-lista
👤 Owner ID: uuid-do-dono
✅ Código criado com sucesso: {objeto}
```

**Ao USAR um código:**
Você deve ver:
```
🔍 Buscando código: ABCD12
🔍 User ID: uuid-do-usuario
📦 Resultado da busca: {compartilhamento, fetchError}
✅ Código encontrado! Lista ID: uuid-da-lista
➕ Adicionando usuário à lista...
✅ Usuário adicionado com sucesso!
```

**Possíveis erros:**
- ❌ `Código não encontrado ou inválido` → Tabela não existe ou RLS bloqueando
- ❌ `Erro ao buscar código` → Problema de permissões RLS
- ❌ `Você já tem acesso a esta lista` → Código funciona, mas usuário já foi adicionado
- ❌ `relation "lista_compartilhamentos" does not exist` → SQL não foi executado

### 3. Teste Manual no Supabase

Execute este SQL para criar um código manualmente e testar:

```sql
-- 1. Ver suas listas
SELECT id, nome, user_id FROM listas;

-- 2. Criar um código manualmente (substitua os UUIDs)
INSERT INTO lista_compartilhamentos (lista_id, owner_id, share_code)
VALUES (
  'uuid-da-sua-lista',  -- Pegue do SELECT acima
  'seu-user-id',        -- Pegue do SELECT acima
  'TEST01'
);

-- 3. Verificar se foi criado
SELECT * FROM lista_compartilhamentos;

-- 4. Testar busca (mesmo SQL que o app usa)
SELECT lista_id, owner_id
FROM lista_compartilhamentos
WHERE share_code = 'TEST01';
```

Se o SELECT acima retornar vazio, o problema é RLS bloqueando leitura.

### 4. Verificar Políticas RLS

Execute este SQL para ver as políticas:

```sql
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename IN ('lista_compartilhamentos', 'lista_usuarios')
ORDER BY tablename, policyname;
```

**Política necessária para funcionar:**
```
tablename: lista_compartilhamentos
policyname: Qualquer um pode buscar por código
cmd: SELECT
qual: true
```

Se esta política não existir, execute novamente o `supabase-compartilhamento-codigo.sql`.

### 5. Teste Passo a Passo

**Celular 1 (gerador):**
1. F12 → Console
2. Gere o código
3. Copie o código que aparece no console (🔐)
4. Verifique se apareceu ✅ Código criado com sucesso

**Celular 2 (receptor):**
1. F12 → Console
2. Digite o MESMO código
3. Veja os logs:
   - Se aparecer ❌ logo no início → Tabela não existe
   - Se aparecer 📦 com fetchError → Problema RLS
   - Se aparecer ✅ Código encontrado → Código foi encontrado corretamente

### 6. Solução Rápida se RLS Estiver Bloqueando

Se o problema for RLS, execute este SQL:

```sql
-- Remover política antiga se existir
DROP POLICY IF EXISTS "Qualquer um pode buscar por código" ON lista_compartilhamentos;

-- Recriar política com acesso total para SELECT
CREATE POLICY "Qualquer um pode buscar por código"
  ON lista_compartilhamentos FOR SELECT
  USING (true);
```

## Checklist

- [ ] Executei `verificar-compartilhamento.sql` e vi as tabelas
- [ ] Executei `supabase-compartilhamento-codigo.sql` se tabelas não existiam
- [ ] Abri o console do navegador (F12)
- [ ] Gerei código e vi logs 🔐 e ✅
- [ ] Usei código e vi logs 🔍 e resultado
- [ ] Li a mensagem de erro completa no console
- [ ] Verifiquei políticas RLS no Supabase

## Próximo Passo

Depois de seguir os passos acima, me informe:
1. O que apareceu nos logs do console ao tentar usar o código?
2. As tabelas existem no Supabase?
3. Qual foi a mensagem de erro exata?
