# 🔍 CÓMO VER LOS DATOS EN TIEMPO REAL

## 📱 Opción 1: Ver datos en el navegador (Más fácil)

### Paso 1: Abrir la API en el navegador

```
http://localhost:5001/api/stats
```

Verás toda la información de usuarios, reportes y fotos en formato JSON:

```json
{
  "usuarios": {
    "test_1764202892@example.com": {
      "uid": "user_1764202892245_rtutum",
      "email": "test_1764202892@example.com",
      "nombre": "Usuario Test",
      "telefono": "+34 612345678",
      "createdAt": "2025-11-27T00:21:32.245Z",
      "reportesCount": 1
    }
  },
  "reportes": [
    {
      "id": "report_1764202892528_rvcxxi",
      "titulo": "Fuga critica de agua",
      "descripcion": "Se ve agua saliendo a toda presión desde una tubería bajo tierra. Situación crítica.",
      "fotos": [
        {
          "filename": "1764202892517-w8v5r8.png",
          "path": "/assets/uploads/1764202892517-w8v5r8.png",
          "url": "http://localhost:5001/assets/uploads/1764202892517-w8v5r8.png",
          "size": 289,
          "mimetype": "image/png",
          "uploadedAt": "2025-11-27T00:21:32.528Z"
        }
      ]
    }
  ],
  "totalFotos": 2,
  "fotosDir": {
    "path": "/home/roque/Agua-Vida/front-end/assets/uploads",
    "exists": true,
    "files": 2
  }
}
```

---

## 💻 Opción 2: Ver datos en la terminal (Tiempo real)

### Mostrar todos los datos

```bash
curl -s http://localhost:5001/api/stats | jq '.'
```

### Ver solo usuarios

```bash
curl -s http://localhost:5001/api/stats | jq '.usuarios'
```

### Ver solo reportes

```bash
curl -s http://localhost:5001/api/stats | jq '.reportes'
```

### Ver estadísticas resumidas

```bash
curl -s http://localhost:5001/api/stats | jq '{
  usuarios: .usuarios | length,
  reportes: .reportes | length,
  fotosEnBD: .totalFotos,
  fotosEnDisco: .fotosDir.files
}'
```

Resultado:
```json
{
  "usuarios": 1,
  "reportes": 1,
  "fotosEnBD": 2,
  "fotosEnDisco": 2
}
```

---

## 🖼️ Opción 3: Ver fotos guardadas

### Ver lista de archivos

```bash
ls -lah /home/roque/Agua-Vida/front-end/assets/uploads/
```

Resultado:
```
-rw-r--r-- roque roque 289 B  1764202892517-w8v5r8.png
-rw-r--r-- roque roque 424 B  1764202892519-k0lap8.png
```

### Ver una foto en el navegador

```
http://localhost:5001/assets/uploads/1764202892517-w8v5r8.png
```

### Descargar una foto

```bash
curl -O http://localhost:5001/assets/uploads/1764202892517-w8v5r8.png
```

---

## 🧪 Opción 4: Prueba completa nueva

Si quieres volver a probar todo de cero:

```bash
bash /tmp/test-storage-v2.sh
```

Esto:
1. ✅ Registra un usuario nuevo
2. ✅ Hace login
3. ✅ Crea 2 fotos de prueba
4. ✅ Crea un reporte con 2 fotos
5. ✅ Obtiene todos los reportes
6. ✅ Verifica los archivos en disco
7. ✅ Muestra las estadísticas

---

## 📊 Opción 5: Ver datos continuamente

### Monitoreo cada 2 segundos

```bash
while true; do
  clear
  echo "===== ESTADÍSTICAS EN TIEMPO REAL ====="
  curl -s http://localhost:5001/api/stats | jq '{
    usuarios: .usuarios | length,
    reportes: .reportes | length,
    fotosEnBD: .totalFotos,
    fotosEnDisco: .fotosDir.files,
    timestamp: now | todate
  }'
  sleep 2
done
```

---

## 🔗 URLs Útiles

| Recurso | URL |
|---------|-----|
| API Health | http://localhost:5001/api/health |
| Estadísticas | http://localhost:5001/api/stats |
| Todos los reportes | http://localhost:5001/api/reportes |
| Ver usuario | http://localhost:5001/api/usuarios/{uid} |
| Ver fotos | http://localhost:5001/assets/uploads/ |
| Frontend | http://localhost:3000 |
| Registro | http://localhost:3000/register.html |
| Login | http://localhost:3000/login.html |
| Reportar | http://localhost:3000/reportar.html |
| Mapa | http://localhost:3000/mapa.html |

---

## 🎯 Resumen de Comandos

```bash
# Ver salud del servidor
curl http://localhost:5001/api/health

# Ver todos los datos
curl http://localhost:5001/api/stats | jq '.'

# Ver solo usuarios
curl http://localhost:5001/api/stats | jq '.usuarios'

# Ver solo reportes (más compacto)
curl http://localhost:5001/api/reportes | jq '.[] | {titulo, gravedad, fotosCount}'

# Ver estadísticas resumidas
curl http://localhost:5001/api/stats | jq '{usuarios: .usuarios | length, reportes: .reportes | length}'

# Ver fotos en disco
ls -lh /home/roque/Agua-Vida/front-end/assets/uploads/

# Ver una foto
open http://localhost:5001/assets/uploads/NOMBRE_DE_FOTO.png

# Ejecutar pruebas completas
bash /tmp/test-storage-v2.sh
```

---

## ✅ Verificación Rápida

Ejecuta esto en la terminal para verificar que todo está funcionando:

```bash
echo "✅ Verificando sistema..."
echo ""
echo "1. API Health:"
curl -s http://localhost:5001/api/health | jq '.status'
echo ""
echo "2. Usuarios en BD:"
curl -s http://localhost:5001/api/stats | jq '.usuarios | length'
echo ""
echo "3. Reportes en BD:"
curl -s http://localhost:5001/api/stats | jq '.reportes | length'
echo ""
echo "4. Fotos en disco:"
ls /home/roque/Agua-Vida/front-end/assets/uploads/ | wc -l
echo ""
echo "5. Acceso a fotos por HTTP:"
curl -I -s http://localhost:5001/assets/uploads/1764202892517-w8v5r8.png | head -1
echo ""
echo "✅ Sistema operativo y verificado"
```

---

**¡Ya puedes ver todos los datos guardados en tiempo real! 🎉**
