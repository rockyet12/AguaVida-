# 🌊 AGUA VIDA - GUÍA DE PRUEBA

## ✅ COMPLETADO HOY

### 1. Página de Registro ✅
- Formulario completo con 5 campos
- Validación de contraseña (mín 8 caracteres)
- Confirmar contraseña
- Aceptar términos
- Botones sociales

### 2. Página de Login ✅  
- Email y contraseña
- Recuérdame
- Olvidé contraseña
- Botones sociales

### 3. Página de Reportes ✅
- **4 PASOS GUIADOS:**
  - Paso 1: Información (título, tipo, descripción, gravedad)
  - Paso 2: Ubicación (mapa Leaflet, GPS, coordenadas)
  - Paso 3: Fotos (carga múltiple hasta 5 imágenes)
  - Paso 4: Resumen (revisar antes de enviar)
- Validaciones en cada paso
- Preview de fotos
- Mapa interactivo
- Geolocalización automática

---

## 🚀 CÓMO PROBAR

### Opción 1: Dos Terminales

**Terminal 1 - Backend:**
```bash
cd /home/roque/Agua-Vida/backend-node
npm run dev
```
(Espera: "🚀 Servidor ejecutándose en http://localhost:5000")

**Terminal 2 - Frontend:**
```bash
cd /home/roque/Agua-Vida/front-end
npm start
```
(Espera: "🌊 Frontend ejecutándose en http://localhost:3000")

### Opción 2: Script Automático

```bash
cd /home/roque/Agua-Vida
bash start.sh
```

---

## 🌐 URLs DISPONIBLES

| Página | URL | Descripción |
|--------|-----|-------------|
| 🏠 Inicio | http://localhost:3000 | Página principal |
| 🔐 Login | http://localhost:3000/login | **NUEVA** Formulario de login |
| ✍️ Registro | http://localhost:3000/register | **NUEVA** Formulario de registro |
| 📝 Reportar | http://localhost:3000/reportar | **REDISEÑADO** Formulario multi-step |
| 🗺️ Mapa | http://localhost:3000/mapa | Mapa de reportes |
| 👤 Perfil | http://localhost:3000/perfil | Perfil de usuario |

---

## 🧪 PRUEBAS POR PÁGINA

### 1. PÁGINA DE REGISTRO (`/register.html`)

**Campos a probar:**
- [ ] Nombre completo (requerido)
- [ ] Email (requerido, validación)
- [ ] Teléfono (opcional)
- [ ] Contraseña (requerido, mín 8 caracteres)
- [ ] Confirmar contraseña (debe coincidir)
- [ ] Términos (checkbox obligatorio)

**Botones:**
- [ ] Click "Crear Cuenta" → Envía a API
- [ ] Click "Google" → Acción social
- [ ] Click "Facebook" → Acción social
- [ ] Link "Inicia sesión aquí" → Va a login

**Validaciones:**
- [ ] Muestra error si faltan campos
- [ ] Muestra error si contraseñas no coinciden
- [ ] Muestra error si contraseña < 8 caracteres
- [ ] Muestra error si email no válido

---

### 2. PÁGINA DE LOGIN (`/login.html`)

**Campos a probar:**
- [ ] Email (requerido)
- [ ] Contraseña (requerido)
- [ ] Recuérdame (checkbox)

**Botones:**
- [ ] Click "Iniciar Sesión" → Envía a API
- [ ] Click "Google" → Acción social
- [ ] Click "Facebook" → Acción social
- [ ] Link "Regístrate aquí" → Va a registro

**Validaciones:**
- [ ] Muestra error si faltan campos
- [ ] Muestra error si email no válido

---

### 3. PÁGINA DE REPORTAR (`/reportar.html`) 🚀

#### **PASO 1: INFORMACIÓN**
- [ ] Ingresa título (mín 5 caracteres)
- [ ] Selecciona tipo de problema:
  - [ ] 💧 Fuga de agua
  - [ ] 🔧 Tubo roto
  - [ ] ✋ Sin servicio
  - [ ] 🌊 Agua sucia
  - [ ] 📉 Baja presión
  - [ ] ❓ Otro
- [ ] Escribe descripción (mín 20 caracteres)
- [ ] Selecciona gravedad:
  - [ ] 🟢 Leve
  - [ ] 🟡 Moderado
  - [ ] 🔴 Crítico
- [ ] Click "Siguiente"

**Validaciones Paso 1:**
- [ ] Muestra error si título < 5 caracteres
- [ ] Muestra error si no selecciona tipo
- [ ] Muestra error si descripción < 20 caracteres
- [ ] Muestra error si no selecciona gravedad
- [ ] No deja avanzar si hay errores

#### **PASO 2: UBICACIÓN**
- [ ] Escribe dirección
- [ ] Haz click en el mapa para marcar ubicación
- [ ] Verifica que el marcador aparezca
- [ ] Verifica coordenadas en campos Lat/Lng
- [ ] Click "Siguiente"

**Pruebas de Mapa:**
- [ ] Mapa carga correctamente
- [ ] Auto-detecta ubicación GPS (si das permiso)
- [ ] Click en mapa pone marcador
- [ ] Marcador muestra popup
- [ ] Coordenadas se actualizan
- [ ] Zoom y pan funcionan

**Validaciones Paso 2:**
- [ ] Muestra error si no hay dirección
- [ ] Muestra error si no hay coordenadas

