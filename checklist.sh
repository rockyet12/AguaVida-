#!/bin/bash

# CHECKLIST DE VERIFICACIÓN - AGUA VIDA
# Este script verifica que todo está listo para producción

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          ✅ CHECKLIST DE VERIFICACIÓN - AGUA VIDA             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

TOTAL=0
PASSED=0

# Función para verificar
check() {
    TOTAL=$((TOTAL + 1))
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
        PASSED=$((PASSED + 1))
    else
        echo "❌ $2"
    fi
}

# ============================================
# 1. VERIFICACIONES DEL SISTEMA
# ============================================
echo "🔧 SISTEMA OPERATIVO"
echo "─────────────────────────────────────────────"

command -v node &> /dev/null
check $? "Node.js está instalado"

command -v npm &> /dev/null
check $? "npm está instalado"

# ============================================
# 2. ESTRUCTURA DE CARPETAS
# ============================================
echo ""
echo "📁 ESTRUCTURA DE CARPETAS"
echo "─────────────────────────────────────────────"

[ -d "/home/roque/Agua-Vida/backend-node" ]
check $? "Carpeta backend-node existe"

[ -d "/home/roque/Agua-Vida/front-end" ]
check $? "Carpeta front-end existe"

[ -d "/home/roque/Agua-Vida/front-end/assets/uploads" ]
check $? "Carpeta uploads existe"

[ -d "/home/roque/Agua-Vida/front-end/js" ]
check $? "Carpeta js existe"

[ -d "/home/roque/Agua-Vida/front-end/style" ]
check $? "Carpeta style existe"

# ============================================
# 3. ARCHIVOS DEL BACKEND
# ============================================
echo ""
echo "⚙️  ARCHIVOS DEL BACKEND"
echo "─────────────────────────────────────────────"

[ -f "/home/roque/Agua-Vida/backend-node/server.js" ]
check $? "server.js existe"

[ -f "/home/roque/Agua-Vida/backend-node/package.json" ]
check $? "package.json existe"

[ -f "/home/roque/Agua-Vida/backend-node/.env" ]
check $? ".env existe"

# ============================================
# 4. ARCHIVOS DEL FRONTEND
# ============================================
echo ""
echo "🌐 ARCHIVOS DEL FRONTEND"
echo "─────────────────────────────────────────────"

[ -f "/home/roque/Agua-Vida/front-end/index.html" ]
check $? "index.html existe"

[ -f "/home/roque/Agua-Vida/front-end/login.html" ]
check $? "login.html existe"

[ -f "/home/roque/Agua-Vida/front-end/register.html" ]
check $? "register.html existe"

[ -f "/home/roque/Agua-Vida/front-end/reportar.html" ]
check $? "reportar.html existe"

[ -f "/home/roque/Agua-Vida/front-end/mapa.html" ]
check $? "mapa.html existe"

# ============================================
# 5. ARCHIVOS JAVASCRIPT
# ============================================
echo ""
echo "📜 ARCHIVOS JAVASCRIPT"
echo "─────────────────────────────────────────────"

[ -f "/home/roque/Agua-Vida/front-end/js/auth.js" ]
check $? "auth.js existe"

[ -f "/home/roque/Agua-Vida/front-end/js/reportar.js" ]
check $? "reportar.js existe"

[ -f "/home/roque/Agua-Vida/front-end/js/api.js" ]
check $? "api.js existe"

# ============================================
# 6. ARCHIVOS CSS
# ============================================
echo ""
echo "🎨 ARCHIVOS CSS"
echo "─────────────────────────────────────────────"

[ -f "/home/roque/Agua-Vida/front-end/style/global.css" ]
check $? "global.css existe"

[ -f "/home/roque/Agua-Vida/front-end/style/auth.css" ]
check $? "auth.css existe"

[ -f "/home/roque/Agua-Vida/front-end/style/reportar.css" ]
check $? "reportar.css existe"

# ============================================
# 7. ARCHIVOS DE CONFIGURACIÓN
# ============================================
echo ""
echo "⚙️  SCRIPTS Y CONFIGURACIÓN"
echo "─────────────────────────────────────────────"

[ -f "/home/roque/Agua-Vida/start.sh" ]
check $? "start.sh existe"

[ -f "/home/roque/Agua-Vida/verify.sh" ]
check $? "verify.sh existe"

