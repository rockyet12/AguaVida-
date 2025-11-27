# 🚀 Agua Vida - Sistema Funcional

¡Tu aplicación está lista! Aquí te muestro cómo ponerla en marcha.

## 📋 Requisitos Previos

1. **Node.js** instalado (v16 o superior)
2. **Firebase Console** acceso a tu proyecto
3. **Git** (opcional, para control de versiones)

## 🔧 Configuración de Firebase

### Paso 1: Obtener tus Credenciales

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto **Agua Vida**
3. Ve a **Configuración del proyecto** ⚙️
4. Haz clic en la pestaña **Cuentas de servicio**
5. Haz clic en **Generar nueva clave privada**
6. Se descargará un JSON con tus credenciales

### Paso 2: Completar el archivo `.env`

Edita `/home/roque/Agua-Vida/backend-node/.env`:

```bash
# Copia los valores del JSON que descargaste
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-project-id.iam.gserviceaccount.com
PORT=5000
NODE_ENV=development
```

**⚠️ IMPORTANTE**: La PRIVATE_KEY debe estar entre comillas y los saltos de línea deben ser `\n`

## 🎬 Iniciar la Aplicación

### Opción 1: Usar el script `start.sh` (Recomendado)

```bash
cd /home/roque/Agua-Vida
bash start.sh
```

Esto iniciará:
- ✅ Backend en `http://localhost:5000`
- ✅ Frontend en `http://localhost:3000`

### Opción 2: Manual (En dos terminales)

**Terminal 1 - Backend:**
```bash
cd /home/roque/Agua-Vida/backend-node
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /home/roque/Agua-Vida/front-end
npm install
npm start
```

## ✅ Verificar que Funciona

### Backend Health Check
```bash
curl http://localhost:5000/api/health
```

Deberías ver: `{"status":"API funcionando correctamente ✅"}`

### Frontend
Abre en tu navegador: `http://localhost:3000`

## 🧪 Pruebas Funcionales

### 1️⃣ Registrarse

1. Ve a http://localhost:3000/register.html
2. Completa el formulario:
   - **Nombre**: Juan García
   - **Email**: juan@example.com
   - **Teléfono**: +34 612 345 678 (opcional)
   - **Contraseña**: MinPass123!
   - **Confirmar**: MinPass123!
   - ✅ Acepta términos
3. Haz clic en **Crear Cuenta**
4. Espera a que redirija a login (max 2 segundos)

**Validaciones que se comprueban:**
- ✓ Nombre mínimo 3 caracteres
- ✓ Email válido
- ✓ Contraseña mínimo 8 caracteres
- ✓ Las contraseñas coinciden
- ✓ Términos aceptados

### 2️⃣ Iniciar Sesión

1. Ve a http://localhost:3000/login.html
2. Usa el email y contraseña que acabas de crear
3. Haz clic en **Iniciar Sesión**
4. Deberías redireccionar a `/home.html`

**Resultado esperado:**
- ✓ LocalStorage con `userUID`, `userEmail`, `userName`
- ✓ Mensaje de éxito
- ✓ Redirección a home

### 3️⃣ Hacer un Reporte

1. Ve a http://localhost:3000/reportar.html
2. **Paso 1 - Información:**
   - Título: "Fuga de agua en calle principal"
   - Tipo: "Fuga de agua"
   - Descripción: "Se observa una fuga en la acera cerca de la plaza central. El agua se está perdiendo desde hace días."
   - Gravedad: "Crítico"
   - ➡️ Siguiente

3. **Paso 2 - Ubicación:**
   - Dirección: "Plaza Central, Madrid"
   - Haz clic en el mapa para marcar la ubicación
   - (O entra coordenadas manualmente)
   - ➡️ Siguiente

4. **Paso 3 - Fotos:**
   - Opcionalmente, sube 1-5 imágenes (máx 5MB cada una)
   - Verás vista previa de las fotos
   - ➡️ Siguiente

5. **Paso 4 - Resumen:**
   - Revisa todos los datos
   - ✅ Enviar Reporte

**Resultado esperado:**
- ✓ Mensaje de éxito: "Reporte enviado exitosamente"
- ✓ Las fotos se guardan en `/front-end/assets/uploads/`
- ✓ Redirección a `/mapa.html`
- ✓ El reporte aparece en Firestore

