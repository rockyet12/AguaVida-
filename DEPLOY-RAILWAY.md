# 🚀 GUÍA COMPLETA: DESPLEGAR EN RAILWAY

## 📊 ¿Por qué Railway?

✅ **Gratis para empezar** - $5 de crédito gratuito  
✅ **Más fácil que Vercel** - Menos problemas  
✅ **Deploy automático** - Desde GitHub  
✅ **Perfecto para Node.js** - Tu stack exacto  
✅ **Firebase integrado** - Compatible 100%  

---

## 🎯 PASO 1: Crear Cuenta en Railway

1. Abre: https://railway.app
2. Click en "Sign Up"
3. Elige login con GitHub (más fácil)
4. Autoriza Railway a acceder a tu GitHub

---

## 🎯 PASO 2: Crear Proyecto

### Opción A: Desde Dashboard (Más fácil)

1. En Railway Dashboard, click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca tu repositorio: **AguaVida-**
4. Click en él para seleccionarlo
5. Railway comenzará a importar automáticamente

### Opción B: Desde CLI (Más rápido)

```bash
# 1. Instala Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. En tu carpeta del proyecto
cd /home/roque/Agua-Vida

# 4. Link al proyecto
railway link

# 5. Deploy
railway up
```

---

## 🎯 PASO 3: Configurar Variables de Entorno

### Desde Dashboard

1. En tu proyecto Railway, ve a **Variables**
2. Click en **+ New Variable**
3. Agrega estas variables:

```
FIREBASE_PROJECT_ID = abc-123-xyz
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-123@proyecto.iam.gserviceaccount.com
PORT = 5000
NODE_ENV = production
```

### Cómo obtener las credenciales de Firebase

1. Ve a: https://console.firebase.google.com
2. Selecciona tu proyecto
3. Configuración ⚙️ → Cuentas de servicio
4. Genera nueva clave privada
5. Copia los valores

---

## 🎯 PASO 4: Iniciar Deploy

1. En Railway Dashboard
2. Click en "Deploy"
3. Espera 3-5 minutos
4. ¡Listo! Railway mostrará tu URL pública

---

## 🎯 PASO 5: Verificar que Funciona

### Ver Logs

```bash
railway logs
```

O desde Dashboard → Logs

### Probar API

```bash
curl https://tu-proyecto.up.railway.app/api/health
```

Deberías ver:
```json
{
  "status": "API funcionando correctamente ✅",
  "timestamp": "2025-11-27T00:21:32.444Z"
}
```

### Probar Frontend

Abre en navegador:
```
https://tu-proyecto.up.railway.app
```

---

## 📋 ESTRUCTURA DE ARCHIVOS REQUERIDA

Railway automáticamente detecta esto:

```
AguaVida-/
├── backend-node/
│   ├── server.js         ← Punto de entrada
│   ├── package.json      ← Dependencias
│   └── .env.example      ← Variables de ejemplo
├── front-end/
│   ├── index.html
│   └── assets/
├── package.json          ← Raíz (opcional)
├── railway.json          ← Configuración Railway
└── README.md
```

---

## 🔧 CONFIGURACIÓN DEL SERVIDOR

Railway necesita que tu servidor escuche en el puerto correcto:

### server.js (Correcto)

```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
```

### Verificar que está en tu archivo

```bash
grep -n "app.listen" /home/roque/Agua-Vida/backend-node/server.js
```

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "Build failed"

**Problema:** Railway no puede instalar dependencias

**Solución:**
1. Verifica que `package.json` existe
2. Usa `npm install` localmente primero
3. Haz commit a Git

