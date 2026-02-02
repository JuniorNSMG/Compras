-- Criar tabela de listas
CREATE TABLE IF NOT EXISTS listas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens
CREATE TABLE IF NOT EXISTS itens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lista_id UUID NOT NULL REFERENCES listas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  quantidade NUMERIC,
  unidade TEXT,
  icon_name TEXT NOT NULL,
  comprado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_listas_user_id ON listas(user_id);
CREATE INDEX IF NOT EXISTS idx_itens_lista_id ON itens(lista_id);
CREATE INDEX IF NOT EXISTS idx_itens_comprado ON itens(comprado);

-- Habilitar RLS (Row Level Security)
ALTER TABLE listas ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para listas
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

-- Políticas de segurança para itens
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
