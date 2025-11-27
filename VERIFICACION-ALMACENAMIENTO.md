# ✅ GUÍA DE VERIFICACIÓN - ALMACENAMIENTO COMPLETO

## 🎯 Verificar que TODO se guarda correctamente en Firebase

Esta guía te mostrará paso a paso cómo verificar que:
- ✅ Los usuarios se crean en Firebase
- ✅ Los reportes se guardan en Firestore
- ✅ Las fotos se almacenan en el servidor
- ✅ Todo está conectado correctamente

---

## 📋 PASO 1: Verificar Configuración

### 1.1 Verificar que el .env esté completo

```bash
cat /home/roque/Agua-Vida/backend-node/.env
```

Deberías ver:
```
FIREBASE_PROJECT_ID=abc123def456
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-123@agua-vida.iam.gserviceaccount.com
PORT=5000
NODE_ENV=development
```

✅ Si está incompleto, completa los valores desde Firebase Console

### 1.2 Verificar que Node.js esté corriendo

```bash
cd /home/roque/Agua-Vida
bash start.sh
```

En la terminal deberías ver:
```
🌊 AGUA VIDA - BACKEND INICIADO EXITOSAMENTE
🚀 Servidor ejecutándose en http://localhost:5000
```

---

## 🧪 PASO 2: Test Automático de API

### 2.1 Usar el script de pruebas

```bash
bash test-api.sh
```

Esto automáticamente:
1. ✅ Verifica que el servidor está activo
2. ✅ Crea un usuario de prueba
3. ✅ Intenta hacer login
4. ✅ Crea un reporte
5. ✅ Obtiene todos los reportes
6. ✅ Actualiza el reporte
7. ✅ Elimina el reporte

Deberías ver algo como:
```
✅ Login exitoso
✅ Reporte creado exitosamente (ID: report-xyz-123)
✅ Todos los reportes obtenidos: 5 reportes
```

---

## 🔍 PASO 3: Verificar en Firebase Console

### 3.1 Ver usuarios creados

1. Abre: https://console.firebase.google.com
2. Selecciona tu proyecto "Agua Vida"
3. Ve a: **Firestore Database**
4. En el panel izquierdo, haz clic en: **Collections**
5. Selecciona: **usuarios**

Deberías ver:
```
Collection: usuarios
├── Document: [UID-del-usuario-1]
│   ├── email: juan@example.com
│   ├── nombre: Juan García
│   ├── telefono: +34 612 345 678
│   ├── createdAt: 2025-01-15T10:30:00.000Z
│   └── reportesCount: 3
│
└── Document: [UID-del-usuario-2]
    └── ...
```

✅ Si ves documentos, significa que los usuarios se guardan correctamente

### 3.2 Ver reportes creados

1. En la misma ventana de Firestore
2. Ve a: **Collections → reportes**

Deberías ver:
```
Collection: reportes
├── Document: [ID-reporte-1]
│   ├── titulo: "Fuga de agua"
│   ├── descripcion: "Se ve agua saliendo..."
│   ├── ubicacion: "Plaza Central"
│   ├── gravedad: "critico"
│   ├── fotos: [Array with 2 items]
│   │   ├── [0]: {...}
│   │   └── [1]: {...}
│   ├── fecha: "2025-01-15T10:30:00.000Z"
│   └── uid: "usuario-uid-123"
│
└── Document: [ID-reporte-2]
    └── ...
```

✅ Si ves documentos con array de fotos, significa que los reportes se guardan correctamente

### 3.3 Ver detalles de una foto

1. Haz clic en un documento de reportes
2. Expande el campo: **fotos**
3. Haz clic en el primer item del array

Deberías ver:
```
filename: "1705315200000-abc123.jpg"
path: "/assets/uploads/1705315200000-abc123.jpg"
url: "http://localhost:5000/assets/uploads/1705315200000-abc123.jpg"
size: 2048576  (2.1 MB)
mimetype: "image/jpeg"
uploadedAt: "2025-01-15T10:30:00.000Z"
```

✅ Si ves URL y metadata, significa que las fotos se registran correctamente

---

## 📁 PASO 4: Verificar Fotos en el Servidor

### 4.1 Ver archivos guardados

```bash
ls -lah /home/roque/Agua-Vida/front-end/assets/uploads/
```

Deberías ver:
```
total 15M
drwxr-xr-x 2 roque roque 4.0K Jan 15 10:35 .
drwxr-xr-x 3 roque roque 4.0K Jan 15 10:30 ..
-rw-r--r-- 1 roque roque 2.1M Jan 15 10:31 1705315200000-abc123.jpg
-rw-r--r-- 1 roque roque 1.8M Jan 15 10:31 1705315200001-def456.jpg
-rw-r--r-- 1 roque roque 2.3M Jan 15 10:32 1705315200002-ghi789.jpg
```

