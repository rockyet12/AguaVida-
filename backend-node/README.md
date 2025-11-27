# Agua Vida - Backend Node.js

Backend simplificado para la aplicación Agua Vida usando **Node.js + Express + Firebase**.

## Características

- ✅ Autenticación con Firebase Auth
- ✅ Gestión de reportes (CRUD)
- ✅ Gestión de perfiles de usuario
- ✅ CORS habilitado
- ✅ API REST documentada

## Requisitos

- Node.js 16+
- npm o yarn
- Credenciales de Firebase

## Instalación

```bash
cd backend-node
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_PRIVATE_KEY=tu_private_key
FIREBASE_CLIENT_EMAIL=tu_client_email
PORT=5000
```

Obtén estas credenciales de:
1. Firebase Console → Proyecto → Configuración → Cuentas de servicio
2. Descarga el archivo JSON y copia los valores

## Ejecutar

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

## Endpoints API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login

### Reportes
- `GET /api/reportes` - Obtener todos los reportes
- `POST /api/reportes` - Crear nuevo reporte
- `GET /api/reportes/:id` - Obtener reporte específico
- `PUT /api/reportes/:id` - Actualizar reporte
- `DELETE /api/reportes/:id` - Eliminar reporte

### Usuarios
- `GET /api/usuarios/:uid` - Obtener perfil
- `PUT /api/usuarios/:uid` - Actualizar perfil

### Salud
- `GET /api/health` - Verificar estado del servidor

## Estructura

```
backend-node/
├── server.js          # Servidor principal
├── package.json       # Dependencias
├── .env              # Variables de entorno
└── README.md         # Este archivo
```