[ -f "/home/roque/Agua-Vida/RESUMEN-FINAL.md" ]
check $? "RESUMEN-FINAL.md existe"

[ -f "/home/roque/Agua-Vida/INSTRUCCIONES-FUNCIONAL.md" ]
check $? "INSTRUCCIONES-FUNCIONAL.md existe"

# ============================================
# 8. DEPENDENCIAS NPM
# ============================================
echo ""
echo "📦 DEPENDENCIAS NPM"
echo "─────────────────────────────────────────────"

if [ -d "/home/roque/Agua-Vida/backend-node/node_modules" ]; then
    echo "✅ Backend node_modules instalados"
    PASSED=$((PASSED + 1))
else
    echo "❌ Backend node_modules no instalados"
    echo "   Ejecuta: cd /home/roque/Agua-Vida/backend-node && npm install"
fi
TOTAL=$((TOTAL + 1))

if [ -d "/home/roque/Agua-Vida/front-end/node_modules" ]; then
    echo "✅ Frontend node_modules instalados"
    PASSED=$((PASSED + 1))
else
    echo "❌ Frontend node_modules no instalados"
    echo "   Ejecuta: cd /home/roque/Agua-Vida/front-end && npm install"
fi
TOTAL=$((TOTAL + 1))

# ============================================
# 9. CONFIGURACIÓN FIREBASE
# ============================================
echo ""
echo "🔐 CONFIGURACIÓN FIREBASE"
echo "─────────────────────────────────────────────"

ENV_FILE="/home/roque/Agua-Vida/backend-node/.env"

if grep -q "FIREBASE_PROJECT_ID=" "$ENV_FILE"; then
    if grep -q "tu-project-id\|tu_project_id" "$ENV_FILE"; then
        echo "❌ FIREBASE_PROJECT_ID tiene placeholder"
        echo "   Necesitas completar con tu valor real"
    else
        echo "✅ FIREBASE_PROJECT_ID configurado"
        PASSED=$((PASSED + 1))
    fi
else
    echo "❌ FIREBASE_PROJECT_ID no encontrado"
fi
TOTAL=$((TOTAL + 1))

if grep -q "FIREBASE_PRIVATE_KEY=" "$ENV_FILE"; then
    if grep -q "tu-private-key\|tu_private_key" "$ENV_FILE"; then
        echo "❌ FIREBASE_PRIVATE_KEY tiene placeholder"
        echo "   Necesitas completar con tu valor real"
    else
        echo "✅ FIREBASE_PRIVATE_KEY configurado"
        PASSED=$((PASSED + 1))
    fi
else
    echo "❌ FIREBASE_PRIVATE_KEY no encontrado"
fi
TOTAL=$((TOTAL + 1))

if grep -q "FIREBASE_CLIENT_EMAIL=" "$ENV_FILE"; then
    if grep -q "tu-client-email\|tu_client_email" "$ENV_FILE"; then
        echo "❌ FIREBASE_CLIENT_EMAIL tiene placeholder"
        echo "   Necesitas completar con tu valor real"
    else
        echo "✅ FIREBASE_CLIENT_EMAIL configurado"
        PASSED=$((PASSED + 1))
    fi
else
    echo "❌ FIREBASE_CLIENT_EMAIL no encontrado"
fi
TOTAL=$((TOTAL + 1))

# ============================================
# RESUMEN FINAL
# ============================================
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"

PERCENTAGE=$((PASSED * 100 / TOTAL))

if [ $PASSED -eq $TOTAL ]; then
    echo "║  ✅ ¡TODO ESTÁ LISTO! ($PASSED/$TOTAL - 100%)                    ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "🚀 PRÓXIMOS PASOS:"
    echo "   1. Abre el archivo .env y completa tus credenciales de Firebase"
    echo "   2. Ejecuta: cd /home/roque/Agua-Vida && bash start.sh"
    echo "   3. Abre: http://localhost:3000"
    echo ""
else
    echo "║  ⚠️  INCOMPLETO ($PASSED/$TOTAL - $PERCENTAGE%)                          ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "❌ Hay $((TOTAL - PASSED)) problema(s) por resolver"
    echo ""
    echo "PASOS:"
    echo "1. Lee los errores arriba (❌)"
    echo "2. Ejecuta los comandos sugeridos"
    echo "3. Vuelve a ejecutar este checklist"
fi

echo ""
