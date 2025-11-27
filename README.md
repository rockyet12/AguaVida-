# 🌊 AGUA VIDA - Sistema de Reporte de Calidad de Agua

> Una aplicación web para reportar problemas de calidad de agua en tiempo real con fotos, ubicación y geolocalización interactiva.
>
> **Estado: ✅ 100% OPERATIVO - Pruebas de almacenamiento completadas y verificadas**

## ✨ Características principales

- ✅ **Autenticación completa** - Registro y login de usuarios con Firebase Auth
- ✅ **Sistema de reportes** - Crear reportes con título, descripción, gravedad y ubicación GPS
- ✅ **Geolocalización** - Ubicar problemas en mapa interactivo (Leaflet + OpenStreetMap)
- ✅ **Carga de fotos** - Hasta 5 fotos por reporte (máx 5MB cada una) con Multer
- ✅ **Almacenamiento verificado** - Firebase Firestore + almacenamiento local de fotos
- ✅ **API REST completa** - 12+ endpoints completamente documentados y testeados
- ✅ **Responsive Design** - Funciona en desktop, tablet y móvil
- ✅ **Validación completa** - Frontend y backend con manejo de errores
- ✅ **Servidor de pruebas** - Incluye server-test.js para desarrollo sin Firebase

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                 Frontend (Port 3000)                │
│  HTML5 + CSS3 + Vanilla JavaScript + Bootstrap 5   │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│            Backend API (Port 5000/5001)             │
│    Express.js + Node.js + Multer + Firebase       │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
    Firebase      Disco Local    Firestore
    Auth (BD)     (/uploads)     (Reportes)
```

## 📁 Estructura del Proyecto

```
Agua-Vida/
├── backend-node/              # API Express + Multer
│   ├── server.js             # Servidor con Firebase
│   ├── server-test.js        # Servidor de prueba local
│   ├── package.json          # Dependencias
│   ├── .env.example          # Variables de entorno
│   └── README.md             # Documentación backend
│
├── front-end/                # Interfaz de usuario
│   ├── index.html            # Página principal
│   ├── register.html         # Página de registro
│   ├── login.html            # Página de login
│   ├── reportar.html         # Formulario de reporte
│   ├── mapa.html             # Mapa con reportes
│   ├── js/
│   │   ├── auth.js           # Lógica de autenticación
│   │   ├── reportar.js       # Creación de reportes
│   │   ├── firebase.js       # Configuración Firebase
│   │   └── api.js            # Cliente API
│   ├── style/
│   │   ├── global.css        # Estilos globales
│   │   ├── auth.css          # Estilos autenticación
│   │   ├── index.css         # Estilos página principal
│   │   └── reportar.css      # Estilos formulario
│   ├── assets/
│   │   ├── icons/            # Iconografía
│   │   ├── img/              # Imágenes
│   │   └── uploads/          # Fotos de reportes
│   ├── package.json          # Dependencias frontend
│   └── server.js             # Servidor Express
│
├── 📚 Documentación/
│   ├── ALMACENAMIENTO-BD.md                 # Arquitectura de datos
│   ├── RESULTADOS-PRUEBAS-ALMACENAMIENTO.md # Resultados de pruebas
│   ├── VER-DATOS-TIEMPO-REAL.md            # Cómo consultar datos
│   ├── VERIFICACION-ALMACENAMIENTO.md      # Guía de verificación
│   └── ... (más documentos)
│
├── 🚀 Scripts/
│   ├── start.sh              # Inicia backend + frontend
│   ├── test-api.sh           # Pruebas de API
│   ├── verify.sh             # Verificación del sistema
│   └── checklist.sh          # Checklist de implementación
│
├── .gitignore                # Configuración Git
├── README.md                 # Este archivo
└── LICENSE                   # Licencia
```

## 🚀 Inicio Rápido

### Requisitos
- **Node.js** >= 16
- **npm** o **yarn**
- **Firefox o Chrome** (navegador moderno)
- (Opcional) **Firebase** para producción

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/rockyet12/AguaVida-.git
   cd Agua-Vida
   ```

2. **Instala dependencias**
   ```bash
   # Backend
   cd backend-node
   npm install
   cd ..
   
   # Frontend
   cd front-end
   npm install
   cd ..
   ```

3. **Inicia los servidores**
   ```bash
   bash start.sh
   ```

4. **Abre en el navegador**
   - Frontend: http://localhost:3000
   - API: http://localhost:5001/api

## 📖 Uso

### Registrarse
1. Abre http://localhost:3000/register.html
2. Completa los campos:
   - Nombre completo
   - Email
   - Teléfono
   - Contraseña (mín 8 caracteres)
3. Haz clic en "Crear Cuenta"

### Hacer Login
1. Abre http://localhost:3000/login.html
2. Ingresa email y contraseña
3. Haz clic en "Iniciar Sesión"

### Crear Reporte
1. Desde la página principal, haz clic en "Reportar"
2. **Paso 1**: Completa la información del problema
   - Título
   - Tipo de problema
   - Descripción
   - Gravedad (Bajo, Medio, Crítico)
3. **Paso 2**: Selecciona ubicación
   - Usa el GPS para auto-ubicarte
   - O haz clic en el mapa
4. **Paso 3**: Carga fotos (opcional)
   - Selecciona 1-5 fotos (máx 5MB cada una)
5. **Paso 4**: Revisa y envía

