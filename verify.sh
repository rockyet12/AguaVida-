#!/bin/bash

# Script de verificación - Agua Vida
# Este script verifica que todo esté configurado correctamente

echo "=========================================="
echo "🔍 VERIFICADOR - AGUA VIDA"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contador de problemas
PROBLEMS=0

# 1. Verificar Node.js
echo "1️⃣  Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    PROBLEMS=$((PROBLEMS + 1))
fi

# 2. Verificar npm
echo ""
echo "2️⃣  Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm instalado: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm no está instalado${NC}"
    PROBLEMS=$((PROBLEMS + 1))
fi

# 3. Verificar estructura de carpetas
echo ""
echo "3️⃣  Verificando estructura de carpetas..."

FOLDERS=(
    "/home/roque/Agua-Vida/backend-node"
    "/home/roque/Agua-Vida/front-end"
    "/home/roque/Agua-Vida/front-end/assets"
    "/home/roque/Agua-Vida/front-end/style"
    "/home/roque/Agua-Vida/front-end/js"
)

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo -e "${GREEN}✅ Existe: $folder${NC}"
    else
        echo -e "${RED}❌ Falta: $folder${NC}"
        PROBLEMS=$((PROBLEMS + 1))
    fi
done

# 4. Verificar carpeta de uploads
echo ""
echo "4️⃣  Verificando carpeta de uploads..."
UPLOADS_DIR="/home/roque/Agua-Vida/front-end/assets/uploads"
if [ -d "$UPLOADS_DIR" ]; then
    echo -e "${GREEN}✅ Carpeta de uploads existe${NC}"
else
    echo -e "${YELLOW}⚠️  Carpeta de uploads no existe. Creando...${NC}"
    mkdir -p "$UPLOADS_DIR"
    echo -e "${GREEN}✅ Carpeta creada${NC}"
fi

# 5. Verificar archivos clave
echo ""
echo "5️⃣  Verificando archivos clave..."

FILES=(
    "/home/roque/Agua-Vida/backend-node/server.js"
    "/home/roque/Agua-Vida/backend-node/package.json"
    "/home/roque/Agua-Vida/backend-node/.env"
    "/home/roque/Agua-Vida/front-end/index.html"
    "/home/roque/Agua-Vida/front-end/login.html"
    "/home/roque/Agua-Vida/front-end/register.html"
    "/home/roque/Agua-Vida/front-end/reportar.html"
    "/home/roque/Agua-Vida/front-end/mapa.html"
    "/home/roque/Agua-Vida/front-end/js/auth.js"
    "/home/roque/Agua-Vida/front-end/js/reportar.js"
    "/home/roque/Agua-Vida/front-end/style/global.css"
    "/home/roque/Agua-Vida/start.sh"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ Existe: $(basename $file)${NC}"
    else
        echo -e "${RED}❌ Falta: $(basename $file)${NC}"
        PROBLEMS=$((PROBLEMS + 1))
    fi
done

# 6. Verificar dependencias de npm
echo ""
echo "6️⃣  Verificando dependencias del backend..."
if [ -d "/home/roque/Agua-Vida/backend-node/node_modules" ]; then
    echo -e "${GREEN}✅ node_modules del backend existe${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules del backend no existe. Instala con:${NC}"
    echo "cd /home/roque/Agua-Vida/backend-node && npm install"
fi

echo ""
echo "7️⃣  Verificando dependencias del frontend..."
if [ -d "/home/roque/Agua-Vida/front-end/node_modules" ]; then
    echo -e "${GREEN}✅ node_modules del frontend existe${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules del frontend no existe. Instala con:${NC}"
    echo "cd /home/roque/Agua-Vida/front-end && npm install"
fi

# 8. Verificar .env
echo ""
echo "8️⃣  Verificando configuración de .env..."
ENV_FILE="/home/roque/Agua-Vida/backend-node/.env"
if grep -q "tu-project-id" "$ENV_FILE" || grep -q "tu_project_id_aqui" "$ENV_FILE"; then
    echo -e "${YELLOW}⚠️  IMPORTANTE: .env tiene valores de placeholder${NC}"
    echo -e "${YELLOW}   Reemplaza con tus credenciales reales de Firebase${NC}"
    PROBLEMS=$((PROBLEMS + 1))
else
    echo -e "${GREEN}✅ .env parece estar configurado${NC}"
fi

# Resumen final
echo ""
echo "=========================================="
if [ $PROBLEMS -eq 0 ]; then
    echo -e "${GREEN}✅ ¡TODO LISTO! La aplicación está correctamente configurada.${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. cd /home/roque/Agua-Vida"
    echo "2. bash start.sh"
    echo ""
    echo "Luego abre: http://localhost:3000"
else
    echo -e "${RED}❌ Hay $PROBLEMS problema(s) que resolver${NC}"
    echo ""
    echo "Lee los errores arriba y resuelve cada uno"
fi
echo "=========================================="