✅ Si ves archivos con nombres de timestamp, las fotos se guardan localmente

### 4.2 Ver tamaño total

```bash
du -sh /home/roque/Agua-Vida/front-end/assets/uploads/
```

Ejemplo:
```
15M /home/roque/Agua-Vida/front-end/assets/uploads/
```

### 4.3 Verificar que una foto es válida

```bash
file /home/roque/Agua-Vida/front-end/assets/uploads/1705315200000-abc123.jpg
```

Deberías ver:
```
/home/roque/Agua-Vida/front-end/assets/uploads/1705315200000-abc123.jpg: JPEG image data, JFIF standard...
```

✅ Si dice "JPEG image data", el archivo es válido

---

## 🌐 PASO 5: Verificar Acceso a Fotos por URL

### 5.1 Acceder a una foto por HTTP

```bash
curl -I http://localhost:5000/assets/uploads/1705315200000-abc123.jpg
```

Deberías ver:
```
HTTP/1.1 200 OK
Content-Length: 2048576
Content-Type: image/jpeg
```

✅ Si es 200, puedes acceder a la foto por URL

### 5.2 Descargar una foto

```bash
curl -O http://localhost:5000/assets/uploads/1705315200000-abc123.jpg
```

Deberías ver un archivo `.jpg` en tu directorio actual

---

## 🔐 PASO 6: Verificar en la Aplicación Web

### 6.1 Registrar un usuario nuevo

1. Abre: http://localhost:3000/register.html
2. Completa:
   - Nombre: Juan Prueba
   - Email: juan-prueba@example.com
   - Teléfono: +34 612 345 678
   - Contraseña: MiPassword123!
   - Confirmación: MiPassword123!
   - ✅ Acepta términos
3. Haz clic en "Crear Cuenta"
4. Deberías ver: "✅ Registro exitoso"
5. Espera a ser redirigido a login

### 6.2 Hacer login

1. En login.html, ingresa:
   - Email: juan-prueba@example.com
   - Contraseña: MiPassword123!
2. Haz clic en "Iniciar Sesión"
3. Deberías ver: "✅ Login exitoso"
4. Espera a ser redirigido a home

### 6.3 Crear un reporte

1. En home.html, haz clic en "Reportar"
2. Completa Paso 1:
   - Título: "Agua sucia en fuente"
   - Tipo: "Agua contaminada"
   - Descripción: "El agua de la fuente pública está turbia y tiene un olor extraño"
   - Gravedad: "Medio"
3. Haz clic en "Siguiente"
4. Completa Paso 2:
   - Dirección: "Fuente Central, Madrid"
   - Haz clic en el mapa para marcar ubicación
5. Haz clic en "Siguiente"
6. Completa Paso 3:
   - Carga 1-2 fotos (opcional)
7. Haz clic en "Siguiente"
8. Revisa el Paso 4
9. Haz clic en "Enviar Reporte"
10. Deberías ver: "✅ Reporte enviado exitosamente"
11. Serás redirigido a mapa.html

### 6.4 Ver el reporte en el mapa

1. En mapa.html deberías ver tu reporte
2. Haz clic en el marcador
3. Deberías ver un pop-up con:
   - Título del reporte
   - Descripción breve
   - Badge con la gravedad

---

## 📊 PASO 7: Verificar en los Logs

### 7.1 Ver logs del backend

En la terminal donde ejecutaste `bash start.sh`, deberías ver:

```
✅ Usuario creado: juan-prueba@example.com (UID: u123abc456)
✅ Login exitoso para: juan-prueba@example.com
✅ Reporte creado: Agua sucia en fuente (ID: report-xyz-123) por usuario u123abc456
   - Fotos: 2
   - Ubicación: Fuente Central, Madrid
   - Gravedad: medio
📊 Se obtuvieron 1 reportes
```

✅ Si ves estos logs, todo funciona correctamente

### 7.2 Ver logs del frontend

Abre la consola del navegador (F12):
```
✅ Login exitoso. Redirigiendo...
✅ Reporte enviado exitosamente
✅ Redirigiendo a mapa...
```

---

## 🔍 PASO 8: Verificación Completa con Curl

### Test 1: Crear usuario

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-curl@example.com",
    "password": "TestPassword123!",
    "nombre": "Test User",
    "telefono": "+34 123 456 789"
  }'
