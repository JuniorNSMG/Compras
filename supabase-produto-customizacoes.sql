-- Tabela para armazenar customizações de produtos (categoria e ícone)
-- Isso permite que usuários personalizem itens não reconhecidos automaticamente

CREATE TABLE produto_customizacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_produto TEXT NOT NULL,
  categoria TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Garantir que cada usuário tenha apenas uma customização por produto
  UNIQUE(user_id, nome_produto)
);

-- Índice para busca rápida por usuário e nome do produto
CREATE INDEX idx_produto_customizacoes_user_produto ON produto_customizacoes(user_id, nome_produto);

-- RLS (Row Level Security)
ALTER TABLE produto_customizacoes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Usuários podem ver suas próprias customizações"
  ON produto_customizacoes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias customizações"
  ON produto_customizacoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias customizações"
  ON produto_customizacoes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias customizações"
  ON produto_customizacoes FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_produto_customizacoes_updated_at
  BEFORE UPDATE ON produto_customizacoes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
