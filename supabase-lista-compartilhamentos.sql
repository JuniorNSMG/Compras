-- Tabela para gerenciar compartilhamentos de listas
CREATE TABLE IF NOT EXISTS lista_compartilhamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lista_id UUID NOT NULL REFERENCES listas(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL,
  accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_compartilhamentos_lista_id ON lista_compartilhamentos(lista_id);
CREATE INDEX IF NOT EXISTS idx_compartilhamentos_shared_user_id ON lista_compartilhamentos(shared_user_id);
CREATE INDEX IF NOT EXISTS idx_compartilhamentos_share_token ON lista_compartilhamentos(share_token);

-- Habilitar RLS
ALTER TABLE lista_compartilhamentos ENABLE ROW LEVEL SECURITY;

-- Políticas para compartilhamentos
CREATE POLICY "Usuários podem ver compartilhamentos de suas listas"
  ON lista_compartilhamentos FOR SELECT
  USING (
    auth.uid() = owner_id OR
    auth.uid() = shared_user_id OR
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = lista_compartilhamentos.lista_id
      AND listas.user_id = auth.uid()
    )
  );

CREATE POLICY "Donos podem criar compartilhamentos"
  ON lista_compartilhamentos FOR INSERT
  WITH CHECK (
    auth.uid() = owner_id AND
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = lista_compartilhamentos.lista_id
      AND listas.user_id = auth.uid()
    )
  );

CREATE POLICY "Usuários podem atualizar compartilhamentos que receberam"
  ON lista_compartilhamentos FOR UPDATE
  USING (auth.uid() = shared_user_id);

CREATE POLICY "Donos podem deletar compartilhamentos"
  ON lista_compartilhamentos FOR DELETE
  USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = lista_compartilhamentos.lista_id
      AND listas.user_id = auth.uid()
    )
  );

-- Atualizar políticas de listas para permitir acesso compartilhado
DROP POLICY IF EXISTS "Usuários podem ver suas próprias listas" ON listas;
CREATE POLICY "Usuários podem ver suas próprias listas ou compartilhadas"
  ON listas FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM lista_compartilhamentos
      WHERE lista_compartilhamentos.lista_id = listas.id
      AND lista_compartilhamentos.shared_user_id = auth.uid()
      AND lista_compartilhamentos.accepted = TRUE
    )
  );

DROP POLICY IF EXISTS "Usuários podem atualizar suas próprias listas" ON listas;
CREATE POLICY "Usuários podem atualizar suas próprias listas ou compartilhadas"
  ON listas FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM lista_compartilhamentos
      WHERE lista_compartilhamentos.lista_id = listas.id
      AND lista_compartilhamentos.shared_user_id = auth.uid()
      AND lista_compartilhamentos.accepted = TRUE
    )
  );

-- Atualizar políticas de itens para permitir acesso compartilhado
DROP POLICY IF EXISTS "Usuários podem ver itens de suas listas" ON itens;
CREATE POLICY "Usuários podem ver itens de suas listas ou compartilhadas"
  ON itens FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND (
        listas.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM lista_compartilhamentos
          WHERE lista_compartilhamentos.lista_id = listas.id
          AND lista_compartilhamentos.shared_user_id = auth.uid()
          AND lista_compartilhamentos.accepted = TRUE
        )
      )
    )
  );

DROP POLICY IF EXISTS "Usuários podem criar itens em suas listas" ON itens;
CREATE POLICY "Usuários podem criar itens em suas listas ou compartilhadas"
  ON itens FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND (
        listas.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM lista_compartilhamentos
          WHERE lista_compartilhamentos.lista_id = listas.id
          AND lista_compartilhamentos.shared_user_id = auth.uid()
          AND lista_compartilhamentos.accepted = TRUE
        )
      )
    )
  );

DROP POLICY IF EXISTS "Usuários podem atualizar itens de suas listas" ON itens;
CREATE POLICY "Usuários podem atualizar itens de suas listas ou compartilhadas"
  ON itens FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND (
        listas.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM lista_compartilhamentos
          WHERE lista_compartilhamentos.lista_id = listas.id
          AND lista_compartilhamentos.shared_user_id = auth.uid()
          AND lista_compartilhamentos.accepted = TRUE
        )
      )
    )
  );

DROP POLICY IF EXISTS "Usuários podem deletar itens de suas listas" ON itens;
CREATE POLICY "Usuários podem deletar itens de suas listas ou compartilhadas"
  ON itens FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM listas
      WHERE listas.id = itens.lista_id
      AND (
        listas.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM lista_compartilhamentos
          WHERE lista_compartilhamentos.lista_id = listas.id
          AND lista_compartilhamentos.shared_user_id = auth.uid()
          AND lista_compartilhamentos.accepted = TRUE
        )
      )
    )
  );
