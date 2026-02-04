-- ============================================
-- Sistema de Compartilhamento por Código
-- Execute este script no Supabase
-- ============================================

-- PASSO 1: Criar tabela simplificada
-- ============================================

CREATE TABLE IF NOT EXISTS lista_compartilhamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lista_id UUID NOT NULL REFERENCES listas(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_compartilhamentos_lista_id ON lista_compartilhamentos(lista_id);
CREATE INDEX IF NOT EXISTS idx_compartilhamentos_share_code ON lista_compartilhamentos(share_code);

-- Tabela para registrar quem aceitou cada compartilhamento
CREATE TABLE IF NOT EXISTS lista_usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lista_id UUID NOT NULL REFERENCES listas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_owner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lista_id, user_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_lista_usuarios_lista_id ON lista_usuarios(lista_id);
CREATE INDEX IF NOT EXISTS idx_lista_usuarios_user_id ON lista_usuarios(user_id);

-- PASSO 2: Habilitar RLS
-- ============================================

ALTER TABLE lista_compartilhamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE lista_usuarios ENABLE ROW LEVEL SECURITY;

-- PASSO 3: Políticas para lista_compartilhamentos
-- ============================================

-- Qualquer um pode ver compartilhamento pelo código (para validar)
CREATE POLICY "Qualquer um pode buscar por código"
  ON lista_compartilhamentos FOR SELECT
  USING (true);

-- Apenas donos podem criar códigos
CREATE POLICY "Donos podem criar códigos"
  ON lista_compartilhamentos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = lista_compartilhamentos.lista_id
      AND listas.user_id = auth.uid()
    )
  );

-- Apenas donos podem deletar códigos
CREATE POLICY "Donos podem deletar códigos"
  ON lista_compartilhamentos FOR DELETE
  USING (auth.uid() = owner_id);

-- PASSO 4: Políticas para lista_usuarios
-- ============================================

-- Usuários podem ver suas próprias relações
CREATE POLICY "Usuários podem ver suas relações"
  ON lista_usuarios FOR SELECT
  USING (auth.uid() = user_id);

-- Qualquer um autenticado pode se adicionar
CREATE POLICY "Usuários podem se adicionar"
  ON lista_usuarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem remover a si mesmos (sair da lista)
CREATE POLICY "Usuários podem sair"
  ON lista_usuarios FOR DELETE
  USING (auth.uid() = user_id);

-- PASSO 5: Atualizar políticas de LISTAS
-- ============================================

-- Adicionar política para ver listas compartilhadas
CREATE POLICY "Usuários podem ver listas compartilhadas"
  ON listas FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = listas.id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- Adicionar política para atualizar listas compartilhadas
CREATE POLICY "Usuários podem atualizar listas compartilhadas"
  ON listas FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = listas.id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- PASSO 6: Atualizar políticas de ITENS
-- ============================================

-- Adicionar política para ver itens de listas compartilhadas
CREATE POLICY "Usuários podem ver itens de listas compartilhadas"
  ON itens FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = itens.lista_id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- Adicionar política para criar itens em listas compartilhadas
CREATE POLICY "Usuários podem criar itens em listas compartilhadas"
  ON itens FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = itens.lista_id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- Adicionar política para atualizar itens de listas compartilhadas
CREATE POLICY "Usuários podem atualizar itens de listas compartilhadas"
  ON itens FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = itens.lista_id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- Adicionar política para deletar itens de listas compartilhadas
CREATE POLICY "Usuários podem deletar itens de listas compartilhadas"
  ON itens FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM lista_usuarios
      WHERE lista_usuarios.lista_id = itens.lista_id
      AND lista_usuarios.user_id = auth.uid()
    )
  );

-- PASSO 7: Migrar listas existentes para lista_usuarios
-- ============================================

-- Adicionar todos os donos atuais como usuários de suas listas
INSERT INTO lista_usuarios (lista_id, user_id, is_owner)
SELECT id, user_id, true
FROM listas
ON CONFLICT (lista_id, user_id) DO NOTHING;

-- PASSO 8: Verificação
-- ============================================

SELECT 'COMPARTILHAMENTOS' as tipo, * FROM lista_compartilhamentos;
SELECT 'LISTA_USUARIOS' as tipo, * FROM lista_usuarios;
SELECT 'POLÍTICAS' as tipo, tablename, policyname FROM pg_policies
WHERE tablename IN ('lista_compartilhamentos', 'lista_usuarios')
ORDER BY tablename, policyname;
