# 💾 GUÍA DE ALMACENAMIENTO - AGUA VIDA

## 🎯 Cómo Funciona el Almacenamiento

Tu aplicación guarda datos en 3 lugares diferentes:

```
┌─────────────────────────────────────────────┐
│  DATOS EN AGUA VIDA                         │
├─────────────────────────────────────────────┤
│                                             │
│  1. USUARIOS → Firebase Auth + Firestore    │
│  2. REPORTES → Firestore (documento JSON)   │
│  3. FOTOS → /assets/uploads/ (archivos)     │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 1️⃣ USUARIOS - Firebase Auth + Firestore

### Cuando se registra un usuario:

**Paso 1: Firebase Authentication**
- Email y contraseña guardados en Firebase Auth
- Se genera un UID único automáticamente
- Contraseña está encriptada (no se guarda en texto plano)

**Paso 2: Firestore Collection `usuarios`**

```
Firestore → usuarios → [UID del usuario]
{
  "uid": "abc123xyz789",                          // ID único
  "email": "juan@example.com",                    // Email del usuario
  "nombre": "Juan García",                        // Nombre completo
  "telefono": "+34 612 345 678",                  // Teléfono (opcional)
  "createdAt": "2025-01-15T10:30:00.000Z",        // Fecha de creación
  "updated": "2025-01-15T10:30:00.000Z",          // Última actualización
  "reportesCount": 3                              // Cuántos reportes ha hecho
}
```

### Dónde está:
- **Auth**: Firebase Console → Authentication → Users
- **Datos**: Firebase Console → Firestore → Collection `usuarios`

---

## 2️⃣ REPORTES - Firestore Collection

### Cuando crea un reporte:

**Firestore → reportes → [ID del reporte]**

```json
{
  "id": "doc-id-auto-generado",                   // ID único del reporte
  "titulo": "Fuga de agua en plaza",              // Título del problema
  "tipo": "Fuga de agua",                         // Tipo del problema
  "descripcion": "Se ve agua saliendo...",        // Descripción completa
  "gravedad": "critico",                          // Nivel: leve/medio/critico
  "ubicacion": "Plaza Central, Madrid",           // Dirección
  "lat": 40.4168,                                 // Latitud
  "lng": -3.7038,                                 // Longitud
  "uid": "abc123xyz789",                          // ID del usuario que reportó
  "fotos": [                                      // Array de fotos
    {
      "filename": "1705315200000-abc123.jpg",     // Nombre del archivo
      "path": "/assets/uploads/1705315200000-abc123.jpg", // Ruta local
      "url": "http://localhost:5000/assets/uploads/1705315200000-abc123.jpg", // URL accesible
      "size": 2048576,                            // Tamaño en bytes (~2MB)
      "mimetype": "image/jpeg",                   // Tipo de archivo
      "uploadedAt": "2025-01-15T10:30:00.000Z"    // Fecha de subida
    },
    { /* otra foto */ }
  ],
  "fotosCount": 2,                                // Número de fotos
  "fecha": "2025-01-15T10:30:00.000Z",            // Fecha del reporte
  "estado": "pendiente",                          // Estado: pendiente/resolviendo/resuelto
  "respuestas": 0,                                // Número de comentarios
  "megustasCount": 0                              // Número de me-gusta
}
```

### Cómo se agrupa:
```
Firestore
  ├── Collection: usuarios
  │   ├── Document: uid-del-usuario-1
  │   ├── Document: uid-del-usuario-2
  │   └── Document: uid-del-usuario-3
  │
  └── Collection: reportes
      ├── Document: reporte-id-1
      ├── Document: reporte-id-2
      └── Document: reporte-id-3
```

### Dónde está:
- **Firebase Console → Firestore Database → Collections → reportes**

---

## 3️⃣ FOTOS - Sistema de Archivos

### Ubicación:
```
/home/roque/Agua-Vida/
└── front-end/
    └── assets/
        └── uploads/
            ├── 1705315200000-abc123.jpg
            ├── 1705315200001-def456.jpg
            ├── 1705315200002-ghi789.jpg
            └── ... más archivos
```

### Nombre de archivo:
```
1705315200000-abc123.jpg

├─ 1705315200000  = Timestamp en milisegundos (para evitar duplicados)
├─ -              = Separador
├─ abc123         = String aleatorio de 7 caracteres
└─ .jpg           = Extensión original del archivo
```

### Acceso a las fotos:
- **URL local**: `http://localhost:5000/assets/uploads/1705315200000-abc123.jpg`
- **Ruta del servidor**: `/home/roque/Agua-Vida/front-end/assets/uploads/1705315200000-abc123.jpg`

