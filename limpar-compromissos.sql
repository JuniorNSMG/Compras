-- ============================================
-- Limpar tabela de Compromissos
-- Execute este SQL no Supabase SQL Editor para remover
-- a tabela de compromissos se você a criou
-- ============================================

-- Remover trigger
DROP TRIGGER IF EXISTS trigger_update_compromissos_updated_at ON compromissos;

-- Remover função
DROP FUNCTION IF EXISTS update_compromissos_updated_at();

-- Remover políticas RLS
DROP POLICY IF EXISTS "Usuários podem ver seus próprios compromissos" ON compromissos;
DROP POLICY IF EXISTS "Usuários podem criar compromissos" ON compromissos;
DROP POLICY IF EXISTS "Usuários podem atualizar seus compromissos" ON compromissos;
DROP POLICY IF EXISTS "Usuários podem deletar seus compromissos" ON compromissos;

-- Remover índices
DROP INDEX IF EXISTS idx_compromissos_user_id;
DROP INDEX IF EXISTS idx_compromissos_data_inicio;
DROP INDEX IF EXISTS idx_compromissos_data_fim;
DROP INDEX IF EXISTS idx_compromissos_user_data;

-- Remover tabela
DROP TABLE IF EXISTS compromissos;

-- Verificar
SELECT 'Tabela compromissos removida com sucesso!' as status;