```bash
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

---

### Error: "Cannot find module 'express'"

**Problema:** Las dependencias no se instalaron

**Solución:**
1. En Railway Dashboard
2. Settings → Rebuild
3. Espera a que se recompile

---

### Error: "Port already in use"

**Problema:** El puerto 5000 está ocupado

**Solución:**
- Asegúrate que `PORT = process.env.PORT || 5000`
- Railway asigna puertos automáticamente

---

### Error: "Firebase credentials not found"

**Problema:** Las variables de entorno no están configuradas

**Solución:**
1. Railway Dashboard → Variables
2. Verifica que todas las variables están:
   ```
   ✅ FIREBASE_PROJECT_ID
   ✅ FIREBASE_PRIVATE_KEY
   ✅ FIREBASE_CLIENT_EMAIL
   ✅ PORT
   ✅ NODE_ENV
   ```
3. Click en "Rebuild" después de agregar

---

## 📊 MONITOREO

### Ver Logs en Tiempo Real

```bash
railway logs --follow
```

### Métricas

En Railway Dashboard:
- Memory usage
- CPU usage
- Network I/O
- Build time
- Deploy history

---

## 💰 PRECIOS Y LÍMITES

### Gratis ($0)
- Primeros $5 crédito gratuito
- Después: 0 costo si no usas recursos

### Crédito Gratis
- Dura aproximadamente: **1-2 meses** en desarrollo
- ~500 horas de servidor pequeño
- Transfers ilimitados

### Después del crédito
- **Pago por uso** (muy barato)
- Típicamente: $5-15/mes para proyecto pequeño
- Puedes fijar límite de gasto

---

## 🔄 ACTUALIZACIONES Y DESPLIEGUES

### Auto-Deploy (Recomendado)

Railway automáticamente hace deploy cuando:
1. Haces push a `main`
2. GitHub registra el cambio
3. Railway lo detecta y redeploy

### Deploy Manual

```bash
railway up
```

---

## 🌐 DOMINIO PERSONALIZADO

### Opción 1: Usar URL de Railway
```
https://agua-vida-production.up.railway.app
```

### Opción 2: Dominio propio

1. Compra dominio en Namecheap, GoDaddy, etc.
2. En Railway Dashboard
3. Settings → Domain
4. Agrega tu dominio personalizado
5. Configura CNAME en tu registrador

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

```
☐ Cuenta en Railway creada
☐ Repositorio conectado a Railway
☐ Variables de entorno configuradas
☐ FIREBASE_PROJECT_ID ✓
☐ FIREBASE_PRIVATE_KEY ✓
☐ FIREBASE_CLIENT_EMAIL ✓
☐ PORT = 5000 ✓
☐ NODE_ENV = production ✓
☐ Deploy iniciado
☐ Logs revisados (sin errores)
☐ API responde en /api/health
☐ Frontend accesible
☐ Base de datos conecta correctamente
☐ Fotos se pueden cargar
```

---

## 🧪 PRUEBAS POST-DEPLOY

### Test 1: Verificar API

```bash
curl https://tu-url.up.railway.app/api/health
```

Respuesta esperada: ✅ 200 OK

### Test 2: Crear Usuario

```bash
curl -X POST https://tu-url.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!",
    "nombre": "Test User"
  }'
```

Respuesta esperada: ✅ Usuario creado

### Test 3: Login

```bash
curl -X POST https://tu-url.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

Respuesta esperada: ✅ Login exitoso

### Test 4: Ver Frontend

Abre en navegador:
```
https://tu-url.up.railway.app/register.html
```

---

## 📞 SOPORTE

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Mi documentación:** `./OPCIONES-HOSTING.md`

---

## 🎉 ¡FELICIDADES!

Si todo está funcionando, tu aplicación está en línea y accesible desde cualquier lugar del mundo 🌍

**URL:** `https://tu-proyecto.up.railway.app`

**Próximos pasos:**
1. Compartir con usuarios
2. Monitorear logs
3. Agregar dominio personalizado
4. Escalar si es necesario

---

*Última actualización: Noviembre 26, 2025*

**¿Necesitas ayuda? Lee OPCIONES-HOSTING.md para más opciones.**
