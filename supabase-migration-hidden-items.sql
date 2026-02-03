-- Adicionar campo hidden para arquivar itens sem deletar
ALTER TABLE itens ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT FALSE;

-- Criar índice para melhorar performance de queries com hidden
CREATE INDEX IF NOT EXISTS idx_itens_hidden ON itens(hidden);

-- Atualizar itens existentes para garantir que hidden = false
UPDATE itens SET hidden = FALSE WHERE hidden IS NULL;
