#!/bin/bash

# PRUEBAS DE API - AGUA VIDA
# Script para probar todos los endpoints

echo "════════════════════════════════════════════════════════════════"
echo "                  🧪 PRUEBAS DE API - AGUA VIDA"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Variables
BASE_URL="http://localhost:5000/api"
TIMESTAMP=$(date +%s)
TEST_EMAIL="test${TIMESTAMP}@example.com"
TEST_UID=""

echo "📍 Base URL: $BASE_URL"
echo "📧 Email de prueba: $TEST_EMAIL"
echo ""

# ============================================
# 1. VERIFICAR SALUD DEL SERVIDOR
# ============================================
echo "1️⃣  VERIFICANDO SALUD DEL SERVIDOR"
echo "─────────────────────────────────────────────"

HEALTH=$(curl -s "$BASE_URL/health")
echo "GET $BASE_URL/health"
echo "Respuesta: $HEALTH"
echo ""

# ============================================
# 2. REGISTRAR USUARIO
# ============================================
echo "2️⃣  REGISTRANDO USUARIO"
echo "─────────────────────────────────────────────"

REGISTER_DATA=$(cat <<EOF
{
  "email": "$TEST_EMAIL",
  "password": "TestPassword123!",
  "nombre": "Usuario Prueba"
}
EOF
)

echo "POST $BASE_URL/auth/register"
echo "Datos:"
echo "$REGISTER_DATA"
echo ""

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REGISTER_DATA")

echo "Respuesta:"
echo "$REGISTER_RESPONSE" | jq '.' 2>/dev/null || echo "$REGISTER_RESPONSE"

# Extraer UID para pruebas posteriores
TEST_UID=$(echo "$REGISTER_RESPONSE" | jq -r '.uid' 2>/dev/null || echo "")
echo ""

# ============================================
# 3. LOGIN DE USUARIO
# ============================================
echo "3️⃣  INICIANDO SESIÓN"
echo "─────────────────────────────────────────────"

LOGIN_DATA=$(cat <<EOF
{
  "email": "$TEST_EMAIL",
  "password": "TestPassword123!"
}
EOF
)

echo "POST $BASE_URL/auth/login"
echo "Datos:"
echo "$LOGIN_DATA"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "$LOGIN_DATA")

echo "Respuesta:"
echo "$LOGIN_RESPONSE" | jq '.' 2>/dev/null || echo "$LOGIN_RESPONSE"
echo ""

# ============================================
# 4. CREAR REPORTE (SIN FOTOS)
# ============================================
echo "4️⃣  CREANDO REPORTE (SIN FOTOS)"
echo "─────────────────────────────────────────────"

REPORT_DATA=$(cat <<EOF
{
  "titulo": "Fuga de agua en la plaza",
  "tipo": "Fuga de agua",
  "descripcion": "Se observa una fuga significativa de agua en la acera de la plaza central. El agua sale con mucha presión desde el alcantarillado.",
  "gravedad": "critico",
  "ubicacion": "Plaza Central, Madrid",
  "lat": "40.4168",
  "lng": "-3.7038",
  "uid": "$TEST_UID"
}
EOF
)

echo "POST $BASE_URL/reportes"
echo "Datos:"
echo "$REPORT_DATA"
echo ""

REPORT_RESPONSE=$(curl -s -X POST "$BASE_URL/reportes" \
  -H "Content-Type: application/json" \
  -d "$REPORT_DATA")

echo "Respuesta:"
echo "$REPORT_RESPONSE" | jq '.' 2>/dev/null || echo "$REPORT_RESPONSE"

# Extraer ID del reporte
REPORT_ID=$(echo "$REPORT_RESPONSE" | jq -r '.id' 2>/dev/null || echo "")
echo ""

# ============================================
# 5. OBTENER TODOS LOS REPORTES
# ============================================
echo "5️⃣  OBTENIENDO TODOS LOS REPORTES"
echo "─────────────────────────────────────────────"

echo "GET $BASE_URL/reportes"
echo ""

REPORTS=$(curl -s "$BASE_URL/reportes")
echo "Respuesta:"
echo "$REPORTS" | jq '.' 2>/dev/null || echo "$REPORTS"
echo ""

