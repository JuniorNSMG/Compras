# Análise rápida da arquitetura do projeto

Este documento resume como a versão Web do app está organizada.

## Visão geral

- O projeto possui versão iOS e versão Web (React + PWA).
- A versão Web usa Supabase para autenticação e dados.
- O estado global é gerenciado com Zustand.

## Fluxo principal

1. `src/App.tsx` verifica sessão e decide entre `Login` e `ListView`.
2. `src/components/Login.tsx` usa `authService` para login/cadastro.
3. `src/components/ListView.tsx` coordena listas, itens, cache local e modais.
4. `src/components/QuickAddInput.tsx` adiciona itens rapidamente e sugere itens via cache.
5. `src/components/ItemRow.tsx` faz toggle otimista de comprado e registra histórico.

## Camada de serviços

- `src/services/authService.ts`: autenticação no Supabase.
- `src/services/listService.ts`: CRUD de listas e acesso via `lista_usuarios`.
- `src/services/itemService.ts`: CRUD de itens, ícone/categoria automáticos e soft-delete de comprados (`hidden`).
- `src/services/historicoComprasService.ts`: frequência de compras.
- `src/services/searchCacheService.ts`: cache local para busca/sugestões rápidas.
- `src/services/compartilhamentoService.ts`: geração/aceite de código de compartilhamento.

## Banco de dados

- Schema base em `supabase-schema.sql` (tabelas `listas` e `itens`, com RLS).
- Scripts adicionais adicionam histórico, customizações e compartilhamento.

## Observações úteis

- A UI prioriza resposta rápida com atualização otimista e cache local.
- O app mantém dados de preferência no `localStorage` (ex.: lista padrão, mostrar preços).
- Existe foco em UX mobile/PWA (animações, seções colapsáveis, fluxo de compra).
