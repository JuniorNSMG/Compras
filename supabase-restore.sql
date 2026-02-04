-- ============================================
-- RESTAURAR SUPABASE - Remover sistema de compartilhamento
-- Execute este script para voltar ao estado anterior
-- ============================================

-- PASSO 1: Remover tabela de compartilhamentos
-- ============================================

DROP TABLE IF EXISTS lista_compartilhamentos CASCADE;

-- PASSO 2: Remover funções criadas
-- ============================================

DROP FUNCTION IF EXISTS user_has_shared_access(UUID, UUID);

-- PASSO 3: Restaurar políticas originais de LISTAS
-- ============================================

-- Remover todas as políticas de listas
DROP POLICY IF EXISTS "Usuários podem ver suas próprias listas" ON listas;
DROP POLICY IF EXISTS "Usuários podem ver suas próprias listas ou compartilhadas" ON listas;
DROP POLICY IF EXISTS "Usuários podem ver suas listas e compartilhadas" ON listas;
DROP POLICY IF EXISTS "Usuários podem ver listas compartilhadas com eles" ON listas;

DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias listas" ON listas;
DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias listas ou compartilhadas" ON listas;
DROP POLICY IF EXISTS "Usuários podem atualizar suas listas e compartilhadas" ON listas;
DROP POLICY IF EXISTS "Usuários podem atualizar listas compartilhadas com eles" ON listas;

-- Recriar políticas originais de listas
CREATE POLICY "Usuários podem ver suas próprias listas"
  ON listas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias listas"
  ON listas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias listas"
  ON listas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias listas"
  ON listas FOR DELETE
  USING (auth.uid() = user_id);


-- PASSO 4: Restaurar políticas originais de ITENS
-- ============================================

-- Remover todas as políticas de itens relacionadas a compartilhamento
DROP POLICY IF EXISTS "Usuários podem ver itens de suas listas" ON itens;
DROP POLICY IF EXISTS "Usuários podem ver itens de suas listas ou compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem ver itens de listas próprias e compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem ver itens de listas compartilhadas" ON itens;

DROP POLICY IF EXISTS "Usuários podem criar itens em suas listas" ON itens;
DROP POLICY IF EXISTS "Usuários podem criar itens em suas listas ou compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem criar itens em listas próprias e compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem criar itens em listas compartilhadas" ON itens;

DROP POLICY IF EXISTS "Usuários podem atualizar itens de suas listas" ON itens;
DROP POLICY IF EXISTS "Usuários podem atualizar itens de suas listas ou compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem atualizar itens de listas próprias e compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem atualizar itens de listas compartilhadas" ON itens;

DROP POLICY IF EXISTS "Usuários podem deletar itens de suas listas" ON itens;
DROP POLICY IF EXISTS "Usuários podem deletar itens de suas listas ou compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem deletar itens de listas próprias e compartilhadas" ON itens;
DROP POLICY IF EXISTS "Usuários podem deletar itens de listas compartilhadas" ON itens;

-- Recriar políticas originais de itens
CREATE POLICY "Usuários podem ver itens de suas listas"
  ON itens FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND listas.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem criar itens em suas listas"
  ON itens FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND listas.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem atualizar itens de suas listas"
  ON itens FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND listas.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem deletar itens de suas listas"
  ON itens FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND listas.user_id = auth.uid()
    )
  );


-- PASSO 5: Verificação
-- ============================================

-- Mostrar políticas de listas
SELECT 'LISTAS' as tabela, policyname, cmd
FROM pg_policies
WHERE tablename = 'listas'
ORDER BY cmd, policyname;

-- Mostrar políticas de itens
SELECT 'ITENS' as tabela, policyname, cmd
FROM pg_policies
WHERE tablename = 'itens'
ORDER BY cmd, policyname;

-- Confirmar que lista_compartilhamentos foi removida
SELECT 'TABELAS' as tipo, tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE '%compartilh%';
