# 🚀 SOLUCIÓN: ERROR "Node.js no está instalado" EN RAILWAY

## 🔧 ¿Qué hicimos?

Agregamos estos archivos para que Railway detecte automáticamente Node.js:

```
✅ Procfile          - Indica cómo iniciar la app
✅ package.json      - Configuración en raíz
✅ railway.json      - Configuración de Railway
```

---

## 📋 PASOS PARA DESPLEGAR CORRECTAMENTE EN RAILWAY

### Paso 1: Crea cuenta en Railway (Si no tienes)
```
https://railway.app
```

### Paso 2: Conecta tu GitHub
- Sign up con GitHub
- Autoriza Railway

### Paso 3: Crea nuevo proyecto
1. Click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca **AguaVida-**
4. Click para conectar

### Paso 4: Espera el análisis
Railway detectará automáticamente:
- ✅ Node.js (visto en package.json)
- ✅ npm install (de Procfile)
- ✅ npm start (de Procfile)

### Paso 5: Configura variables de entorno ⚠️ IMPORTANTE

1. En Railway, ve a tu proyecto
2. Click en **Environment**
3. Click en **Raw Editor** o **Variables**

4. Agrega estas 3 variables **CRÍTICAS**:

```
FIREBASE_PROJECT_ID = abc-123-xyz-aquavida
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\nMIIEvQ....\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-abc@tu-proyecto.iam.gserviceaccount.com
```

**Cómo obtener estas credenciales:**

1. Ve a https://console.firebase.google.com
2. Selecciona tu proyecto
3. Configuración ⚙️ (esquina arriba a la derecha)
4. Click en "Cuentas de servicio"
5. Click en "Generar nueva clave privada"
6. Se descarga un JSON
7. Copia estos valores del JSON:
   - `project_id` → FIREBASE_PROJECT_ID
   - `private_key` → FIREBASE_PRIVATE_KEY
   - `client_email` → FIREBASE_CLIENT_EMAIL

### Paso 6: Deploy

1. Click en "Deploy"
2. Espera 3-5 minutos
3. Railway compilará todo automáticamente

### Paso 7: Verifica que funciona

1. Railroad te asignará una URL pública
2. Haz click en ella
3. Deberías ver tu app funcionando

---

## ✅ CHECKLIST FINAL

```
☐ Procfile creado
☐ package.json en raíz creado
☐ railway.json actualizado
☐ Cambios pusheados a GitHub
☐ Railway conectado a GitHub
☐ FIREBASE_PROJECT_ID configurada
☐ FIREBASE_PRIVATE_KEY configurada
☐ FIREBASE_CLIENT_EMAIL configurada
☐ Deploy iniciado
☐ URL pública asignada
☐ App funcionando en https://tu-proyecto.up.railway.app
```

---

## 🧪 PRUEBAS POST-DEPLOY

### Test 1: Verificar Health Check

```bash
curl https://tu-url.up.railway.app/api/health
```

Respuesta esperada:
```json
{
  "status": "API funcionando correctamente ✅",
  "timestamp": "2025-11-27T...",
  "uptime": 123.456
}
```

### Test 2: Acceder a Frontend

```
https://tu-url.up.railway.app/register.html
```

Deberías ver la página de registro

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "Build failed"

**Causa:** Las dependencias no se instalan

**Solución:**
1. Verifica que `backend-node/package.json` existe ✅
2. Verifica que `package.json` en raíz existe ✅
3. En Railway, click en "Rebuild"

### Error: "Cannot find module 'express'"

**Causa:** npm install no se ejecutó correctamente

**Solución:**
1. En Railway Dashboard
2. Settings → Rebuild
3. Espera a que recompile

### Error: "Port already in use"

**Causa:** El puerto 5000 está ocupado

**Solución:**
- Railway asigna puertos automáticamente
- Tu código debe usar `PORT = process.env.PORT || 5000`
- Verifica que está en `server.js` ✅

### Error: "Firebase credentials not found"

**Causa:** Variables de entorno no configuradas

**Solución:**
1. Railway Dashboard → Variables
2. Verifica que TODAS están:
   ```
   ✅ FIREBASE_PROJECT_ID
   ✅ FIREBASE_PRIVATE_KEY
   ✅ FIREBASE_CLIENT_EMAIL
   ```
3. Click en "Rebuild"

---

## 📊 MONITOREO

### Ver Logs en tiempo real

En Railway Dashboard:
- Click en tu servicio
- Click en "Logs"
- Verás los logs mientras se ejecuta

### Ver Métricas

- Memory usage
- CPU usage
- Network I/O
- Build time

---

## 💡 TIPS

1. **Las variables de entorno NO** van en `.env` en el servidor
2. Usa Railway Dashboard para configurarlas
3. Después de cambiar variables, haz "Rebuild"
4. Revisa logs si hay problemas

---

## 🎉 ¡LISTO!

Si todo funciona:
- ✅ Tu app está en línea
- ✅ Es accesible desde cualquier lugar
- ✅ Tiene una URL pública
- ✅ Los usuarios pueden usarla

Próximos pasos:
1. Compartir URL con usuarios
2. Agregar dominio personalizado (opcional)
3. Monitorear en tiempo real
4. Agregar más features

---

**¿Problemas? Contacta a Railway Support o revisa los logs en el Dashboard.**

*Última actualización: Noviembre 27, 2025*
