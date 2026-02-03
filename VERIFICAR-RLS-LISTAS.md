# Verificar isolamento de listas por usuário

## Problema reportado
Usuários estão vendo listas de outros usuários (ex: teniskelsen@gmail.com pode ver listas de outros)

## Causa provável
As políticas RLS (Row Level Security) podem não estar ativadas ou configuradas corretamente na tabela `listas`

## Como verificar no Supabase

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Authentication** > **Users**
4. Verifique se existem múltiplos usuários cadastrados
5. Vá em **SQL Editor**
6. Execute este comando para verificar RLS:

```sql
-- Verificar se RLS está ativado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'listas';

-- Deve retornar: rowsecurity = true
```

7. Verificar políticas existentes:

```sql
-- Ver todas as políticas da tabela listas
SELECT * FROM pg_policies WHERE tablename = 'listas';
```

## Solução: Execute este SQL COMPLETO

**IMPORTANTE:** Execute TODO o bloco de uma vez no SQL Editor do Supabase:

```sql
-- 1. Remover políticas antigas (se existirem)
DROP POLICY IF EXISTS "Usuários podem ver suas próprias listas" ON listas;
DROP POLICY IF EXISTS "Usuários podem criar suas próprias listas" ON listas;
DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias listas" ON listas;
DROP POLICY IF EXISTS "Usuários podem deletar suas próprias listas" ON listas;

-- 2. Ativar RLS
ALTER TABLE listas ENABLE ROW LEVEL SECURITY;

-- 3. Criar políticas corretas
CREATE POLICY "Usuários podem ver suas próprias listas"
  ON listas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias listas"
  ON listas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias listas"
  ON listas FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias listas"
  ON listas FOR DELETE
  USING (auth.uid() = user_id);
```

**NOTA:** O `DROP POLICY IF EXISTS` remove as políticas antigas antes de criar novas, evitando o erro "policy already exists".

## Teste

Após aplicar as políticas:

1. Faça logout do app
2. Crie um novo usuário de teste (ex: teste@exemplo.com)
3. Crie uma lista com nome "Lista de Teste"
4. Faça logout
5. Faça login com teniskelsen@gmail.com
6. Verifique se a "Lista de Teste" NÃO aparece

Se não aparecer, o RLS está funcionando corretamente! ✅

## Código do app já está correto

O arquivo `src/services/listService.ts` já filtra por `user_id`:

```typescript
async getListas(userId: string): Promise<Lista[]> {
  const { data, error } = await supabase
    .from('listas')
    .select('*')
    .eq('user_id', userId)  // ✅ Correto
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data || []
}
```

O problema está apenas na configuração do RLS no Supabase.
