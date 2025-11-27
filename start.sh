#!/bin/bash

echo "🌊 Iniciando Agua Vida..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Obtener el directorio del script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js detectado$(node -v)${NC}"
echo ""

# Iniciar Backend
echo -e "${YELLOW}🚀 Iniciando Backend (Node.js + Express + Firebase)...${NC}"
cd "$SCRIPT_DIR/backend-node"
npm start > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo "   Log: /tmp/backend.log"
sleep 3
echo ""

# Verificar que backend está corriendo
if ! ps -p $BACKEND_PID > /dev/null; then
    echo -e "${RED}❌ Backend falló al iniciar${NC}"
    cat /tmp/backend.log
    exit 1
fi

# Iniciar Frontend
echo -e "${YELLOW}🌐 Iniciando Frontend (Express + Static Files)...${NC}"
cd "$SCRIPT_DIR/front-end"
npm start > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo "   Log: /tmp/frontend.log"
sleep 2
echo ""

# Verificar que frontend está corriendo
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${RED}❌ Frontend falló al iniciar${NC}"
    cat /tmp/frontend.log
    kill $BACKEND_PID
    exit 1
fi

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ ¡Agua Vida está funcionando!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "🌐 Frontend:  http://localhost:3000"
echo "📊 Backend:   http://localhost:5000"
echo "🔍 API Health: http://localhost:5000/api/health"
echo ""
echo "📄 Páginas:"
echo "   - http://localhost:3000             (Inicio)"
echo "   - http://localhost:3000/login.html  (Login)"
echo "   - http://localhost:3000/register.html (Registro)"
echo "   - http://localhost:3000/reportar.html (Reportar)"
echo "   - http://localhost:3000/mapa.html   (Mapa)"
echo ""
echo "📋 Logs:"
echo "   - Backend:  tail -f /tmp/backend.log"
echo "   - Frontend: tail -f /tmp/frontend.log"
echo ""
echo "⏹️  Para detener, presiona Ctrl+C"
echo ""

# Manejar Ctrl+C para matar ambos procesos
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Esperar indefinidamente
wait