# ============================================
# 6. OBTENER REPORTE ESPECÍFICO
# ============================================
if [ ! -z "$REPORT_ID" ]; then
    echo "6️⃣  OBTENIENDO REPORTE ESPECÍFICO"
    echo "─────────────────────────────────────────────"
    
    echo "GET $BASE_URL/reportes/$REPORT_ID"
    echo ""
    
    SPECIFIC_REPORT=$(curl -s "$BASE_URL/reportes/$REPORT_ID")
    echo "Respuesta:"
    echo "$SPECIFIC_REPORT" | jq '.' 2>/dev/null || echo "$SPECIFIC_REPORT"
    echo ""
fi

# ============================================
# 7. ACTUALIZAR REPORTE
# ============================================
if [ ! -z "$REPORT_ID" ]; then
    echo "7️⃣  ACTUALIZANDO REPORTE"
    echo "─────────────────────────────────────────────"
    
    UPDATE_DATA=$(cat <<EOF
{
  "titulo": "Fuga URGENTE en plaza",
  "descripcion": "Situación crítica. Agua saliendo con mucha fuerza",
  "estado": "en-progreso"
}
EOF
)
    
    echo "PUT $BASE_URL/reportes/$REPORT_ID"
    echo "Datos:"
    echo "$UPDATE_DATA"
    echo ""
    
    UPDATE_RESPONSE=$(curl -s -X PUT "$BASE_URL/reportes/$REPORT_ID" \
      -H "Content-Type: application/json" \
      -d "$UPDATE_DATA")
    
    echo "Respuesta:"
    echo "$UPDATE_RESPONSE" | jq '.' 2>/dev/null || echo "$UPDATE_RESPONSE"
    echo ""
fi

# ============================================
# 8. OBTENER PERFIL DE USUARIO
# ============================================
if [ ! -z "$TEST_UID" ]; then
    echo "8️⃣  OBTENIENDO PERFIL DE USUARIO"
    echo "─────────────────────────────────────────────"
    
    echo "GET $BASE_URL/usuarios/$TEST_UID"
    echo ""
    
    PROFILE=$(curl -s "$BASE_URL/usuarios/$TEST_UID")
    echo "Respuesta:"
    echo "$PROFILE" | jq '.' 2>/dev/null || echo "$PROFILE"
    echo ""
fi

# ============================================
# 9. ACTUALIZAR PERFIL DE USUARIO
# ============================================
if [ ! -z "$TEST_UID" ]; then
    echo "9️⃣  ACTUALIZANDO PERFIL DE USUARIO"
    echo "─────────────────────────────────────────────"
    
    PROFILE_UPDATE=$(cat <<EOF
{
  "nombre": "Usuario Actualizado",
  "telefono": "+34 612 345 678",
  "direccion": "Calle Principal, 123, Madrid"
}
EOF
)
    
    echo "PUT $BASE_URL/usuarios/$TEST_UID"
    echo "Datos:"
    echo "$PROFILE_UPDATE"
    echo ""
    
    PROFILE_RESPONSE=$(curl -s -X PUT "$BASE_URL/usuarios/$TEST_UID" \
      -H "Content-Type: application/json" \
      -d "$PROFILE_UPDATE")
    
    echo "Respuesta:"
    echo "$PROFILE_RESPONSE" | jq '.' 2>/dev/null || echo "$PROFILE_RESPONSE"
    echo ""
fi

# ============================================
# 10. ELIMINAR REPORTE
# ============================================
if [ ! -z "$REPORT_ID" ]; then
    echo "🔟 ELIMINANDO REPORTE"
    echo "─────────────────────────────────────────────"
    
    echo "DELETE $BASE_URL/reportes/$REPORT_ID"
    echo ""
    
    DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/reportes/$REPORT_ID")
    echo "Respuesta:"
    echo "$DELETE_RESPONSE" | jq '.' 2>/dev/null || echo "$DELETE_RESPONSE"
    echo ""
fi

# ============================================
# RESUMEN
# ============================================
echo "════════════════════════════════════════════════════════════════"
echo "                        ✅ PRUEBAS COMPLETADAS"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "📊 RESUMEN:"
echo "   - Email de prueba: $TEST_EMAIL"
echo "   - UID de usuario: $TEST_UID"
echo "   - ID de reporte: $REPORT_ID"
echo ""
echo "✨ Si todos los endpoints funcionaron correctamente:"
echo "   ✅ Tu API está completamente funcional"
echo ""
echo "📝 PRÓXIMOS PASOS:"
echo "   1. Prueba el frontend en http://localhost:3000"
echo "   2. Crea un usuario real"
echo "   3. Haz un reporte con fotos"
echo "   4. Visualiza en el mapa"
echo ""
