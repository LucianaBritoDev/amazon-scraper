#!/bin/bash

echo "========================================"
echo "   Amazon Scraper - Instalação"
echo "========================================"
echo

echo "[1/4] Instalando dependências do Backend..."
cd backend
bun install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências do backend"
    exit 1
fi
echo "✅ Backend instalado com sucesso!"
echo

echo "[2/4] Instalando dependências do Frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências do frontend"
    exit 1
fi
echo "✅ Frontend instalado com sucesso!"
echo

echo "[3/4] Verificando se o Bun está instalado..."
if ! command -v bun &> /dev/null; then
    echo "⚠️  AVISO: Bun não encontrado!"
    echo "Por favor, instale o Bun em: https://bun.sh/"
    echo
fi

echo "[4/4] Verificando se o Node.js está instalado..."
if ! command -v node &> /dev/null; then
    echo "⚠️  AVISO: Node.js não encontrado!"
    echo "Por favor, instale o Node.js em: https://nodejs.org/"
    echo
fi

echo
echo "========================================"
echo "   Instalação Concluída!"
echo "========================================"
echo
echo "Para iniciar o projeto:"
echo
echo "1. Inicie o Backend:"
echo "   cd backend"
echo "   bun run dev"
echo
echo "2. Em outro terminal, inicie o Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo
echo "3. Acesse: http://localhost:5173"
echo 