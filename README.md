cd ~/Agua-Vida

cat > README.md << 'EOF'
# AguaVida - Sistema Colaborativo de Reportes de Agua Potable

![AguaVida Banner](https://i.imgur.com/5vJ8K2m.png)

**Sistema web full-stack para reportar en tiempo real fugas de agua, fuentes rotas y problemas de suministro.**  
Los reportes aparecen instantáneamente en un mapa interactivo con fotos geolocalizadas.

Proyecto final - 2025 | Clean Architecture .NET 9 + Frontend puro + MariaDB

## ¿Para qué sirve?
- Reportar fugas, calles inundadas o fuentes públicas dañadas
- Geolocalización automática + subida de fotos
- Mapa colaborativo en tiempo real con Leaflet.js
- Registro y login seguro
- Ayudar a ahorrar millones de litros de agua al año

**En América Latina se pierde el 40% del agua por fugas. Este sistema ayuda a detectarlas antes.**

## Tecnologías (nivel profesional)
| Capa         | Tecnologías                                                      |
|--------------|------------------------------------------------------------------|
| Backend      | .NET 9 + Clean Architecture + EF Core + MariaDB + Swagger       |
| Frontend     | HTML5 + CSS3 + JavaScript puro + Leaflet.js + Bootstrap         |
| Base de datos| MariaDB (compatible MySQL)                                       |
| Seguridad    | BCrypt + CORS                                                    |
| API          | REST completa + documentación Swagger                            |

## Estructura del Proyecto
Agua-Vida/
├── agua vida/                  ← Frontend completo (HTML, CSS, JS, assets)
│   ├── login.html
│   ├── mapa.html
│   ├── reportar.html
│   ├── js/ (auth.js, mapa.js, reportar.js)
│   └── css/
└── backend/                    ← Backend Clean Architecture .NET 9
├── Aguaviva.Domain/        ← Entidades puras
├── Aguaviva.Application/   ← DTOs e interfaces
├── Aguaviva.Infrastructure/ ← Repositorios + EF Core + MariaDB
├── Aguaviva.API/           ← Controladores + Swagger + sirve frontend
└── Aguaviva.sln
text
