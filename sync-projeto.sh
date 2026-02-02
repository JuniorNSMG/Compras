#!/bin/bash

# Script para sincronizar projeto Compras
# Autor: Claude Code
# Uso: ./sync-projeto.sh [pull|commit|push]

DESTINO="/Users/walterjunior/Downloads/Compras"
REPO_URL="https://github.com/JuniorNSMG/Compras.git"
BRANCH="claude/shopping-list-app-DCnag"

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Sync Projeto Compras${NC}"
echo "================================"

# Função para clonar o repositório
clone_repo() {
    echo -e "${YELLOW}📥 Clonando repositório...${NC}"

    if [ -d "$DESTINO" ]; then
        echo -e "${RED}⚠️  Pasta já existe em $DESTINO${NC}"
        read -p "Deseja removê-la e clonar novamente? (s/N): " resposta
        if [[ $resposta =~ ^[Ss]$ ]]; then
            rm -rf "$DESTINO"
        else
            echo "Operação cancelada."
            exit 0
        fi
    fi

    git clone -b "$BRANCH" "$REPO_URL" "$DESTINO"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Repositório clonado com sucesso!${NC}"
        echo -e "${GREEN}📂 Localização: $DESTINO${NC}"
        open "$DESTINO"
    else
        echo -e "${RED}❌ Erro ao clonar repositório${NC}"
        exit 1
    fi
}

# Função para atualizar (pull)
pull_changes() {
    if [ ! -d "$DESTINO" ]; then
        echo -e "${RED}❌ Repositório não encontrado. Execute: $0 clone${NC}"
        exit 1
    fi

    echo -e "${YELLOW}📥 Atualizando repositório...${NC}"
    cd "$DESTINO"
    git pull origin "$BRANCH"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Repositório atualizado!${NC}"
    else
        echo -e "${RED}❌ Erro ao atualizar${NC}"
        exit 1
    fi
}

# Função para fazer commit
commit_changes() {
    if [ ! -d "$DESTINO" ]; then
        echo -e "${RED}❌ Repositório não encontrado. Execute: $0 clone${NC}"
        exit 1
    fi

    cd "$DESTINO"

    # Verificar se há mudanças
    if [ -z "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}ℹ️  Nenhuma mudança para commitar${NC}"
        exit 0
    fi

    echo -e "${YELLOW}📝 Mudanças encontradas:${NC}"
    git status --short
    echo ""

    read -p "Mensagem do commit: " mensagem

    if [ -z "$mensagem" ]; then
        echo -e "${RED}❌ Mensagem não pode ser vazia${NC}"
        exit 1
    fi

    git add -A
    git commit -m "$mensagem

https://claude.ai/code/session_DCnag"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Commit realizado!${NC}"
        read -p "Deseja fazer push? (S/n): " push_resposta
        if [[ ! $push_resposta =~ ^[Nn]$ ]]; then
            push_changes
        fi
    else
        echo -e "${RED}❌ Erro ao fazer commit${NC}"
        exit 1
    fi
}

# Função para fazer push
push_changes() {
    if [ ! -d "$DESTINO" ]; then
        echo -e "${RED}❌ Repositório não encontrado. Execute: $0 clone${NC}"
        exit 1
    fi

    cd "$DESTINO"

    echo -e "${YELLOW}📤 Enviando mudanças...${NC}"
    git push -u origin "$BRANCH"

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Push realizado com sucesso!${NC}"
    else
        echo -e "${RED}❌ Erro ao fazer push${NC}"
        exit 1
    fi
}

# Função para abrir no Finder
open_finder() {
    if [ ! -d "$DESTINO" ]; then
        echo -e "${RED}❌ Repositório não encontrado. Execute: $0 clone${NC}"
        exit 1
    fi

    echo -e "${GREEN}📂 Abrindo no Finder...${NC}"
    open "$DESTINO"
}

# Menu interativo
show_menu() {
    echo ""
    echo -e "${BLUE}Escolha uma opção:${NC}"
    echo "1) 📥 Clonar repositório"
    echo "2) 🔄 Atualizar (pull)"
    echo "3) 💾 Fazer commit"
    echo "4) 📤 Fazer push"
    echo "5) 📂 Abrir no Finder"
    echo "6) 🚪 Sair"
    echo ""
    read -p "Opção: " opcao

    case $opcao in
        1) clone_repo ;;
        2) pull_changes ;;
        3) commit_changes ;;
        4) push_changes ;;
        5) open_finder ;;
        6) exit 0 ;;
        *) echo -e "${RED}Opção inválida${NC}"; show_menu ;;
    esac
}

# Main
case "$1" in
    clone)
        clone_repo
        ;;
    pull)
        pull_changes
        ;;
    commit)
        commit_changes
        ;;
    push)
        push_changes
        ;;
    open)
        open_finder
        ;;
    *)
        show_menu
        ;;
esac
