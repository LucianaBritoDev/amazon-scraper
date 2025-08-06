@echo off
echo ========================================
echo    Amazon Scraper - Instalacao
echo ========================================
echo.

echo [1/4] Instalando dependencias do Backend...
cd backend
bun install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    pause
    exit /b 1
)
echo ✅ Backend instalado com sucesso!
echo.

echo [2/4] Instalando dependencias do Frontend...
cd ../frontend
npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)
echo ✅ Frontend instalado com sucesso!
echo.

echo [3/4] Verificando se o Bun esta instalado...
bun --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  AVISO: Bun nao encontrado!
    echo Por favor, instale o Bun em: https://bun.sh/
    echo.
)

echo [4/4] Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  AVISO: Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo.
)

echo.
echo ========================================
echo    Instalacao Concluida!
echo ========================================
echo.
echo Para iniciar o projeto:
echo.
echo 1. Inicie o Backend:
echo    cd backend
echo    bun run dev
echo.
echo 2. Em outro terminal, inicie o Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Acesse: http://localhost:5173
echo.
pause 