---

## 🔄 FLUJO COMPLETO: DE USUARIO A BD

### Escenario: Juan hace un reporte con 2 fotos

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. USUARIO ABRE /reportar.html                            │
│     └─ LocalStorage: userUID = "abc123xyz789"              │
│                                                             │
│  2. COMPLETA 4 PASOS                                        │
│     ├─ Paso 1: Título, Tipo, Descripción, Gravedad         │
│     ├─ Paso 2: Ubicación, Mapa (Lat/Lng)                   │
│     ├─ Paso 3: Elige 2 fotos (.jpg)                        │
│     └─ Paso 4: Revisa y hace clic "Enviar"                 │
│                                                             │
│  3. FRONTEND (reportar.js)                                  │
│     └─ Crea FormData con:                                  │
│        ├─ Campos: titulo, descripcion, etc.                │
│        ├─ Fotos: foto1.jpg (file object)                   │
│        │         foto2.jpg (file object)                   │
│        └─ UID: abc123xyz789                                │
│                                                             │
│  4. ENVÍA POST /api/reportes                               │
│     └─ Headers: multipart/form-data                        │
│     └─ Body: FormData con fotos + campos                   │
│                                                             │
│  5. BACKEND (server.js)                                    │
│     ├─ Multer recibe las fotos                             │
│     ├─ Guarda en: /assets/uploads/                         │
│     │  ├─ 1705315200000-abc123.jpg (foto 1)                │
│     │  └─ 1705315200001-def456.jpg (foto 2)                │
│     │                                                       │
│     ├─ Prepara documento para Firestore:                   │
│     │  └─ nuevoReporte = {                                 │
│     │      titulo: "...",                                  │
│     │      fotos: [                                        │
│     │        { filename: "1705315200000-abc123.jpg", ... }, │
│     │        { filename: "1705315200001-def456.jpg", ... }  │
│     │      ],                                              │
│     │      uid: "abc123xyz789",                            │
│     │      fecha: "2025-01-15T10:30:00.000Z",              │
│     │      ...                                             │
│     │    }                                                  │
│     │                                                       │
│     ├─ GUARDA EN FIRESTORE:                                │
│     │  └─ db.collection('reportes').add(nuevoReporte)      │
│     │     ├─ Genera ID automático: "doc-xyz-123"           │
│     │     └─ Inserta el documento                          │
│     │                                                       │
│     └─ ACTUALIZA USUARIO:                                  │
│        └─ db.collection('usuarios').doc(uid).update({      │
│           reportesCount: 1 (incrementado)                  │
│           })                                               │
│                                                             │
│  6. RESPUESTA AL FRONTEND                                  │
│     └─ {                                                   │
│        "message": "Reporte creado exitosamente",           │
│        "id": "doc-xyz-123",                                │
│        "reporte": { ... datos completos ... }              │
│        }                                                   │
│                                                             │
│  7. FRONTEND REDIRECCIONA                                  │
│     └─ Redirige a /mapa.html                               │
│                                                             │
│  8. EN FIRESTORE AHORA TENEMOS:                            │
│     ├─ Colección usuarios                                  │
│     │  └─ Documento abc123xyz789                           │
│     │     └─ reportesCount: 1                              │
│     │                                                       │
│     └─ Colección reportes                                  │
│        └─ Documento doc-xyz-123                            │
│           ├─ titulo: "Fuga de agua"                        │
│           ├─ fotos: [{...}, {...}]                         │
│           ├─ uid: "abc123xyz789"                           │
│           └─ ... más campos                                │
│                                                             │
│  9. ARCHIVOS GUARDADOS:                                    │
│     ├─ /assets/uploads/1705315200000-abc123.jpg            │
│     └─ /assets/uploads/1705315200001-def456.jpg            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ DÓNDE VER TUS DATOS

### 1. Ver Usuarios en Firebase

1. Abre: https://console.firebase.google.com
2. Selecciona tu proyecto "Agua Vida"
3. Ve a: **Firestore Database**
4. Selecciona: **Collection → usuarios**
5. Haz clic en un documento UID para ver:
   - Email
   - Nombre
   - Teléfono
   - Cantidad de reportes

### 2. Ver Reportes en Firebase

1. Firestore Database
2. Selecciona: **Collection → reportes**
3. Haz clic en un documento para ver:
   - Título
   - Descripción
   - Ubicación
   - Gravedad
   - Array de fotos (con URLs)
   - Etc.

### 3. Ver Archivos en el Servidor

