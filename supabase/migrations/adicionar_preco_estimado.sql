-- Adicionar campo de preço estimado na tabela items
ALTER TABLE items
ADD COLUMN IF NOT EXISTS preco_estimado DECIMAL(10, 2);

-- Comentário explicativo
COMMENT ON COLUMN items.preco_estimado IS 'Preço estimado do item em R$ (Real Brasileiro)';
