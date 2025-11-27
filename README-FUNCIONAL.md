# 🌊 Agua Vida - Sistema de Reportes de Agua

Una plataforma web moderna para que ciudadanos reporten y monitoreen problemas de agua en su comunidad.

## ✨ Características

- 🔐 **Autenticación completa** - Registro e login con validación
- 🗺️ **Mapa interactivo** - Visualiza todos los reportes en tiempo real
- 📸 **Subida de fotos** - Hasta 5 fotos por reporte (máx 5MB cada una)
- 📍 **Geolocalización** - Ubica problemas automáticamente o manualmente
- 📊 **Niveles de gravedad** - Clasifica: Leve, Medio, Crítico
- 🚀 **API REST** - Backend completamente funcional
- 💾 **Base de datos Firebase** - Firestore + Authentication
- 📱 **Diseño responsive** - Funciona en desktop, tablet y móvil

## 🏗️ Tecnología

**Frontend:**
- HTML5, CSS3 (con variables), Bootstrap 5.3.3
- Vanilla JavaScript (sin frameworks)
- Leaflet 1.9.4 para mapas

**Backend:**
- Node.js 16+
- Express.js 4.18.2
- Firebase Admin SDK
- Multer para carga de fotos

**Base de Datos:**
- Firebase Firestore (documentos)
- Firebase Authentication (usuarios)

## 📋 Requisitos

- Node.js v16 o superior
- npm o yarn
- Cuenta de Firebase (gratuita)
- Git (opcional)

## 🚀 Inicio Rápido

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto "Agua Vida"
3. Ve a **Configuración del proyecto → Cuentas de servicio**
4. Descarga la clave privada como JSON
5. Copia los valores a `/backend-node/.env`

### 2. Instalar y Ejecutar

```bash
cd /home/roque/Agua-Vida

# Opción A: Usar script automático (recomendado)
bash start.sh

# Opción B: Manual
# Terminal 1:
cd backend-node && npm install && npm start

# Terminal 2:
cd front-end && npm install && npm start
```

### 3. Acceder

Abre en tu navegador: **http://localhost:3000**

## 🧪 Pruebas

1. **Registrarse**: Ve a `/register.html`
2. **Iniciar sesión**: Ve a `/login.html`
3. **Reportar problema**: Ve a `/reportar.html`
4. **Ver en mapa**: Ve a `/mapa.html`

## 📁 Estructura del Proyecto

```
Agua-Vida/
├── backend-node/              # Servidor Express + Firebase
│   ├── server.js              # Endpoints API (12 rutas)
│   ├── package.json           # Dependencias
│   └── .env                   # Configuración (credenciales)
│
├── front-end/                 # Aplicación web
│   ├── index.html             # Página principal
│   ├── login.html             # Página de login
│   ├── register.html          # Página de registro
│   ├── reportar.html          # Formulario 4 pasos
│   ├── mapa.html              # Mapa de reportes
│   ├── perfil.html            # Perfil de usuario
│   ├── js/
│   │   ├── auth.js            # Lógica de autenticación
│   │   ├── reportar.js        # Lógica de reportes (multi-step)
│   │   ├── api.js             # Helper de API
│   │   └── mapa.js            # Lógica del mapa
│   ├── style/
│   │   ├── global.css         # Estilos globales (variables)
│   │   ├── auth.css           # Estilos login/register
│   │   └── reportar.css       # Estilos formulario
│   └── assets/
│       ├── uploads/           # Fotos subidas
│       ├── icons/             # Iconos
│       └── img/               # Imágenes
│
├── verify.sh                  # Script de verificación
├── start.sh                   # Script de inicio
└── INSTRUCCIONES-FUNCIONAL.md # Guía completa

```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/register` - Crear usuario
- `POST /api/auth/login` - Iniciar sesión

### Reportes
- `GET /api/reportes` - Listar todos
- `POST /api/reportes` - Crear (con fotos)
- `GET /api/reportes/:id` - Ver específico
- `PUT /api/reportes/:id` - Actualizar
- `DELETE /api/reportes/:id` - Eliminar

### Usuarios
- `GET /api/usuarios/:uid` - Ver perfil
- `PUT /api/usuarios/:uid` - Editar perfil

### Health
- `GET /api/health` - Estado del servidor

## 🎨 Paleta de Colores

```css
--primary: #0d6efd      /* Azul claro */
--secondary: #0dcaf0   /* Cian */
--danger: #dc3545      /* Rojo */
--warning: #ffc107     /* Amarillo */
--success: #198754     /* Verde */
```

## 🔍 Verificación

Antes de iniciar, ejecuta:
```bash
bash verify.sh
```

Esto verificará:
- ✅ Node.js y npm instalados
- ✅ Estructura de carpetas
- ✅ Archivos necesarios
- ✅ Configuración de .env

## 🐛 Solución de Problemas

### "Error de conexión al backend"
```bash
# Verifica que el backend está corriendo
curl http://localhost:5000/api/health
```

### "Las fotos no se suben"
```bash
# Crea la carpeta de uploads
mkdir -p /home/roque/Agua-Vida/front-end/assets/uploads
```

### "Usuario o contraseña incorrectos"
- Verifica que Firebase esté correctamente configurado en `.env`
- Intenta registrarte de nuevo
- Revisa Firebase Console → Autenticación

## 🚀 Próximas Mejoras

- [ ] Autenticación social (Google, Facebook)
- [ ] Notificaciones por email
- [ ] Dashboard de administración
- [ ] Búsqueda avanzada
- [ ] PWA offline mode
- [ ] Compartir en redes sociales
- [ ] Estadísticas por zona

## 👥 Contribuir

1. Haz fork del proyecto
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit: `git commit -am 'Agregar feature'`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

## 📞 Contacto

- Email: soporte@aguavida.local
- Issues: Reporta en GitHub
- Documentación: Lee `INSTRUCCIONES-FUNCIONAL.md`

## 📄 Licencia

Este proyecto es de código abierto bajo licencia MIT.

---

**¡Hecho con ❤️ para proteger el agua de la comunidad!**

[Abre la aplicación →](http://localhost:3000)