```bash
# Ver fotos guardadas
ls -lah /home/roque/Agua-Vida/front-end/assets/uploads/

# Ver tamaño total
du -sh /home/roque/Agua-Vida/front-end/assets/uploads/

# Ver una foto específica
file /home/roque/Agua-Vida/front-end/assets/uploads/1705315200000-abc123.jpg
```

### 4. Ver en la Aplicación

1. Abre: http://localhost:3000
2. Registra usuario
3. Crea reporte con fotos
4. Ve a /mapa.html
5. Haz clic en el marcador para ver detalles

---

## 📊 CUOTAS Y LÍMITES

| Elemento | Límite | Nota |
|----------|--------|------|
| Fotos por reporte | 5 | Máximo 5 imágenes |
| Tamaño por foto | 5 MB | Máximo 5MB por archivo |
| Usuarios | Sin límite | Firebase Firestore |
| Reportes | Sin límite | Firebase Firestore |
| Almacenamiento total | Según plan Firebase | Pagar si excedes |

---

## 🔐 SEGURIDAD

### Información Guardada Segura:
- ✅ Contraseña: Encriptada en Firebase Auth (NUNCA en Firestore)
- ✅ Email: Almacenado seguro en Firestore
- ✅ Fotos: Almacenadas en servidor local

### Lo que puedes hacer:
```bash
# Ver estructura de datos (sin contraseña)
curl http://localhost:5000/api/usuarios/abc123xyz789

# Ver reportes (incluyendo URLs de fotos)
curl http://localhost:5000/api/reportes

# Ver fotos (servidas por Express)
curl -O http://localhost:5000/assets/uploads/1705315200000-abc123.jpg
```

---

## 💡 EJEMPLO REAL

### Paso a Paso: Usuario "Juan" crea reporte

#### 1. Registro
```
Entrada: juan@example.com, contraseña: MiPass123!, nombre: Juan
Resultado:
  - Firebase Auth: crea usuario con UID "u123abc"
  - Firestore usuarios/u123abc: { email, nombre, createdAt... }
```

#### 2. Login
```
Entrada: juan@example.com, MiPass123!
Resultado:
  - Backend verifica en Firestore
  - LocalStorage: userUID = "u123abc"
```

#### 3. Reporte con 2 fotos
```
Entrada:
  - Título: "Fuga importante"
  - Ubicación: "Calle Mayor, 45"
  - 2 fotos: foto1.jpg, foto2.jpg
  
Resultado en Firestore reportes/report-xyz:
{
  "titulo": "Fuga importante",
  "uid": "u123abc",
  "fotos": [
    {
      "filename": "1705315200000-xyz1.jpg",
      "url": "http://localhost:5000/assets/uploads/1705315200000-xyz1.jpg",
      ...
    },
    {
      "filename": "1705315200001-xyz2.jpg",
      "url": "http://localhost:5000/assets/uploads/1705315200001-xyz2.jpg",
      ...
    }
  ],
  ...
}

Resultado en Archivos:
  /assets/uploads/1705315200000-xyz1.jpg (2.1 MB)
  /assets/uploads/1705315200001-xyz2.jpg (1.8 MB)
```

---

## ✅ VERIFICAR QUE TODO FUNCIONA

### Test 1: Verificar que el backend guarda
```bash
# Terminal
bash start.sh

# Otra terminal - crear usuario
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "nombre": "Test User"
  }'

# Deberías ver UID en la respuesta
```

### Test 2: Verificar que Firebase tiene datos
1. Abre Firebase Console
2. Ve a Firestore → usuarios
3. Deberías ver un documento nuevo con email "test@example.com"

### Test 3: Verificar fotos en el servidor
```bash
# Ver si la carpeta de uploads existe y tiene permisos
ls -la /home/roque/Agua-Vida/front-end/assets/uploads/

# Debería mostrar archivos con timestamp como nombre
```

---

## 🚀 RESUMEN

```
Lo que guardas en Agua Vida:

1. USUARIO
   └─ Guardado en: Firebase Auth + Firestore usuarios
   └─ Datos: email, nombre, teléfono, fecha

2. REPORTE
   └─ Guardado en: Firestore reportes
   └─ Datos: título, descripción, ubicación, fotos[], fecha, etc.

3. FOTOS
   └─ Guardadas en: /front-end/assets/uploads/
   └─ Referencia en: Firestore dentro del reporte
   └─ Acceso: http://localhost:5000/assets/uploads/nombre.jpg
```

**¡Todo está conectado y guardado seguro!** 🔒

