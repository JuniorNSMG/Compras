-- ============================================
-- Script de Verificação do Sistema de Compartilhamento
-- Execute no Supabase SQL Editor
-- ============================================

-- 1. Verificar se as tabelas existem
SELECT 'TABELAS EXISTENTES' as tipo;
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('lista_compartilhamentos', 'lista_usuarios', 'listas', 'itens')
ORDER BY table_name;

-- 2. Verificar códigos de compartilhamento existentes
SELECT 'CÓDIGOS DE COMPARTILHAMENTO' as tipo;
SELECT * FROM lista_compartilhamentos;

-- 3. Verificar relações usuário-lista
SELECT 'LISTA USUARIOS' as tipo;
SELECT * FROM lista_usuarios;

-- 4. Verificar políticas RLS
SELECT 'POLÍTICAS RLS - lista_compartilhamentos' as tipo;
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'lista_compartilhamentos'
ORDER BY policyname;

SELECT 'POLÍTICAS RLS - lista_usuarios' as tipo;
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'lista_usuarios'
ORDER BY policyname;

-- 5. Contar registros
SELECT 'CONTAGEM DE REGISTROS' as tipo;
SELECT
  'lista_compartilhamentos' as tabela,
  COUNT(*) as total
FROM lista_compartilhamentos
UNION ALL
SELECT
  'lista_usuarios' as tabela,
  COUNT(*) as total
FROM lista_usuarios;