### 4️⃣ Ver Reporte en el Mapa

1. Ve a http://localhost:3000/mapa.html
2. Deberías ver:
   - Un mapa interactivo
   - Marcadores de los reportes con colores por gravedad
   - Leyenda explicativa
   - Botón para actualizar reportes

**Colores:**
- 🔴 Rojo = Crítico
- 🟠 Naranja = Medio
- 🔵 Azul = Leve

## 🐛 Resolver Problemas Comunes

### "Error de conexión. Verifica que el backend esté activo"

**Solución:**
```bash
# Verifica que el backend esté corriendo
curl http://localhost:5000/api/health

# Si no funciona, reinicia:
cd /home/roque/Agua-Vida/backend-node
npm start
```

### "Usuario o contraseña incorrectos" (pero sé que es correcta)

**Solución:**
1. Revisa que Firebase esté configurado correctamente en `.env`
2. Intenta registrarte de nuevo
3. Verifica en Firebase Console que el usuario se creó

### Las fotos no se suben

**Solución:**
1. Verifica que la carpeta exista:
   ```bash
   ls -la /home/roque/Agua-Vida/front-end/assets/uploads/
   ```
2. Si no existe, créala:
   ```bash
   mkdir -p /home/roque/Agua-Vida/front-end/assets/uploads
   ```
3. Reinicia el backend

### Formulario no responde

**Solución:**
1. Abre la Consola del Navegador (F12)
2. Mira los errores en la pestaña **Console**
3. Verifica que los IDs de los elementos coincidan en auth.js

## 📊 Información Técnica

### Estructura de Datos - Firebase

**Colección `usuarios`:**
```json
{
  "email": "juan@example.com",
  "nombre": "Juan García",
  "telefono": "+34 612 345 678",
  "createdAt": "2025-01-15T10:30:00Z",
  "updated": "2025-01-15T10:30:00Z"
}
```

**Colección `reportes`:**
```json
{
  "titulo": "Fuga de agua",
  "tipo": "Fuga de agua",
  "descripcion": "Descripción del problema...",
  "gravedad": "critico",
  "ubicacion": "Plaza Central, Madrid",
  "lat": 40.4168,
  "lng": -3.7038,
  "uid": "user_uid_123",
  "fotos": [
    {
      "filename": "1705315200000-abc123.jpg",
      "path": "/assets/uploads/1705315200000-abc123.jpg",
      "size": 2048576,
      "mimetype": "image/jpeg"
    }
  ],
  "fecha": "2025-01-15T10:30:00Z",
  "estado": "pendiente"
}
```

### API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Verificar servidor |
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/reportes` | Obtener todos los reportes |
| POST | `/api/reportes` | Crear reporte (con fotos) |
| GET | `/api/reportes/:id` | Obtener reporte específico |
| PUT | `/api/reportes/:id` | Actualizar reporte |
| DELETE | `/api/reportes/:id` | Eliminar reporte |
| GET | `/api/usuarios/:uid` | Obtener perfil |
| PUT | `/api/usuarios/:uid` | Actualizar perfil |

### Puertos

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

## 🎨 Personalización

### Cambiar Colores Primarios

Edita `/front-end/style/global.css`:
```css
:root {
  --primary: #0d6efd;      /* Azul claro */
  --secondary: #0dcaf0;    /* Cian */
  --danger: #dc3545;       /* Rojo */
  --warning: #ffc107;      /* Amarillo */
  --success: #198754;      /* Verde */
}
```

### Cambiar Logo

Reemplaza la imagen de logo en `--navbar-brand-image` o usa otro ícono de Font Awesome.

## 🚀 Próximos Pasos

Para hacerlo más completo, puedes:

1. **Agregar Autenticación Social** (Google, Facebook)
2. **Enviar Notificaciones** por email cuando se crean reportes
3. **Dashboard de Estadísticas** para administradores
4. **Búsqueda Avanzada** de reportes
5. **Compartir en Redes Sociales**
6. **PWA (Progressive Web App)** para uso offline

## 📞 Soporte

Si encuentras problemas:

1. **Revisa la consola del navegador** (F12)
2. **Revisa los logs del backend** en la terminal
3. **Verifica Firebase Console** para errores

---

**¡Tu aplicación Agua Vida está lista para usar! 🎉**

Haz clic aquí para ir a: [http://localhost:3000](http://localhost:3000)
