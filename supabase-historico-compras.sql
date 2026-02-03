-- Criar tabela de histórico de compras
CREATE TABLE IF NOT EXISTS historico_compras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_nome TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  categoria TEXT NOT NULL,
  purchase_count INTEGER DEFAULT 1,
  last_purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_nome)
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_historico_compras_user_id ON historico_compras(user_id);
CREATE INDEX IF NOT EXISTS idx_historico_compras_purchase_count ON historico_compras(purchase_count DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE historico_compras ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para histórico de compras
DROP POLICY IF EXISTS "Usuários podem ver seu próprio histórico" ON historico_compras;
CREATE POLICY "Usuários podem ver seu próprio histórico"
  ON historico_compras FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar seu próprio histórico" ON historico_compras;
CREATE POLICY "Usuários podem criar seu próprio histórico"
  ON historico_compras FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio histórico" ON historico_compras;
CREATE POLICY "Usuários podem atualizar seu próprio histórico"
  ON historico_compras FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem deletar seu próprio histórico" ON historico_compras;
CREATE POLICY "Usuários podem deletar seu próprio histórico"
  ON historico_compras FOR DELETE
  USING (auth.uid() = user_id);