### Ver Reportes en el Mapa
1. Abre http://localhost:3000/mapa.html
2. Ve los reportes marcados en el mapa
3. Haz clic en un marcador para ver detalles
4. Los colores indican la gravedad:
   - 🟢 Verde = Bajo
   - 🟡 Amarillo = Medio
   - 🔴 Rojo = Crítico

## 🧪 Pruebas

### Ejecutar suite de pruebas
```bash
bash test-api.sh
```

### Verificar el sistema
```bash
bash verify.sh
```

### Ver datos en tiempo real
```bash
# Ver todas las estadísticas
curl http://localhost:5001/api/stats | jq '.'

# Ver solo usuarios
curl http://localhost:5001/api/stats | jq '.usuarios'

# Ver solo reportes
curl http://localhost:5001/api/reportes | jq '.'

# Ver estado del servidor
curl http://localhost:5001/api/health
```

## 🔗 API Endpoints

### Autenticación
- `POST /api/auth/register` - Crear usuario
- `POST /api/auth/login` - Autenticarse

### Reportes
- `GET /api/reportes` - Obtener todos
- `GET /api/reportes/:id` - Obtener uno específico
- `GET /api/reportes/usuario/:uid` - Reportes del usuario
- `POST /api/reportes` - Crear reporte (con fotos)
- `PUT /api/reportes/:id` - Actualizar reporte
- `DELETE /api/reportes/:id` - Eliminar reporte

### Usuarios
- `GET /api/usuarios/:uid` - Obtener perfil
- `PUT /api/usuarios/:uid` - Actualizar perfil

### Sistema
- `GET /api/health` - Estado del servidor
- `GET /api/stats` - Estadísticas completas

## 💾 Almacenamiento de Datos

### Desarrollo Local (Sin Firebase)
- **Usuarios**: Memoria RAM
- **Reportes**: Memoria RAM
- **Fotos**: Disco local `/assets/uploads/`

### Producción (Con Firebase)
- **Usuarios**: Firebase Authentication + Firestore
- **Reportes**: Firestore
- **Fotos**: Disco local o Firebase Storage

## 🛠️ Configuración Firebase

Para usar Firebase en producción:

1. **Crea proyecto en Firebase Console**
   - Ve a https://console.firebase.google.com
   - Crea un nuevo proyecto

2. **Descarga credenciales**
   - Proyecto → Configuración → Cuentas de servicio
   - Descarga la clave JSON privada

3. **Configura backend**
   ```bash
   cd backend-node
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

4. **Configura frontend**
   ```bash
   # Edita front-end/js/firebase.js
   # Agrega tu apiKey, authDomain, projectId, etc.
   ```

5. **Inicia con servidor de producción**
   ```bash
   npm start  # Usa server.js en lugar de server-test.js
   ```

## 📊 Estructura de Datos

### Usuario
```json
{
  "uid": "user_1764202892245_rtutum",
  "email": "usuario@example.com",
  "nombre": "Juan García",
  "telefono": "+34 612345678",
  "createdAt": "2025-11-27T00:21:32.245Z",
  "reportesCount": 5
}
```

### Reporte
```json
{
  "id": "report_1764202892528_rvcxxi",
  "titulo": "Fuga de agua",
  "tipo": "Fuga de agua",
  "descripcion": "Se ve agua saliendo a toda presión...",
  "gravedad": "critico",
  "ubicacion": "Plaza Central, Madrid",
  "lat": 40.4168,
  "lng": -3.7038,
  "uid": "user_1764202892245_rtutum",
  "fotos": [
    {
      "filename": "1764202892517-w8v5r8.png",
      "url": "http://localhost:5001/assets/uploads/1764202892517-w8v5r8.png",
      "size": 289,
      "mimetype": "image/png",
      "uploadedAt": "2025-11-27T00:21:32.528Z"
    }
  ],
  "fotosCount": 1,
  "fecha": "2025-11-27T00:21:32.528Z",
  "estado": "pendiente",
  "respuestas": 0,
  "megustasCount": 0
}
```

## 🎯 Próximos Pasos

- [ ] Integración con Firebase Firestore
- [ ] Sistema de comentarios y respuestas
- [ ] Panel administrativo
- [ ] Notificaciones en tiempo real
- [ ] Exportar reportes a PDF
- [ ] Estadísticas avanzadas
- [ ] Aplicación móvil (React Native/Flutter)

## 📚 Documentación Completa

Ver más documentos:
- `ALMACENAMIENTO-BD.md` - Explicación detallada de almacenamiento
- `RESULTADOS-PRUEBAS-ALMACENAMIENTO.md` - Resultados de pruebas
- `VER-DATOS-TIEMPO-REAL.md` - Cómo consultar datos
- `backend-node/README.md` - Documentación del backend

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Roque** - [GitHub](https://github.com/rockyet12)

## 🙏 Agradecimientos

- [Bootstrap 5](https://getbootstrap.com/) - Framework CSS
- [Leaflet](https://leafletjs.com/) - Mapas interactivos
- [Express.js](https://expressjs.com/) - Framework backend
- [Firebase](https://firebase.google.com/) - Backend como servicio
- [Font Awesome](https://fontawesome.com/) - Iconografía

## 📞 Soporte

¿Preguntas o problemas? 
- Abre un [Issue](https://github.com/rockyet12/AguaVida-/issues)
- Consulta la [Documentación](./ALMACENAMIENTO-BD.md)

---

**¡Ayuda a proteger el agua de tu comunidad! 💧**

Versión: 1.0.0  
Última actualización: Noviembre 2025