```

Respuesta esperada:
```json
{
  "message": "Usuario registrado exitosamente",
  "uid": "u123abc456",
  "user": {
    "uid": "u123abc456",
    "email": "test-curl@example.com",
    "nombre": "Test User"
  }
}
```

### Test 2: Hacer login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-curl@example.com",
    "password": "TestPassword123!"
  }'
```

Respuesta esperada:
```json
{
  "message": "Login exitoso",
  "uid": "u123abc456",
  "user": {
    "uid": "u123abc456",
    "email": "test-curl@example.com",
    "nombre": "Test User"
  }
}
```

### Test 3: Obtener todos los reportes

```bash
curl http://localhost:5000/api/reportes | jq '.'
```

Respuesta esperada:
```json
[
  {
    "id": "report-xyz-123",
    "titulo": "Fuga de agua",
    "descripcion": "Se ve agua saliendo...",
    "ubicacion": "Plaza Central",
    "fotos": [
      {
        "filename": "1705315200000-abc123.jpg",
        "url": "http://localhost:5000/assets/uploads/1705315200000-abc123.jpg"
      }
    ],
    ...
  },
  ...
]
```

---

## ✅ CHECKLIST DE VERIFICACIÓN

Marca todo lo que puedas confirmar:

```
CONFIGURACIÓN:
[ ] .env completado con credenciales Firebase
[ ] Backend iniciado sin errores (bash start.sh)
[ ] Frontend accesible en http://localhost:3000
[ ] API responde en http://localhost:5000/api/health

USUARIOS:
[ ] Usuario creado en Firebase Auth
[ ] Documento del usuario visible en Firestore
[ ] Datos del usuario incluyen: email, nombre, telefono
[ ] reportesCount está en 0 inicialmente

REPORTES:
[ ] Reporte aparece en Firestore collection "reportes"
[ ] Reporte tiene todos los campos: titulo, descripcion, ubicacion, lat, lng
[ ] Array de fotos contiene metadata completa

FOTOS:
[ ] Archivos guardados en /assets/uploads/
[ ] Nombre del archivo sigue formato: timestamp-random.jpg
[ ] Se puede acceder por URL: http://localhost:5000/assets/uploads/nombre.jpg
[ ] HTTP 200 al acceder a las fotos

APLICACIÓN:
[ ] Registro funciona (usuario creado en BD)
[ ] Login funciona (usuario encontrado en BD)
[ ] Reporte se guarda con fotos
[ ] Mapa muestra los reportes
[ ] Se pueden ver detalles en pop-up

LOGS:
[ ] Backend muestra mensajes de "Usuario creado"
[ ] Backend muestra "Reporte creado"
[ ] Frontend muestra mensajes de éxito
[ ] No hay errores en la consola (F12)
```

---

## 🚨 Si Algo Falla

### "Error: No es posible conectarse a Firebase"
- Revisa .env: ¿FIREBASE_PROJECT_ID está correcto?
- ¿FIREBASE_PRIVATE_KEY está completa?
- ¿Incluye `\n` en los saltos de línea?

### "Las fotos no se guardan"
- ¿Existe la carpeta /assets/uploads/?
  ```bash
  mkdir -p /home/roque/Agua-Vida/front-end/assets/uploads
  ```
- ¿Tiene permisos de escritura?
  ```bash
  chmod 777 /home/roque/Agua-Vida/front-end/assets/uploads
  ```

### "El reporte no aparece en Firestore"
- ¿El usuario está autenticado? (¿UID en localStorage?)
- ¿El UID es diferente de "anonimo"?
- Ver logs: `tail -f /tmp/backend.log`

### "Las fotos no se suben pero el reporte sí"
- Las fotos son **opcionales**
- El reporte se guarda aunque no haya fotos
- Verifica que `fotosCount` sea 0

---

## 🎯 PRUEBA FINAL COMPLETA

Esto toma 5 minutos:

```bash
# 1. Asegúrate de que todo está corriendo
bash start.sh

# 2. En otra terminal, ejecuta el test
bash test-api.sh

# 3. Abre Firebase Console y verifica:
#    - Collection usuarios
#    - Collection reportes

# 4. Abre http://localhost:3000 y prueba:
#    - Regístrate
#    - Haz login
#    - Crea reporte
#    - Ve en mapa

# 5. Verifica que las fotos están en:
ls -la /home/roque/Agua-Vida/front-end/assets/uploads/
```

✅ Si todo funciona, **¡Tu almacenamiento está 100% operativo!**

---

## 📞 RESUMEN

**Todo se guarda en:**

1. **Usuarios** → Firebase Auth + Firestore
2. **Reportes** → Firestore (con referencias a fotos)
3. **Fotos** → /assets/uploads/ (accesibles por HTTP)

**¡Tu aplicación está lista para guardar datos!** 🎉

