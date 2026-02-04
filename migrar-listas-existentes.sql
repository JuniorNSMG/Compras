-- ============================================
-- Migração de Listas Existentes
-- Adiciona todas as listas existentes à tabela lista_usuarios
-- ============================================

-- 1. Verificar quantas listas existem
SELECT 'Total de listas na tabela listas:' as info, COUNT(*) as total FROM listas;

-- 2. Verificar quantas já estão em lista_usuarios
SELECT 'Total de registros em lista_usuarios:' as info, COUNT(*) as total FROM lista_usuarios;

-- 3. Migrar todas as listas existentes para lista_usuarios
-- Cada dono da lista será adicionado como is_owner=true
INSERT INTO lista_usuarios (lista_id, user_id, is_owner)
SELECT
  l.id as lista_id,
  l.user_id,
  true as is_owner
FROM listas l
WHERE NOT EXISTS (
  SELECT 1
  FROM lista_usuarios lu
  WHERE lu.lista_id = l.id
  AND lu.user_id = l.user_id
);

-- 4. Verificar resultado final
SELECT 'Resultado após migração:' as info;
SELECT
  COUNT(*) as total_lista_usuarios,
  (SELECT COUNT(*) FROM listas) as total_listas
FROM lista_usuarios;

-- 5. Verificar se todos os donos estão na tabela
SELECT 'Listas sem dono em lista_usuarios:' as info;
SELECT l.id, l.nome, l.user_id
FROM listas l
LEFT JOIN lista_usuarios lu ON lu.lista_id = l.id AND lu.user_id = l.user_id
WHERE lu.id IS NULL;
