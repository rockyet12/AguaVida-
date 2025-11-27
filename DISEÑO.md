# 🌊 Agua Vida - Diseño Moderno

## 📱 Estructura del Frontend Diseñado

### Páginas Principales

#### 1. **Página Principal (index.html)** ✨
- Hero section con llamada a la acción
- Sección de características (6 características principales)
- Estadísticas en tiempo real
- Sección "Sobre Nosotros"
- Call-to-Action para registro
- Footer con enlaces sociales

**Características Mostradas:**
- 📍 Ubicación en Mapa
- 📷 Adjunta Fotos
- 💬 Comunidad Activa
- 🔔 Notificaciones
- 📊 Estadísticas
- 🛡️ Seguridad

#### 2. **Login (login.html)** 🔐
- Diseño split screen (imagen + formulario)
- Campo de email con icono
- Campo de contraseña con icono
- Opción "Recuérdame"
- Link "¿Olvidaste tu contraseña?"
- Botones de login social (Google, Facebook)
- Link a registro

#### 3. **Registro (register.html)** ✍️
(Pendiente de crear - similar a login pero con más campos)

#### 4. **Página Principal Autenticada (home.html)** 🏠
(Pendiente de diseñar)

#### 5. **Mapa (mapa.html)** 🗺️
(Pendiente de diseñar)

#### 6. **Reportar (reportar.html)** 📝
(Pendiente de diseñar)

#### 7. **Perfil (perfil.html)** 👤
(Pendiente de diseñar)

---

## 🎨 Paleta de Colores

| Color | Valor | Uso |
|-------|-------|-----|
| Azul Primario | `#0d6efd` | Botones, links, gradientes |
| Azul Secundario | `#0dcaf0` | Gradientes, hovers |
| Verde | `#198754` | Éxito, checkmarks |
| Rojo | `#dc3545` | Errores, alertas |
| Amarillo | `#ffc107` | Advertencias |
| Gris Claro | `#f8f9fa` | Fondos |
| Gris Oscuro | `#1a1a1a` | Texto principal |

---

## 🎯 Estilos Implementados

### Tipografía
- **Font Principal:** Poppins (Google Fonts)
- Pesos: 300, 400, 500, 600, 700, 800

### Componentes
✅ **Navbar:** Degradado azul con icono
✅ **Botones:** Degradado, hover animation, shadow
✅ **Tarjetas:** Sombra, hover lift effect
✅ **Formularios:** Bordes redondeados, focus effects
✅ **Iconos:** Font Awesome 6.4.0

### Animaciones
- **Fade In/Out:** Elementos que aparecen suavemente
- **Slide Up/Down:** Movimiento vertical
- **Float:** Efecto flotante
- **Hover Lift:** Las tarjetas suben al pasar el mouse

### Responsive Design
- Desktop: Layout completo
- Tablet: Ajustes de tamaño
- Mobile: Stack vertical, fuente más pequeña, botones full-width

---

## 📂 Estructura de Archivos CSS

```
front-end/
├── style/
│   ├── global.css      # Estilos base, variables, navbar
│   ├── index.css       # Hero, features, stats, about, footer
│   ├── auth.css        # Login, registro, forms
│   ├── home.css        # Dashboard principal
│   ├── mapa.css        # Mapa interactivo
│   ├── reportar.css    # Formulario de reportes
│   ├── perfil.css      # Perfil de usuario
│   └── login.css       # (Deprecated)
```

---

## 🚀 Cómo Usar

### Desarrollo Local

```bash
# Terminal 1 - Backend
cd backend-node
npm run dev

# Terminal 2 - Frontend
cd front-end
npm start
```

Luego accede a:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api/health`

### Testing Rápido

```bash
# Desde la raíz del proyecto
bash start.sh
```

---

## 📝 Próximas Tareas

- [ ] Diseñar página register.html
- [ ] Diseñar página home.html (dashboard)
- [ ] Diseñar página mapa.html (con Leaflet o Google Maps)
- [ ] Diseñar página reportar.html (formulario interactivo)
- [ ] Diseñar página perfil.html
- [ ] Conectar formularios a la API
- [ ] Implementar autenticación
- [ ] Agregar notificaciones (toast)
- [ ] Testing en móviles

---

## 🎓 Variables CSS Disponibles

```css
--primary-color: #0d6efd;
--secondary-color: #0dcaf0;
--success-color: #198754;
--danger-color: #dc3545;
--warning-color: #ffc107;
--dark-color: #1a1a1a;
--light-color: #f8f9fa;
--text-color: #333;
--border-radius: 12px;
--shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.15);
```

Úsalas en cualquier página con `var(--nombre-variable)`

---

## 🔗 Recursos Externos

- **Bootstrap 5.3.3:** Framework CSS
- **Font Awesome 6.4.0:** Iconos
- **Google Fonts:** Tipografía Poppins
- **Firebase:** Autenticación y BD

---

## 📞 Soporte

¿Necesitas agregar más páginas o cambiar estilos? ¡Avísame! 🚀