#### **PASO 3: FOTOS**
- [ ] Selecciona 1 foto → Se muestra preview
- [ ] Selecciona 5 fotos → Se muestran todas
- [ ] Intenta 6 fotos → Muestra error
- [ ] Click en X → Elimina foto
- [ ] Foto > 5MB → Muestra error
- [ ] Click "Revisar"

**Validaciones Paso 3:**
- [ ] Máximo 5 fotos
- [ ] Máximo 5MB por foto
- [ ] Preview se actualiza al eliminar
- [ ] Fotos opcionales (puedes continuar sin ellas)

#### **PASO 4: RESUMEN**
- [ ] Verifica información completada:
  - [ ] Título
  - [ ] Tipo
  - [ ] Descripción
  - [ ] Gravedad
  - [ ] Dirección
  - [ ] Coordenadas
  - [ ] Fotos adjuntas (o "Sin fotos")
- [ ] Click "Enviar Reporte"

**Resultado Esperado:**
- [ ] Mensaje de éxito
- [ ] Redirige a `/mapa.html` después de 2 segundos
- [ ] Formulario se limpia

---

## 🎬 FLUJO COMPLETO DE PRUEBA

### Escenario: Reportar una fuga

```
1. Abre http://localhost:3000/register
2. Llena el registro
3. Click "Crear Cuenta"
4. Abre http://localhost:3000/login
5. Inicia sesión
6. Abre http://localhost:3000/reportar
7. Paso 1: Ingresa título "Fuga en calle principal"
8. Selecciona tipo "Fuga de agua"
9. Describe: "Hay una fuga en la esquina..."
10. Selecciona gravedad "Crítico"
11. Click Siguiente
12. Paso 2: Ingresa tu dirección
13. Haz click en el mapa para ubicarte
14. Click Siguiente
15. Paso 3: Selecciona 2 fotos
16. Verifica el preview
17. Click Revisar
18. Paso 4: Revisa todo
19. Click "Enviar Reporte"
20. ✅ Debe mostrar éxito
```

---

## 🐛 POSIBLES ERRORES

| Problema | Solución |
|----------|----------|
| Port 3000 ocupado | Usa `lsof -i :3000` y mata el proceso |
| Port 5000 ocupado | Usa `lsof -i :5000` y mata el proceso |
| Mapa no se ve | Recarga (F5) o espera un segundo |
| GPS no funciona | Acepta permisos del navegador |
| Fotos no cargan | Verifica tamaño < 5MB |
| API returns error | Verifica que backend está en puerto 5000 |
| CSS no se aplica | Recarga caché (Ctrl+Shift+R) |

---

## 📊 CHECKLIST DE CALIDAD

### Diseño
- [ ] Todo se ve profesional
- [ ] Colores coordinados
- [ ] Tipografía clara
- [ ] Espacios bien distribuidos
- [ ] Sombras sutiles

### Funcionalidad
- [ ] Formularios funcionan
- [ ] Validaciones trabajan
- [ ] Botones responden
- [ ] Transiciones suaves
- [ ] Mapa interactivo

### Responsividad
- [ ] Se ve bien en desktop
- [ ] Se ve bien en tablet
- [ ] Se ve bien en móvil
- [ ] Botones son tap-friendly
- [ ] Texto legible

### Accesibilidad
- [ ] Labels correctos
- [ ] Contraste suficiente
- [ ] Iconos + texto
- [ ] Focus visible
- [ ] Navegación clara

---

## 🎯 PRUEBAS TÉCNICAS

### Network
```
Abre DevTools (F12)
→ Tab Network
→ Realiza un reportar
→ Verifica POST a http://localhost:5000/api/reportes
→ Status debe ser 201 o 200
```

### Console
```
Abre DevTools (F12)
→ Tab Console
→ No debe haber errores en rojo
→ Busca warnings (amarillo) - están OK
```

### Responsive
```
DevTools (F12)
→ Toggle Device Toolbar (Ctrl+Shift+M)
→ Prueba en:
  □ iPhone SE
  □ iPad
  □ Desktop
```

---

## 🎓 NOTAS IMPORTANTES

1. **Fotos:** Las fotos se envían como FormData, no JSON
2. **Mapa:** Necesita conexión a internet (OpenStreetMap)
3. **GPS:** Requiere HTTPS en producción (localhost ok)
4. **Storage:** Las fotos se guardarían en Firebase Storage
5. **Validación:** Se hace en cliente Y server

---

## 📝 PRÓXIMAS PÁGINAS

Cuando termines de probar, puedo:
- Diseñar home.html (Dashboard)
- Diseñar mapa.html (Mapa con filtros)
- Diseñar perfil.html (Perfil de usuario)
- Conectar autenticación real
- Agregar más funcionalidades

---

## 🚀 ¿ENCONTRASTE UN BUG?

1. Anota qué paso causó el error
2. Qué navegador usas (Chrome, Firefox, etc)
3. Qué dispositivo (PC, tablet, móvil)
4. Cuál es el error exacto
5. Avísame y lo arreglo

---

## 💬 FEEDBACK

¿Qué te parece?
- ¿Te gusta el diseño?
- ¿Falta algo?
- ¿Cambio algo?
- ¿Continúo con más páginas?

**¡Házmelo saber! 🚀🌊**
